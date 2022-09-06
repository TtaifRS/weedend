import Stripe from 'stripe';
import dotenv from 'dotenv';
import crypto from 'crypto'

import User from '../models/user.js'

import catchAsyncError from '../middlewares/catchAsyncError.js'

import ErrorHandler from '../utils/errorHandler.js'
import { getDifference } from '../utils/helper.js'



dotenv.config({ path: './config/config.env' })
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


/***
 * get price id
 */
export const prices = catchAsyncError(async (req, res, next) => {
  const price = await stripe.prices.list()

  res.status(200).json({
    success: true,
    data: price.data
  })
})


/**
 * create subscription 
 * redirect to stripe page for check out
 */

export const createSubscription = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id)

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: req.body.priceId,
        quantity: 1
      }
    ],
    customer: user.stripe_customer_id,
    success_url: process.env.STRIPE_SUCCESS_URL,
    cancel_url: process.env.STRIPE_CANCEL_URL
  })

  res.status(201).json({
    success: true,
    url: session.url,
    data: session
  })
})


/**
 * check subscription status 
 * update the db  
 */

export const subscriptionStaus = catchAsyncError(async (req, res, next) => {

  let subData = []


  const user = await User.findById(req.user.id)

  const subscription = await stripe.subscriptions.list({
    customer: user.stripe_customer_id,
    status: "all",
    expand: ["data.default_payment_method"]
  })

  if (subscription.data && subscription.data.length === 0) {
    return next(new ErrorHandler("Please subscribed", 401))
  }



  subscription.data.map((i) => {
    // if (subData.id !== i.id) {

    // }
    subData = [];
    subData.push({
      subscribed: true,
      id: i.id,
      nickname: i.items.data[0].price.nickname,
      createdAt: i.created,
      currentPeriodStart: i.current_period_start,
      currentPeriodEnd: i.current_period_end,
      apiKey: crypto.randomBytes(32).toString('hex')
    })

  })
  console.log(subscription.data)
  const subscriptionExist = getDifference(subData, user.subscriptionStatus)
  if (subscriptionExist.length !== 0) {
    const updatedUser = await User.findByIdAndUpdate(
      user.id,
      {
        subscriptionStatus: subData
      },
      {
        new: true,
        unique: true
      }
    )
    res.status(200).json({
      success: true,
      data: updatedUser
    })
  }
  else {
    return next(new ErrorHandler("Already subscribed", 401))
  }

})
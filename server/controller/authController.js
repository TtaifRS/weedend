import crypto from 'crypto'
import dotenv from 'dotenv'
import Stripe from 'stripe'

import User from '../models/user.js'

import catchAsyncError from '../middlewares/catchAsyncError.js'

import ErrorHandler from '../utils/errorHandler.js'
import sendEmail from '../utils/sendEmail.js'
import sendToken from '../utils/jwtToken.js'
import { millisToMinutesAndSeconds } from '../utils/helper.js'




dotenv.config({ path: './config/config.env' })


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


//sign up => api/v1/signup
export const signUp = catchAsyncError(async (req, res, next) => {
  const { email, name, password } = req.body

  //check email exist on body 
  if (!email) {
    return next(new ErrorHandler('Missing email'), 422)
  }

  /**
   * check if user trying to signup multiple time without clicking activation link
   * if user exist send a error message with time left for next req
   */
  const existingUser = await User.findOne({
    email,
    activationLinkExpire: { $gt: Date.now() },
    verified: false
  }).exec()

  if (existingUser) {
    const diff = existingUser.activationLinkExpire - Date.now()
    const diffInNrml = millisToMinutesAndSeconds(diff)
    return next(new ErrorHandler(`Activation link sent. Please try again ${diffInNrml}`), 409)
  }


  /**
   * If user don't activate the account 
   * and try to sign up again after expire date
   * delete the account from DB
   */

  const notActivatedUser = await User.findOne({
    email,
    activationLinkExpire: { $lt: Date.now() },
    verified: false
  })

  if (notActivatedUser) {
    await User.deleteOne(notActivatedUser)

  }

  /**
   * Save user to DB 
   * and get a activation link and saved it to db
   * with expire date
   */

  const customer = await stripe.customers.create({
    name,
    email
  })



  const user = await User.create({
    email,
    name,
    password,
    stripe_customer_id: customer.id,
  })
  const verificationToken = user.getActivationLink();

  await user.save({ validateBeforeSave: false })


  /**
   * mail the activation url to user 
   * for test env mailing provider is mailtrap
   */

  const url = `${req.protocol}://${req.get('host')}/api/v1/verify/${verificationToken}`

  const message = `<a href = '${url}'>Click here</a> to confirm your email. If you have not request this, then please ignore that. Activation link will expire after 10mins.`

  try {
    await sendEmail({
      email: user.email,
      subject: 'Weed-End-API account activition',
      message
    })

    res.status(200).json({
      success: true,
      message: `Email sent successfully to: ${user.email}`
    })
  } catch (error) {
    user.activationLink = undefined
    user.activationLinkExpire = undefined

    await user.save({ validateBeforeSave: false })

    return next(new ErrorHandler('Email is not sent please try again after a moment', 500))
  }
})


//login => /api/v1/login
export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body

  /**
   * check if req.body has email and password 
   * find user with email and password 
   * hashed the body password and compare with user's hashed password 
   * check user verified or not 
   * if all passed sendToken to cookies
   */

  if (!email || !password) {
    return next(new ErrorHandler('Please enter Email and Password'), 400)
  }

  const user = await User.findOne({ email }).select('+password')

  if (!user) {
    return next(new ErrorHandler('Invalid email or password', 401))
  }

  const isPasswordMatched = await user.comparePassword(password)


  if (!isPasswordMatched) {
    return next(new ErrorHandler('Invald email or password', 401))
  }

  if (!user.verified) {
    return next(new ErrorHandler('Verify your account', 403))
  }

  sendToken(user, 200, res)
})



//verify => api/v1/verify/:token
export const verify = catchAsyncError(async (req, res, next) => {

  /**
   * Get sectet token from params
   * hash and update the token with crypto
   */

  const token = req.params.token
  const activationLink = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex')


  /**
   * find user with newly hashed activationlink with user's activation link 
   * if user doesn't exist send err 
   * if user exist update user to verified true and save 
   * activationLink and activationLinkExpire undefined
   */

  const user = await User.findOne({
    activationLink,
    activationLinkExpire: { $gt: Date.now() },
  })

  if (!user) {
    return next(new ErrorHandler('Activation lins is invalid or has been expired.', 400))
  }

  user.verified = true

  user.activationLink = undefined
  user.activationLinkExpire = undefined

  await user.save()

  sendToken(user, 200, res)
})


//forget password => /api/v1/password/forgot 
export const forgotPassword = catchAsyncError(async (req, res, next) => {
  /**
   * getting email from req.body and finding user with the email
   * geneating resetPasswordToken 
   * sending email to user with reset link 
   */
  const email = req.body.email
  const user = await User.findOne({ email })

  if (!user) {
    return next(new ErrorHandler('No user found with this email', 404))
  }

  const resetToken = user.getResetPasswordToken()
  await user.save({ validateBeforeSave: false })

  const restUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`

  const message = `<a href = '${restUrl}'>Click here</a> to reset your password. If you have not request this, then please ignore that. Activation link will expire after 30mins.`

  try {
    await sendEmail({
      email: user.email,
      subject: 'Weed End Password Recovery',
      message
    })

    res.status(200).json({
      sucess: true,
      message: `Email sent successfully to ${user.email}`
    })
  } catch (error) {
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save({ validateBeforeSave: false })

    return next(new ErrorHandler('Email is not sent. Please try again after a moment'))
  }

})


//reset password => /password/reset/:token
export const resetPassword = catchAsyncError(async (req, res, next) => {
  /**
   * Getting token from req.params 
   * creating crypt hash with token 
   * finding user with newly hashed token
   * if available update password 
   */
  const token = req.params.token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex')

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  })

  if (!user) {
    return next(new ErrorHandler('Password Reset token is invalid or has been expired', 400))
  }

  user.password = req.body.password;

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save()

  sendToken(user, 200, res)
})

//logout => /api/v1/logout 
export const logout = catchAsyncError(async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now()),
    httpOnly: true
  })

  res.status(200).json({
    success: true,
    message: 'Logged Out successfully'
  })
})
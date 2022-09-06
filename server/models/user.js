import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name']
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: true,
    validate: [validator.isEmail, 'Please enter valid email']
  },
  roles: {
    type: String,
    enum: {
      values: ['user', 'admin'],
      message: 'Please select correct role',
    },
    default: 'user'
  },
  password: {
    type: String,
    required: [true, 'Please enter password for your account'],
    minLength: [8, 'Your password must be at least 8 charecters long'],
    select: false
  },
  verified: {
    type: Boolean,
    required: [true, 'Please verify your email'],
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  stripe_customer_id: String,
  subscriptionStatus: [
    {
      subscribed: {
        type: Boolean,
        default: false
      },
      id: String,
      name: String,
      createdAt: {
        type: Date,
        set: d => new Date(d * 1000)
      },
      currentPeriodStart: {
        type: Date,
        set: d => new Date(d * 1000)
      },
      currentPeriodEnd: {
        type: Date,
        set: d => new Date(d * 1000)
      },
      apiKey: String
    }
  ],
  activationLink: String,
  activationLinkExpire: Date,
  resetPasswordToken: String,
  resetPasswordExpire: Date
})

/**
 * Encrypting passwords before saving
 * @returns hashed password
 */
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  this.password = await bcrypt.hash(this.password, 10)
})


/**
 * return JSON web token
 *@returns verificationToken
 */
userSchema.methods.generateVerificationToken = function () {
  const user = this;

  const verificationToken = jwt.sign(
    { id: user._id },
    process.env.USER_VERIFICATION_TOKEN_SECRET,
    { expiresIn: process.env.JWT_EXPIRE_TIME }
  )

  return verificationToken
}

/**
 * compare hashed password
 */

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

/**
 * generate activation link
 */
userSchema.methods.getActivationLink = function () {
  const activationToken = crypto.randomBytes(20).toString('hex')

  this.activationLink = crypto
    .createHash('sha256')
    .update(activationToken)
    .digest('hex')

  this.activationLinkExpire = Date.now() + 50 * 60 * 1000

  return activationToken;
}

/**
 * generate reset password token
 */

userSchema.methods.getResetPasswordToken = function () {
  //generate token
  const resetToken = crypto.randomBytes(20).toString('hex')

  //hash and set to resetPasswordToken
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')

  //set token expire time 
  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000

  return resetToken

}


export default mongoose.model('User', userSchema)
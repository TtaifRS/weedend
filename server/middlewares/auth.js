import jwt from 'jsonwebtoken'

import User from '../models/user.js'
import catchAsyncError from './catchAsyncError.js'
import ErrorHandler from '../utils/errorHandler.js'

export const isAuthenticated = catchAsyncError(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    return next(new ErrorHandler('Please login to access', 401))
  }

  const decoded = jwt.verify(token, process.env.USER_VERIFICATION_TOKEN_SECRET)


  req.user = await User.findById(decoded.id)

  next()
})


export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.roles)) {
      return next(new ErrorHandler(`${req.user.roles} is not allowed to access this resource`, 403))
    }

    next()
  }
}
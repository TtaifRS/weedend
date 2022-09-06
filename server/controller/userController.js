import User from '../models/user.js'
import catchAsyncError from '../middlewares/catchAsyncError.js'
import ErrorHandler from '../utils/errorHandler.js'
import sendToken from '../utils/jwtToken.js'


//getUser => /api/v1/profile
export const getUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id)

  res.status(200).json({
    success: true,
    data: user
  })
})

//update current user password => /api/v1/passowrd/update 
export const updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password')

  const isMatched = await user.comparePassword(req.body.currentPassword)

  if (!isMatched) {
    return next(new ErrorHandler('Old password is incorrect', 401))
  }

  user.password = req.body.newPassword

  await user.save()

  sendToken(user, 200, res)
})

//update user => /api/v1/profile/update 
export const updateUser = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true
  })

  res.status(200).json({
    success: true,
    data: user
  })
})


//delete user => /api/v1/profile/delete
export const deleteUser = catchAsyncError(async (req, res, next) => {

  const user = await User.findByIdAndDelete(req.user.id)
  res.cookie('token', 'none', {
    expires: new Date(Date.now()),
    httpOnly: true
  })


  res.status(200).json({
    success: true,
    message: 'Your account has been deleted',
    data: user
  })
})
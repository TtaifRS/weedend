import express from 'express'

import { isAuthenticated } from '../middlewares/auth.js'

import { deleteUser, getUser, updatePassword, updateUser } from '../controller/userController.js'


const router = express.Router()


router.route('/profile').get(isAuthenticated, getUser)
router.route('/password/update').put(isAuthenticated, updatePassword)
router.route('/profile/update').put(isAuthenticated, updateUser)
router.route('/profile/delete').delete(isAuthenticated, deleteUser)

export default router;
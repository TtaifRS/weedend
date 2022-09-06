import express from 'express';

import { isAuthenticated } from '../middlewares/auth.js';

import { signUp, login, verify, forgotPassword, resetPassword, logout } from '../controller/authController.js';

const router = express.Router()

router.route('/signup').post(signUp)
router.route('/login').post(login)
router.route('/verify/:token').get(verify)
router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').put(resetPassword)
router.route('/logout').get(isAuthenticated, logout)
export default router;
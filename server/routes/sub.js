import express from 'express'
import { createSubscription, prices, subscriptionStaus } from '../controller/subController.js'
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router()


router.route('/prices').get(prices)
router.route('/subscription/create').post(isAuthenticated, createSubscription)
router.route('/subscription/status').get(isAuthenticated, subscriptionStaus)

export default router;
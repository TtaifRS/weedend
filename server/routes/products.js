import express from 'express';

import { isAuthenticated, authorizeRoles, } from '../middlewares/auth.js';
// import { moesifMiddleware } from '../middlewares/moesifMiddleware.js';

import { deleteProduct, getNewProduct, getProduct, getProducts, updateProduct, getProductStats, updateProducer } from '../controller/productsController.js';

const router = express.Router()

router.route('/product/stats').get(isAuthenticated, getProductStats)

router.route('/products').get(isAuthenticated, getProducts)
router.route('/product/:id').get(isAuthenticated, getProduct)
router.route('/products/new').post(isAuthenticated, authorizeRoles('admin'), getNewProduct)
router.route('/product/:id').put(isAuthenticated, authorizeRoles('admin'), updateProduct)
router.route('/product/producer/:id').put(isAuthenticated, authorizeRoles('admin'), updateProducer)
router.route('/product/:id').delete(isAuthenticated, authorizeRoles('admin'), deleteProduct)



export default router;
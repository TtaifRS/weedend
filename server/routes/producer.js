import express from 'express'
import { deleteProducer, getProdcuersByTypes, getProducers, newProducer, updateProducer } from '../controller/producerController.js'
import { isAuthenticated } from '../middlewares/auth.js'


const router = express.Router()

router.route('/create/producer').post(isAuthenticated, newProducer)
router.route('/update/producer/:id').put(isAuthenticated, updateProducer)
router.route('/producers').get(isAuthenticated, getProducers)
router.route('/producers/types').get(isAuthenticated, getProdcuersByTypes)
router.route('/delete/producer/:id').delete(isAuthenticated, deleteProducer)

export default router
import express from 'express'
import { deleteProducer, getProdcuersByTypes, getProducers, getSingleProducers, newProducer, updateMultiProdcuers, updateProducer } from '../controller/producerController.js'



const router = express.Router()

router.route('/create/producer').post(newProducer)
router.route('/update/producer/:id').put(updateProducer)
router.route('/update/multi/producers').put(updateMultiProdcuers)
router.route('/producers').get(getProducers)
router.route('/producers/types').get(getProdcuersByTypes)
router.route('/producer/:id').get(getSingleProducers)
router.route('/delete/producer/:id').delete(deleteProducer)

export default router
import express from 'express'
import { deleteField, getFields, newField, updateField } from '../controller/fieldController.js'

const router = express.Router()

router.route('/add').post(newField)
router.route('/fields').get(getFields)
router.route('/update/field').put(updateField)
router.route('/delete/field').put(deleteField)

export default router
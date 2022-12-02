import catchAsyncError from '../middlewares/catchAsyncError.js';
import Producer from '../models/producer.js';
import APIFilters from '../utils/apiFilters.js';
import ErrorHandler from '../utils/errorHandler.js';


//post new producer /api/v1/create/prdocuer 
export const newProducer = catchAsyncError(async (req, res, next) => {
  const { name } = req.body

  const existingProducer = await Producer.findOne({ producerName: name })

  //check email exist on body 
  if (existingProducer) {
    return next(new ErrorHandler('Producer already exist'), 500)
  }

  const producer = await Producer.create({
    producerName: name,
  })

  res.status(200).json({
    success: true,
    data: producer,
  })

})

//update producer /api/v1/update/prdocuer/:id 
export const updateProducer = catchAsyncError(async (req, res, next) => {
  const id = req.params.id
  const data = req.body

  const producer = await Producer.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true
  })


  res.status(200).json({
    success: true,
    data: producer,
  })

})

//update multiple producers /api/v1/update/multi/producers 
export const updateMultiProdcuers = catchAsyncError(async (req, res, next) => {
  const ids = req.body.ids
  const data = req.body
  await Producer.updateMany({ "_id": { $in: ids } }, { $inc: { data } });

  res.status(200).json({
    success: true,
    ids,
    data
  })
})

//get producers /api/v1/prdocuers
export const getProducers = catchAsyncError(async (req, res, next) => {
  const Producers = await Producer.find()

  res.status(200).json({
    success: true,
    data: Producers
  })
})

export const getSingleProducers = catchAsyncError(async (req, res, next) => {
  const id = req.params.id
  const producer = await Producer.findById(id)

  res.status(200).json({
    success: true,
    data: producer
  })
})


//get producers by types /api/v1/producers/types/?
export const getProdcuersByTypes = catchAsyncError(async (req, res, next) => {
  const apiFilters = new APIFilters(Producer.find(), req.query)
    .filter()

  const producers = await apiFilters.query

  res.status(200).json({
    success: true,
    results: producers.length,
    data: producers
  })
})


//delete producer /api/v1/delete/prdocuer/:id 
export const deleteProducer = catchAsyncError(async (req, res, next) => {
  const id = req.params.id

  let producer = await Producer.findById(id)

  if (!producer) {
    return next(new ErrorHandler('producers not found'), 404)
  }

  producer = await Producer.findByIdAndDelete(id)

  res.status(200).json({
    success: true,
    message: 'producer deleted successfully'
  })
})






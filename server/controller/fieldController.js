import catchAsyncError from '../middlewares/catchAsyncError.js';
import Field from '../models/field.js';
import ErrorHandler from '../utils/errorHandler.js';

export const newField = catchAsyncError(async (req, res, next) => {
  const { name, data } = req.body

  const query = await Field.findOne({ name })
  let fieldValue = []
  let alreadyExist = []

  if (query) {


    data.map((d, i) => {
      const checkValue = obj => obj.label === d
      const lastId = query.tables[query.tables.length - 1].id
      if (query.tables.some(checkValue)) {
        fieldValue = [...fieldValue]
        alreadyExist.push(d)
      }
      else {
        fieldValue.push({
          id: i + lastId + 1,
          label: d,
          value: d
        })
      }

    }
    )

    await Field.updateOne(
      { name: name },
      { $push: { tables: fieldValue } },

    );

    const product = await Field.findOne({ name })
    res.status(200).json({
      success: true,
      data: product,
      alreadyExist
    })
  }
  else {

    data.map((d, i) => {
      fieldValue.push({
        id: i,
        label: d,
        value: d
      })
    }
    )

    const field = await Field.create({
      name,
      tables: fieldValue
    })


    res.status(200).json({
      success: true,
      data: field
    })
  }
})

export const getFields = catchAsyncError(async (req, res, next) => {
  Field.find({}).exec((err, fields) => {
    if (err) {
      return next(new ErrorHandler('Something went wrong, please try again'))
    }

    res.status(200).json({
      success: true,
      data: fields
    })
  })
})

export const updateField = catchAsyncError(async (req, res, next) => {
  const { id, old, data } = req.body


  const field = await Field.findOneAndUpdate(
    {
      _id: id
    },
    {
      $set: {
        "tables.$[el].label": data,
        "tables.$[el].value": data
      }
    },
    {
      arrayFilters: [{ "el.label": old }],
      new: true
    }
  )

  res.status(200).json({
    success: true,
    data: field,
  })
})

export const deleteField = catchAsyncError(async (req, res, next) => {
  const { id, data } = req.body

  await Field.findByIdAndUpdate(
    {
      _id: id
    },
    {
      $pull: { "tables": { "label": data } }
    },
    {
      safe: true, multi: false
    }
  )

  const field = await Field.findById({ _id: id })
  res.status(200).json({
    success: true,
    data: field,
  })
})
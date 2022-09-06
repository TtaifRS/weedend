import fetch from 'node-fetch';
import Product from '../models/product.js';
import User from '../models/user.js'

import catchAsyncError from '../middlewares/catchAsyncError.js'
import ErrorHandler from '../utils/errorHandler.js';



//post new product api/v1/new/product
export const getNewProduct = catchAsyncError(
  async (req, res, next) => {



    let resultData;
    let updateMessage = "No new update"
    let newMessage = "No new product"
    let updatedProduct = []
    let newProduct = []


    const response = await fetch(process.env.GREENLINE_URI, {
      method: 'get',
      headers: {
        'api-key': process.env.GREENLINE_API_KEY
      }
    })

    const json = await response.json();
    resultData = [...json.products]

    for (let i = 0; i < resultData.length; i++) {

      const {
        id,
        name,
        parentProductName,
        description,
        sku,
        barcode,
        imageUrl,
        price,
        categoryId,
        categoryName,
        parentCategoryId,
        supplierId,
        parentCategoryName,
        supplierName,
        weight,
        cannabisWeight,
        cannabisVolume,
        thc,
        cbd

      } = resultData[i]

      const productExist = await Product.findOne({ prdocutId: id });


      if (productExist) {


        let uProduct = await Product.findOneAndUpdate(
          {
            prdocutId: id
          },
          {
            prdocutId: id,
            name,
            parentProductName,
            description,
            sku,
            barcode,
            imageUrl,
            price,
            categoryId,
            categoryName,
            parentCategoryName,
            parentCategoryId,
            supplierId,
            supplierName,
            weight,
            cannabisWeight,
            cannabisVolume,
            thc,
            cbd,
            productData: productExist.productData,
            createdAt: productExist.createdAt,
            updatedAt: productExist.updated ? productExist.updatedAt : "null",
            updated: productExist.updated,

          },
          {
            new: true,
            overwrite: true,
            timeStamps: false
          },

        )

        updatedProduct.push(uProduct)
        updateMessage = "Product updated"

      } else {
        let products = new Product({
          prdocutId: id,
          name,
          parentProductName,
          description,
          sku,
          barcode,
          imageUrl,
          price,
          categoryId,
          categoryName,
          parentCategoryName,
          parentCategoryId,
          supplierId,
          supplierName,
          weight,
          cannabisWeight,
          cannabisVolume,
          thc,
          cbd,
          createdAt: Date.now()
        })

        newProduct.push(products)

        products.save({ timestamps: false });
        newMessage = "new products added"
      }


    }
    res.status(200).json({
      success: true,
      message: `${updateMessage} and ${newMessage}`,
      updatedProduct,
      newProduct,
    })

  }
)

//get products /api/v1/products 
export const getProducts = catchAsyncError(async (req, res, next) => {
  Product.find({}).sort('-createdAt').exec((err, products) => {
    if (err) {
      return next(new ErrorHandler('Something went wrong, please try again'))
    }

    res.status(200).json({
      success: true,
      data: products
    })
  })
})

//get single product /api/v1/product/:id 
export const getProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id)

  res.status(200).json({
    success: true,
    data: product
  })
})




//update products /api/v1/product/:id 
// export const updateProduct = catchAsyncError(async (req, res, next) => {
//   const id = req.params.id


//   if (id.match(/^[0-9a-fA-F]{24}$/)) {
//     let product = await Product.findById(req.params.id)

//     if (!product) {
//       return next(new ErrorHandler('Product not found', 404))
//     }


//     product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })

//     res.status(200).json({
//       success: true,
//       message: 'Products updated',
//       data: product
//     })
//   } else {
//     return next(new ErrorHandler('Invalid ID'), 404)
//   }
// })

//update product v2 /api/v1/product/new/:id
export const updateProduct = catchAsyncError(async (req, res, next) => {
  const id = req.params.id

  if (id.match(/^[0-9a-fA-F]{24}$/)) {

    let removeObj = []

    Object.entries(req.body).forEach(([key, val]) => {
      if (!val) { delete req.body[key]; removeObj.push(key) }
    })

    let bulkArr = []

    if (req.body) bulkArr.push({
      updateOne: {
        "filter": { id },
        "update": { $set: req.body }
      }
    })

    if (Object.entries(removeObj).length > 0 && removeObj.constructor === Object) bulkArr.push({
      updateOne: {
        "filter": { id },
        "update": { $unset: removeObj }
      }
    })
    console.log(removeObj)
    console.log(bulkArr)
    await Product.updateOne(
      { "_id": id },
      [
        {
          $set: req.body
        },
        { $unset: removeObj }
      ]
    )
    let product = await Product.findById(id)
    res.status(200).json({
      success: true,
      message: 'Products updated',
      data: product
    })
  } else {
    return next(new ErrorHandler('Invalid ID'), 404)
  }
})

//delete products /api/v1/product/:id 
export const deleteProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id)

  if (!product) {
    return next(new ErrorHandler('Products not found'), 404)
  }

  product = await Product.findByIdAndDelete(req.params.id)

  res.status(200).json({
    success: true,
    message: 'Product deleted successfully'
  })
})


//product stats /api/v1/stats 
export const getProductStats = catchAsyncError(async (req, res, next) => {

  let now = new Date();
  let onejan = new Date(now.getFullYear(), 0, 1);
  let currentWeek = (Math.ceil((((now.getTime() - onejan.getTime()) / 86400000) + onejan.getDay() + 1) / 7)) - 1;
  let currentMonth = new Date().getMonth() + 1



  const stats = await Product.aggregate([
    {
      $facet: {
        "byCategory": [
          {
            $sortByCount: "$categoryName"
          }
        ],
        "numberOfUpdatedProduct": [
          {
            $group: {
              _id: "$updated",
              "count": { $sum: { $cond: [{ $eq: ["$updated", true] }, 1, 0] } }
            }
          }
        ],
        "updatePerDay": [
          {
            $match: {
              updatedAt: {
                $lte: new Date(Date.now()),
                $gt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
              },
            },
          },
          { $sort: { updatedAt: -1 } },
          {
            $group:
            {
              _id: {
                $dateToString: {
                  "date": "$updatedAt",
                  "format": "%Y-%m-%d"
                }
              },
              count: { $sum: 1 }
            }
          }
        ],

        "currentMonth": [
          {
            $match: {
              $expr: {
                $eq: [{ $month: "$updatedAt" }, currentMonth]
              }
            }
          },
          {
            $group: {
              _id: {
                year: { $year: "$updatedAt" },
                month: { $month: "$updatedAt" },
              },
              Total: { $sum: 1 }
            }
          }
        ],
        "previousMonth": [
          {
            $match: {
              $expr: {
                $eq: [{ $month: "$updatedAt" }, currentMonth - 1]
              }
            }
          },
          {
            $group: {
              _id: {
                year: { $year: "$updatedAt" },
                month: { $month: "$updatedAt" },
              },
              Total: { $sum: 1 }
            }
          }
        ],
        "currentWeek": [
          {
            $match: {
              $expr: {
                $eq: [{ $week: "$updatedAt" }, currentWeek]
              }
            }
          },
          {
            $group: {
              _id: {
                year: { $year: "$updatedAt" },
                week: { $week: "$updatedAt" },
              },
              Total: { $sum: 1 }
            }
          }
        ],
        "previousWeek": [
          {
            $match: {
              $expr: {
                $eq: [{ $week: "$updatedAt" }, currentWeek - 1]
              }
            }
          },
          {
            $group: {
              _id: {
                year: { $year: "$updatedAt" },
                week: { $week: "$updatedAt" },
              },
              Total: { $sum: 1 }
            }
          }
        ],
      }
    }

  ]);



  res.status(200).json({
    sucess: true,
    message: stats,
    length: await Product.countDocuments()
  })

})
import fetch from 'node-fetch';
import Product from '../models/product.js';
import Producer from '../models/producer.js';

import catchAsyncError from '../middlewares/catchAsyncError.js'
import ErrorHandler from '../utils/errorHandler.js';
import APIFilters from '../utils/apiFilters.js';



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

      let priceToString = price.toString()
      const priceDecimal = priceToString.substring(0, priceToString.length - 2) + "." + priceToString.substring(priceToString.length - 2)

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
            price: priceDecimal,
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
            types: productExist.types,
            weedEndData: productExist.weedEndData,
            productData: productExist.productData,
            createdAt: productExist.createdAt,
            updatedAt: productExist.productData || productExist.weedEndData ? productExist.updatedAt : "null",
            updated: productExist.productData || productExist.weedEndData ? true : false,

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
          price: priceDecimal,
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
  const apiFilters = new APIFilters(Product.find(), req.query)
    .filter()
    .sort()
    .pagination()

  const products = await apiFilters.query

  res.status(200).json({
    success: true,
    results: products.length,
    data: products
  })




  // Product.find({}).sort('-createdAt').exec((err, products) => {
  //   if (err) {
  //     return next(new ErrorHandler('Something went wrong, please try again'))
  //   }

  //   res.status(200).json({
  //     success: true,
  //     data: products
  //   })
  // })
})

//get single product /api/v1/product/:id 
export const getProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id)

  res.status(200).json({
    success: true,
    data: product
  })
})


//update product /api/v1/product/:id

export const updateProduct = catchAsyncError(async (req, res, next) => {
  const id = req.params.id
  let product = await Product.findById(id)
  if (id.match(/^[0-9a-fA-F]{24}$/)) {

    /**
     * @Flowers
     * 
     */
    if (req.body.types && req.body.types === 'Flowers') {
      product = await Product.updateOne(
        { "_id": id },
        [
          {
            $unset: ['weedEndData']
          },
          {
            $set: {
              weedEndData: {
                sku: undefined,
                parentSku: undefined,
                brand: undefined,
                productName: undefined,
                producer: undefined,
                variants: false,
                thc: undefined,
                cbd: undefined,
                format: undefined,
                category: undefined,
                phenotype: undefined,
                quailty: undefined,
                genetics: undefined,
                terpene1: undefined,
                terpene2: undefined,
                terpene3: undefined,
                organic: undefined,
                micro: undefined,
                handTrimmed: undefined,
                hangDried: undefined,
                effect: undefined,
                province: undefined,
                additionalInfo: undefined,
                salePrice: undefined,
              }
            }
          }
        ]
      )
    }

    /**
     * @PreRolls
     * 
     */
    if (req.body.types && req.body.types === 'Pre-Rolls') {
      product = await Product.updateOne(
        { "_id": id },
        [
          {
            $unset: ['weedEndData']
          },
          {
            $set: {
              weedEndData: {
                sku: undefined,
                parentSku: undefined,
                brand: undefined,
                productName: undefined,
                producer: undefined,
                variants: false,
                thc: undefined,
                cbd: undefined,
                format: undefined,
                category: undefined,
                phenotype: undefined,
                quailty: undefined,
                genetics: undefined,
                terpene1: undefined,
                terpene2: undefined,
                terpene3: undefined,
                organic: undefined,
                micro: undefined,
                handTrimmed: undefined,
                hangDried: undefined,
                effect: undefined,
                province: undefined,
                additionalInfo: undefined,
                salePrice: undefined,
              }
            }
          }
        ]
      )
    }

    /**
     * @Vapable
     * 
     */

    if (req.body.types && req.body.types === 'Vapable') {
      product = await Product.updateOne(
        { "_id": id },
        [
          {
            $unset: ['weedEndData']
          },
          {
            $set: {
              weedEndData: {
                sku: undefined,
                parentSku: undefined,
                brand: undefined,
                productName: undefined,
                producer: undefined,
                variants: false,
                thc: undefined,
                cbd: undefined,
                format: undefined,
                type: undefined,
                kit: undefined,
                category: undefined,
                phenotype: undefined,
                quality: undefined,
                genetics: undefined,
                terpene1: undefined,
                terpene2: undefined,
                terpene3: undefined,
                effect: undefined,
                province: undefined,
                additionalInfo: undefined,
                salePrice: undefined
              }
            }
          }
        ]
      )
    }

    /**
    * @Concentrates
    * 
    */

    if (req.body.types && req.body.types === 'Concentrates') {
      product = await Product.updateOne(
        { "_id": id },
        [
          {
            $unset: ['weedEndData']
          },
          {
            $set: {
              weedEndData: {
                sku: undefined,
                parentSku: undefined,
                brand: undefined,
                productName: undefined,
                producer: undefined,
                variants: false,
                thc: undefined,
                cbd: undefined,
                format: undefined,
                type: undefined,
                category: undefined,
                phenotype: undefined,
                quality: undefined,
                genetics: undefined,
                terpene1: undefined,
                terpene2: undefined,
                terpene3: undefined,
                organic: undefined,
                micro: undefined,
                effect: undefined,
                province: undefined,
                additionalInfo: undefined,
                salePrice: undefined
              }
            }
          }
        ]
      )
    }


    /**
    * @Beverages
    * 
    */

    if (req.body.types && req.body.types === 'Beverages') {
      product = await Product.updateOne(
        { "_id": id },
        [
          {
            $unset: ['weedEndData']
          },
          {
            $set: {
              weedEndData: {
                sku: undefined,
                parentSku: undefined,
                brand: undefined,
                productName: undefined,
                producer: undefined,
                variants: false,
                cbdMgTotal: undefined,
                thcMgTotal: undefined,
                format: undefined,
                type: undefined,
                category: undefined,
                phenotype: undefined,
                quality: undefined,
                genetics: undefined,
                terpene1: undefined,
                terpene2: undefined,
                terpene3: undefined,
                organic: undefined,
                effect: undefined,
                province: undefined,
                additionalInfo: undefined,
                salePrice: undefined
              }
            }
          }
        ]
      )
    }

    /**
     * @Edibles
     * 
     */

    if (req.body.types && req.body.types === 'Edibles') {
      product = await Product.updateOne(
        { "_id": id },
        [
          {
            $unset: ['weedEndData']
          },
          {
            $set: {
              weedEndData: {
                sku: undefined,
                parentSku: undefined,
                brand: undefined,
                productName: undefined,
                producer: undefined,
                variants: false,
                thcMgTotal: undefined,
                cbdMgTotal: undefined,
                format: undefined,
                type: undefined,
                category: undefined,
                phenotype: undefined,
                quality: undefined,
                genetics: undefined,
                terpene1: undefined,
                terpene2: undefined,
                terpene3: undefined,
                organic: undefined,
                vegan: undefined,
                glutenFree: undefined,
                effect: undefined,
                province: undefined,
                additionalInfo: undefined,
                salePrice: undefined
              }
            }
          }
        ]
      )
    }

    /**
     * @Oils
     * 
     */

    if (req.body.types && req.body.types === 'Oils') {
      product = await Product.updateOne(
        { "_id": id },
        [
          {
            $unset: ['weedEndData']
          },
          {
            $set: {
              weedEndData: {
                sku: undefined,
                parentSku: undefined,
                brand: undefined,
                productName: undefined,
                producer: undefined,
                variants: false,
                thcMg: undefined,
                cbdMg: undefined,
                format: undefined,
                type: undefined,
                category: undefined,
                phenotype: undefined,
                quality: undefined,
                genetics: undefined,
                terpene1: undefined,
                terpene2: undefined,
                terpene3: undefined,
                organic: undefined,
                micro: undefined,
                effect: undefined,
                province: undefined,
                additionalInfo: undefined,
                salePrice: undefined
              }
            }
          }
        ]
      )
    }

    /**
     * @Topicals
     * 
     */

    if (req.body.types && req.body.types === 'Topicals') {
      product = await Product.updateOne(
        { "_id": id },
        [
          {
            $unset: ['weedEndData']
          },
          {
            $set: {
              weedEndData: {
                sku: undefined,
                parentSku: undefined,
                brand: undefined,
                productName: undefined,
                producer: undefined,
                variants: false,
                thcMg: undefined,
                cbdMg: undefined,
                format: undefined,
                size: undefined,
                category: undefined,
                phenotype: undefined,
                quality: undefined,
                organic: undefined,
                effect: undefined,
                province: undefined,
                additionalInfo: undefined,
                salePrice: undefined
              }
            }
          }
        ]
      )
    }

    /**
    * @Seeds
    * 
    */

    if (req.body.types && req.body.types === 'Seeds') {
      product = await Product.updateOne(
        { "_id": id },
        [
          {
            $unset: ['weedEndData']
          },
          {
            $set: {
              weedEndData: {
                sku: undefined,
                parentSku: undefined,
                brand: undefined,
                productName: undefined,
                producer: undefined,
                variants: false,
                format: undefined,
                category: undefined,
                quality: undefined,
                genetics: undefined,
                phenotype: undefined,
                terpene1: undefined,
                terpene2: undefined,
                terpene3: undefined,
                organic: undefined,
                effect: undefined,
                province: undefined,
                additionalInfo: undefined,
                salePrice: undefined
              }
            }
          }
        ]
      )
    }


    /**
     * @Defaults
     * 
     */
    if (req.body.types && req.body.types === 'Defaults') {
      product = await Product.updateOne(
        { "_id": id },
        [
          {
            $unset: ['weedEndData']
          },

        ]
      )
    }

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

    if (removeObj.length > 0) {
      product = await Product.updateOne(
        { "_id": id },
        [
          {
            $set: req.body
          },
          { $unset: removeObj }
        ]
      )
    } else {
      product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    }

    product = await Product.findById(id)
    res.status(200).json({
      success: true,
      message: 'Products updated',
      data: product
    })
  } else {
    return next(new ErrorHandler('Invalid ID'), 404)
  }
})


/**
 * 
 * 
 * @producer upadte
 * 
 */
//update producers of producer /api/v1/product/producer/:id 
export const updateProducer = catchAsyncError(async (req, res, next) => {
  const id = req.params.id
  let product = await Product.findById(id)
  const { producerName } = req.body
  const producer = await Producer.findOne({ producerName })

  /**
   * @Flowers
   * 
   */
  if (product.types === 'Flowers') {
    product = await Product.updateOne(
      { "_id": id },
      [
        {
          $set: {
            weedEndData: {
              producerName,
              organic: producer.organic === true ? "yes" : "no",
              micro: producer.micro === true ? "yes" : "no",
              handTrimmed: producer.handTrimmed === true ? "yes" : "no",
              hangDried: producer.hangDried === true ? "yes" : "no",
              additionalInfo: producer.additionalInfo,
            }
          }
        }
      ]
    )
  }

  /**
   * @PreRolls
   * 
   */
  if (product.types === 'Pre-Rolls') {
    product = await Product.updateOne(
      { "_id": id },
      [
        {
          $set: {
            weedEndData: {
              producerName,
              organic: producer.organic === true ? "yes" : "no",
              micro: producer.micro === true ? "yes" : "no",
              handTrimmed: producer.handTrimmed === true ? "yes" : "no",
              hangDried: producer.hangDried === true ? "yes" : "no",
              additionalInfo: producer.additionalInfo,
            }
          }
        }
      ]
    )
  }

  /**
   * @Vapable
   * 
   */

  if (product.types === 'Vapable') {
    product = await Product.updateOne(
      { "_id": id },
      [
        {
          $set: {
            weedEndData: {
              producerName,
            }
          }
        }
      ]
    )
  }

  /**
  * @Concentrates
  * 
  */

  if (product.types === 'Concentrates') {
    product = await Product.updateOne(
      { "_id": id },
      [
        {
          $set: {
            weedEndData: {
              producerName,
              organic: producer.organic === true ? "yes" : "no",
              micro: producer.micro === true ? "yes" : "no",
              additionalInfo: producer.additionalInfo,
            }
          }
        }
      ]
    )
  }


  /**
  * @Beverages
  * 
  */

  if (product.types === 'Beverages') {
    product = await Product.updateOne(
      { "_id": id },
      [
        {
          $set: {
            weedEndData: {
              producerName,
              organic: producer.organic === true ? "yes" : "no",
              additionalInfo: producer.additionalInfo,
            }
          }
        }
      ]
    )
  }

  /**
   * @Edibles
   * 
   */

  if (product.types === 'Edibles') {
    product = await Product.updateOne(
      { "_id": id },
      [
        {
          $set: {
            weedEndData: {
              producerName,
              organic: producer.organic === true ? "yes" : "no",
              additionalInfo: producer.additionalInfo,

            }
          }
        }
      ]
    )
  }

  /**
   * @Oils
   * 
   */

  if (product.types === 'Oils') {
    product = await Product.updateOne(
      { "_id": id },
      [
        {
          $set: {
            weedEndData: {
              producerName,
              organic: producer.organic === true ? "yes" : "no",
              micro: producer.micro === true ? "yes" : "no",
              additionalInfo: producer.additionalInfo,
            }
          }
        }
      ]
    )
  }

  /**
   * @Topicals
   * 
   */

  if (product.types === 'Topicals') {
    product = await Product.updateOne(
      { "_id": id },
      [
        {
          $set: {
            weedEndData: {
              producerName,
              organic: producer.organic === true ? "yes" : "no",
              additionalInfo: producer.additionalInfo,
            }
          }
        }
      ]
    )
  }

  /**
  * @Seeds
  * 
  */

  if (product.types === 'Seeds') {
    product = await Product.updateOne(
      { "_id": id },
      [
        {
          $set: {
            weedEndData: {
              producerName,
              organic: producer.organic === true ? "yes" : "no",
              additionalInfo: producer.additionalInfo,
            }
          }
        }
      ]
    )
  }
  product = await Product.findById(id)
  res.status(200).json({
    success: true,
    message: 'Products producer updated',
    data: product
  })
}
)

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
import mongoose from 'mongoose';

const { Schema } = mongoose

const productSchema = new Schema({
  prdocutId: String,
  name: String,
  parentProductName: String,
  description: String,
  sku: String,
  barcode: String,
  imageUrl: String,
  price: Number,
  categoryId: String,
  categoryName: String,
  parentCategoryId: String,
  parentCategoryName: String,
  supplierId: String,
  supplierName: String,
  weight: String,
  cannabisWeight: Number,
  cannabisVolume: String,
  thc: String,
  cbd: String,
  metaData: {
    thc: String,
    unit: String
  },
  taxes: [
    {
      id: String,
      name: String,
      percent: Number,
      state: String,
      country: String,
      exemptOverride: Boolean
    }
  ],
  depositFee: String,
  salePrice: String,
  salePriceEndUtc: String,
  variants: Array,
  updated: {
    type: Boolean,
    default: false
  },
  productData: Schema.Types.Mixed
}, {
  timestamps: true
})



export default mongoose.model('Product', productSchema)
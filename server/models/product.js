import mongoose from 'mongoose';
import Double from '@mongoosejs/double'
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
  types: {
    type: String,
    enum: {
      values: ['Defaults', 'Flowers', 'Pre-Rolls', 'Vapable', 'Concentrates', 'Beverages', 'Edibles', 'Oils', 'Topicals', 'Seeds'],
      message: 'Please select correct types',
    },
    default: 'Defaults'
  },
  weedEndData: Schema.Types.Mixed,
  productData: Schema.Types.Mixed
}, {
  timestamps: true,
  strict: false
})



export default mongoose.model('Product', productSchema)
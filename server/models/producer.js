import mongoose from 'mongoose';

const { Schema } = mongoose

const producerSchema = new Schema({
  producerID: String,
  producerName: String,
  organic: {
    type: Boolean,
    default: false
  },
  micro: {
    type: Boolean,
    default: false
  },
  handTrimmed: {
    type: Boolean,
    default: false
  },
  hangDried: {
    type: Boolean,
    default: false
  },
  flowers: {
    type: Boolean,
    default: false
  },
  preRolls: {
    type: Boolean,
    default: false
  },
  edibles: {
    type: Boolean,
    default: false
  },
  beverages: {
    type: Boolean,
    default: false
  },
  softGels: {
    type: Boolean,
    default: false
  },
  oils: {
    type: Boolean,
    default: false
  },
  looseConcentrates: {
    type: Boolean,
    default: false
  },
  vapables: {
    type: Boolean,
    default: false
  },
  topicals: {
    type: Boolean,
    default: false
  },
  additionalInfo: String
}, {
  timestamps: true
})


export default mongoose.model('Producer', producerSchema)
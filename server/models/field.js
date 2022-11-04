import mongoose from 'mongoose';

const { Schema } = mongoose

const fieldSchema = new Schema({
  name: String,
  tables: [
    {
      id: Number,
      label: String,
      value: String
    }
  ]
})


export default mongoose.model('Field', fieldSchema)
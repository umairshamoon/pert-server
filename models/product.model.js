const { Schema, model } = require('mongoose')
const productSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String },
  price: { type: Number, min: 0 },
  discription: { type: String, required: true },
  picture: { type: String, required: true },
  postedBy: { type: Schema.Types.ObjectId, ref: 'user' },
})

module.exports = model('product', productSchema)

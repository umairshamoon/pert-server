const { Schema, model } = require('mongoose')
const cartSchema = new Schema({
  products: [
    {
      id: { type: Schema.Types.ObjectId, ref: 'product' },
      quantity: { type: Number },
    },
  ],
  userId: { type: Schema.Types.ObjectId, ref: 'user' },
})

module.exports = model('cart', cartSchema)

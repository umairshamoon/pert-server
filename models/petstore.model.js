const { Schema, model } = require('mongoose')

const foodSchema = new Schema({
  name: { type: String },
  food_type: { type: String },
  price: { type: Number, min: 1 },
  quantity: { type: Number, min: 1 },
  for_: { type: String },
})

const acessoriesSchema = new Schema({
  name: { type: String },
  acessory_type: { type: String },
  price: { type: Number, min: 1 },
  quantity: { type: Number, min: 1 },
  for_: { type: String },
})
const petStoreSchema = new Schema({
  name: { type: String },
  address: { type: String },
  contact: { type: String },
  services: [String],
  food: [foodSchema],
  acessorie: [acessoriesSchema],
})

module.exports = ('petstore', petStoreSchema)

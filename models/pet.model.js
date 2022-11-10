// const { Schema, model } = require('mongoose')

// const petSchema = new Schema({
//   name: { type: String, required: true },
//   pet_type: { type: String, required: true },
//   breed: { type: String },
//   age: { type: String, required: true },
//   disease: {
//     symptoms: [String],
//     disease_name: { type: String },
//     type_of: { type: String },
//   },
//   recommended_food: { type: String },
// })

// module.exports = model('pet', petSchema)

const { Schema, model } = require('mongoose')
const petSchema = new Schema({
  name: { type: String, required: true },
  breed: { type: String },
  age: { type: Number, min: 0, required: true },
  price: { type: Number, min: 0 },
  discription: { type: String, required: true },
  picture: { type: String, required: true },
  postedBy: { type: Schema.Types.ObjectId, ref: 'user' },
  gender: {
    type: String,
    enum: ['male', 'female'],
    default: 'male',
  },
  status: { type: Boolean, default: false },
})

module.exports = model('pet', petSchema)

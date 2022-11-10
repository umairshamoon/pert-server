const { Schema, model } = require('mongoose')

const vetSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  clinic_name: { type: String, required: true },
  phone_number: { type: String, required: true },
})
module.exports = model('vet', vetSchema)

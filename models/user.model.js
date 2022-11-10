const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  username: {
    type: String,
    minlength: 3,
    maxlength: 50,
    required: true,
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, minlength: 8, required: true },
  avatar: { type: String, default: null },
  phone_number: { type: String, length: 11 },
  address: { type: String, required: true },
  pets: {
    type: [Schema.Types.ObjectId],
    default: [],
    ref: 'pet',
  },
})

module.exports = model('user', userSchema)

const Joi = require('joi')
module.exports = function (data) {
  const schema = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    phone_number: Joi.string().length(11).required(),
    address: Joi.string().required(),
  })
  return schema.validate(data)
}

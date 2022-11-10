const Joi = require('joi')
module.exports = function (data) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    breed: Joi.string().required(),
    age: Joi.number().min(0).required(),
    price: Joi.number().min(0).required(),
    gender: Joi.string().valid('male', 'female').required(),
    discription: Joi.string().required(),
  })
  return schema.validate(data)
}

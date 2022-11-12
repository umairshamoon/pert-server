const Joi = require('joi')
module.exports = function (data) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    type: Joi.string().required(),
    price: Joi.number().min(0).required(),
    discription: Joi.string().required(),
    postedBy: Joi.string().required(),
  })
  return schema.validate(data)
}

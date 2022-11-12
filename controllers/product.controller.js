const Product = require('../models/product.model')
//validations
const validateProduct = require('../validations/product.validate')
//helpers
const joiHelper = require('../helpers/joi.helper')
const bufferConversion = require('../helpers/bufferConversion')
const cloudinary = require('../helpers/cloudinary')
module.exports = {
  add: async (req, res) => {
    try {
      if (joiHelper(validateProduct, req.body, res)?.statusCode)
        return
      console.log(req.file)
      if (!req?.file)
        return res
          .status(400)
          .json({ message: 'Please Upload Product Image' })
      const { secure_url } = await cloudinary(
        bufferConversion(
          req?.file?.originalname,
          req?.file?.buffer
        )
      )

      req.body.picture = secure_url
      await Product.create(req.body)
      res.status(201).json({ message: 'Product uploaded' })
    } catch (error) {
      res.status(400).json({ message: error })
    }
  },
  getAll: async (req, res) => {
    try {
      const products = await Product.find({}).populate({
        path: 'postedBy',
        select: '-password -_id',
      })
      if (!products.length)
        return res
          .status(404)
          .json({ message: 'No product available' })

      res.status(200).json({ products })
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  },
}

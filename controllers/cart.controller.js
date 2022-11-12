const Cart = require('../models/cart.model')
//validations
const validateProduct = require('../validations/product.validate')
//helpers
const joiHelper = require('../helpers/joi.helper')
const bufferConversion = require('../helpers/bufferConversion')
const cloudinary = require('../helpers/cloudinary')
module.exports = {
  add: async (req, res) => {
    try {
      await Cart.create({
        products: req.body.products.products,
        userId: req.body.userId,
      })
      res.status(201).json({ message: 'add to cart' })
    } catch (error) {
      res.status(400).json({ message: error })
    }
  },
  getMyCarts: async (req, res) => {
    try {
      const { userId } = req.query
      const carts = await Cart.find({ userId })
        .populate({
          path: 'userId',
          select: '-password -_id',
        })
        .populate({ path: 'products.id', select: '-_id' })

      if (!carts.length)
        return res.status(404).json({ message: 'no cart' })
      res.status(200).json(carts)
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  },
}

//npm
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
//config
const { JWT_SECRET } = require('../config')
//models
const User = require('../models/user.model')
const Pet = require('../models/pet.model')
//validatoins
const validateLogin = require('../validations/login.validation')
const validateUser = require('../validations/userRegister.validate')
const validatePet = require('../validations/pet.validate')
//helpers
const joiHelper = require('../helpers/joi.helper')
const jwtSign = require('../helpers/jwtSign.helper')
const bufferConversion = require('../helpers/bufferConversion')
const cloudinary = require('../helpers/cloudinary')

module.exports = {
  login: async (req, res) => {
    try {
      const { password, email } = req.body
      if (joiHelper(validateLogin, req.body, res)?.statusCode)
        return

      const user = await User.findOne({ email })

      if (!user)
        return res.status(404).json({ message: 'Sign up first' })

      if (!(await bcrypt.compare(password, user.password)))
        return res
          .status(400)
          .json({ message: 'Incorrect Password' })
      const token = jwtSign({ id: user._id })

      res.status(200).json({
        message: 'Login successfully',
        info: {
          username: user.username,
          avatar: user.avatar,
        },
        token,
      })
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  },

  register: async (req, res) => {
    try {
      const { password, email } = req.body

      if (joiHelper(validateUser, req.body, res)?.statusCode)
        return

      if (!req?.file)
        return res
          .status(400)
          .json({ message: 'Please Select Profile Image' })

      const user = await User.findOne({ email })
      if (user)
        return res.status(400).json({
          message: 'Email already exist',
        })

      const { secure_url } = await cloudinary(
        bufferConversion(req.file.originalname, req.file.buffer)
      )
      req.body.avatar = secure_url
      req.body.password = await bcrypt.hash(password, 10)
      await User.create(req.body)
      res.status(201).json({
        message: 'Your Account has been created',
      })
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  },
  sellPet: async (req, res) => {
    try {
      if (joiHelper(validatePet, req.body, res)?.statusCode)
        return
      // const { id } = jwt.verify(req.query.token, JWT_SECRET)

      if (!req?.file)
        return res
          .status(400)
          .json({ message: 'Please Upload Pet Image' })

      const { secure_url } = await cloudinary(
        bufferConversion(
          req?.file?.originalname,
          req?.file?.buffer
        )
      )
      req.body.picture = secure_url
      req.body.postedBy = req.user.id

      await Pet.create(req.body)
      res.status(201).json({ message: 'Pet added successfully' })
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  },
}

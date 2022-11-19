//npm
const bcrypt = require('bcryptjs')
//models
const Admin = require('../models/admin.model')
//validatoins
const validateLogin = require('../validations/login.validation')
const validateAdmin = require('../validations/adminRegister.validate')
//helpers
const joiHelper = require('../helpers/joi.helper')
const jwtSign = require('../helpers/jwtSign.helper')

module.exports = {
  login: async (req, res) => {
    try {
      const { password, email } = req.body

      joiHelper(validateLogin, req.body)
      const admin = await Admin.findOne({ email })

      if (!admin.isAdmin)
        return res
          .status(403)
          .json({ message: 'your request is under process' })

      if (!(await bcrypt.compare(password, admin.password)))
        return res
          .status(400)
          .json({ message: 'Incorrect Password' })

      res.status(200).json({
        message: 'Login successfully',
        token: jwtSign({ id: admin.id, isAdmin: true }),
      })
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  },

  register: async (req, res) => {
    try {
      const { password, username, email } = req.body

      const admin = await Admin.findOne({ email })
      if (admin) {
        return res.status(400).json({
          message: 'Email already exist',
        })
      }

      //VALIDATE REQUEST BODY

      joiHelper(validateAdmin, { password, username, email })

      await Admin.create({
        username,
        email,
        password: await bcrypt.hash(password, 10),
      })
      res.status(200).json({
        message: 'Your request has been sent for approval',
      })
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Something went Wrong',
      })
    }
  },
}

const express = require('express')
const router = express.Router()
const user = require('../controllers/user.controller')
//middlewares
const upload = require('../middleware/multer.middleware')
const { isLogin } = '../middleware'
router.post('/login', user.login)
router.post('/register', upload.single('profile'), user.register)
router.post(
  '/sell/pet',
  isLogin,
  upload.single('pet'),
  user.sellPet
)

module.exports = router

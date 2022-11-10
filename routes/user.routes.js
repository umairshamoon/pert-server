const express = require('express')
const router = express.Router()
const user = require('../controllers/user.controller')
//middlewares
const upload = require('../middleware/multer.middleware')

router.post('/login', user.login)
router.post('/register', upload.single('profile'), user.register)
router.post('/sell/pet', upload.single('pet'), user.sellPet)

module.exports = router

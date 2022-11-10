const express = require('express')
const router = express.Router()
const pet = require('../controllers/pet.controller')

//middlewares
const upload = require('../middleware/multer.middleware')

router.get('/fetch/pets', pet.getPets)

module.exports = router

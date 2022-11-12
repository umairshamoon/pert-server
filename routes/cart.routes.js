const express = require('express')
const router = express.Router()
const cart = require('../controllers/cart.controller')

router.post('/add', cart.add)
router.get('/get/all', cart.getMyCarts)
module.exports = router

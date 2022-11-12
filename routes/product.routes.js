const express = require('express')
const router = express.Router()
const product = require('../controllers/product.controller')

//middlewares
const upload = require('../middleware/multer.middleware')

router.post('/add', upload.single('product'), product.add)
router.get('/get/all', product.getAll)
module.exports = router

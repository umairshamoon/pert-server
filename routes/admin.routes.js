const express = require('express')
const router = express.Router()
const admin = require('../controllers/admin.controller')

const { isLogin, isAdmin } = require('../middleware')

router.post('/login', admin.login)
router.post('/register', admin.register)

module.exports = router

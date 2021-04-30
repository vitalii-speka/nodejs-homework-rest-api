const express = require('express')
const router = express.Router()

const userController = require('../../controllers/users')
const guard = require('../../helper/guard')

router.post('/register', userController.regist)
router.post('/login', userController.login)
router.post('/logout', guard, userController.logout)

module.exports = router

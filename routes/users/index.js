const express = require('express')
const router = express.Router()

const uderController = require('../../controllers/users')

router.post('/register', uderController.regist)
router.post('/login', uderController.login)
router.post('/logout', uderController.logout)

module.exports = router

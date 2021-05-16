const express = require('express')
const router = express.Router()

const rateLimit = require('express-rate-limit')
const userController = require('../../controllers/users')
const guard = require('../../helper/guard')
const { HttpCode } = require('../../helper/constants')
const uploadAvatar = require('../../helper/upload-avatars')
const { validationUpdateSub, validationUserVerify } = require('../../helper/validation')

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 5, // start blocking after 5 requests
  handler: (req, res, next) => {
    return res.status(HttpCode.MANY_REQUEST).json({
      status: 'error',
      code: HttpCode.MANY_REQUEST,
      message: 'Too many requests',
    })
  },
})

router.post('/register', limiter, userController.regist)
router.post('/login', userController.login)
router.post('/logout', guard, userController.logout)
router.get('/current', guard, userController.current)
router.patch('/', guard, validationUpdateSub, userController.updateSub)
router.patch('/avatars', guard, uploadAvatar.single('avatar'), userController.updateAvatar)
router.get('/verify/:token', userController.verify)
router.post('/verify', validationUserVerify, userController.repeatEmailVerify)

module.exports = router

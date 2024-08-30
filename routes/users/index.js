const express = require('express')
const router = express.Router()

const rateLimit = require('express-rate-limit')
const userController = require('../../controllers/users')
const guard = require('../../helpers/guard')
const { HttpCode } = require('../../helpers/constants')
const uploadAvatar = require('../../helpers/upload-avatars')
const { validationUpdateSub, validationUserVerify, validationRegistUser } = require('../../helpers/validation')
const authenticate = require('../../middelwares/authenticate')

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

router.post('/register', validationRegistUser, limiter, userController.regist)
router.post('/login', validationRegistUser, userController.login)
router.post('/logout', guard, userController.logout)
router.get('/current', guard, userController.current)
router.patch('/', guard, validationUpdateSub, userController.updateSub)
router.patch('/avatars', guard, uploadAvatar.single('avatar'), userController.updateAvatar)
router.get('/verify/:token', userController.verify)
router.post('/verify', validationUserVerify, userController.repeatEmailVerify)

module.exports = router

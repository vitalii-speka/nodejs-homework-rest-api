const { HttpCode } = require('../helper/constants')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
const { findByEmail, crateUser, updateToken } = require('../model/users')

const regist = async (req, res, next) => {
  const { email } = req.body
  const user = await findByEmail(email)
  if (user) {
    return res.status(HttpCode.CONFLICT).json({
      status: 'error register',
      code: HttpCode.CONFLICT,
      message: 'Email is alredy use',
    })
  }
  try {
    const newUser = await crateUser(req.body)
    return res.status(HttpCode.CREATED).json({
      status: 'success register',
      code: HttpCode.CREATED,
      data: {
        id: newUser.id,
        email: newUser.email,
        subscription: newUser.subscription,
      },
    })
  } catch (e) {
    next(e)
  }
}

const login = async (req, res, next) => {
  const { email, password } = req.body
  const user = await findByEmail(email)
  const isValidPassword = await user?.validPassword(password)
  if (!user || !isValidPassword) {
    return res.status(HttpCode.UNAUTHORIZED).json({
      status: 'error login',
      code: HttpCode.UNAUTHORIZED,
      message: 'Invalid credentials',
    })
  }
  const payload = { id: user.id }
  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '5h' })
  await updateToken(user.id, token)
  return res.status(HttpCode.OK).json({
    status: 'success login',
    code: HttpCode.OK,
    data: {
      token: token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    },
  })
}

const logout = async (req, res, next) => {
  const id = req.user.id
  await updateToken(id, null)
  return res.status(HttpCode.NO_CONTENT).json({})
}

const updateAvatar = async (req, res, next) => {}

module.exports = {
  regist,
  login,
  logout,
  updateAvatar,
}

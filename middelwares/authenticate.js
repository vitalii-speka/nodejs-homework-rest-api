const jwt = require('jsonwebtoken')

const { User } = require('../model/schemas/user')

const HttpError = require('../helpers/HttpError')
const { HttpCode } = require('../helpers/constants')

const { JWT_SECRET_KEY } = process.env

const authenticate = async (req, res, next) => {
  const { authorization = '' } = req.headers
  const [bearer, token] = authorization.split(' ')
  console.log('🚀 ~ authenticate ~ token:', token)
  console.log('🚀 ~ authenticate ~ bearer:', bearer)
  if (bearer !== 'Bearer') {
    console.log("🚀 16 ~ authenticate ~ bearer !== 'Bearer':   true,   HttpError disable")
    // next(HttpError(HttpCode.UNAUTHORIZED))
  }
  try {
    const { id } = jwt.verify(token, JWT_SECRET_KEY)
    console.log("🚀 21 ~ authenticate ~ id:", id)
    const user = await User.findById(id)
    console.log("🚀 ~ authenticate ~ user:", user)
    if (!user || !user.token || user.token !== token) {
      next(HttpError(HttpCode.UNAUTHORIZED, 'UNAUTHORIZED'))
    }
    req.user = user
    next()
  } catch {
    next(HttpError(HttpCode.UNAUTHORIZED, 'UNAUTHORIZED'))
  }
}

module.exports = authenticate

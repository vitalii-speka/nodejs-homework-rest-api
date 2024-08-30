const { HttpCode } = require('./constants')

const subscription = sub => (req, res, next) => {
  const subscriptionUser = req.user.subscription
  if (subscriptionUser !== sub) {
    return res.status(HttpCode.FORBIDDEN).json({
      status: 'error',
      code: HttpCode.FORBIDDEN,
      message: 'Access is denied',
    })
  }
  return next()
}

module.exports = subscription

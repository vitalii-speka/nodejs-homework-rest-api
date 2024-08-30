const passport = require('passport')
const { HttpCode } = require('./constants')
require('../config/passport')

const guard = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    console.log('🚀 7 ~ passport.authenticate ~ user:', user)
    let token = null
    console.log('🚀  9~ passport.authenticate ~ token:', token)

    if (req.body.token) {
      console.log(' 12 🚀 ~ passport.authenticate ~ req.body.token:', req.body.token)

      token = req.body.token
    }
    console.log('🚀  16~ passport.authenticate ~ token:', token)

    if (req.get('Authorization')) {
      console.log("🚀 19 ~ passport.authenticate ~ req.get('Authorization'):", req.get('Authorization'))

      token = req.get('Authorization').split(' ')[1]
    }
    console.log('🚀  23~ passport.authenticate ~ token:', token)

    if (!user || err || token !== user.token) {
      console.log('🚀 ~ passport.authenticate ~ token:', token)
      console.log('🚀 ~ passport.authenticate ~ err:', err)
      console.log('🚀 ~ passport.authenticate ~ !user:', !user)

      return res.status(HttpCode.UNAUTHORIZED).json({
        status: 'error guard',
        code: HttpCode.UNAUTHORIZED,
        message: 'Not authorized',
      })
    }
    console.log('🚀 36 ~ passport.authenticate ~ req.user:', req.user)
    req.user = user // true === req.locals.user = user
    return next()
  })(req, res, next)
}

module.exports = guard

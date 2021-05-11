const passport = require('passport')
const { HttpCode } = require('./constants')
require('../config/passport')

const guard = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    let token = null
    console.log('guard user -- ', user)

    if (req.get('Authorization')) {
      token = req.get('Authorization').split(' ')[1]
    }
    if (!user || err || token !== user.token) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: 'error guard',
        code: HttpCode.UNAUTHORIZED,
        message: 'Not authorized',
      })
    }
    req.user = user // true === req.locals.user = user
    return next()
  })(req, res, next)
}

module.exports = guard

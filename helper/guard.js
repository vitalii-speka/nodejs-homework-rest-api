const passport = require('passport')
const { HttpCode } = require('./constants')
require('../config/passport')

const guard = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    let token = null
    if (req.get('Authorization')) {
      token = req.get('Authorization').split(' ')[1]
    }
    console.log('token', token)
    console.log('user.token', user.token)
    console.log('user', user)
    if (!user || err || token !== user.token) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: 'error guard',
        code: HttpCode.UNAUTHORIZED,
        message: 'Unauthorized',
      })
    }
    req.user = user // true === req.locals.user = user
    return next()
  })(req, res, next)
}

// const guard = (req, res, next) => {
//   passport.authenticate('jwt', { session: false }, (err, user) => {
//     const header = req.get('Authorization')
//     if (!header) {
//       return next({
//         status: HttpCode.UNAUTHORIZED,
//         message: 'Not authorized',
//       })
//     }
//     const [, token] = header.split(' ')
//     if (!user || err || token !== user.token) {
//       return next({
//         status: HttpCode.UNAUTHORIZED,
//         message: 'Not authorized',
//       })
//     }
//     req.user = user
//     return next()
//   })(req, res, next)
// }

module.exports = guard

const passport = require('passport'),
  GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const { Strategy, ExtractJwt } = require('passport-jwt')
const Users = require('../model/users')

require('dotenv').config()
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET_KEY,
}

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID, //YOUR GOOGLE_CLIENT_ID
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, //YOUR GOOGLE_CLIENT_SECRET
      // callbackURL: `${process.env.BASE_URL}/api/users/google-redirect`, //'http://www.yourdomain.com/auth/google/callback'
      callbackURL: 'http://localhost:8000/api/users/google-redirect', //'http://www.yourdomain.com/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return cb(err, user)
      })
      return done(null, profile)
    },
  ),
)

passport.use(
  new Strategy(opts, async (payload, done) => {
    try {
      const user = await Users.findById(payload.id)

      if (!user) {
        return done(new Error('User not found'), false)
      }
      if (!user.token) {
        return done(null, false)
      }
      return done(null, user)
    } catch (error) {
      return done(error, false)
    }
  }),
)

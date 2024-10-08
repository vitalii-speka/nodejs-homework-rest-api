/*
const axios = require('axios')
// import queryString from 'query-string'
// const queryString = require('query-string')
// const querystring = require('node:querystring')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')

const { User } = require('../../model/schemas/user')

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

const googleAuth = async (req, res) => {
  const stringifiedParams = queryString.stringify({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: `${process.env.BASE_URL}/api/users/google-redirect`,
    scope: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'].join(
      ' ',
    ),
    response_type: 'code',
    access_type: 'offline',
    prompt: 'consent',
  })
  return res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`)
}

const googleRedirect = async (req, res) => {
  const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`
  const urlObj = new URL(fullUrl)
  const urlParams = queryString.parse(urlObj.search)
  const code = urlParams.code

  const tokenData = await axios({
    url: 'https://oauth2.googleapis.com/token',
    method: 'post',
    data: {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${process.env.BASE_URL}/api/users/google-redirect`,
      grant_type: 'authorization_code',
      code,
    },
  })
  const userData = await axios({
    url: 'https://www.googleapis.com/oauth2/v2/userinfo',
    method: 'get',
    headers: {
      Authorization: `Bearer ${tokenData.data.access_token}`,
    },
  })

  const { email, name, picture, id } = userData.data

  const user = await User.findOne({ email })

  if (!user) {
    const password = id
    const hashPassword = bcryptjs.hashSync(password, bcryptjs.genSaltSync(10))
    const newUser = await User.create({
      name: name,
      email,
      password: hashPassword,
      avatar: picture,
    })
    const { _id } = newUser
    const payload = {
      _id,
    }
    const token = jwt.sign(payload, JWT_SECRET_KEY)
    await User.findByIdAndUpdate(_id, { token })
    const userToken = await User.findOne({ token })
    return res.redirect(`${process.env.FRONTEND_URL}/google-redirect?newUser=true&token=${userToken.token}`)
  }

  const { _id } = user
  const payload = { _id }
  const token = jwt.sign(payload, JWT_SECRET_KEY)
  await User.findByIdAndUpdate(_id, { token })
  const userToken = await User.findOne({ token })
  res.redirect(`${process.env.FRONTEND_URL}/google-redirect?newUser=false&token=${userToken.token}`)
}

module.exports = { googleAuth, googleRedirect }

*/
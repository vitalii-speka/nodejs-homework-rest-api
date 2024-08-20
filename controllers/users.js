const jwt = require('jsonwebtoken')
const jimp = require('jimp')
const fs = require('fs/promises')
const path = require('path')
require('dotenv').config()

const { HttpCode } = require('../helper/constants')
const EmailService = require('../services/email')
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
const {
  findById,
  findByEmail,
  updateVerifyToken,
  findByVerifyTokenEmail,
  crateUser,
  updateToken,
  updateSubUser,
  updateAvatarUser,
} = require('../model/users')

const regist = async (req, res, next) => {
  const user = await findByEmail(req.body.email)
  if (user) {
    return res.status(HttpCode.CONFLICT).json({
      status: 'error register',
      code: HttpCode.CONFLICT,
      message: 'Email is alredy use',
    })
  }
  try {
    const newUser = await crateUser(req.body)
    const { id, name, email, subscription, avatar, verifyTokenEmail } = newUser
    /* turn off EmailService
     try {
      const emailService = new EmailService(process.env.NODE_ENV)
      await emailService.sendVerifyEmail(verifyTokenEmail, email, name)
    } catch (e) {
      console.log(e.message)
    }
    */

    return res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      data: {
        id,
        email,
        subscription,
        avatar,
      },
    })
  } catch (e) {
    next(e)
  }
}

const login = async (req, res, next) => {
  const { email, password } = req.body
  console.log('🚀 ~ email:', email)
  const user = await findByEmail(email)
  console.log('🚀 ~ user:', user)

  const isValidPassword = await user?.validPassword(password)
  console.log('🚀 ~ isValidPassword:', isValidPassword)

  // if (!user || !isValidPassword || !user.verify) {
  if (!user) {
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

const updateAvatar = async (req, res, next) => {
  const { id } = req.user
  const avatarURL = await saveAvatarUser(req)
  await updateAvatarUser(id, avatarURL)
  return res.status(HttpCode.OK).json({ status: 'success', code: HttpCode.OK, data: { avatarURL } })
}

const saveAvatarUser = async (req, res, next) => {
  const FOLDER_AVATARS = process.env.FOLDER_AVATARS
  // req.file
  const pathFile = req.file.path
  const newNameAvatar = `${Date.now().toString()}-${req.file.originalname}`
  const img = await jimp.read(pathFile)
  await img
    .autocrop()
    .cover(250, 250, jimp.HORIZONTAL_ALIGN_CENTER | jimp.VERTICAL_ALIGN_MIDDLE)
    .writeAsync(pathFile)

  try {
    await fs.rename(pathFile, path.join(process.cwd(), 'public', FOLDER_AVATARS, newNameAvatar))
  } catch (e) {
    console.log(e.message)
  }

  // not runing to Heroku
  const oldAvatar = req.user.avatar
  if (oldAvatar.includes(`${FOLDER_AVATARS}/`)) {
    await fs.unlink(path.join(process.cwd(), 'public', oldAvatar))
  }
  return path.join(FOLDER_AVATARS, newNameAvatar).replace('\\', '/')
}

const current = async (req, res, next) => {
  const { email, subscription } = req.user
  return res.status(HttpCode.OK).json({
    status: 'success',
    code: HttpCode.OK,
    data: { email, subscription },
  })
}

const updateSub = async (req, res, next) => {
  try {
    const id = req.user.id
    await updateSubUser(id, req.body.subscription)
    const user = await findById(id)
    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        email: user.email,
        subscription: user.subscription,
        avatarURL: user.avatar,
      },
    })
  } catch (error) {
    next(error)
  }
}

const verify = async (req, res, next) => {
  try {
    const user = await findByVerifyTokenEmail(req.params.token)

    if (user) {
      await updateVerifyToken(user.id, true, null)
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          message: 'Verification successful',
        },
      })
    }
    return res.status(HttpCode.BAD_REQUEST).json({
      status: 'error',
      code: HttpCode.BAD_REQUEST,
      message: 'Invalid token. Contact to administation',
    })
  } catch (error) {
    next(error)
  }
}

const repeatEmailVerify = async (req, res, next) => {
  try {
    const user = await findByEmail(req.body.email)
    if (user) {
      const { name, email, verifyTokenEmail } = user
      /*  turn off EmailService
      const emailService = new EmailService(process.env.NODE_ENV)
      await emailService.sendVerifyEmail(verifyTokenEmail, email, name)
      */

      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          message: 'Verification email resubmitted',
        },
      })
    }
    return res.status(HttpCode.NOT_FOUND).json({
      status: 'error',
      code: HttpCode.NOT_FOUND,
      message: 'User not found',
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  regist,
  login,
  logout,
  updateAvatar,
  current,
  updateSub,
  verify,
  repeatEmailVerify,
}

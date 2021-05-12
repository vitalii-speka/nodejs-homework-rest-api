const { User, users } = require('./data')
const bcrypt = require('bcryptjs')
const SALT_WORK_FACTOR = 10

const findById = jest.fn(id => {
  const [user] = users.filter(el => String(el._id) === String(id))
  return user
})

const findByEmail = jest.fn(email => {
  const [user] = users.filter(el => String(el.email) === String(email))
  return user
})
const crateUser = jest.fn((name = 'Guest', email, password, subscrioption = 'pro') => {
  pass = bcrypt.hashSync(password, bcrypt.genSaltSync(SALT_WORK_FACTOR), null)
  const newUser = {
    name,
    email,
    password: pass,
    subscrioption,
    _id: '608c5af873254e09909266d5',
    id: '608c5af873254e09909266d5',
    validPassword: function (pass) {
      return bcrypt.compareSync(pass, this.password)
    },
  }
  users.push(newUser)
  return newUser
})

const updateToken = jest.fn((id, token) => {
  const [user] = users.filter(el => String(el._id) === String(id))
  if (user) {
    user.token = token
  }
  return {}
})

const updateSubUser = jest.fn((id, subscription) => {
  const [user] = users.filter(el => String(el._id) === String(id))
  if (user) {
    user.subscription = subscription
  }
  return user
})

const updateAvatarUser = jest.fn((id, avatar, idCloudAvatar = null) => {
  const [user] = users.filter(el => String(el._id) === String(id))
  if (user) {
    user.avatar = avatar
  }
  return user.avatar
})

module.exports = {
  findById,
  findByEmail,
  crateUser,
  updateToken,
  updateSubUser,
  updateAvatarUser,
}

/*
const { User, users } = require('./data')
const bcrypt = require('bcryptjs')
const SALT_WORK_FACTOR = 10

const findById = jest.fn(id => {
  const [user] = users.filter(el => String(el._id) === String(id))
  return user
})

const findByEmail = jest.fn(email => {
  const [user] = users.filter(el => String(el.email) === String(email))
  return user
})

const create = jest.fn(({ email, password }) => {
  pass = bcrypt.hashSync(password, bcrypt.genSaltSync(SALT_WORK_FACTOR), null)
  const newUser = {
    email,
    password: pass,
    _id: '608c5af873254e09909266d5',
    id: '608c5af873254e09909266d5',
    validPassword: function (pass) {
      return bcrypt.compareSync(pass, this.password)
    },
  }
  users.push(newUser)
  return newUser
})

const updateToken = jest.fn((id, token) => {
  return {}
})

const updateAvatar = jest.fn((id, avatar, idCloudAvatar = null) => {
  const [user] = users.filter(el => String(el._id) === String(id))
  user.avatarURL = avatar
  user.idCloudAvatar = idCloudAvatar
  return user
})

module.exports = {
  findById,
  findByEmail,
  create,
  updateToken,
  updateAvatar,
}

*/

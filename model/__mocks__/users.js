const { users } = require('./data')
const bcrypt = require('bcryptjs')
const SALT_WORK_FACTOR = 20

const findById = jest.fn(id => {
  const [user] = users.filter(el => String(el._id) === String(id))
  return user
})

const findByEmail = jest.fn(email => {
  const [user] = users.filter(el => String(el.email) === String(email))
  return user
})

/* dont work.. 
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
    avatar: 'avatars/ava.jpg',
  }
  users.push(newUser)
  console.log('🚀 ~ file: users.js ~ line 17 ~ crateUser ~ newUser', users)
  return newUser
})
*/

const crateUser = jest.fn(({ email, password }) => {
  const pass = bcrypt.hashSync(password, bcrypt.genSaltSync(8))
  const newUser = {
    email,
    password: pass,
    _id: '604780b0a33f593b5866d7ad',
    validPassword: function (pass) {
      return bcrypt.compareSync(pass, this.password)
    },
    verify: true,
    verifyTokenEmail: null,
  }
  users.push(newUser)
  return newUser
})

const updateToken = jest.fn((id, token) => {
  const [user] = users.filter(el => String(el._id) === String(id))
  if (user) {
    user.token = token
  }
  return user
})

const findByVerifyTokenEmail = jest.fn(token => {
  const [user] = users.filter(el => String(el.email) === String(email))
  if (user) {
    user.token = token
  }
  return user
})

const updateVerifyToken = jest.fn((id, verify, verifyToken = null) => {
  const [user] = users.filter(el => String(el._id) === String(id))
  if (user) {
    user.verify = verify
  }
  return user
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
  updateVerifyToken,
  findByVerifyTokenEmail,
}

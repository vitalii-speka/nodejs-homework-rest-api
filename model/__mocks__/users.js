const { User, Users } = require('./data')

const findById = jest.fn(id => {
  console.log('__mocks__  user id -- ', id)
  const [user] = users.filter(el => String(el._id) === String(id))
  return user
})

const findByEmail = jest.fn(email => {
  const [user] = users.filter(el => String(el.email) === String(email))
  return user
})
const crateUser = jest.fn(userOptions => {
  return {}
})

const updateToken = jest.fn((id, token) => {
  return {}
})

const updateSubUser = jest.fn((id, subscription) => {
  return {}
})

const updateAvatarUser = jest.fn((id, avatar, idCloudAvatar = null) => {
  return {}
})

module.exports = {
  findById,
  findByEmail,
  crateUser,
  updateToken,
  updateSubUser,
  updateAvatarUser,
}

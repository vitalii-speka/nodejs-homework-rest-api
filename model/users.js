const User = require('./schemas/user')

const findById = async id => {
  return await User.findOne({ _id: id })
}
const findByEmail = async email => {
  return await User.findOne({ email })
}
const findByVerifyTokenEmail = async token => {
  return await User.findOne({ verifyTokenEmail: token })
}

const crateUser = async userOptions => {
  const user = new User(userOptions)
  return await user.save()
}

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token })
}
const updateSubUser = async (id, subscription) => {
  return await User.updateOne({ _id: id }, { subscription })
}

const updateAvatarUser = async (id, avatar, idCloudAvatar = null) => {
  return await User.updateOne({ _id: id }, { avatar, idCloudAvatar })
}

const updateVerifyToken = async (id, verify, verifyToken) => {
  return await User.updateOne({ _id: id }, { verify, verifyTokenEmail: verifyToken })
}

module.exports = {
  findById,
  findByEmail,
  findByVerifyTokenEmail,
  crateUser,
  updateToken,
  updateSubUser,
  updateAvatarUser,
  updateVerifyToken,
}

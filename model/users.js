const User = require('./schemas/user')

const findById = async id => {
  return await User.findOne({ _id: id })
}
const findByEmail = async email => {
  return await User.findOne({ email })
}
const crateUser = async userOptions => {
  const user = new User(userOptions)
  return await user.save()
}

const updatetoken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token })
}

module.exports = {
  findById,
  findByEmail,
  crateUser,
  updatetoken,
}

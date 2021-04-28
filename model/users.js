const User = require('./schemas/users')

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

module.exports = {
  findById,
  findByEmail,
  crateUser,
}

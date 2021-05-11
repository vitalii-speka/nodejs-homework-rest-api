const { contacts } = require('./data')

const getAll = jest.fn((userId, query) => {
  const { sortBy, sortByDesc, filter, favorite = null, limit = '5', offset = '0' } = query
  return { total: contacts.length, contacts, limit, offset }
})

const getContactById = jest.fn((userId, id) => {
  const [contact] = contacts.filter(el => String(el._id) === String(id))
  return contact
})

const removeContact = jest.fn((userId, id) => {
  const index = contacts.findIndex(el => String(el._id) === String(id))
  if (index === -1) {
    return null
  }
  const [contact] = contacts.splice(index, 1)
  return contact
})

const addContact = jest.fn(body => {
  contacts.push({ ...body, _id: '608fcbb04c57cd00ec4857c4' })
  return { ...body, _id: '608fcbb04c57cd00ec4857c4' }
})

const updateContact = jest.fn((userId, id, body) => {
  let [contact] = contacts.filter(el => String(el._id) === String(id))
  if (contact) {
    contact = { ...contact, ...body }
  }
  return contact
})

const updateStatusContact = jest.fn((userId, id, body) => {
  let [contact] = contacts.filter(el => String(el._id) === String(id))
  if (contact) {
    contact = { ...contact, ...body }
  }
  return contact
})

module.exports = {
  getAll,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
}

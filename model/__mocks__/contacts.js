const { contacts } = require('./data')

const getAll = jest.fn((userId, query) => {
  const { limit = 5, offset = 0 } = query
  return { contacts, total: contacts.length, limit, offset }
})

const getContactById = jest.fn((userId, _id) => {
  const [contact] = contacts.filter(el => String(el._id) === String(_id))
  return contact
})

const removeContact = jest.fn((userId, _id) => {
  const index = contacts.findIndex(el => String(el._id) === String(_id))
  if (index === -1) {
    return null
  }
  const [contact] = contacts.splice(index, 1)
  return contact
})

const addContact = jest.fn(body => {
  contacts.push({ ...body, _id: '5f8382425ba83a4f1829ca5c' })
  return { ...body, _id: '5f8382425ba83a4f1829ca5c' }
})

const updateContact = jest.fn((userId, id, body) => {
  let [contact] = contacts.filter(el => String(el._id) === String(id))
  if (contact) {
    contact = { ...contact, ...body }
  }
})

const updateStatusContact = jest.fn((userId, id, body) => {
  let [contact] = contacts.filter(el => String(el._id) === String(id))
  if (contact) {
    contact = { ...contact, ...body }
  }
})

module.exports = {
  getAll,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
}

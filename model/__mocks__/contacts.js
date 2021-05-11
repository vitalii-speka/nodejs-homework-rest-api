const { contacts } = require('./data')

const getAll = jest.fn((userId, query) => {
  const { sortBy, sortByDesc, filter, favorite = null, limit = '5', offset = '0' } = query
  return { total: contacts.length, contacts, limit, offset }
})

const getContactById = jest.fn((userId, id) => {
  const [contact] = contacts.filter(el => String(el._id) === String(id))
  return contact
})

const removeContact = jest.fn((userId, _id) => {
  const index = contacts.findIndex(el => String(el._id) === String(id))
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

/*



const { contacts } = require('./data')

const listContacts = jest.fn((userId, query) => {
  const { limit = 5, offset = 0 } = query
  return { contacts, total: contacts.length, limit, offset }
})

const getById = jest.fn((userId, id) => {
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

const create = jest.fn((userId, body) => {
  contacts.push({ ...body, _id: '5f8382425ba83a4f1829ca5d' })
  return { ...body, _id: '5f8382425ba83a4f1829ca5d' }
})

const updateContact = jest.fn((userId, id, body) => {
  let [contact] = contacts.filter(el => String(el._id) === String(id))
  if (contact) {
    contact = { ...contact, ...body }
  }
  return contact
})

module.exports = {
  listContacts,
  getById,
  removeContact,
  create,
  updateContact,
}
*/

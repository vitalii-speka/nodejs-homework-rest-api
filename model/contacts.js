const fs = require('fs/promises')
const path = require('path')
// const contacts = require('./contacts.json')
const shortid = require('shortid')

const contactsPath = path.join(__dirname, 'contacts.json')

const listContacts = async () => {
  const data = await fs.readFile(contactsPath)
  return JSON.parse(data.toString())
}

const getContactById = async contactId => {
  const contacts = await listContacts()
  const contact = contacts.find(({ id }) => id.toString() === contactId)
  return contact
}

const removeContact = async contactId => {
  const contacts = await listContacts()
  const contact = contacts.find(({ id }) => id.toString() === contactId)
  console.log(contact)
  if (!contact) return

  const newContacts = contacts.filter(({ id }) => id.toString() !== contactId)

  await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2), 'utf-8')

  return contact
}

const addContact = async body => {
  const data = await fs.readFile(contactsPath)
  const contacts = JSON.parse(data.toString())

  const newContact = { id: shortid.generate(), ...body }
  contacts.push(newContact)

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, '\t'))
  return newContact
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts()
  console.log('1 body', body)

  const updateContacts = contacts.map(contact => {
    if (contact.id === contactId) {
      return { ...contact, ...body }
    }
    return contact
  })
  const newContact = updateContacts.find(({ id }) => id === contactId)
  if (newContact) {
    await fs.writeFile(contactsPath, JSON.stringify(updateContacts, null, '\t'))
    return newContact
  }
  return null
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}

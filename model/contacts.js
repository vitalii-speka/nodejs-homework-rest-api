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
  await fs.readFile(contactsPath, (err, data) => {
    if (err) {
      console.log(err.message)
    }
    const contactsAll = JSON.parse(data.toString())
    const contact = JSON.stringify(
      contactsAll.filter(({ id }) => id !== contactId),
      null,
      '\t',
    )
    console.log(`ContactId - ${contactId} remove`)

    fs.writeFile(contactsPath, contact, err => {
      if (err) {
        console.log(err)
      }
    })
  })
}

const addContact = async body => {
  const data = await fs.readFile(contactsPath)
  const contacts = JSON.parse(data.toString())

  const newContact = { id: shortid.generate(), ...body }
  contacts.push(newContact)

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, '\t'))
  return newContact
}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}

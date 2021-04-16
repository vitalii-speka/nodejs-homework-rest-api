const fs = require('fs')
const path = require('path')
// const contacts = require('./contacts.json')
const shortid = require('shortid')

const contacts = path.join(__dirname, './contacts.json')

const listContacts = () => {
  fs.readFile(contacts, (err, data) => {
    if (err) {
      console.log(err.message)
    }
    // console.table(JSON.parse(data.toString()))
    const response = JSON.parse(data.toString())
    return response
  })
}
// console.log(listContacts())
// listContacts()

const getContactById = async contactId => {
  await fs.readFile(contacts, (err, data) => {
    if (err) {
      console.log(err.message)
    }
    const contacts = JSON.parse(data.toString())
    const contact = contacts.find(({ id }) => id === contactId)
    console.table(contact)
  })
}

const removeContact = async contactId => {
  await fs.readFile(contacts, (err, data) => {
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

    fs.writeFile(contacts, contact, err => {
      if (err) {
        console.log(err)
      }
    })
  })
}

const addContact = async body => {
  await fs.readFile(contacts, (err, data) => {
    if (err) {
      console.log(err.message)
    }
    const contactsAll = JSON.parse(data.toString())
    const newContact = { id: shortid.generate(), name: body.name, email: body.email, phone: body.phone }

    const contactJoined = JSON.stringify([newContact, ...contactsAll], null, '\t')

    console.log(`Contact -->  name: ${body.name}, email: ${body.email}, phone: ${body.phone} . ADD`)

    fs.writeFile(contacts, contactJoined, err => {
      if (err) {
        console.log(err)
      }
    })
  })
}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}

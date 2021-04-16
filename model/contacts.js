const fs = require('fs')
const path = require('path')
// const contacts = require('./contacts.json')
const shortid = require('shortid')

const contactsPath = path.join(__dirname, 'contacts.json')

const listContacts = async () => {
  const resp = await fs.readFile(contactsPath, (err, data) => {
    if (err) {
      console.log(err.message)
    }
    return JSON.parse(data.toString())
  })

  return resp
}

const getContactById = async contactId => {
  await fs.readFile(contactsPath, (err, data) => {
    if (err) {
      console.log(err.message)
    }
    const contacts = JSON.parse(data.toString())
    const contact = contacts.find(({ id }) => id === contactId)
    console.table(contact)
  })
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

// const addContact = async body => {
//   await fs.readFile(contactsPath, (err, data) => {
//     if (err) {
//       console.log(err.message)
//     }
//     const contactsAll = JSON.parse(data.toString())
//     const newContact = { id: shortid.generate(), name: body.name, email: body.email, phone: body.phone }

//     const contactJoined = JSON.stringify([newContact, ...contactsAll], null, '\t')

//     console.log(`Contact -->  name: ${body.name}, email: ${body.email}, phone: ${body.phone} . ADD`)

//     fs.writeFile(contactsPath, contactJoined, err => {
//       if (err) {
//         console.log(err)
//       }
//     })
//   })
// }
const addContact = async body => {
  // const contacts = await fs.readFile(contactsPath, (err, data) => {
  //   if (err) {
  //     console.log(err.message)
  //   }
  //   return JSON.parse(data.toString())
  // })
  const data = await fs.readFile(contactsPath)
  const contacts = JSON.parse(data.toString())

  const newContact = { id: shortid.generate(), ...body }

  contacts.push(newContact)

  console.log(`Contact -->  newContact: ${newContact}. ADD`)

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, '\t'))
}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}

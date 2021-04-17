const express = require('express')
const { listContacts, addContact, getContactById } = require('../../model/contacts')
const router = express.Router()

router.use((_req, _res, next) => {
  console.log('Time: ', Date.now())
  next()
})

router.get('/', async (_req, res, next) => {
  try {
    const contacts = await listContacts()
    console.log(contacts)
    res.status(200).json({
      status: 'succes',
      code: 200,
      message: 'contact found',
      data: contacts,
    })
  } catch (error) {
    console.log('error GET listContacts')
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId)
    if (contact) {
      return res.json({
        status: 'Success',
        code: 200,
        message: 'contact found',
        data: {
          contact,
        },
      })
    } else {
      return res.status(404).json({
        status: 'Error',
        code: 404,
        message: 'Not found',
      })
    }
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { body } = req
    const contact = await addContact(body)
    res.status(201).json({
      status: 'Succes',
      code: 201,
      message: 'Contact Add',
      data: contact,
    })
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.patch('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router

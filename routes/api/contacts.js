const express = require('express')
const { listContacts, addContact } = require('../../model/contacts')
const router = express.Router()

// add my)
router.use((_req, _res, next) => {
  console.log('Time: ', Date.now())
  next()
})

// router.get('/', async (req, res, next) => {
//   try {
//     const contacts = await listContacts()
//     console.table(contacts)
//     res.status(200).json({
//       status: 'success',
//       code: 200,
//       data: contacts,
//     })
//   } catch (error) {
//     next(error)
//   }
// })

router.get('/', async (_req, res, next) => {
  try {
    const contacts = await listContacts()
    console.table(contacts)
    res.status(200).json({
      status: 'succes',
      code: 200,
      message: 'contact fotnd',
      // data: {
      //   contacts,
      // },
      data: contacts,
    })
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.post('/', async (req, res, next) => {
  try {
    const { body } = req
    const contact = await addContact(body)
    res.status(201).json({
      status: 'succes',
      code: 201,
      message: 'contact add',
      // data: {
      //   contact,
      // },
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

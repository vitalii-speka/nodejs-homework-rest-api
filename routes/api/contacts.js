const express = require('express')
// const { listContacts } = require('../../model')
const router = express.Router()
const { listContacts } = require('../../model/index')

// add my)
router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})

router.get('/', async (req, res, next) => {
  try {
    const response = await listContacts()
    // res.json(JSON.parse(response.body))
    console.log(response.json())
    // res.json({ message: 'template message!!' })
  } catch (error) {
    next(error)
  }
  // res.send(listContacts())
  // listContacts()
  // res.send(listContacts().toString())
})

router.get('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.patch('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router

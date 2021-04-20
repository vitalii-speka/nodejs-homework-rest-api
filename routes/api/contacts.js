const express = require('express')
const router = express.Router()
const { MongoClient, ObjectID } = require('mongodb')
const { addContact, updateContact, removeContact } = require('../../model/contacts')
const { validationAddContact, validationUpdateContact } = require('./contacts-validation')
require('dotenv').config()

const uriDb = process.env.DB_HOST

router.use((_req, _res, next) => {
  console.log('Time: ', Date.now())
  next()
})

router.get('/', async (req, res, next) => {
  const client = await new MongoClient(uriDb, {
    useUnifiedTopology: true,
  }).connect()
  try {
    const contacts = await client.db().collection('contacts').find().toArray()
    res.status(200).json({
      status: 'succes',
      code: 200,
      message: 'contact found',
      data: {
        contacts,
      },
    })
  } catch (error) {
    console.error(error)
    next(error)
  } finally {
    await client.close()
  }
})

/*
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
*/

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params
  const client = await new MongoClient(uriDb, {
    useUnifiedTopology: true,
  }).connect()
  try {
    const objectId = new ObjectID(contactId)
    const [result] = await client.db().collection('contacts').find({ _id: objectId }).toArray()
    res.json({
      status: 'Success',
      code: 200,
      message: 'contact found',
      data: {
        contact: result,
      },
    })
  } catch (error) {
    next(error)
  } finally {
    await client.close()
  }
})

router.post('/', validationAddContact, async (req, res, next) => {
  try {
    const { body } = req
    const contact = await addContact(body)
    res.status(201).json({
      status: 'Succes',
      code: 201,
      message: 'Contact add',
      data: contact,
    })
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const contact = await removeContact(req.params.contactId)
    if (contact) {
      return res.json({
        status: 'Success',
        code: 200,
        message: 'contact deleted',
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

router.patch('/:contactId', validationUpdateContact, async (req, res, next) => {
  try {
    const {
      params: { contactId },
      body,
    } = req

    const contact = await updateContact(+contactId, body)
    if (contact) {
      return res.json({
        status: 'Success',
        code: 200,
        message: 'contact update',
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

module.exports = router

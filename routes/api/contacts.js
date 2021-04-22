const express = require('express')
const router = express.Router()

const {
  getAll,
  // listContacts,
  addContact,
  getContactById,
  updateContact,
  removeContact,
  updateStatusContact,
} = require('../../model/contacts')
const {
  validationAddContact,
  validationUpdateStatusContact,
  validationUpdateContact,
} = require('./contacts-validation')
require('dotenv').config()

router.get('/', async (req, res, next) => {
  try {
    const contacts = await getAll()
    res.status(200).json({
      status: 'succes',
      code: 200,
      message: 'contact found',
      data: {
        contacts,
      },
    })
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params
  try {
    const contact = await getContactById(contactId)
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

router.patch('/:contactId/favorite', validationUpdateStatusContact, async (req, res, next) => {
  try {
    const {
      params: { contactId },
      body,
    } = req

    const contact = await updateStatusContact(contactId, body)
    if (contact) {
      return res.json({
        status: 'Success',
        code: 200,
        message: 'contact status update',
        data: {
          contact,
        },
      })
    } else {
      return res.status(400).json({
        status: 'Error',
        code: 404,
        message: 'missing field favorite',
      })
    }
  } catch (error) {
    next(error)
  }
})

router.put('/:contactId', validationUpdateContact, async (req, res, next) => {
  try {
    const {
      params: { contactId },
      body,
    } = req

    const contact = await updateContact(contactId, body)
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

/* templare for studybook

const { MongoClient, ObjectID } = require('mongodb')

router.use((_req, _res, next) => {
  console.log('Time: ', Date.now())
  next()
})

  router.get('/', async (req, res, next) => {
    const client = await new MongoClient(uriDb, {
      useUnifiedTopology: true,
    }).connect()
    try {
      const result = await client.db().collection('contacts').find().toArray()
      res.status(200).json({
        status: 'succes',
        code: 200,
        message: 'contact found',
        data: {
          contacts: result,
        },
      })
    } catch (error) {
      console.error(error)
      next(error)
    } finally {
      await client.close()
    }
  })

router.get('/:id', async (req, res, next) => {
  const { id } = req.params
  const client = await new MongoClient(uriDb, {
    useUnifiedTopology: true,
  }).connect()
  try {
    const objectId = new ObjectID(id)
    const [result] = await client.db().collection('contacts').find({ _id: objectId }).toArray()
    if (result) {
      return res.json({
        status: 'Success',
        code: 200,
        message: 'contact found',
        data: {
          contacts: result,
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
    console.error(error)
    next(error)
  } finally {
    await client.close()
  }
})

router.post('/', validationAddContact, async (req, res, next) => {
  const { body } = req
  const client = await new MongoClient(uriDb, {
    useUnifiedTopology: true,
  }).connect()
  try {
    const {
      ops: [result],
    } = await client
      .db()
      .collection('contacts')
      .insertOne({ ...body, favorite: false })

    res.status(201).json({
      status: 'Succes',
      code: 201,
      message: 'Contact add',
      data: { contact: result },
    })
  } catch (error) {
    console.error(error)
    next(error)
  } finally {
    await client.close()
  }
})

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params
  const client = await new MongoClient(uriDb, {
    useUnifiedTopology: true,
  }).connect()
  try {
    const objectId = new ObjectID(id)
    const { value: result } = await client.db().collection('contacts').findOneAndDelete({ _id: objectId })
    if (result) {
      return res.json({
        status: 'Success',
        code: 200,
        message: 'contact deleted',
        data: {
          contacts: result,
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
    console.error(error)
    next(error)
  } finally {
    await client.close()
  }
})

router.patch('/:id/status', validationUpdateContact, async (req, res, next) => {
  const { id } = req.params
  const { favorite = false } = req.body
  const client = await new MongoClient(uriDb, {
    useUnifiedTopology: true,
  }).connect()

  try {
    const objectId = new ObjectID(id)
    const { value: result } = await client
      .db()
      .collection('contacts')
      .findOneAndUpdate({ _id: objectId }, { $set: { favorite } }, { returnOriginal: false })

    if (result) {
      return res.json({
        status: 'Success',
        code: 200,
        message: 'contact update',
        data: {
          contact: result,
        },
      })
    } else {
      return res.status(404).json({
        status: 'Error',
        code: 400,
        message: 'missing field favorite',
      })
    }
  } catch (error) {
    console.error(error)
    next(error)
  } finally {
    await client.close()
  }
})

*/

module.exports = router

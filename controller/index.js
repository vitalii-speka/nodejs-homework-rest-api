const {
  getAll,
  addContact,
  getContactById,
  updateContact,
  removeContact,
  updateStatusContact,
} = require('../model/contacts')

const get = async (req, res, next) => {
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
}

const getById = async (req, res, next) => {
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
}

const create = async (req, res, next) => {
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
}

const remove = async (req, res, next) => {
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
}

const update = async (req, res, next) => {
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
}

const updateStatus = async (req, res, next) => {
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
        code: 400,
        message: 'missing field favorite',
      })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  get,
  getById,
  create,
  remove,
  update,
  updateStatus,
}

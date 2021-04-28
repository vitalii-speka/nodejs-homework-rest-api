const {
  getAll,
  addContact,
  getContactById,
  updateContact,
  removeContact,
  updateStatusContact,
} = require('../model/contacts')
const { HttpCode } = require('../helper/constants')

const get = async (req, res, next) => {
  try {
    const contacts = await getAll()
    res.status(HttpCode.OK).json({
      status: 'succes',
      code: HttpCode.OK,
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
        code: HttpCode.OK,
        message: 'contact found',
        data: {
          contact,
        },
      })
    } else {
      return res.status(HttpCode.NOT_FOUND).json({
        status: 'Error',
        code: HttpCode.NOT_FOUND,
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
    res.status(HttpCode.CREATED).json({
      status: 'Succes',
      code: HttpCode.CREATED,
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
        code: HttpCode.OK,
        message: 'contact deleted',
        data: {
          contact,
        },
      })
    } else {
      return res.status(HttpCode.NOT_FOUND).json({
        status: 'Error',
        code: HttpCode.NOT_FOUND,
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
        code: HttpCode.OK,
        message: 'contact update',
        data: {
          contact,
        },
      })
    } else {
      return res.status(HttpCode.NOT_FOUND).json({
        status: 'Error',
        code: HttpCode.NOT_FOUND,
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
        code: HttpCode.OK,
        message: 'contact status update',
        data: {
          contact,
        },
      })
    } else {
      return res.status(HttpCode.BAD_REQUEST).json({
        status: 'Error',
        code: HttpCode.BAD_REQUEST,
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

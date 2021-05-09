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
    const userId = req.user?.id
    const contacts = await getAll(userId, req.query)
    res.status(HttpCode.OK).json({
      status: 'succes get',
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
  try {
    const { contactId } = req.params
    const userId = req.user?.id
    console.log(contactId)
    console.log(userId)
    const contact = await getContactById(userId, contactId)
    console.log(contact)
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
        status: 'error getById',
        code: HttpCode.NOT_FOUND,
        message: 'Not found getBuId',
      })
    }
  } catch (error) {
    next(error)
  }
}

const create = async (req, res, next) => {
  try {
    const userId = req.user?.id
    const { body } = req
    const contact = await addContact({ ...body, owner: userId })
    res.status(HttpCode.CREATED).json({
      status: 'Succes create',
      code: HttpCode.CREATED,
      message: 'Contact create',
      data: contact,
    })
  } catch (error) {
    next(error)
  }
}

const remove = async (req, res, next) => {
  try {
    const userId = req.user?.id
    const { contactId } = req.params
    const contact = await removeContact(userId, contactId)
    if (contact) {
      return res.json({
        status: 'Success remove',
        code: HttpCode.OK,
        message: 'contact deleted',
        data: {
          contact,
        },
      })
    } else {
      return res.status(HttpCode.NOT_FOUND).json({
        status: 'Error remove',
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
    const userId = req.user?.id
    const {
      params: { contactId },
      body,
    } = req

    const contact = await updateContact(userId, contactId, body)
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
    const userId = req.user?.id
    const {
      params: { contactId },
      body,
    } = req

    const contact = await updateStatusContact(userId, contactId, body)
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

const onlyPro = async (req, res, next) => {
  res.status(HttpCode.OK).json({
    status: 'succes',
    code: HttpCode.OK,
    data: {
      message: 'Only Pro',
    },
  })
}
const onlyBusiness = async (req, res, next) => {
  res.status(HttpCode.OK).json({
    status: 'succes',
    code: HttpCode.OK,
    data: {
      message: 'Only Business',
    },
  })
}

module.exports = {
  get,
  getById,
  create,
  remove,
  update,
  updateStatus,
  onlyPro,
  onlyBusiness,
}

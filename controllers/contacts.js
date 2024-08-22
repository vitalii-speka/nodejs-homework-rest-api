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
    const { id } = req.params
    const userId = req.user?.id
    const contact = await getContactById(userId, id)
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
    const { id } = req.params
    const contact = await removeContact(userId, id)
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
      params: { id },
      body,
    } = req

    const contact = await updateContact(userId, id, body)
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
        message: 'Not found!',
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
      params: { id },
      body,
    } = req

    const contact = await updateStatusContact(userId, id, body)
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
      return res.status(HttpCode.NOT_FOUND).json({
        status: 'Error',
        code: HttpCode.NOT_FOUND,
        message: 'missing field favorite',
      })
    }
  } catch (error) {
    next(error)
  }
}

const onlyPro = async (req, res, next) => {
  const { email, subscription } = req.user
  return res.status(HttpCode.OK).json({
    status: 'success',
    code: HttpCode.OK,
    message: 'Only Pro',
    data: { email, subscription },
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

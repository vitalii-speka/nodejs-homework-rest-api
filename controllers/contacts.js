const {
  getAll,
  addContact,
  getContactById,
  updateContact,
  removeContact,
  updateStatusContact,
} = require('../model/contacts')
const { HttpCode } = require('../helpers/constants')
const ctrlWrapper = require('../helpers/ctrlWrapper')
const HttpError = require('../helpers/HttpError')
const HttpSuccess = require('../helpers/HttpSuccess')

const get = async (req, res) => {
  const userId = req.user?.id
  const contacts = await getAll(userId, req.query)
  HttpSuccess('Success', HttpCode.OK, 'Contacts found'),
    res.status(HttpCode.OK).json({
      // contacts,
      status: 'Success',
      code: HttpCode.OK,
      message: 'Contacts found',
      // data: {
      //   contacts: contacts.docs,
      // },
      contacts: contacts.docs,
    })
}

const getById = async (req, res) => {
  const { id } = req.params
  const userId = req.user?.id
  const contact = await getContactById(id, userId)
  if (contact) {
    return res.json({
      status: 'Success getById',
      code: HttpCode.OK,
      message: 'Contact found',
      data: {
        contact,
      },
    })
  } else {
    throw HttpError(HttpCode.NOT_FOUND, 'Not found getById')
  }
}

const create = async (req, res) => {
  const userId = req.user?.id
  const { body } = req
  const contact = await addContact({ ...body, owner: userId })
  res.status(HttpCode.CREATED).json({
    status: 'Success create',
    code: HttpCode.CREATED,
    message: 'Contact created',
    // data: contact,
    contact,
  })
}

const remove = async (req, res) => {
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
    throw HttpError(HttpCode.NOT_FOUND, 'Not found')
  }
}

const update = async (req, res) => {
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
    throw HttpError(HttpCode.NOT_FOUND, 'Not found')
  }
}

const updateStatus = async (req, res) => {
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
    throw HttpError(HttpCode.NOT_FOUND, 'missing field favorite')
  }
}

const onlyPro = async (req, res) => {
  const { email, subscription } = req.user
  return res.status(HttpCode.OK).json({
    status: 'Success',
    code: HttpCode.OK,
    message: 'Only Pro',
    data: { email, subscription },
  })
}

const onlyBusiness = async (req, res, next) => {
  res.status(HttpCode.OK).json({
    status: 'Success',
    code: HttpCode.OK,
    data: {
      message: 'Only Business',
    },
  })
}

module.exports = {
  get: ctrlWrapper(get),
  getById: ctrlWrapper(getById),
  create: ctrlWrapper(create),
  remove: ctrlWrapper(remove),
  update: ctrlWrapper(update),
  updateStatus: ctrlWrapper(updateStatus),
  onlyPro,
  onlyBusiness,
}

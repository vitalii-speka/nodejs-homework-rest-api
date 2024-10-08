const Contact = require('./schemas/contact')

const getAll = async (userId, query) => {
  const { sortBy, sortByDesc, filter, favorite = null, limit = '5', offset = '0' } = query
  const optionsSearch = { owner: userId }
  if (favorite !== null) {
    optionsSearch.favorite = favorite
  }
  const result = await Contact.paginate(optionsSearch, {
    limit,
    offset,
    sort: {
      ...(sortBy ? { [`${sortBy}`]: 1 } : {}), // name: 1
      ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
    },
    select: filter ? filter.split('|').join(' ') : '',
    populate: {
      path: 'owner',
      select: 'name email subscription _id',
    },
  })
  return result
}

const getContactById = async (id, userId) => {
  const result = await Contact.findOne({ _id: id, owner: userId }).populate({
    path: 'owner',
    select: 'email subscription _id',
  })
  return result
}

const removeContact = async (userId, id) => {
  const result = await Contact.findByIdAndRemove({ _id: id, owner: userId })
  return result
}

const addContact = async body => {
  const result = await Contact.create(body)
  return result
}

const updateContact = async (userId, id, body) => {
  const result = await Contact.findByIdAndUpdate({ _id: id, owner: userId }, { ...body }, { new: true })
  return result
}

const updateStatusContact = async (userId, id, body) => {
  const result = await Contact.findByIdAndUpdate({ _id: id, owner: userId }, { ...body }, { new: true })
  return result
}

module.exports = {
  getAll,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
}

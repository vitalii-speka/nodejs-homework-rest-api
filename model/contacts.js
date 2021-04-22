const db = require('./db')
const { ObjectID } = require('mongodb')
const getCollection = async (db, name) => {
  const client = await db
  const collection = await client.db().collection(name)
  return collection
}

const getAll = async () => {
  const collection = await getCollection(db, 'contacts')
  const result = await collection.find().toArray()
  return result
}

const getContactById = async contactId => {
  const collection = await getCollection(db, 'contacts')
  const objectId = new ObjectID(contactId)
  const [result] = await collection.find({ _id: objectId }).toArray()
  return result
}

const removeContact = async contactId => {
  const collection = await getCollection(db, 'contacts')
  const objectId = new ObjectID(contactId)
  const { value: result } = await collection.findOneAndDelete({ _id: objectId })
  return result
}

const addContact = async body => {
  const collection = await getCollection(db, 'contacts')
  const {
    ops: [result],
  } = await collection.insertOne({ ...body, favorite: false })
  return result
}

const updateContact = async (contactId, body) => {
  const collection = await getCollection(db, 'contacts')
  const objectId = new ObjectID(contactId)
  const { value: result } = await collection.findOneAndUpdate(
    { _id: objectId },
    { $set: body },
    { returnOriginal: false },
  )
  return result
}

const updateStatusContact = async (contactId, body) => {
  const collection = await getCollection(db, 'contacts')
  const objectId = new ObjectID(contactId)
  const { value: result } = await collection.findOneAndUpdate(
    { _id: objectId },
    { $set: body },
    { returnOriginal: false },
  )
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

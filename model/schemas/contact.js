const mongoose = require('mongoose')
const { Schema, model, SchemaTypes } = mongoose
const mongoosePaginate = require('mongoose-paginate-v2')

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
      // unique: true,
    },
    email: {
      type: String,
      // required: [false, 'Set email for contact'],
      // unique: true,
    },
    number: {
      type: String,
      required: [true, 'Set number for contact'],
      // unique: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true },
)

contactSchema.plugin(mongoosePaginate)

const Contact = model('contact', contactSchema)

module.exports = Contact

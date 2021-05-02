const Joi = require('joi')
const mongoose = require('mongoose')

const schemaAddContact = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .pattern(/[A-Z]\w+/)
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .optional(),
  phone: Joi.string().min(10).max(14).required(),
  favorite: Joi.boolean().optional(),
})

const schemaQueryContact = Joi.object({
  sortBy: Joi.string().valid('name', 'email', 'phone').optional(),
  sortByDesc: Joi.string().valid('name', 'email', 'phone').optional(),
  filter: Joi.string().optional(),
  limit: Joi.number().integer().min(1).max(50).optional(),
  offset: Joi.number().integer().min(1).optional(),
  favorite: Joi.boolean().optional(),
}).without('sortBy', 'sortByDesc')

const schemaUpdateStatusContact = Joi.object({
  favorite: Joi.boolean().required(),
})

const schemaUpdateContact = Joi.object({
  name: Joi.string().min(3).max(30).optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string()
    .pattern(/^[(][\d]{3}[)]\s[\d]{3}[-][\d]{4}/)
    .optional(),
  favorite: Joi.boolean(),
}).or('name', 'email', 'phone', 'favorite')

const validate = (schema, obj, next) => {
  const { error } = schema.validate(obj)

  if (error) {
    return next({
      status: 400,
      message: 'Bad request',
    })
  }
  next()
}

const validationAddContact = (req, _res, next) => {
  return validate(schemaAddContact, req.body, next)
}
const validationQueryContact = (req, _res, next) => {
  return validate(schemaQueryContact, req.body, next)
}
const validationUpdateStatusContact = (req, _res, next) => {
  return validate(schemaUpdateStatusContact, req.body, next)
}
const validationUpdateContact = (req, _res, next) => {
  return validate(schemaUpdateContact, req.body, next)
}
const validationObjectId = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next({ status: 400, message: 'Invalid Object Id' })
  }
  next()
}

module.exports = {
  validationAddContact,
  validationQueryContact,
  validationUpdateStatusContact,
  validationUpdateContact,
  validationObjectId,
}

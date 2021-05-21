const Joi = require('joi')
const mongoose = require('mongoose')
const { HttpCode, Subscription } = require('./constants')

const schemaAddContact = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .pattern(/[A-Z]\w+/)
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org', 'ua'] } })
    .required(),
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
  subscription: Joi.string(),
}).or('name', 'email', 'phone', 'favorite', 'subscription')

const schemaValidateUpdateSub = Joi.object({
  subscription: Joi.any().valid(Subscription.STARTER, Subscription.PRO, Subscription.BUSINESS).required(),
})
const schemaRegistUser = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(5).required(),
})

const schemaValidationUserVerify = Joi.object({
  email: Joi.string().email().required(),
})

const validate = (schema, obj, next) => {
  const { error } = schema.validate(obj)

  // if (error) {
  //   const [{ message }] = error.details
  //   return next({
  //     status: HttpCode.BAD_REQUEST,
  //     message: `Filed: ${message.replace(/"/g, '')}`,
  //   })
  // }

  if (error) {
    return next({
      status: HttpCode.BAD_REQUEST,
      message: 'Bad request [validate]',
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
const validationRegistUser = (req, _res, next) => {
  return validate(schemaRegistUser, req.body, next)
}

const validationUpdateSub = (req, _res, next) => {
  return validate(schemaValidateUpdateSub, req.body, next)
}
const validationObjectId = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next({ status: 400, message: 'Invalid Object Id' })
  }
  next()
}
const validationUserVerify = (req, _res, next) => {
  return validate(schemaValidationUserVerify, req.body, next)
}

module.exports = {
  validationAddContact,
  validationQueryContact,
  validationUpdateStatusContact,
  validationUpdateContact,
  validationRegistUser,
  validationObjectId,
  validationUpdateSub,
  validationUserVerify,
}

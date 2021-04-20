const Joi = require('joi')

const schemaAddContact = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^[(][\d]{3}[)]\s[\d]{3}[-][\d]{4}/)
    .required(),
})

// const schemaUpdateContact = Joi.object({
//   name: Joi.string().min(3).max(30).optional(),
//   email: Joi.string().email().optional(),
//   phone: Joi.string()
//     .pattern(/^[(][\d]{3}[)]\s[\d]{3}[-][\d]{4}/)
//     .optional(),
// }).or('name', 'email', 'phone')

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
// const validationUpdateContact = (req, _res, next) => {
//   return validate(schemaUpdateContact, req.body, next)
// }
const validationUpdateContact = (req, _res, next) => {
  return validate(schemaUpdateContact, req.body, next)
}

module.exports = { validationAddContact, validationUpdateContact }

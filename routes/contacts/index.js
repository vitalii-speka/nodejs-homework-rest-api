const express = require('express')
const router = express.Router()

const {
  validationAddContact,
  validationUpdateStatusContact,
  validationUpdateContact,
} = require('./contacts-validation')
const contactsController = require('../../controllers/contacts')
const guard = require('../../helper/guard')

router.get('/', contactsController.get).post('/', validationAddContact, contactsController.create)

router
  .get('/:contactId', guard, contactsController.getById)
  .delete('/:contactId', guard, contactsController.remove)
  .patch('/:contactId/favorite', guard, validationUpdateStatusContact, contactsController.updateStatus)
  .put('/:contactId', guard, validationUpdateContact, contactsController.update)

module.exports = router

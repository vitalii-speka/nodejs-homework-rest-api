const express = require('express')
const router = express.Router()

const {
  validationAddContact,
  validationUpdateStatusContact,
  validationUpdateContact,
} = require('./contacts-validation')
const contactsController = require('../../controllers/contacts')

router.get('/', contactsController.get).post('/', validationAddContact, contactsController.create)

router
  .get('/:contactId', contactsController.getById)
  .delete('/:contactId', contactsController.remove)
  .patch('/:contactId/favorite', validationUpdateStatusContact, contactsController.updateStatus)
  .put('/:contactId', validationUpdateContact, contactsController.update)

module.exports = router

const express = require('express')
const router = express.Router()

const {
  validationAddContact,
  validationUpdateStatusContact,
  validationUpdateContact,
} = require('./contacts-validation')
const contactsController = require('../../controller')

router.get('/', contactsController.get)

router.get('/:contactId', contactsController.getById)

router.post('/', validationAddContact, contactsController.create)

router.delete('/:contactId', contactsController.remove)

router.patch('/:contactId/favorite', validationUpdateStatusContact, contactsController.updateStatus)

router.put('/:contactId', validationUpdateContact, contactsController.update)

module.exports = router

const express = require('express')
const router = express.Router()

const {
  validationQueryContact,
  validationAddContact,
  validationUpdateStatusContact,
  validationUpdateContact,
} = require('../../helper/validation')
const contactsController = require('../../controllers/contacts')
const guard = require('../../helper/guard')
const { Subscription } = require('../../helper/constants')
const subscription = require('../../helper/subscription')

router
  .get('/', guard, validationQueryContact, contactsController.get)
  .post('/', guard, validationAddContact, contactsController.create)

router.get('/pro', guard, subscription(Subscription.PRO), contactsController.onlyPro)
router.get('/business', guard, subscription(Subscription.BUSINESS), contactsController.onlyBusiness)

router
  .get('/:contactId', guard, contactsController.getById)
  .delete('/:contactId', guard, contactsController.remove)
  .patch('/:contactId/favorite', guard, validationUpdateStatusContact, contactsController.updateStatus)
  .put('/:contactId', guard, validationUpdateContact, contactsController.update)

module.exports = router

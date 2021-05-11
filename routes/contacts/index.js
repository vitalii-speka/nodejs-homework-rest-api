const express = require('express')
const router = express.Router()

const {
  validationQueryContact,
  validationAddContact,
  validationUpdateStatusContact,
  validationUpdateContact,
  validationObjectId,
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
  .get('/:id', guard, validationObjectId, contactsController.getById)
  .delete('/:id', guard, contactsController.remove)
  .patch('/:id/favorite', guard, validationUpdateStatusContact, contactsController.updateStatus)
  .put('/:id', guard, validationUpdateContact, contactsController.update)

module.exports = router

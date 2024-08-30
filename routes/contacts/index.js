const express = require('express')
const router = express.Router()

const {
  validationQueryContact,
  validationAddContact,
  validationUpdateStatusContact,
  validationUpdateContact,
  validationObjectId,
} = require('../../helpers/validation')
const contactsController = require('../../controllers/contacts')
const guard = require('../../helpers/guard')
const { Subscription } = require('../../helpers/constants')
const subscription = require('../../helpers/subscription')

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

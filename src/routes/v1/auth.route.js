const express = require('express')
const { AuthController } = require('../../controllers')
const validate = require('../../middlewares/validate')
const authValidation = require('../../validation/auth.validation')
const auth = require('../../middlewares/auth')

const router = express.Router()

router.post(
  '/register',
  validate(authValidation.registerSchema),
  AuthController.register
)

router.get('/me', auth(), AuthController.aboutMe)

router.post(
  '/login',
  validate(authValidation.loginSchema),
  AuthController.login
)

module.exports = router

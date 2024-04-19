const Joi = require('joi')
const { password } = require('./custom.validation')

const registerSchema = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().custom(password),
    firstName: Joi.string().required(),
    lastName: Joi.string().required()
  })
}

const loginSchema = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password)
  })
}

module.exports = {
  registerSchema,
  loginSchema
}

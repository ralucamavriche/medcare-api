const Joi = require('joi')
const { password, objectId } = require('./custom.validation')

const getUsers = {
  query: Joi.object().keys({
    email: Joi.string().email(),
    password: Joi.string().required().custom(password),
    role: Joi.string(),
    firstName: Joi.string(),
    lastName: Joi.string(),
    phone: Joi.string().optional(),
    address: Joi.string().optional(),
    city: Joi.string().optional(),
    country: Joi.string().optional(),
    medicalLicenseNumber: Joi.string().optional(),
    status: Joi.string().required(),
    requestedDoctorStatus: Joi.string()

  })

}

const getUserById = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId)
  })
}

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().custom(password).required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    medicalLicenseNumber: Joi.string().optional(),
    role: Joi.string().optional().valid('PATIENT', 'DOCTOR', 'ADMIN')
  })
}

const deleteUser = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId)
  })

}

const updateUser = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId)
  }),
  body: Joi.object().keys({
    email: Joi.string().email(),
    password: Joi.string().custom(password),
    firstName: Joi.string(),
    lastName: Joi.string(),
    phone: Joi.string().allow('').optional(),
    address: Joi.string().allow('').optional(),
    city: Joi.string().allow('').optional(),
    country: Joi.string().allow('').optional(),
    medicalLicenseNumber: Joi.string().optional(),
    status: Joi.string().valid('PENDING', 'REJECTED', 'ACCEPTED'),
    requestedDoctorStatus: Joi.string(),
    doctorId: Joi.string().allow('').optional(),
    role: Joi.string().optional().valid('PATIENT', 'DOCTOR')
  })

}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser
}

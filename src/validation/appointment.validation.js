const Joi = require('joi')
const { objectId } = require('./custom.validation')

const createAppointment = {
  body: Joi.object().keys({
    userId: Joi.string().custom(objectId).required(),
    doctorId: Joi.string().custom(objectId).required(),
    title: Joi.string().required(),
    description: Joi.string(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    status: Joi.string().valid('PENDING').required()
  })
}

const getAppointmentById = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId)
  })
}

const getAppointmentsByUserId = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId)
  })
}

const getAppointmentsByDoctorId = {
  params: Joi.object().keys({
    doctorId: Joi.string().custom(objectId)
  })
}

const getAppointmentsByDoctorIdAndUserId = {
  params: Joi.object().keys({
    doctorId: Joi.string().custom(objectId),
    userId: Joi.string().custom(objectId)
  })
}

const updateAppointment = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId)
  }),
  body: Joi.object().keys({
    title: Joi.string(),
    description: Joi.string(),
    startDate: Joi.date(),
    endDate: Joi.date(),
    author: Joi.string(),
    status: Joi.string().required().valid('PENDING', 'REJECTED', 'ACCEPTED')
  })
}

const deleteAppointment = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId)
  })
}

module.exports = {
  createAppointment,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
  getAppointmentsByUserId,
  getAppointmentsByDoctorId,
  getAppointmentsByDoctorIdAndUserId
}

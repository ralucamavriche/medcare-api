const express = require('express')
const router = express.Router()
const { appointmentController } = require('../../controllers')
const appointmentValidation = require('../../validation/appointment.validation')
const validate = require('../../middlewares/validate')

router
  .route('/')
  .post(
    validate(appointmentValidation.createAppointment),
    appointmentController.createAppointment
  )
  .get(
    validate(appointmentValidation.getAppointments),

    appointmentController.getAppointments
  )

router
  .route('/:id')
  .get(
    validate(appointmentValidation.getAppointmentById),
    appointmentController.getAppointmentById
  )
  .patch(
    validate(appointmentValidation.updateAppointment),
    appointmentController.updateAppointment
  )
  .delete(
    validate(appointmentValidation.deleteAppointment),
    appointmentController.deleteAppointment
  )

router
  .route('/user/:userId/appointments')
  .get(
    validate(appointmentValidation.getAppointmentsByUserId),
    appointmentController.getAppointmentsByUserId
  )

module.exports = router

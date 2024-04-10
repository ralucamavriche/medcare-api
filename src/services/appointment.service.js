const Appointment = require('../models/appointment.model')
const CustomApiError = require('../utils/CustomApiError')

/**
 * Get all appointments
 * @returns {Promise<Appointment>}
 */
const getAppointments = async () => {
  const appointments = await Appointment.find({})
  return appointments
}

/**
 * Create an appointment
 * @param {Object} appointment
 * @returns {Promise<Appointment>}
 */
const createAppointment = async (appointment) => {
  return Appointment.create(appointment)
}

/**
 * Get appointment by id
 * @param {String} id
 * @returns {Promise<Appointment>}
 */
const getAppointmentById = async (id) => {
  const appoiment = await Appointment.findById(id)
  if (!appoiment) {
    throw new CustomApiError(404, 'Appointment not found!')
  }
  return appoiment
}

/**
 * Update appointment
 * @param {String} id
 * @param {Object} updateBody
 * @returns {Promise<Appointment>}
 */
const updateAppointment = async (id, updateBody) => {
  const appointment = await Appointment.findById(id)

  if (!appointment) {
    throw new CustomApiError(404, 'Appointment not found!')
  }

  Object.assign(appointment, updateBody)
  await appointment.save()
  return appointment
}

/**
 * Delete appointment
 * @param {String} id
 * @returns {Promise<Appointment>}
 */
const deleteAppointment = async (id) => {
  const appointment = await Appointment.findById(id)

  if (!appointment) {
    throw new CustomApiError(404, 'Appointment not found!')
  }
  await appointment.deleteOne()
  return appointment
}

module.exports = {
  getAppointments,
  createAppointment,
  getAppointmentById,
  updateAppointment,
  deleteAppointment
}

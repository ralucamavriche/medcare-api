const Appointment = require('../models/appointment.model')
const CustomApiError = require('../utils/CustomApiError')
const { StatusCodes } = require('http-status-codes')

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
  const appointmentResponse = await Appointment.create(appointment)
  return appointmentResponse
}

/**
 * Get appointment by id
 * @param {String} id
 * @returns {Promise<Appointment>}
 */
const getAppointmentById = async (id) => {
  const appoiment = await Appointment.findById(id).populate('userId')
  if (!appoiment) {
    throw new CustomApiError(StatusCodes.NOT_FOUND, 'Appointment not found!')
  }
  return appoiment
}

/**
 * Get all appointments by userId
 * @param {String} userId
 * @returns {Promise<Appointment>}
 */
const getAppointmentsByUserId = async (userId) => {
  const appoiments = await Appointment.find({ userId }).populate('userId')
  if (!appoiments) {
    throw new CustomApiError(StatusCodes.NOT_FOUND, 'Appointments not found!')
  }
  return appoiments
}

/**
 * Get all appointments by doctorId
 * @param {String} userId
 * @returns {Promise<Appointment>}
 */
const getAppointmentsByDoctorId = async (doctorId) => {
  const appoiments = await Appointment.find({ doctorId }).populate('userId').populate('doctorId')
  if (!appoiments) {
    throw new CustomApiError(StatusCodes.NOT_FOUND, 'Appointments not found!')
  }
  return appoiments
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
    throw new CustomApiError(StatusCodes.NOT_FOUND, 'Appointment not found!')
  }

  Object.assign(appointment, updateBody)
  const appointemntResponse = await appointment.save()
  return appointemntResponse
}

/**
 * Delete appointment
 * @param {String} id
 * @returns {Promise<Appointment>}
 */
const deleteAppointment = async (id) => {
  const appointment = await Appointment.findById(id)

  if (!appointment) {
    throw new CustomApiError(StatusCodes.NOT_FOUND, 'Appointment not found!')
  }
  await appointment.deleteOne()
  return appointment
}

module.exports = {
  getAppointments,
  createAppointment,
  getAppointmentById,
  getAppointmentsByUserId,
  updateAppointment,
  deleteAppointment,
  getAppointmentsByDoctorId
}

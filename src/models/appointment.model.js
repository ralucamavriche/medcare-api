const mongoose = require('mongoose')
const { toJSON } = require('./shared')
const { REQUEST_STATUSES } = require('../constants')
const Schema = mongoose.Schema

const AppointmentSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    default: REQUEST_STATUSES.PENDING
  }
})

AppointmentSchema.set('toObject', {
  transform: toJSON
})

AppointmentSchema.set('toJSON', {
  transform: toJSON
})

const Appointment = mongoose.model('appointment', AppointmentSchema)

module.exports = Appointment

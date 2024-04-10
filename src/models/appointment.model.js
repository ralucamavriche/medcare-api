const mongoose = require('mongoose')
const { toJSON } = require('./shared')
const Schema = mongoose.Schema

const AppointmentSchema = new Schema({
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
  author: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'pending'
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
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
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

});

const Appointment = mongoose.model("appointment", appointmentSchema);

module.exports = Appointment;
const { appointmentService } = require('../services')
const catchAsync = require("../utils/catchAsync")

const createAppointment = catchAsync(async (req, res) => {
    const { title, description, startDate, endDate, author } = req.body;
    const appointment = await appointmentService.createAppointment({ title, description, startDate, endDate, author });
    res.status(201).send({
        appointment
    })
});

const getAppointments = catchAsync(async (req, res) => {
    const appointments = await appointmentService.getAppointments();
    res.status(200).send({
        appointments
    })
});

const getAppointmentById = catchAsync(async (req, res) => {
    const id = req.params.id;
    const appointment = await appointmentService.getAppointmentById(id);
    res.status(200).send({
        appointment
    })
});



const updateAppointment = catchAsync(async (req, res) => {
    const id = req.params.id;
    const updateBody = req.body;
    const appointment = await appointmentService.updateAppointment(id, updateBody);

    res.status(200).send({
        appointment
    })
});

const deleteAppointment = catchAsync(async (req, res) => {
    const id = req.params.id;
    const appointment = await appointmentService.deleteAppointment(id);
    res.status(200).send({})
});

module.exports = {
    createAppointment,
    getAppointments,
    getAppointmentById,
    updateAppointment,
    deleteAppointment
}
const { REQUEST_STATUSES } = require("../constants");
const { appointmentService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const { StatusCodes } = require("http-status-codes");

const createAppointment = catchAsync(async (req, res) => {
  const appointment = await appointmentService.createAppointment(req.body);

  res.status(StatusCodes.CREATED).send({
    appointment,
  });
});

const getAppointments = catchAsync(async (req, res) => {
  const appointments = await appointmentService.getAppointments();
  res.status(StatusCodes.OK).send({
    appointments,
  });
});

const getAppointmentById = catchAsync(async (req, res) => {
  const id = req.params.id;
  const appointment = await appointmentService.getAppointmentById(id);
  res.status(StatusCodes.OK).send({
    appointment,
  });
});

const getAppointmentsByUserId = catchAsync(async (req, res) => {
  const userId = req.params.userId;
  const appointments = await appointmentService.getAppointmentsByUserId(userId);
  res.status(StatusCodes.OK).send({
    appointments,
  });
});

const getAppointmentsByDoctorId = catchAsync(async (req, res) => {
  const doctorId = req.params.doctorId;
  const appointments = await appointmentService.getAppointmentsByDoctorId(
    doctorId
  );
  res.status(StatusCodes.OK).send({
    appointments,
  });
});

const getAppointmentsByDoctorIdAndUserId = catchAsync(async (req, res) => {
  const doctorId = req.params.doctorId;
  const userId = req.params.userId;

  const appointments = await appointmentService.getAppointmentsByDoctorId(
    doctorId
  );
  const formatAppointments = appointments.map((appointment) => {
    if (appointment.userId.id === userId) {
      return appointment;
    }

    return {
      doctorId: appointment.doctorId,
      userId: appointment.userId.id,
      title: "Busy",
      description: "Busy",
      startDate: appointment.startDate,
      endDate: appointment.endDate,
      status: REQUEST_STATUSES.CONFIDENTIAL,
      id: appointment.id,
    };
  });
  res.status(StatusCodes.OK).send({
    appointments: formatAppointments,
  });
});

const updateAppointment = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updateBody = req.body;
  const appointment = await appointmentService.updateAppointment(
    id,
    updateBody
  );

  res.status(StatusCodes.OK).send({
    appointment,
  });
});

const deleteAppointment = catchAsync(async (req, res) => {
  const id = req.params.id;
  const appointment = await appointmentService.deleteAppointment(id);
  res.status(StatusCodes.OK).send(appointment);
});

module.exports = {
  createAppointment,
  getAppointments,
  getAppointmentById,
  getAppointmentsByUserId,
  updateAppointment,
  deleteAppointment,
  getAppointmentsByDoctorId,
  getAppointmentsByDoctorIdAndUserId,
};

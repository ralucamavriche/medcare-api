const {
  getAppointments,
  createAppointment,
  getAppointmentById,
  updateAppointment
} = require('./appointment.service')
const Appointment = require('../models/appointment.model')
const CustomApiError = require('../utils/CustomApiError')

jest.mock('../models/appointment.model')

describe('appointment.service', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('createAppointment', () => {
    it('should create a new appointment', async () => {
      // Sample appointment data for testing
      const newAppointmentData = {
        title: 'Doctor Appointment',
        date: '2024-04-12T10:00:00.000Z',
        doctor: 'Dr. Smith'
      }

      // Mock the Appointment.create method to resolve with the newly created appointment
      const createdAppointment = {
        _id: '123',
        ...newAppointmentData
      }
      Appointment.create.mockResolvedValue(createdAppointment)

      // Call the createAppointment function
      const result = await createAppointment(newAppointmentData)

      // Assertions
      expect(result).toEqual(createdAppointment) // Ensure the result matches the created appointment
      expect(Appointment.create).toHaveBeenCalledTimes(1) // Ensure Appointment.create was called once
      expect(Appointment.create).toHaveBeenCalledWith(newAppointmentData) // Ensure Appointment.create was called with the correct data
    })

    it('should throw an error if Appointment.create fails', async () => {
      // Mock Appointment.create to reject with an error
      const errorMessage = 'Database error'
      Appointment.create.mockRejectedValue(new Error(errorMessage))

      // Call the createAppointment function and expect it to throw an error
      const newAppointmentData = {
        title: 'Dentist Appointment',
        date: '2024-04-15T14:00:00.000Z',
        dentist: 'Dr. Johnson'
      }
      await expect(createAppointment(newAppointmentData)).rejects.toThrow(
        errorMessage
      )
    })
  })

  describe('getAppointments', () => {
    it('should return all appointments', async () => {
      // Sample appointments data for testing
      const mockAppointments = [
        { _id: '1', title: 'Appointment 1' },
        { _id: '2', title: 'Appointment 2' }
      ]

      // Mock the Appointment.find method to return sample appointments data
      Appointment.find.mockResolvedValue(mockAppointments)

      // Call the function to be tested
      const result = await getAppointments()

      // Assertions
      expect(result).toEqual(mockAppointments) // Check if the result matches the mock data
      expect(Appointment.find).toHaveBeenCalledTimes(1) // Check if Appointment.find was called once
      expect(Appointment.find).toHaveBeenCalledWith({}) // Check if Appointment.find was called with empty query ({})

      // Additional assertions based on your function's logic
      expect(result.length).toBe(2) // Check if the number of appointments returned is correct
    })
  })

  describe('getAppointmentById', () => {
    it('should return the appointment with the given id', async () => {
      // Sample appointment data for testing
      const appointmentId = '123'
      const mockAppointment = {
        _id: appointmentId,
        title: 'Doctor Appointment',
        date: '2024-04-12T10:00:00.000Z',
        doctor: 'Dr. Smith'
      }

      // Mock the Appointment.findById method to resolve with the sample appointment
      Appointment.findById.mockResolvedValue(mockAppointment)

      // Call the getAppointmentById function with the appointmentId
      const result = await getAppointmentById(appointmentId)

      // Assertions
      expect(result).toEqual(mockAppointment) // Ensure the result matches the mock appointment
      expect(Appointment.findById).toHaveBeenCalledTimes(1) // Ensure Appointment.findById was called once
      expect(Appointment.findById).toHaveBeenCalledWith(appointmentId) // Ensure Appointment.findById was called with the correct id
    })

    it('should throw a CustomApiError with status 404 if appointment is not found', async () => {
      // Mock Appointment.findById to resolve with null (appointment not found)
      Appointment.findById.mockResolvedValue(null)

      // Call the getAppointmentById function with a non-existing appointmentId
      const nonExistingId = '456'
      await expect(getAppointmentById(nonExistingId)).rejects.toThrowError(
        new CustomApiError(404, 'Appointment not found!')
      )

      // Ensure Appointment.findById was called with the correct id
      expect(Appointment.findById).toHaveBeenCalledTimes(1)
      expect(Appointment.findById).toHaveBeenCalledWith(nonExistingId)
    })

    it('should throw an error if Appointment.findById fails', async () => {
      // Mock Appointment.findById to reject with an error
      const errorMessage = 'Database error'
      Appointment.findById.mockRejectedValue(new Error(errorMessage))

      // Call the getAppointmentById function and expect it to throw an error
      const appointmentId = '789'
      await expect(getAppointmentById(appointmentId)).rejects.toThrow(
        errorMessage
      )
    })
  })

  describe('updateAppointment', () => {
    it('should update an existing appointment', async () => {
      // Sample appointment data for testing
      const appointmentId = '123'
      const updateBody = {
        title: 'Updated Doctor Appointment',
        date: '2024-04-15T10:00:00.000Z',
        doctor: 'Dr. Johnson'
      }

      const mockData = {
        _id: appointmentId,
        title: 'Doctor Appointment',
        date: '2024-04-12T10:00:00.000Z',
        doctor: 'Dr. Smith'
      }

      // Mock the Appointment.findById and appointment.save methods
      const existingAppointment = {
        ...mockData,
        save: jest.fn().mockResolvedValue({
          ...mockData,
          ...updateBody
        })
      }
      Appointment.findById.mockResolvedValue(existingAppointment)

      // Call the updateAppointment function with appointmentId and updateBody
      const result = await updateAppointment(appointmentId, updateBody)

      // Assertions
      expect(result).toEqual({
        ...mockData,
        ...updateBody
      }) // Ensure the result matches the updated appointment
      expect(Appointment.findById).toHaveBeenCalledTimes(1) // Ensure Appointment.findById was called once
      expect(Appointment.findById).toHaveBeenCalledWith(appointmentId) // Ensure Appointment.findById was called with the correct id
      expect(existingAppointment.save).toHaveBeenCalledTimes(1) // Ensure appointment.save was called once
    })

    it('should throw a CustomApiError with status 404 if appointment is not found', async () => {
      // Mock Appointment.findById to resolve with null (appointment not found)
      Appointment.findById.mockResolvedValue(null)

      // Call the updateAppointment function with a non-existing appointmentId
      const nonExistingId = '456'
      await expect(updateAppointment(nonExistingId, {})).rejects.toThrowError(
        new CustomApiError(404, 'Appointment not found!')
      )

      // Ensure Appointment.findById was called with the correct id
      expect(Appointment.findById).toHaveBeenCalledTimes(1)
      expect(Appointment.findById).toHaveBeenCalledWith(nonExistingId)
    })

    it('should throw an error if Appointment.findById fails', async () => {
      // Mock Appointment.findById to reject with an error
      const errorMessage = 'Database error'
      Appointment.findById.mockRejectedValue(new Error(errorMessage))

      // Call the updateAppointment function and expect it to throw an error
      const appointmentId = '789'
      await expect(updateAppointment(appointmentId, {})).rejects.toThrow(
        errorMessage
      )
    })
  })
})

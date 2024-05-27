const { UserService } = require('../services')
const catchAsync = require('../utils/catchAsync')
const { StatusCodes } = require('http-status-codes')

const getUsers = catchAsync(async (req, res) => {
  const users = await UserService.getUsers(req.body)

  res.status(StatusCodes.OK).send({
    users
  })
})

const createUser = catchAsync(async (req, res) => {
  const user = await UserService.createUser(req.body)
  res.status(StatusCodes.CREATED).send({
    user
  })
})

const getUserById = catchAsync(async (req, res) => {
  const id = req.params.id
  const user = await UserService.getUserById(id)
  res.status(StatusCodes.OK).send({
    user
  })
})

const deleteUser = catchAsync(async (req, res) => {
  const id = req.params.id
  const user = await UserService.deleteUser(id)
  res.status(StatusCodes.OK).send(user)
})

const updateUser = catchAsync(async (req, res) => {
  const id = req.params.id
  const updateBody = req.body
  const user = await UserService.updateUser(id, updateBody)
  res.status(StatusCodes.OK).send({
    user
  })
})

const getDoctorAccountsInPendingState = catchAsync(async (req, res) => {
  const doctors = await UserService.getDoctorAccountsInPendingState()

  res.status(StatusCodes.OK).send({
    doctors
  })
})

const getPatientAccountsInPendingState = catchAsync(async (req, res) => {
  const patients = await UserService.getPatientAccountsInPendingState()

  res.status(StatusCodes.OK).send({
    patients
  })
})

module.exports = {
  getUsers,
  createUser,
  getUserById,
  deleteUser,
  updateUser,
  getDoctorAccountsInPendingState,
  getPatientAccountsInPendingState
}

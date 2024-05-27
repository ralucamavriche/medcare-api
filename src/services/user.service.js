const User = require('../models/user.model')
const CustomApiError = require('../utils/CustomApiError')
const { StatusCodes } = require('http-status-codes')


/**
 * Get all users
 * @returns {Promise<User>}
 */
const getUsers = async () => {
  const users = await User.find({})
  return users
}

/**
 * Create user
 * @param {Object} user
 * @returns {Promise<User>}
 */
const createUser = async (user) => {
  return User.create(user)
}

/**
 * Get user by ID
 * @param {String} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  const user = await User.findById(id)
  if (!user) {
    throw new CustomApiError(StatusCodes.NOT_FOUND, 'User not found!')
  }
  return user
}

/**
 * Get User By Email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.findOne({ email })
}

/**
 * Delete user
 * @param {String} id
 * @returns {Promise<User>}
 */
const deleteUser = async (id) => {
  const user = await User.findById(id)
  if (!user) {
    throw new CustomApiError(StatusCodes.NOT_FOUND, 'User not found!')
  }
  await user.deleteOne()
  return user
}

/**
 * Update user by ID
 * @param {String} id
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUser = async (id, updateBody) => {
  const user = await User.findById(id)
  if (!user) {
    throw new CustomApiError(StatusCodes.NOT_FOUND, 'User not found!')
  }
  Object.assign(user, updateBody)
  await user.save()
  return user
}

/**
 * Get all doctor accounts in PENDING state
 * @returns {Promise<User>}
 */
const getDoctorAccountsInPendingState = async () => {
  const doctors = await User.find({ role: 'doctor', status: 'PENDING' })
  return doctors
}

/**
 * Get all patient accounts in PENDING state
 * @returns {Promise<User>}
 */
const getPatientAccountsInPendingState = async () => {
  const patients = await User.find({ role: 'user', status: 'PENDING' })
  return patients
}

module.exports = {
  getUsers,
  createUser,
  getUserById,
  deleteUser,
  updateUser,
  getUserByEmail,
  getDoctorAccountsInPendingState,
  getPatientAccountsInPendingState
  
}

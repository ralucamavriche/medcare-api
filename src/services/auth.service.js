const httpStatus = require('http-status')
const UserService = require('./user.service')
const CustomApiError = require('../utils/CustomApiError')

/**
 * Login with email and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginWithEmailAndPassword = async (email, password) => {
  const user = await UserService.getUserByEmail(email)

  // if !user or password doesn't match then return false and throw an error
  const isPasswordMatch = !user
    ? false
    : await user.isPasswordMatching(password)

  if (!isPasswordMatch) {
    throw new CustomApiError(
      httpStatus.BAD_REQUEST,
      httpStatus[httpStatus.BAD_REQUEST],
      ['Email or password incorrect']
    )
  }
  return user
}

module.exports = {
  loginWithEmailAndPassword
}

const jwt = require('jsonwebtoken')
const moment = require('moment')
const httpStatus = require('http-status')
const config = require('../config')
const Token = require('../models/token.model')
const UserService = require('./user.service')
const CustomApiError = require('../utils/CustomApiError')

/**
 * Generate a token jwt based on userId and a secret
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {String} type
 * @param {String} secret
 * @returns {String}
 */

const generateToken = (userId, expires, type, secret = config.JWT.SECRET) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type
  }
  return jwt.sign(payload, secret)
}

/**
 * Save a token to DB
 * @param {string} token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @returns {Promise<Token>}
 */
const saveToken = async (token, userId, expires, type) => {
  const resToken = await Token.create({
    token,
    user: userId,
    expires: expires.toDate(),
    type
  })

  return resToken
}

/**
 * Verify token and return token from db or throw error if is not valid
 * @param {string} token
 * @param {string} type
 * @returns {Promise<Token>}
 */
const verifyToken = async (token, type) => {
  const payload = jwt.verify(token, config.JWT.SECRET)

  const tokenDoc = await Token.findOne({
    token,
    type,
    user: payload.sub
  })

  if (!tokenDoc) {
    throw new CustomApiError(
      httpStatus.NOT_FOUND,
      httpStatus[httpStatus.NOT_FOUND],
      ['Token not found in DB']
    )
  }

  return tokenDoc
}

/**
 * @param {User} user
 * @returns {Promise<Object>}
 */
const generateAuthToken = async (user) => {
  // set the expiration for access token
  const accessTokenExpires = moment().add(
    config.JWT.JWT_ACCESS_EXPIRATION_MINUTES,
    'minutes'
  )

  // generate access token
  const accessToken = generateToken(
    user.id,
    accessTokenExpires,
    config.TOKEN_TYPES.ACCESS
  )

  return accessToken
}

/**
 * Generate reset password token
 * @param {string} email
 * @returns {Promise<string>}
 */
const generateResetPasswordToken = async (email) => {
  const user = await UserService.getUserByEmail(email)

  if (!user) {
    throw new CustomApiError(
      httpStatus.NOT_FOUND,
      'No users found with this email'
    )
  }

  const expires = moment().add(
    config.JWT.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    'minutes'
  )

  const resetPasswordToken = generateToken(
    user.id,
    expires,
    config.TOKEN_TYPES.RESET_PASSWORD
  )

  await saveToken(
    resetPasswordToken,
    user.id,
    expires,
    config.TOKEN_TYPES.RESET_PASSWORD
  )
  return resetPasswordToken
}

/**
 * Generate verify email token
 * @param {User} user
 * @returns {Promise<string>}
 */
const generateVerifyEmailToken = async (user) => {
  const expires = moment().add(
    config.JWT.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
    'minutes'
  )

  const verifyEmailToken = generateToken(
    user.id,
    expires,
    config.TOKEN_TYPES.VERIFY_EMAIL
  )

  await saveToken(
    verifyEmailToken,
    user.id,
    expires,
    config.TOKEN_TYPES.VERIFY_EMAIL
  )

  return verifyEmailToken
}

module.exports = {
  generateToken,
  saveToken,
  verifyToken,
  generateAuthToken,
  generateResetPasswordToken,
  generateVerifyEmailToken
}

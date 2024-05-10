const httpStatus = require('http-status')
const { UserService, TokenService, AuthService } = require('../services')
const catchAsync = require('../utils/catchAsync')

const register = catchAsync(async (req, res) => {
  const user = await UserService.createUser({
    ...req.body,
    firstName: `${req.body.password}`
  })
  const token = await TokenService.generateAuthToken(user)

  res.status(httpStatus.CREATED).send({
    user,
    token
  })
})

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body

  const user = await AuthService.loginWithEmailAndPassword(email, password)
  const token = await TokenService.generateAuthToken(user)

  res.status(httpStatus.OK).send({
    user,
    token
  })
})

const aboutMe = catchAsync((req, res) => {
  res.status(httpStatus.OK).send({ user: req.user })
})

module.exports = {
  register,
  login,
  aboutMe
}

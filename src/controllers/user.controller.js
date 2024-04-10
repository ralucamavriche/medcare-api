const { userService } = require('../services')
const catchAsync = require('../utils/catchAsync')

const getUsers = catchAsync(async (req, res) => {
  const users = await userService.getUsers(req.body)

  res.status(200).send({
    users
  })
})

const createUser = catchAsync(async (req, res) => {
  const { email, password } = req.body
  const user = await userService.createUser({ email, password })
  res.status(201).send({
    user
  })
})

const getUserById = catchAsync(async (req, res) => {
  const id = req.params.id
  const user = await userService.getUserById(id)
  res.status(200).send({
    user
  })
})

const deleteUser = catchAsync(async (req, res) => {
  const id = req.params.id
  const user = await userService.deleteUser(id)
  res.status(200).send(user)
})

const updateUser = catchAsync(async (req, res) => {
  const id = req.params.id
  const updateBody = req.body
  const user = userService.updateUser(id, updateBody)
  res.status(200).send({
    user
  })
})

module.exports = {
  getUsers,
  createUser,
  getUserById,
  deleteUser,
  updateUser
}

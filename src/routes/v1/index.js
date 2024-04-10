const express = require('express')
const userRoute = require('./user.route')
const appointmentRoute = require('./appointment.route')
const questionRoute = require('./question.route')
const feedbackRoute = require('./feedback.route')

const router = express.Router()

const defaultRoutes = [
  {
    path: '/users',
    route: userRoute
  },
  {
    path: '/appointment',
    route: appointmentRoute
  },
  {
    path: '/question',
    route: questionRoute
  },
  {
    path: '/feedback',
    route: feedbackRoute
  }
]

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route)
})

module.exports = router
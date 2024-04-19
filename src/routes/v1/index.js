const express = require('express')
const authRoute = require('./auth.route')
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
    path: '/auth',
    route: authRoute
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

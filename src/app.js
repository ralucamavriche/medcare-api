const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const routes = require('./routes/v1')
const CustomApiError = require('./utils/CustomApiError')
const { StatusCodes, ReasonPhrases } = require('http-status-codes')

const swaggerDocument = require('./docs/swagger.json')
const passport = require('passport')
const { jwtStrategy } = require('./middlewares/passport')

const app = express()

app.use(express.json())

// add security HTTP headers
app.use(helmet())

app.use(passport.initialize())
passport.use('jwt', jwtStrategy)

// cors
app.use(cors())
app.options('*', cors())

app.get('/', (_, res) =>
  res.status(StatusCodes.OK).send({
    message: 'Hello Raluca',
    msg: ReasonPhrases.OK,
    status: StatusCodes.OK
  })
)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use('/v1', routes)

// send back a 404 error for any unknown api request
app.use((req, __, next) => {
  return next(
    new CustomApiError(
      StatusCodes.NOT_FOUND,
      `Resource not found at path: ${req.url}`
    )
  )
})

app.use((err, _, res) => {
  const {
    message = ReasonPhrases.INTERNAL_SERVER_ERROR,
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR
  } = err

  return res.status(statusCode).send({
    error: message,
    statusCode
  })
})

module.exports = app

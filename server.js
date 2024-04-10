const express = require('express')
const mongoose = require('mongoose')
const helmet = require('helmet')
const cors = require('cors')
const routes = require('./src/routes/v1')
const config = require('./src/config')
const CustomApiError = require('./src/utils/CustomApiError')
const { StatusCodes, ReasonPhrases } = require('http-status-codes')

const app = express()

app.use(express.json())

// add security HTTP headers
app.use(helmet())

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

app.use((err, _, res, __) => {
  const {
    message = ReasonPhrases.INTERNAL_SERVER_ERROR,
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR
  } = err

  return res.status(statusCode).send({
    error: message,
    statusCode
  })
})

mongoose
  .connect(config.MONGODB_URL)
  .then(() => {
    console.log('MongoDB Connected...')
    app.listen(config.PORT, () =>
      console.log(`Server started on port ${config.PORT}`)
    )
  })
  .catch((err) => console.log(err))

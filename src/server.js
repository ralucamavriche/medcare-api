const app = require('./app')
const mongoose = require('mongoose')
const config = require('./config')

let server

mongoose
  .connect(config.MONGODB_URL)
  .then(() => {
    console.log('MongoDB Connected...')
    server = app.listen(config.PORT, () =>
      console.log(`Server started on port ${config.PORT}`)
    )
  })
  .catch((err) => console.log(err))

const unexpectedErrorHandler = (error) => {
  console.log('[ERROR_HANDLER]: Cause:', error)
  console.log('[ERROR_HANDLER]: Closing server...:')

  if (server) {
    server.close(() => process.exit(1))
  } else {
    process.exit(1)
  }
}

const handleSIGTERM = () => {
  console.log('[SIGTERM] event received')
  if (server) {
    server.close()
  }
}

process.on('uncaughtException', unexpectedErrorHandler)
process.on('unhandleRejection', unexpectedErrorHandler)

process.on('SIGTERM', handleSIGTERM)

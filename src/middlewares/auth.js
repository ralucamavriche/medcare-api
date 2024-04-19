const passport = require('passport')
const httpStatus = require('http-status')
const CustomApiError = require('../utils/CustomApiError')

const auth = (role) => (req, res, next) => {
  return passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err || info || !user) {
      return next(
        new CustomApiError(
          httpStatus.UNAUTHORIZED,
          'Please authenticate to access this route'
        )
      )
    }

    req.user = user

    if (role && user.role !== role) {
      return next(
        new CustomApiError(
          httpStatus.FORBIDDEN,
          'Do not have rights to execute this operation'
        )
      )
    }

    return next()
  })(req, res, next)
}

module.exports = auth

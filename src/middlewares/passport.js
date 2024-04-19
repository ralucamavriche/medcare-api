const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')
const config = require('../config')
const { User } = require('../models')
const httpStatus = require('http-status')
const CustomApiError = require('../utils/CustomApiError')

const jwtOptions = {
  secretOrKey: config.JWT.SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

const jwtVerify = async (payload, done) => {
  try {
    if (payload.type !== config.TOKEN_TYPES.ACCESS) {
      throw new CustomApiError(
        httpStatus.FORBIDDEN,
        httpStatus[httpStatus.FORBIDDEN]
      )
    }

    const user = await User.findById(payload.sub)

    if (!user) {
      return done(null, false)
    }

    done(null, user)
  } catch (error) {
    done(error, false)
  }
}

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify)

module.exports = {
  jwtStrategy
}

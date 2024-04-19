const mongoose = require('mongoose')
const { TOKEN_TYPES } = require('../config')
const { toJSON } = require('./shared')

const tokenSchema = mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      index: true
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true
    },
    type: {
      type: String,
      enum: [TOKEN_TYPES.REFRESH],
      required: true
    },
    expires: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: true
  }
)

tokenSchema.set('toObject', {
  transform: toJSON
})

tokenSchema.set('toJSON', {
  transform: toJSON
})

/**
 * @typedef Token
 */
const Token = mongoose.model('Token', tokenSchema)

module.exports = Token

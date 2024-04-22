const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const { toJSON } = require('./shared')
const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  address: {
    type: String
  },
  city: {
    type: String
  },
  country: {
    type: String
  },
  role: {
    type: String,
    default: 'user'
  }
})

userSchema.set('toObject', {
  transform: toJSON
})

userSchema.set('toJSON', {
  transform: toJSON
})

/**
 *
 * @param {string} email // User Email
 * @param {ObjectId} excludeUserId // If you want to exclude an Id
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({
    email,
    _id: { $ne: excludeUserId } // not equal to that id
  })

  // check is user already exist in DB
  return !!user
}

const isPasswordMatchingFn = async function (password) {
  return bcrypt.compare(password, this.password)
}

/**
 *
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatching = isPasswordMatchingFn

const userPreSaveHook = async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10)
  }
  next()
}

// Encrypt pasword before saving the document
userSchema.pre('save', userPreSaveHook)

const User = mongoose.model('user', userSchema)

module.exports = User

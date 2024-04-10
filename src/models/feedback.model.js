const mongoose = require('mongoose')
const Schema = mongoose.Schema

const feedbackSchema = new Schema({
  rating: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  }
})

const Feedback = mongoose.model('feedback', feedbackSchema)

module.exports = Feedback

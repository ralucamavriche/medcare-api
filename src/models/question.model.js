const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema({
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  }
})

const Question = mongoose.model('question', questionSchema)

module.exports = Question

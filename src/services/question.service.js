const Question = require('../models/question.model')
const CustomApiError = require('../utils/CustomApiError')
const { StatusCodes } = require('http-status-codes')


/**
 * Get all guestions
 * @returns {Promise<Question>}
 */
const getQuestions = async () => {
  const questions = await Question.find({})
  return questions
}

/**
 * Create question
 * @param {Object} question
 * @returns {Pomise<Question>}
 */
const createQuestion = async (question) => {
  return Question.create(question)
}

/**
 *
 * @param {string} id
 * @returns {Pomise<Question>}
 */
const getQuestionById = async (id) => {
  const question = await Question.findById(id)
  // console.log(question);
  if (!question) {
    throw new CustomApiError(StatusCodes.NOT_FOUND, 'Question not found')
  }
  return question
}

/**
 * Update question
 * @param {String} id
 * @param {Object} updateBody
 * @returns {Pomise<Question>}
 */
const updateQuestion = async (id, updateBody) => {
  const question = await Question.findById(id)

  if (!question) {
    throw new CustomApiError(StatusCodes.NOT_FOUND, 'Question not found')
  }
  Object.assign(question, updateBody)
  await question.save()
  return question
}

/**
 * Delete question
 * @param {String} id
 * @returns {Pomise<Question>}
 */
const deleteQuestion = async (id) => {
  const question = await Question.findById(id)

  if (!question) {
    throw new CustomApiError(StatusCodes.NOT_FOUND, 'Question not found!')
  }
  await question.deleteOne()
  return question
}

module.exports = {
  getQuestions,
  createQuestion,
  getQuestionById,
  updateQuestion,
  deleteQuestion
}

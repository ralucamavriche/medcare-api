const Feedback = require('../models/feedback.model')
const CustomApiError = require('../utils/CustomApiError')

/**
 * Get all feedbacks
 * @returns {Promise<Feedback>}
 */
const getFeedbacks = async () => {
  const feedbacks = await Feedback.find({})
  return feedbacks
}

/**
 * Get feedback by Id
 * @param {String} id
 * @returns {Promise<Feedback>}
 */
const getFeedbackById = async (id) => {
  const feedback = await Feedback.findById(id)
  if (!feedback) {
    throw new CustomApiError(404, 'Feedback not found!')
  }
  return feedback
}

/**
 * Create feedback
 * @param {Object} feedback
 * @returns {Promise<Feedback>}
 */
const createFeedback = async (feedback) => {
  return await Feedback.create(feedback)
}

/**
 * Update feedback by Id
 * @param {String} id
 * @param {Object} idupdateBody
 * @returns {Promise<Feedback>}
 */
const updateFeedback = async (id, updateBody) => {
  const feedback = await Feedback.findById(id)
  if (!feedback) {
    throw new CustomApiError(404, 'Feedback not found!')
  }
  Object.assign(feedback, updateBody)
  await feedback.save()
  return feedback
}

/**
 * Delete feedback by Id
 * @param {String} id
 * @returns {Promise<Feedback>}
 */
const deleteFeeback = async (id) => {
  const feedback = await Feedback.findById(id)
  if (!feedback) {
    throw new CustomApiError(404, 'Feedback not found!')
  }
  await feedback.deleteOne()
  return feedback
}

module.exports = {
  getFeedbacks,
  getFeedbackById,
  createFeedback,
  updateFeedback,
  deleteFeeback
}

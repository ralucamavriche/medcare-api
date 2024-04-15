const { feedbackService } = require('../services')
const catchAsync = require('../utils/catchAsync')
const { StatusCodes } = require('http-status-codes')

const getFeedbacks = catchAsync(async (req, res) => {
  const feedbacks = await feedbackService.getFeedbacks()
  res.status(StatusCodes.OK).send({
    feedbacks
  })
})

const getFeedbackById = catchAsync(async (req, res) => {
  const id = req.params.id
  const feedback = await feedbackService.getFeedbackById(id)
  res.status(StatusCodes.OK).send({
    feedback
  })
})

const createFeedback = catchAsync(async (req, res) => {
  const { rating, description, author } = req.body
  const feedback = await feedbackService.createFeedback({
    rating,
    description,
    author
  })
  res.status(StatusCodes.CREATED).send({
    feedback
  })
})

const updateFeedback = catchAsync(async (req, res) => {
  const id = req.params.id
  const updateBody = req.body

  const feedback = await feedbackService.updateFeedback(id, updateBody)
  res.status(StatusCodes.OK).send({
    feedback
  })
})

const deleteFeedback = catchAsync(async (req, res) => {
  const id = req.params.id
  const feedback = await feedbackService.deleteFeeback(id)
  res.status(StatusCodes.OK).send(feedback)
})

module.exports = {
  getFeedbacks,
  getFeedbackById,
  createFeedback,
  updateFeedback,
  deleteFeedback
}

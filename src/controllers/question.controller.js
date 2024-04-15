const { questionService } = require('../services')
const catchAsync = require('../utils/catchAsync')
const { StatusCodes } = require('http-status-codes')

const getQuestions = catchAsync(async (req, res) => {
  const questions = await questionService.getQuestions()
  res.status(StatusCodes.OK).send({
    questions
  })
})

const getQuestionById = catchAsync(async (req, res) => {
  console.log(req)
  const id = req.params.id
  console.log(id)
  const question = await questionService.getQuestionById(id)
  res.status(StatusCodes.OK).send({
    question
  })
})

const createQuestion = catchAsync(async (req, res) => {
  const { question, answer } = req.body
  const newQuestion = await questionService.createQuestion({ question, answer })
  res.status(StatusCodes.CREATED).send({
    newQuestion
  })
})

const updateQuestion = catchAsync(async (req, res) => {
  const id = req.params.id
  const updateQuestion = await questionService.updateQuestion(id, req.body)
  res.status(StatusCodes.OK).send({
    updateQuestion
  })
})

const deleteQuestion = catchAsync(async (req, res) => {
  const id = req.params.id
  await questionService.deleteQuestion(id)
  res.status(StatusCodes.OK).send({})
})

module.exports = {
  getQuestions,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion
}

const { questionService } = require('../services')
const catchAsync = require('../utils/catchAsync')

const getQuestions = catchAsync(async (req, res) => {
  const questions = await questionService.getQuestions()
  res.status(200).send({
    questions
  })
})

const getQuestionById = catchAsync(async (req, res) => {
  console.log(req)
  const id = req.params.id
  console.log(id)
  const question = await questionService.getQuestionById(id)
  res.status(200).send({
    question
  })
})

const createQuestion = catchAsync(async (req, res) => {
  const { question, answer } = req.body
  const newQuestion = await questionService.createQuestion({ question, answer })
  res.status(201).send({
    newQuestion
  })
})

const updateQuestion = catchAsync(async (req, res) => {
  const id = req.params.id
  const updateQuestion = await questionService.updateQuestion(id, req.body)
  res.status(200).send({
    updateQuestion
  })
})

const deleteQuestion = catchAsync(async (req, res) => {
  const id = req.params.id
  await questionService.deleteQuestion(id)
  res.status(200).send({})
})

module.exports = {
  getQuestions,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion
}

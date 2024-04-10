const express = require('express')
const router = express.Router()
const { questionController } = require('../../controllers')
const validate = require('../../middlewares/validate')
const questionValidation = require('../../validation/question.validation')

router
  .route('/')
  .post(
    validate(questionValidation.createQuestion),
    questionController.createQuestion
  )
  .get(
    validate(questionValidation.getQuestions),
    questionController.getQuestions
  )

router
  .route('/:id')
  .get(
    validate(questionValidation.getQuestionById),
    questionController.getQuestionById
  )
  .patch(
    validate(questionValidation.updateQuestion),
    questionController.updateQuestion
  )
  .delete(
    validate(questionValidation.deleteQuestion),
    questionController.deleteQuestion
  )

module.exports = router

const Joi = require('joi')
const { objectId } = require('./custom.validation')

const getQuestionById = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId)
  })

}

const createQuestion = {
  body: Joi.object().keys({
    question: Joi.string().required(),
    answer: Joi.string().required()
  })
}

const updateQuestion = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId)
  }),
  body: Joi.object().keys({
    question: Joi.string(),
    answer: Joi.string()
  })

}

const deleteQuestion = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId)
  })

}

module.exports = {
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion
}

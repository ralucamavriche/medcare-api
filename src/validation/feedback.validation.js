const Joi = require('joi');
const { objectId } = require('./custom.validation');

const getFeedbackById = {
    params: Joi.object().keys({
        id: Joi.string().custom(objectId),
    }),

};

const createFeedback = {
    body: Joi.object().keys({
        rating: Joi.string().required(),
        description: Joi.string().required(),
        author: Joi.string().required()
    })

};

const updateFeedback = {
    params: Joi.object().keys({
        id: Joi.string().custom(objectId)
    }),
    body: Joi.object().keys({
        rating: Joi.string(),
        description: Joi.string(),
        author: Joi.string()
    })
}

const deleteFeedback = {
    params: Joi.object().keys({
        id: Joi.string().custom(objectId)
    })
}

module.exports = {
    createFeedback,
    getFeedbackById,
    updateFeedback,
    deleteFeedback
}

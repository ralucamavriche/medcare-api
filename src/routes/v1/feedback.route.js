const express = require('express');
const router = express.Router();
const { feedbackController } = require('../../controllers');
const validate = require('../../middlewares/validate');
const feedbackValidation = require('../../validation/feedback.validation');

router
    .route('/')
    .get(
        feedbackController.getFeedbacks
    )
    .post(
        validate(feedbackValidation.createFeedback),
        feedbackController.createFeedback
    )

router
    .route('/:id')
    .get(
        validate(feedbackValidation.getFeedbackById),
        feedbackController.getFeedbackById
    )
    .patch(
        validate(feedbackValidation.updateFeedback),
        feedbackController.updateFeedback
    )
    .delete(
        validate(feedbackValidation.deleteFeedback),
        feedbackController.deleteFeedback
    )

module.exports = router;
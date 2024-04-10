const express = require('express');
const { userController } = require('../../controllers');
const router = express.Router();
const validate = require('../../middlewares/validate');
const userValidation = require('../../validation/user.validation');

router
    .route('/')
    .get(
        // validate(userValidation.getUsers),
        userController.getUsers
    )
    .post(
        validate(userValidation.createUser),
        userController.createUser
    )

router
    .route('/:id')
    .get(
        validate(userValidation.getUserById),
        userController.getUserById
    )
    .delete(
        validate(userValidation.deleteUser),
        userController.deleteUser
    )
    .patch(
        validate(userValidation.updateUser),
        userController.updateUser
    )

module.exports = router;

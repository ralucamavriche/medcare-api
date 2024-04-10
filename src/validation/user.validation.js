const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const getUsers = {
    query: Joi.object().keys({
        email: Joi.string().email(),
        password: Joi.string().required().custom(password),
        role: Joi.string()
    }),

}

const getUserById = {
    params: Joi.object().keys({
        id: Joi.string().custom(objectId),
    }),
};

const createUser = {
    body: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().custom(password).required()
    }),
};

const deleteUser = {
    params: Joi.object().keys({
        id: Joi.string().custom(objectId),
    })

}

const updateUser = {
    params: Joi.object().keys({
        id: Joi.string().custom(objectId),
    }),
    body: Joi.object().keys({
        email: Joi.string().email(),
        password: Joi.string().custom(password),
    }),

}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    deleteUser,
    updateUser
}
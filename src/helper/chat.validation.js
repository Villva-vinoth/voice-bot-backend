const joi = require('joi');

const chatSchema = joi.object({
    query: joi.string().min(5).required().messages(
        {
            'string.empty': 'Query cannot be empty',
            'any.required': 'Query is required',
            'string.min': 'Query must be at least 5 character long',
        }
    ),
    userId: joi.string().required().messages(
        {
            'string.empty': 'User id cannot be empty',
            'any.required': 'User id is required',
        }
    ),
});

module.exports = {chatSchema};
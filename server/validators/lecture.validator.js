import Joi from "joi";

export const lectureSchema = Joi.object({
    title: Joi.string().required().messages({
        'string.empty': 'Title is required',
        'any.required': 'Title is required'
    }),
    description: Joi.string().required().messages({
        'string.empty': 'Description is required',
        'any.required': 'Description is required'
    }),
    url: Joi.string().uri().required().messages({
        'string.empty': 'URL is required',
        'string.uri': 'Please provide a valid URL',
        'any.required': 'URL is required'
    }),
});

export const validateLectureData = async (req, res, next) => {
    const { error } = lectureSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        })
    }

    next();
}

import Joi from 'joi';

export const moduleValidationSchema = Joi.object({
  title: Joi.string()
    .max(120)
    .trim()
    .required()
    .messages({
      'string.base': 'Module title must be a string',
      'string.empty': 'Module title is required',
      'string.max': 'Module title should be maximum 120 characters',
      'any.required': 'Module title is required',
    }),

  titleSlug: Joi.string()
    .trim()
    .optional()
    .messages({
      'string.base': 'Slug must be a string',
    }),

  // order: Joi.number()
  //   .required()
  //   .messages({
  //     'number.base': 'Order must be a number',
  //     'any.required': 'Order is required',
  //   }),

  courseId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      'string.pattern.base': 'Invalid courseId format',
      'any.required': 'courseId is required',
    }),
});

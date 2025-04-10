import Joi from 'joi';

export const courseValidationSchema = Joi.object({
  title: Joi.string()
    .max(80)
    .trim()
    .required()
    .messages({
      'string.base': 'Title must be a string.',
      'string.max': 'Title should be a maximum of 80 characters.',
      'string.empty': 'Title is required.',
      'any.required': 'Title is required.',
    }),

  subtitle: Joi.string()
    .max(200)
    .trim()
    .allow('')
    .messages({
      'string.base': 'Subtitle must be a string.',
      'string.max': 'Subtitle should be a maximum of 200 characters.',
    }),

  description: Joi.string()
    .max(3000)
    .trim()
    .allow('')
    .messages({
      'string.base': 'Description must be a string.',
      'string.max': 'Description should be a maximum of 3000 characters.',
    }),

  language: Joi.string()
    .trim()
    .required()
    .messages({
      'string.base': 'Language must be a string.',
      'string.empty': 'Language is required.',
      'any.required': 'Language is required.',
    }),

  level: Joi.string()
    .trim()
    .required()
    .valid("beginner", "intermediate", "expert", "all")
    .messages({
      'string.base': 'Level must be a string.',
      'string.empty': 'Level is required.',
      'any.required': 'Level is required.',
      'any.only': 'Level must be either "beginner", "intermediate", "expert", or "all".'
    }),

  courseImageUrl: Joi.string()
    .trim()
    .uri()
    .allow('')
    .messages({
      'string.base': 'Course Image URL must be a string.',
      'string.uri': 'Course Image URL must be a valid URI.',
    }),

  price: Joi.number()
    .min(0)
    .required()
    .messages({
      'number.base': 'Price must be a number.',
      'number.min': 'Price must be at least 0.',
      'any.required': 'Price is required.',
    }),

  category: Joi.string()
    .trim()
    .allow('')
    .messages({
      'string.base': 'Category must be a string.',
    }),

}).options({ allowUnknown: false, stripUnknown: true });

export const courseUpdateValidationSchema = Joi.object({
  title: Joi.string()
    .max(80)
    .trim()
    .messages({
      'string.base': 'Title must be a string.',
      'string.max': 'Title should be a maximum of 80 characters.',
    }),

  // description: Joi.string()
  //   .max(3000)
  //   .trim()
  //   .allow(null)
  //   .messages({
  //     'string.base': 'Description must be a string.',
  //     'string.max': 'Description should be a maximum of 3000 characters.',
  //   }),

  language: Joi.string()
    .trim()
    .messages({
      'string.base': 'Language must be a string.',
    }),

  level: Joi.string()
    .trim()
    .valid("beginner", "intermediate", "expert", "all")
    .messages({
      'string.base': 'Level must be a string.',
      'any.only': 'Level must be either "beginner", "intermediate", "expert", or "all".'
    }),

  courseImageUrl: Joi.string()
    .trim()
    .uri()
    .allow(null)
    .messages({
      'string.base': 'Course Image URL must be a string.',
      'string.uri': 'Course Image URL must be a valid URI.',
    }),

  price: Joi.number()
    .min(0)
    .messages({
      'number.base': 'Price must be a number.',
      'number.min': 'Price must be at least 0.',
    }),

  category: Joi.string()
    .trim()
    .messages({
      'string.base': 'Category must be a string.',
    }),

  students: Joi.forbidden(),
  reviews: Joi.forbidden(),

}).options({ allowUnknown: false, stripUnknown: true, }).min(1)
  .messages({
    'object.min': 'At least one field is required to update the course',
  });
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
    .messages({
      'string.base': 'Level must be a string.',
      'string.empty': 'Level is required.',
      'any.required': 'Level is required.',
    }),

  courseImageUrl: Joi.string()
    .trim()
    .uri()
    .allow('')
    .messages({
      'string.base': 'Course Image URL must be a string.',
      'string.uri': 'Course Image URL must be a valid URI.',
    }),

  price: Joi.object({
    amount: Joi.number()
      .min(0)
      .required()
      .messages({
        'number.base': 'Amount must be a number.',
        'number.min': 'Amount must be at least 0.',
        'any.required': 'Amount is required.',
      }),
  }),

  category: Joi.string()
    .trim()
    .allow('')
    .messages({
      'string.base': 'Category must be a string.',
    }),

  students: Joi.array()
    .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
    .messages({
      'array.base': 'Students must be an array of ObjectIds.',
      'string.pattern.base': 'Each student ID must be a valid ObjectId.',
    }),

  reviews: Joi.array()
    .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
    .messages({
      'array.base': 'Reviews must be an array of ObjectIds.',
      'string.pattern.base': 'Each review ID must be a valid ObjectId.',
    }),
    
}).options({ allowUnknown: true });

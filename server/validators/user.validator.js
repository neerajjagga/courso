import Joi from 'joi';

export const userValidationSchema = Joi.object({
  fullname: Joi.string()
    .min(3)
    .max(20)
    .required()
    .messages({
      'string.base': 'Name must be a string.',
      'string.empty': 'Name is required.',
      'string.max': 'Name should be maximum 20 characters.',
      'string.max': 'Name should be minimum 3 characters.',
      'any.required': 'Name is required.'
    }),

  email: Joi.string()
    .email()
    .required()
    .trim()
    .messages({
      'string.email': 'Please provide a valid email address.',
      'string.empty': 'Email is required.',
      'any.required': 'Email is required.'
    }),

  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.base': 'Password must be a string.',
      'string.empty': 'Password is required.',
      'string.min': 'Password must be at least 6 characters long.',
      'any.required': 'Password is required.'
    }),

  // username: Joi.string()
  //   .min(3)
  //   .required()
  //   .trim()
  //   .messages({
  //     'string.base': 'Username must be a string.',
  //     'string.empty': 'Username is required.',
  //     'string.min': 'Username must be at least 3 characters long.',
  //     'any.required': 'Username is required.'
  //   }),

  role: Joi.string()
    .valid('user', 'admin')
    .default('user')
    .messages({
      'string.base': 'Role must be a string.',
      'any.only': 'Role must be one of "user" or "admin".'
    }),

  interestedInField: Joi.string()
    .trim()
    .messages({
      'string.base': 'Interested In Field must be a string.',
      'string.empty': 'Please select at least one field.',
      'any.required': 'Please select at least one field.'
    }),

  interestedInSkills: Joi.array()
    .items(Joi.string())
    .min(1)
    .messages({
      'array.base': 'Interested In Skills must be an array of strings.',
      'array.min': 'Please select at least one skill.',
      'any.required': 'Please select at least one skill.'
    }),

  bio: Joi.string()
    .max(300)
    .trim()
    .messages({
      'string.base': 'Bio must be a string.',
      'string.empty': 'Bio should not be empty.',
      'string.max': 'Bio should be a maximum of 300 characters long.'
    }),

  socialLinks: Joi.array()
    .items(Joi.string().uri())
    .messages({
      'array.base': 'Social Links must be an array.',
      'string.uri': 'Each social link must be a valid URL.'
    }),

  enrolledIn: Joi.array()
    .items(Joi.string().hex().length(24))  
    .messages({
      'array.base': 'Enrolled In must be an array of ObjectIds.',
      'string.hex': 'Each course ID must be a valid ObjectId.',
      'string.length': 'Course ID must have a length of 24 hexadecimal characters.'
    }),

}).options({ allowUnknown: true });

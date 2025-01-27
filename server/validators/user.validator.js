import Joi from 'joi';

export const signupValidationSchema = Joi.object({
  fullname: Joi.string()
    .min(3)
    .max(20)
    .required()
    .messages({
      'string.base': 'Fullname must be a string.',
      'string.empty': 'Fullname is required.',
      'string.max': 'Fullname should be maximum 20 characters.',
      'string.min': 'Fullname should be minimum 3 characters.',
      'any.required': 'Fullname is required.'
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

  username: Joi.string()
    .min(3)
    .trim()
    .messages({
      'string.base': 'Username must be a string.',
      'string.empty': 'Username should not be empty.',
      'string.min': 'Username must be at least 3 characters long.'
    }),

  role: Joi.string()
    .valid('user', 'instructor')
    .default('user')
    .messages({
      'string.base': 'Role must be a string.',
      'any.only': 'Role must be one of "user" or "instructor".'
    }),

  interestedInField: Joi.string()
    .trim()
    .messages({
      'string.base': 'Interested In Field must be a string.',
      'string.empty': 'Interested In Field should not be empty.'
    }),

  interestedInSkills: Joi.array()
    .items(Joi.string())
    .min(1)
    .messages({
      'array.base': 'Interested In Skills must be an array of strings.',
      'array.min': 'Please select at least one skill.'
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

  headline: Joi.string()
    .max(60)
    .trim()
    .allow('')
    .messages({
      'string.base': 'Headline must be a string.',
      'string.max': 'Headline should be a maximum of 60 characters long.'
    }),

  biography: Joi.string()
    .max(1000)
    .trim()
    .allow('')
    .messages({
      'string.base': 'Biography must be a string.',
      'string.max': 'Biography should be a maximum of 1000 characters long.'
    }),

  category: Joi.string()
    .trim()
    .allow('')
    .messages({
      'string.base': 'Category must be a string.',
    })

}).options({ allowUnknown: true });


export const loginValidationSchema = Joi.object({
  fullname: Joi.string()
    .min(3)
    .trim()
    .max(20)
    .messages({
      'string.base': 'Fullname must be a string.',
      'string.empty': 'Fullname cannot be empty.',
      'string.max': 'Fullname should be maximum 20 characters.',
      'string.min': 'Fullname should be minimum 3 characters.',
    }),

  socialLinks: Joi.array()
    .items(
      Joi.object({
        name: Joi.string()
          .required()
          .messages({
            'string.empty': 'Social link name is required.',
            'any.required': 'Social link name is required.',
          }),
        url: Joi.string()
          .uri()
          .required()
          .messages({
            'string.base': 'Social link URL must be a string.',
            'string.uri': 'Social link URL must be a valid URL.',
            'string.empty': 'Social link URL is required.',
            'any.required': 'Social link URL is required.',
          }),
      })
    )
    .messages({
      'array.base': 'Social Links must be an array of objects.',
    }),

  bio: Joi.string()
    .max(100)
    .trim()
    .allow('')
    .messages({
      'string.base': 'Bio must be a string.',
      'string.max': 'Bio should be a maximum of 100 characters long.'
    }),

  // role: Joi.string()
  //   .valid('user', 'admin')
  //   .default('user')
  //   .messages({
  //     'string.base': 'Role must be a string.',
  //     'any.only': 'Role must be one of "user" or "admin".'
  //   }),

  // interestedInSkills: Joi.array()
  //   .items(Joi.string())
  //   .min(1)
  //   .messages({
  //     'array.base': 'Interested In Skills must be an array of strings.',
  //     'array.min': 'Please select at least one skill.',
  //     'any.required': 'Please select at least one skill.'
  //   }),


}).options({ allowUnknown: true });

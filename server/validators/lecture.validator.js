import Joi from "joi";

export const lectureValidationSchema = Joi.object({
  title: Joi.string()
    .max(300)
    .required()
    .messages({
      "string.base": "Title should be a string",
      "string.max": "Lecture title should be maximum 300 characters",
      "any.required": "Lecture title is required",
    }),

  description: Joi.string()
    .max(1000)
    .messages({
      "string.base": "Description should be a string",
      "string.max": "Lecture description should be maximum 1000 characters",
    }),

  videoUrl: Joi.string()
    .uri()
    .required()
    .messages({
      "string.uri": "Video URL must be a valid URI",
      "any.required": "Video URL is required",
    }),

  order: Joi.number()
    .messages({
      "number.base": "Order must be a number",
      "any.required": "Order is required",
    }),

  isFreePreview: Joi.boolean().default(false),

  moduleId: Joi.string()
    .length(24)
    .hex()
    .required()
    .messages({
      "string.base": "Module ID must be a string",
      "string.length": "Module ID must be a 24-character ObjectId",
      "string.hex": "Module ID must be a valid hexadecimal value",
      "any.required": "Module ID is required",
    }),
});

export const lectureUpdateValidationSchema = Joi.object({
  title: Joi.string()
    .max(300)
    .messages({
      "string.base": "Title should be a string",
      "string.max": "Lecture title should be maximum 300 characters",
    }),

  description: Joi.string()
    .max(1000)
    .messages({
      "string.base": "Description should be a string",
      "string.max": "Lecture description should be maximum 1000 characters",
    }),

  videoUrl: Joi.string()
    .uri()
    .messages({
      "string.uri": "Video URL must be a valid URI",
    }),

  order: Joi.number()
    .messages({
      "number.base": "Order must be a number",
    }),

  isFreePreview: Joi.boolean(),

  moduleId: Joi.string()
    .length(24)
    .hex()
    .messages({
      "string.base": "Module ID must be a string",
      "string.length": "Module ID must be a 24-character ObjectId",
      "string.hex": "Module ID must be a valid hexadecimal value",
    }),
});

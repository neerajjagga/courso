import { NextFunction, Request, Response } from 'express';
import { courseValidationSchema, courseUpdateValidationSchema } from '../validators/course.validator.js';
import { asyncHandler } from './asyncHandler.js';

export const validateCourseData = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { error } = courseValidationSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        });
    }

    next();
});

export const validateUpdateCourseData = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { error } = courseUpdateValidationSchema.validate(req.body);

    if (error) {
        res.status(400).json({
            success: false,
            message: error.details[0].message,
        });
    }

    next();
});
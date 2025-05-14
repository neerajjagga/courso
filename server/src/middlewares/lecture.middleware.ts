import { NextFunction, Request, Response } from 'express';
import { lectureValidationSchema, lectureUpdateValidationSchema } from "../validators/lecture.validator.js";
import { asyncHandler } from "./asyncHandler.js";

export const validateLectureData = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { error } = lectureValidationSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        })
    }

    next();
});

export const validateLectureUpdateData = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { error } = lectureUpdateValidationSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        })
    }

    next();
});
import { NextFunction, Request, Response } from 'express';
import { moduleValidationSchema, moduleUpdateValidationSchema } from "../validators/module.validator.js";
import { asyncHandler } from './asyncHandler.js';

export const validateModuleData = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { error } = moduleValidationSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        });
    }

    next();
});

export const validateModuleUpdateData = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { error } = moduleUpdateValidationSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        });
    }

    next();
});
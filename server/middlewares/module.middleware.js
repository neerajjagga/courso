import { moduleValidationSchema, moduleUpdateValidationSchema } from "../validators/module.validator.js";

export const validateModuleData = async (req, res, next) => {
    const { error } = moduleValidationSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        });
    }

    next();
}

export const validateModuleUpdateData = async (req, res, next) => {
    const { error } = moduleUpdateValidationSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        });
    }

    next();
}
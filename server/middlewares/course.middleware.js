import { courseValidationSchema } from '../validators/course.validator.js';

export const validateCourseData = async (req, res, next) => {
    const { error } = courseValidationSchema.validate(req.body.data);

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        })
    }

    next();
}
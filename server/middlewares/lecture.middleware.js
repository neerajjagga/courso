import { lectureValidationSchema, lectureUpdateValidationSchema } from "../validators/lecture.validator.js";

export const validateLectureData = async (req, res, next) => {
    const { error } = lectureValidationSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        })
    }

    next();
}

export const validateLectureUpdateData = async (req, res, next) => {
    const { error } = lectureUpdateValidationSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        })
    }

    next();
}
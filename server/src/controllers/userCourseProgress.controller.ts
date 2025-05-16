import { RequestHandler, Request, Response } from 'express';
import { asyncHandler } from '../middlewares/asyncHandler.js';
import UserCourseProgress from '../models/userCourseProgress.model.js';
import Lecture from '../models/lecture.model.js';

export const updateUserCourseProgress: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;
    const { isCompleted } = req.body;
    const { courseId, lectureId } = req.params;

    if (typeof isCompleted !== "boolean") {
        return res.status(400).json({
            success: false,
            message: "isCompleted should be a boolean value",
        });
    }

    const userCourseProgress = await UserCourseProgress.findOne({
        userId: user._id,
        courseId
    });

    if (!userCourseProgress) {
        return res.status(404).json({
            success: false,
            message: "Course Progress data not found",
        });
    }

    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
        return res.status(404).json({
            success: false,
            message: "Lecture not found",
        });
    }

    const result = await UserCourseProgress.findOneAndUpdate(
        {
            courseId,
            userId: user._id,
        },
        {
            $set: {
                "progress.$[mod].lectures.$[lec].isCompleted": isCompleted
            }
        },
        {
            arrayFilters: [
                { "mod.moduleId": lecture.moduleId },
                { "lec.lectureId": lecture._id }
            ],
            new: true
        }
    );

    if (!result) {
        return res.status(400).json({
            success: false,
            message: "Failed to update progress",
        });
    }

    res.status(200).json({
        success: true,
        message: "Progress updated successfully"
    });
});
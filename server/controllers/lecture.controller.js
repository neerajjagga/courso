import mongoose from "mongoose";
import Lecture from "../models/lecture.model.js";
import Course from "../models/course.model.js";
import UserCourseProgress from '../models/userCourseProgress.model.js';
import Module from '../models/module.model.js';
import slugify from "slugify";
import { v4 as uuidv4 } from 'uuid';
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from '../lib/cloudinary.js';
import { deleteCloudinaryVideo } from "../utils/cloudinary.utils.js";

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "course-lectures",
        resource_type: "video",
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 100 * 1024 * 1024 },
});

export const createLecture = async (req, res) => {
    const instructor = req.user;
    try {
        const { moduleId, title, description, isFreePreview } = req.body;

        if (!moduleId) {
            return res.status(400).json({
                success: false,
                message: "ModuleId is required to create lecture",
            });
        }

        const module = await Module.findById(moduleId);

        if (!module) {
            return res.status(404).json({
                success: false,
                message: "Module not found",
            });
        }

        // fetch course
        const course = await Course.findById(module.courseId);

        if (course.instructor.toString() !== instructor._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to create a lecture for this course",
            });
        }

        const titleSlug = slugify(title, { lower: true, strict: true }) + '-' + uuidv4().slice(0, 8);

        const lecture = await Lecture.create({
            title,
            titleSlug,
            description,
            isFreePreview,
            moduleId
        });

        await UserCourseProgress.updateMany({
            courseId: module.courseId,
        }, {
            $push:
            {
                "progress.$[mod].lectures": {
                    lectureId: lecture._id,
                    isCompleted: false,
                },
            },
        }, {
            arrayFilters: [{ "mod.moduleId": module._id }]
        });

        return res.status(201).json({
            success: true,
            lecture,
            message: "Lecture created successfully",
        });
    } catch (error) {
        console.log("Error while creating a lecture" + error.message);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const getSingleLecture = async (req, res) => {
    try {
        const { lectureId } = req.params;
        const lecture = await Lecture.findById(lectureId);

        if (!lecture) {
            return res.status(404).json({
                success: false,
                message: "Lecture not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Lecture fetched successfully",
            lecture,
        });
    } catch (error) {
        console.log("Error while getting lecture" + error.message);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const updateLecture = async (req, res) => {
    const instructor = req.user;

    try {
        const { lectureId } = req.params;
        const { title, description, videoUrl, isFreePreview } = req.body;

        const lecture = await Lecture.findById(lectureId);
        if (!lecture) {
            return res.status(400).json({
                success: false,
                message: "Lecture not found"
            });
        }

        const module = await Module.findById(lecture.moduleId);
        if (!module) {
            return res.status(400).json({
                success: false,
                message: "Module not found"
            });
        }

        const course = await Course.findById(module.courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

        if (course.instructor.toString() !== instructor._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to create a lecture for this course",
            });
        }

        if (title) {
            const titleSlug = slugify(title, { lower: true, strict: true }) + '-' + uuidv4().slice(0, 8);
            lecture.title = title;
            lecture.titleSlug = titleSlug;
        }

        let updatedLink = null;
        if (videoUrl?.includes("youtu.be") || videoUrl?.includes("youtube.com")) {
            let videoId = null;
            try {
                const url = new URL(videoUrl);
                if (url.hostname === "youtu.be") {
                    videoId = url.pathname.slice(1);
                } else if (url.hostname.includes("youtube.com")) {
                    videoId = url.searchParams.get("v") || url.pathname.split("/").pop();
                }

                if (videoId) {
                    updatedLink = `https://www.youtube.com/embed/${videoId}`;
                }
            } catch (e) {
                console.error("Invalid URL");
            }
        }

        if (videoUrl) {
            if (videoUrl.includes("youtu.be") || videoUrl.includes("youtube.com")) {
                lecture.videoUrl = updatedLink;
            } else {
                lecture.videoUrl = videoUrl;
            }
        }
        lecture.description = description ?? lecture.description;
        lecture.isFreePreview = isFreePreview ?? lecture.isFreePreview;

        const updatedLecture = await lecture.save();

        return res.status(200).json({
            success: true,
            message: "Lecture updated successfully",
            lecture: updatedLecture,
        });

    } catch (error) {
        console.log("Error while updating a lecture" + error.message);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const deleteLecture = async (req, res) => {
    const session = await mongoose.startSession();
    const instructor = req.user;
    try {
        session.startTransaction();
        const { lectureId } = req.params;

        const lecture = await Lecture.findById(lectureId).session(session);
        if (!lecture) {
            await session.abortTransaction();
            return res.status(400).json({
                success: false,
                message: "Lecture not found"
            });
        }

        const module = await Module.findById(lecture.moduleId).session(session);
        if (!module) {
            await session.abortTransaction();
            return res.status(400).json({
                success: false,
                message: "Module not found"
            });
        }

        const course = await Course.findById(module.courseId).session(session);
        if (!course) {
            await session.abortTransaction();
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

        if (course.instructor.toString() !== instructor._id.toString()) {
            await session.abortTransaction();
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete a lecture for this course",
            });
        }

        if (lecture.videoUrl && lecture.videoUrl.includes('res.cloudinary.com')) {
            await deleteCloudinaryVideo(lecture.videoUrl);
        }

        await Lecture.findByIdAndDelete(lecture._id).session(session);

        await UserCourseProgress.updateMany({
            courseId: module.courseId,
        }, {
            $pull:
            {
                "progress.$[mod].lectures": {
                    lectureId: lecture._id
                }
            },
        }, {
            arrayFilters: [{ "mod.moduleId": module._id }],
            session
        });

        await session.commitTransaction();

        return res.status(200).json({
            success: true,
            message: "Lecture deleted successfully",
        });
    } catch (error) {
        await session.abortTransaction();
        console.log("Error while deleting a lecture" + error.message);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    } finally {
        session.endSession();
    }
}

const validateLectureData = async (req, res, next) => {
    const instructor = req.user;
    try {
        const { lectureId } = req.params;
        const lecture = await Lecture.findById(lectureId);
        if (!lecture) {
            return res.status(400).json({
                success: false,
                message: "Lecture not found"
            });
        }

        const module = await Module.findById(lecture.moduleId);
        if (!module) {
            return res.status(400).json({
                success: false,
                message: "Module not found"
            });
        }

        const course = await Course.findById(module.courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

        if (course.instructor.toString() !== instructor._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to add content for this course",
            });
        }
        req.lecture = lecture;
        next();
    } catch (error) {
        console.error("Lecture validation error:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const uploadLectureVideo = [
    validateLectureData,
    upload.single("video"),
    async (req, res) => {
        const lecture = req.lecture;
        try {
            if (!req.file || !req.file.path) {
                return res.status(400).json({ success: false, message: "Video not uploaded" });
            }

            const { path: videoUrl } = req.file;

            lecture.videoUrl = videoUrl;
            await lecture.save();

            return res.status(200).json({
                success: true,
                message: "Video uploaded successfully"
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ success: false, message: "Upload failed" });
        }
    },
];
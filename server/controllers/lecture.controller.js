import mongoose from "mongoose";
import Lecture from "../models/lecture.model.js";
import Course from "../models/course.model.js";
import Module from '../models/module.model.js';
import slugify from "slugify";
import { v4 as uuidv4 } from 'uuid';

export const createLecture = async (req, res) => {
    const instructor = req.user;
    try {
        const { moduleId, title, description, videoUrl, isFreePreview } = req.body;

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
            videoUrl,
            isFreePreview,
            moduleId
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

        let titleSlug = null;
        if (title) {
            titleSlug = slugify(title, { lower: true, strict: true }) + '-' + uuidv4().slice(0, 8);
        }

        lecture.title = title ?? lecture.title;
        lecture.titleSlug = title ? titleSlug : course.titleSlug;
        lecture.description = description ?? lecture.description;
        lecture.videoUrl = videoUrl ?? lecture.videoUrl;
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

        await Lecture.findByIdAndDelete(lecture._id).session(session);

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

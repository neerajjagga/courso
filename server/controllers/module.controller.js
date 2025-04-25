import mongoose from 'mongoose';
import Course from '../models/course.model.js';
import Module from '../models/module.model.js';
import slugify from "slugify";
import { v4 as uuidv4 } from 'uuid';
import Lecture from '../models/lecture.model.js';
import UserCourseProgress from '../models/userCourseProgress.model.js';

export const createModule = async (req, res) => {
    const instructor = req.user;
    try {
        // order not included right now
        const { title, courseId } = req.body;

        const course = await Course.findOne({
            _id: courseId,
            instructor: instructor._id
        });

        if (!course) {
            return res.status(400).json({
                success: false,
                message: "Course not found or unauthorized"
            });
        }

        const titleSlug = slugify(title, { lower: true, strict: true }) + '-' + uuidv4().slice(0, 8);

        const module = await Module.create({
            title,
            titleSlug,
            courseId: course._id,
        });

        // update UserCourseProgress
        await UserCourseProgress.updateMany({
            courseId : module.courseId,
        }, {
            $push : { progress :  { moduleId : module._id, lectures : [] }}
        });

        return res.status(201).json({
            success: true,
            module,
            message: "Module created successfully",
        });

    } catch (error) {
        console.log("Error while creating module" + error.message);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const getModules = async (req, res) => {
    const instructor = req.user;
    try {
        const { courseId } = req.params;

        if (!courseId) {
            return res.status(400).json({
                success: false,
                message: "CourseId is required to fetch modules"
            });
        }

        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        if (course.instructor.toString() !== instructor._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to fetch modules for this course",
            });
        }

        const modules = await Module.find({ courseId: course._id }).populate('lectures');

        return res.status(200).json({
            success: true,
            message: "Modules fetched successfully",
            modules
        });

    } catch (error) {
        console.log("Error while getting modules" + error.message);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const updateModule = async (req, res) => {
    const instructor = req.user;
    try {
        const { moduleId } = req.params;
        const { title, order } = req.body;

        if (!title && !order) {
            return res.status(400).json({
                success: false,
                message: "title or order is required to update"
            });
        }

        const module = await Module.findById(moduleId);

        if (!module) {
            return res.status(404).json({
                success: false,
                message: "Module not found"
            });
        }

        const course = await Course.findById(module.courseId);

        if (course.instructor.toString() !== instructor._id.toString()) {
            await session.abortTransaction();
            return res.status(403).json({
                success: false,
                message: "Unauthorized to delete module"
            });
        }

        let titleSlug = null;
        if (title) {
            titleSlug = slugify(title, { lower: true, strict: true }) + '-' + uuidv4().slice(0, 8);
        }

        module.title = title ?? module.title;
        module.titleSlug = title ? titleSlug : module.titleSlug;
        module.order = order ?? module.order;

        const updatedModule = await module.save();

        return res.status(200).json({
            success: true,
            message: "Module updated successfully",
            module: updatedModule,
        });

    } catch (error) {
        console.log("Error while updating module" + error.message);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const deleteModule = async (req, res) => {
    const instructor = req.user;
    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        const { moduleId } = req.params;
        const module = await Module.findById(moduleId).session(session);

        if (!module) {
            return res.status(404).json({
                success: false,
                message: "Module not found"
            });
        }

        const course = await Course.findById(module.courseId).session(session);

        if (course.instructor.toString() !== instructor._id.toString()) {
            await session.abortTransaction();
            return res.status(403).json({
                success: false,
                message: "Unauthorized to delete module"
            });
        }

        // delete all lectures whose moduleId is current moduleId
        await Lecture.deleteMany({ moduleId: module._id }).session(session);
        await Module.deleteOne({ _id: module._id }).session(session);

        await UserCourseProgress.updateMany({
            courseId : module.courseId,
        }, {
            $pull : { progress :  { moduleId : module._id }}
        }).session(session);

        await session.commitTransaction();

        return res.status(200).json({
            success: true,
            message: "Module deleted successfully",
        });

    } catch (error) {
        await session.abortTransaction();
        console.log("Error while deleting module" + error.message);
        res.status(500).json({
            success: false,
            message: error.message
        });
    } finally {
        session.endSession();
    }
}

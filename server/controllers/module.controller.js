import Course from '../models/course.model.js';
import Module from '../models/module.model.js';
import slugify from "slugify";
import { v4 as uuidv4 } from 'uuid';

export const createModule = async (req, res) => {
    const instructor = req.user;
    try {
        // order not included right now
        const { title, order, courseId } = req.body;

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
    try {
        const { courseId } = req.body;

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

        const modules = await Module.find({ courseId: course._id });

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

// TODO: Add joi validation schema
export const updateModule = async (req, res) => {
    const instructor = req.user;
    try {
        const { moduleId } = req.params;
        const { title, order } = req.body;

        const module = await Module.findById(moduleId);

        if (!module) {
            return res.status(400).json({
                success: false,
                message: "CourseId is required to fetch modules"
            });
        }

        const course = await Course.findById(module.courseId);

        if (!course.instructor.toString() === instructor._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized to update module"
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
    try {

    } catch (error) {
        console.log("Error while deleting module" + error.message);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

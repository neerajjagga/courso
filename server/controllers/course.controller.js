import mongoose from "mongoose";
import Course from "../models/course.model.js";
import EnrolledCourse from "../models/enrolledCourse.model.js";
import Module from '../models/module.model.js';
import Lecture from "../models/lecture.model.js";
import Review from "../models/review.model.js";
import slugify from "slugify";
import { v4 as uuidv4 } from 'uuid';
import { uploadImageOnCloudinary, deleteImageOnCloudinary } from "../utils/cloudinary.utils.js";
import { getUserCourseProgressSummary } from "../utils/course.utils.js";

// instructor
export const createCourse = async (req, res) => {
    const instructor = req.user;
    try {
        const { title, subtitle, description, language, level, courseImageUrl, price, category } = req.body;

        // if we have the course image then save it in cloudinary
        let courseImageCloudinaryUrl = null;
        if (courseImageUrl) {
            courseImageCloudinaryUrl = await uploadImageOnCloudinary(courseImageUrl);
        }

        const titleSlug = slugify(title, { lower: true, strict: true }) + '-' + uuidv4().slice(0, 8);

        const course = await Course.create({
            title,
            titleSlug,
            subtitle,
            description,
            language,
            level,
            courseImageUrl: courseImageCloudinaryUrl,
            price,
            category,
            instructor: instructor._id,
        });

        return res.status(201).json({
            success: true,
            course,
            message: "Course created successfully",
        });

    } catch (error) {
        console.log("Error while creating course" + error.message);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// instructor
export const updateCourse = async (req, res) => {
    const instructor = req.user;

    try {
        const { title, subtitle, description, language, level, courseImageUrl, price, category } = req.body;
        const { courseId } = req.params;

        const course = await Course.findOne({
            _id: courseId,
            instructor: instructor._id,
        });

        if (!course) {
            return res.status(400).json({
                success: false,
                message: "Course not found or unauthorized"
            });
        }

        let courseImageCloudinaryUrl = course.courseImageUrl;
        if (courseImageUrl === null) {
            courseImageCloudinaryUrl = null;
        } else if (courseImageUrl) {
            courseImageCloudinaryUrl = await uploadImageOnCloudinary(courseImageUrl);
        }

        let titleSlug = null;
        if (title) {
            titleSlug = slugify(title, { lower: true, strict: true }) + '-' + uuidv4().slice(0, 8);
        }

        course.title = title ?? course.title;
        course.titleSlug = title ? titleSlug : course.titleSlug;
        course.subtitle = subtitle ?? course.subtitle;
        course.description = description ?? course.description;
        course.language = language ?? course.language;
        course.level = level ?? course.level;
        course.courseImageUrl = courseImageCloudinaryUrl;
        course.price = price ?? course.price;
        course.category = category ?? course.category;

        const updatedCourse = await course.save();

        return res.status(200).json({
            success: true,
            message: "Course updated successfully",
            course: updatedCourse,
        });

    } catch (error) {
        console.log("Error while updating a course" + error.message);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// both
export const getAllCourses = async (req, res) => {
    const INSTRUCTOR_SAFE_DATA = "fullname profileImageUrl biography headline socialLinks";

    try {
        const { page = 1, limit = 10, category, search } = req.query;

        const pageNumber = Math.max(1, parseInt(page));
        const limitNumber = Math.min(100, parseInt(limit));
        const skip = (pageNumber - 1) * limitNumber;

        const query = {};
        if (category) {
            query.category = category;
        }
        if (search) {
            query.title = { $regex: search, $options: 'i' }
        }

        const [courses, totalCourses] = await Promise.all([
            Course.find(query)
                .sort({ createdAt: -1 })
                .populate('instructor', INSTRUCTOR_SAFE_DATA)
                .skip(skip)
                .limit(limit)
                .lean(),
            Course.countDocuments(query)
        ]);

        const cleanedCourses = courses.map(course => ({
            ...course,
            id: course._id,
            _id: undefined,
            __v: undefined
        }));

        if (courses.length === 0) {
            return res.status(200).json({
                success: true,
                courses: [],
                totalCourses,
            });
        }

        return res.status(200).json({
            success: true,
            currentPage: pageNumber,
            totalPages: Math.ceil(totalCourses / limitNumber),
            totalCourses,
            courses: cleanedCourses
        });
    } catch (error) {
        console.log("Error while getting all courses" + error.message);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
};

// instructor and user
export const getMyEnrolledCourses = async (req, res) => {
    const user = req.user;
    const INSTRUCTOR_SAFE_DATA = "fullname profileImageUrl bio";
    try {
        const { page = 1, limit = 10 } = req.query;

        const pageNumber = Math.max(1, parseInt(page));
        const limitNumber = Math.min(100, parseInt(limit));
        const skip = (pageNumber - 1) * limitNumber;

        const [enrolledCourses, totalEnrolledCourses] = await Promise.all([
            EnrolledCourse
                .find({ userId: user._id })
                .select('-userId')
                .sort({ createdAt: -1 })
                .populate({
                    path: "courseId",
                    select: 'courseImageUrl title titleSlug',
                    populate: {
                        path: "instructor",
                        select: INSTRUCTOR_SAFE_DATA,
                    }
                })
                .skip(skip)
                .limit(limitNumber)
                .lean(),

            EnrolledCourse.countDocuments({ userId: user._id })
        ]);

        if (enrolledCourses.length === 0) {
            return res.json({
                success: true,
                message: "No courses found",
                courses: [],
            });
        }

        const cleanedEnrolledCourses = enrolledCourses.map(course => ({
            ...course,
            id: course._id,
            course: course.courseId,
            _id: undefined,
            __v: undefined,
            courseId: undefined
        }));

        return res.status(200).json({
            success: true,
            message: "Courses fetched successfully",
            currentPage: pageNumber,
            totalPages: Math.ceil(totalEnrolledCourses / limitNumber),
            totalCourses: totalEnrolledCourses,
            courses: cleanedEnrolledCourses,
        });

    } catch (error) {
        console.log("Error while getting my enrolled courses" + error.message);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// instructor
export const getMyCreatedCourses = async (req, res) => {
    const instructor = req.user;
    try {
        const { page = 1, limit = 10, search } = req.query;

        const pageNumber = Math.max(1, parseInt(page));
        const limitNumber = Math.min(100, parseInt(limit));
        const skip = (pageNumber - 1) * limitNumber;

        const [courses, totalCourses] = await Promise.all([
            Course
                .find({
                    instructor: instructor._id,
                    ...(search && {
                        title: { $regex: search, $options: 'i' }
                    })
                })
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limitNumber)
                .lean(),

            Course.countDocuments({ instructor: instructor._id })
        ]);

        if (courses.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No courses found",
                courses: [],
            });
        }

        const cleanedEnrolledCourses = courses.map(course => ({
            ...course,
            id: course._id,
            _id: undefined,
            __v: undefined,
        }));

        return res.status(200).json({
            success: true,
            message: "Courses fetched successfully",
            currentPage: pageNumber,
            totalPages: Math.ceil(totalCourses / limitNumber),
            totalCourses,
            courses: cleanedEnrolledCourses,
        });

    } catch (error) {
        console.log("Error while getting my courses" + error.message);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// both
export const getSingleCourse = async (req, res) => {
    const INSTRUCTOR_SAFE_DATA = "fullname profileImageUrl socialLinks isEmailVerified bio";
    try {
        const { titleSlug } = req.params;

        const course = await Course.findOne({ titleSlug })
            .populate('instructor', INSTRUCTOR_SAFE_DATA)
            .populate({
                path: 'modules',
                select: 'title titleSlug -courseId',
                populate: {
                    path: 'lectures',
                    select: 'title titleSlug description isFreePreview createdAt -moduleId'
                },
            });

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        return res.status(200).json({ success: true, course });

    } catch (error) {
        console.log("Error while getting a single course" + error.message);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const getSingleEnrolledCourse = async (req, res) => {
    const user = req.user;
    const INSTRUCTOR_SAFE_DATA = "fullname profileImageUrl bio";
    try {
        const { titleSlug } = req.params;

        const courseRaw = await Course.findOne({ titleSlug }).select('_id');
        if (!courseRaw) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        const isUserEnrolled = await EnrolledCourse.findOne({ userId: user._id, courseId: courseRaw._id });

        if (!isUserEnrolled) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to access this course"
            });
        }

        const course = await Course.findOne({ titleSlug })
            .populate('instructor', INSTRUCTOR_SAFE_DATA)
            .populate({
                path: 'modules',
                select: 'title titleSlug -courseId',
                populate: {
                    path: 'lectures',
                    select: 'title titleSlug description createdAt videoUrl',
                },
            });

        const progressSummary = await getUserCourseProgressSummary(course._id, user._id);

        return res.status(200).json({ success: true, course, progressSummary });

    } catch (error) {
        console.log("Error while getting a single course" + error.message);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// instructor
export const deleteCourse = async (req, res) => {
    const session = await mongoose.startSession();
    const instructor = req.user;

    try {
        session.startTransaction();
        const { courseId } = req.params;

        const course = await Course.findOne({ _id: courseId, instructor: instructor._id }).session(session);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found or unauthorized"
            });
        }

        await EnrolledCourse.deleteMany({ courseId: course._id }).session(session);

        const moduleDocs = await Module.find({ courseId: course._id }).select("_id").session(session);
        const moduleIds = moduleDocs.map((m) => m._id);

        // delete all the lectures where moduleId in lecture is in modulesId array

        await Lecture.deleteMany({ moduleId: { $in: moduleIds } }).session(session);

        await Module.deleteMany({ _id: { $in: moduleIds } }).session(session);

        await Review.deleteMany({ courseId: course._id }).session(session);

        await Course.findByIdAndDelete(courseId).session(session);

        await session.commitTransaction();

        if (course.courseImageUrl) {
            try {
                await deleteImageOnCloudinary(course.courseImageUrl);
            } catch (error) {
                throw error
            }
        }

        return res.status(200).json({
            success: true,
            message: "Course deleted successfully"
        });

    } catch (error) {
        await session.abortTransaction();
        console.log("Error while deleting a course" + error.message);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    } finally {
        session.endSession();
    }
}
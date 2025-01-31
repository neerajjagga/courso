import Course from "../models/course.model.js";
import cloudinary from "../lib/cloudinary.js";
import slugify from "slugify";
import { v4 as uuidv4 } from 'uuid';

export const createCourse = async (req, res) => {
    try {
        const user = req.user;
        const { data } = req.body;

        // if we have the course image then save it in cloudinary
        if (data.courseImageUrl) {
            try {
                const uploadRes = await cloudinary.uploader.upload(data.courseImageUrl, {
                    transformation: [
                        {
                            crop: 'fill',
                            gravity: 'auto',
                            quality: "auto",
                        }
                    ]
                });
                data["courseImageUrl"] = uploadRes.secure_url;
            } catch (error) {
                console.log("Error coming while uploading course image", error.message);
                throw error;
            }
        }

        // add instructor id into data
        data["instructor"] = user._id;

        const titleSlug = slugify(data.title, { lower: true, strict: true });
        data["titleSlug"] = `${titleSlug}-${uuidv4().slice(0, 8)}`;

        const course = await Course.create(data);

        user.courses.push(course._id);
        await user.save();

        res.json({
            course,
            message: "Course created successfully",
        })

    } catch (error) {
        console.log("Error while creating course" + error.message);
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const updateCourse = async (req, res) => {
    try {
        const user = req.user;
        const { data } = req.body;
        const { courseId } = req.params;

        const course = await Course.find({ 
            _id : courseId,
            instructor : user._id,
        });

        if (!course) {
            return res.status(400).json({
                success: false,
                message: "Course not found or unauthorized"
            });
        }

        if (data.courseImageUrl) {
            // delete previous image if needed
            try {
                const uploadRes = await cloudinary.uploader.upload(data.courseImageUrl, {
                    transformation: [
                        {
                            crop: 'fill',
                            gravity: 'auto',
                            quality: "auto",
                        }
                    ]
                });
                data["courseImageUrl"] = uploadRes.secure_url;
            } catch (error) {
                console.log("Error coming while uploading course image in updateCourse", error.message);
                throw error;
            }
        }

        const updatedCourse = await Course.findByIdAndUpdate(courseId, {
            $set: data
        }, { new: true });

        res.json({
            message: "Course created successfully",
            course: updatedCourse,
        });

    } catch (error) {
        console.log("Error while updating a course" + error.message);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const getMyCourses = async (req, res) => {
    try {
        const user = req.user;
        const courses = await Course.find({ instructor: user._id }).sort({ createdAt: -1 })

        if (courses.length === 0) {
            return res.json({
                success: true,
                message: "No courses found",
                courses,
            })
        }

        res.json({
            success: true,
            message: "Courses fetched successfully",
            courses,
        })

    } catch (error) {
        console.log("Error while getting my courses" + error.message);
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getAllCourses = async (req, res) => {
    try {
        const INSTRUCTOR_SAFE_DATA = "fullname profileImageUrl biography headline socialLinks";

        const allCourses = await Course.find({})
            .sort({ createdAt: -1 })
            .populate('instructor', INSTRUCTOR_SAFE_DATA);

        if (allCourses.length === 0) {
            return res.json({
                success: true,
                courses: [],
            })
        }

        return res.json({ success: true, courses: allCourses });
    } catch (error) {
        console.log("Error while getting all courses" + error.message);
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
};

export const getSingleCourse = async (req, res) => {
    try {
        const { titleSlug } = req.params;
        console.log(titleSlug);
        const INSTRUCTOR_SAFE_DATA = "fullname profileImageUrl biography headline socialLinks";

        const course = await Course.findOne({ titleSlug })
            .populate('instructor', INSTRUCTOR_SAFE_DATA);

        console.log("in getsinglecourse");
        console.log(course);

        if (!course) {
            return res.status(404).json({
                success: true,
                message: "Course not found"
            });
        }

        return res.json({ success: true, course });
    } catch (error) {
        console.log("Error while getting a course" + error.message);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const deleteCourse = async (req, res) => {
    try {
        const user = req.user;
        const { courseId } = req.params;
        console.log(courseId);

        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(400).json({
                success: false,
                message: "Course not found to delete"
            });
        }

        if (course.courseImageUrl) {
            const publicId = course.courseImageUrl.split('/').pop().split('.')[0];

            console.log(publicId);
            try {
                const deleteRes = await cloudinary.uploader.destroy(publicId);
                console.log(deleteRes);
            } catch (error) {
                console.log("Error coming while deleting course image from cloudinary");
            }
        }

        user.courses = user.courses.filter(courseId => courseId !== course._id);
        await user.save();

        await Course.findByIdAndDelete(courseId);

        res.json({
            success: true,
            message: "Course deleted successfully"
        });

    } catch (error) {
        console.log("Error while deleting a course" + error.message);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
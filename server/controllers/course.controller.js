import Course from "../models/course.model.js";
import cloudinary from "../lib/cloudinary.js";

export const createCourse = async (req, res) => {
    try {
        const user = req.user;
        const { data } = req.body;

        // if we have the course image then save it in cloudinary
        if (data.courseImageUrl) {
            try {
                const res = await cloudinary.uploader.upload(data.courseImageUrl, {
                    transformation: [
                        {
                            crop: 'fill',
                            gravity: 'auto',
                            quality: "auto",
                        }
                    ]
                });
                data["courseImageUrl"] = res.secure_url;
            } catch (error) {
                console.log("Error coming while uploading course image", error.message);
                throw error;
            }
        }

        // add instructor id into data
        data["instructor"] = user._id;
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

        user.courses.push(course._id);
        await user.save();

        res.json({
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

export const getMyCourses = async (req, res) => {
    try {
        const user = req.user;
        const courses = await Course.find({ instructor: user._id });

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
        const INSTRUCTOR_SAFE_DATA = "fullname profileImageUrl";

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
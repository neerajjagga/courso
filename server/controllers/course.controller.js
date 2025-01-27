import Course from "../models/course.model.js";
import cloudinary from "../lib/cloudinary.js";

export const createCourse = async (req, res) => {
    try {
        const user = req.user;
        const { data } = req.body;

        // if we have the course image then save it in cloudinary
        if (data.courseImageUrl) {
            try {
                const res = await cloudinary.uploader.upload(updatedData.profileImageUrl, {
                    transformation: [
                        {
                            width: 1920,
                            height: 1080,
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
        const course = Course.create(data);

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
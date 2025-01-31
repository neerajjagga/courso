import Lecture from "../models/lecture.model.js";
import Course from "../models/course.model.js";

export const createLecture = async (req, res) => {
    try {
        const user = req.user;        
        const { courseId } = req.params;
        const { title, description, url } = req.body;

        if(!courseId) {
            return res.status(400).json({
                success: false,
                message: "Course ID is required",
            }); 
        }

        const course = await Course.findById(courseId);

        if(course.instructor.toString() !== user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to create a lecture for this course",
            });
        }

        if(!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

        const lecture = await Lecture.create({ title, description, url, courseId });

        await Course.findByIdAndUpdate(courseId, { $push: { lectures: lecture._id } });

        return res.status(201).json({
            success: true,
            message: "Lecture created successfully",
            lecture,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        }); 
    }
}

export const getLectures = async (req, res) => {
    try {
        const { courseId } = req.params;
        const lectures = await Lecture.find({ courseId }).sort({ createdAt: -1 });
        
        if(lectures.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No lectures found for this course",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Lectures fetched successfully",
            lectures,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

export const updateLecture = async (req, res) => {
    try {
        const { lectureId } = req.params;
        const { title, description, url } = req.body;

        if(!lectureId) {
            return res.status(400).json({
                success: false,
                message: "Lecture ID is required",
            });
        }
        
        const lecture = await Lecture.findByIdAndUpdate(lectureId, { title, description, url }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Lecture updated successfully",
            lecture,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

export const deleteLecture = async (req, res) => {
    try {
        const { lectureId } = req.params;       

        const lecture = await Lecture.findByIdAndDelete(lectureId);

        if(!lecture) {
            return res.status(404).json({
                success: false,
                message: "Lecture not found",
            });
        }   

        await Course.findByIdAndUpdate(lecture.courseId, { $pull: { lectures: lectureId } });

        return res.status(200).json({
            success: true,
            message: "Lecture deleted successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}   

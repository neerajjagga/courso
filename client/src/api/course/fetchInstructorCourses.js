import { axiosInst } from "../../lib/axios";
import toast from "react-hot-toast";

export const fetchInstructorCourses = async (data) => {
    try {
        const res = await axiosInst.get('/courses/me/created');
        return res.data.courses;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            return null;
        }
        toast.error("Something went wrong");
    }
}
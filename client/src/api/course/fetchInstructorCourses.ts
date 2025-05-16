import { AxiosError } from "axios";
import { axiosInst } from "../../lib/axios";
import toast from "react-hot-toast";

export const fetchInstructorCourses = async () => {
    try {
        const res = await axiosInst.get('/courses/me/created');
        return res.data.courses;
    } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response && axiosError.response.status === 401) {
            return null;
        }
        toast.error("Something went wrong");
    }
}
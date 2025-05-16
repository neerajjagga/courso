import { NewCourseFormData } from "types/course";
import { axiosInst } from "../../lib/axios";

export const createCourse = async (data: NewCourseFormData) => {
    const res = await axiosInst.post('/courses', { ...data });
    return res.data;
}
import { axiosInst } from "../../lib/axios";

export const fetchSingleCourse = async (courseId) => {
    const res = await axiosInst.get(`/courses/${courseId}`);
    return res.data.course;
}
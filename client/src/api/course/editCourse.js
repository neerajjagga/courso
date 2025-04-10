import { axiosInst } from "../../lib/axios";

export const editCourse = async (courseId, data) => {
    const res = await axiosInst.patch(`/courses/${courseId}`, { ...data });
    return res.data.course;
}
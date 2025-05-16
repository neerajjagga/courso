import { EditCourseFormData } from "types/course";
import { axiosInst } from "../../lib/axios";

export const editCourse = async (courseId: string, data: Partial<EditCourseFormData>) => {
    const res = await axiosInst.patch(`/courses/${courseId}`, { ...data });
    return res.data.course;
}
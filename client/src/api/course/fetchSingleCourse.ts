import { axiosInst } from "../../lib/axios";

export const fetchSingleCourse = async (titleSlug: string) => {
    const res = await axiosInst.get(`/courses/${titleSlug}`);
    return res.data.course;
}
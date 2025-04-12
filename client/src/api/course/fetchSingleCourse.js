import { axiosInst } from "../../lib/axios";

export const fetchSingleCourse = async (titleSlug) => {
    const res = await axiosInst.get(`/courses/${titleSlug}`);
    return res.data.course;
}
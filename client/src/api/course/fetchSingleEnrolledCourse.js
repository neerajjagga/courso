import { axiosInst } from "../../lib/axios";

export const fetchSingleEnrolledCourse = async (titleSlug) => {
    const res = await axiosInst.get(`/courses/me/enrolled/${titleSlug}`);
    console.log(res.data); 
    return res.data;
}
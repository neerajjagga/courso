import { axiosInst } from "../../lib/axios";

export const fetchCourses = async (filter) => {
    const query = new URLSearchParams({
        page: 1,
        limit: 10,
        ...filter,
    }).toString();

    const res = await axiosInst.get(`/courses?${query}`);
    return res.data.courses;
}
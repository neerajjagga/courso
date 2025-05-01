import { axiosInst } from "../../lib/axios";

export const fetchCourses = async (filter) => {
    const query = new URLSearchParams({
        ...filter,
    }).toString();

    const res = await axiosInst.get(`/courses?${query}`);
    console.log(res.data);
    return res.data;
}
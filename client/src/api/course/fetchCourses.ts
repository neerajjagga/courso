import { axiosInst } from "../../lib/axios";
import { FetchCoursesFilter } from 'types/course';

export const fetchCourses = async (filter: FetchCoursesFilter) => {
    const params = new URLSearchParams();

    (Object.keys(filter) as (keyof FetchCoursesFilter)[]).forEach((key) => {
        const value = filter[key];
        if (value !== undefined) {
            params.append(key, String(value));
        }
    });

    const query = params.toString();
    const res = await axiosInst.get(`/courses?${query}`);
    return res.data;
}
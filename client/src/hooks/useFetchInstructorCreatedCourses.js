import { useQuery } from "@tanstack/react-query";
import { fetchInstructorCourses } from "../api/course/fetchInstructorCourses";

export const useFetchInstructorCreatedCourses = () => {

    return useQuery({
        queryKey: ['instructorCreatedCourses'],
        queryFn: fetchInstructorCourses,
    });
}
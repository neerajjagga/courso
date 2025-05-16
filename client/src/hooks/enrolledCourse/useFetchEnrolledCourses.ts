import { useQuery } from "@tanstack/react-query";
import { fetchEnrolledCourses } from "../../api/course/fetchEnrolledCourse";

export const useFetchEnrolledCourses = () => {

    return useQuery({
        queryKey: ['enrolledCourses'],
        queryFn: fetchEnrolledCourses,
    });
}
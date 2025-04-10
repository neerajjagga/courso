import { useQuery } from '@tanstack/react-query';
import { fetchSingleCourse } from '../api/course/fetchSingleCourse';

export const useFetchSingleCourse = (courseId) => {
    return useQuery({
        queryKey: ['singleCourse', courseId],
        queryFn: () => fetchSingleCourse(courseId),
        enabled : !!courseId
    });
}
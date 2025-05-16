import { useQuery } from '@tanstack/react-query';
import { fetchCourses } from '../../api/course/fetchCourses';

export const useFetchCourses = (filter = {}) => {
    return useQuery({
        queryKey: ['courses', filter],
        queryFn: () => fetchCourses(filter),
        enabled: !!filter
    });
}
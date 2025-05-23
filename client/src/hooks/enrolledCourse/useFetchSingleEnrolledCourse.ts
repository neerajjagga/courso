import { useQuery } from '@tanstack/react-query';
import { fetchSingleEnrolledCourse } from '../../api/course/fetchSingleEnrolledCourse';

export const useFetchSingleEnrolledCourse = (titleSlug: string) => {
    return useQuery({
        queryKey: ['singleEnrolledCourse', titleSlug],
        queryFn: () => fetchSingleEnrolledCourse(titleSlug),
        enabled: !!titleSlug
    });
}
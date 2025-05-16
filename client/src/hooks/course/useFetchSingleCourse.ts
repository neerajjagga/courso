import { useQuery } from '@tanstack/react-query';
import { fetchSingleCourse } from '../../api/course/fetchSingleCourse';

export const useFetchSingleCourse = (titleSlug: string) => {
    return useQuery({
        queryKey: ['singleCourse', titleSlug],
        queryFn: () => fetchSingleCourse(titleSlug),
        enabled: !!titleSlug
    });
}
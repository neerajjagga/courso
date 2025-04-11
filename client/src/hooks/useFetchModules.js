import { useQuery } from '@tanstack/react-query';
import { fetchModules } from '../api/module/fetchModules';

export const useFetchModules = (courseId) => {
    console.log("inside useFetchModules");
    console.log(courseId);
    
    return useQuery({
        queryKey: ['modules', courseId],
        queryFn: () => fetchModules(courseId),
        enabled: !!courseId
    });
}
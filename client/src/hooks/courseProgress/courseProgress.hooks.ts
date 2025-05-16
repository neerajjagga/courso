import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { updateCourseProgress } from '../../api/courseProgress/courseProgress';
import { handleError } from '../../utils/handleError';

export const useUpdateCourseProgress = (courseId: string, titleSlug: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ lectureId, isCompleted }: { lectureId: string, isCompleted: boolean }) => updateCourseProgress(courseId, lectureId, isCompleted),
        onSuccess: () => {
            toast.success("Progress updated successfully");
            queryClient.invalidateQueries({ queryKey: ['singleEnrolledCourse', titleSlug] })
        },
        onError: handleError
    });
}
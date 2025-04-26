import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { updateCourseProgress } from '../api/courseProgress';

export const useUpdateCourseProgress = (courseId, titleSlug) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ lectureId, isCompleted }) => updateCourseProgress(courseId, lectureId, isCompleted),
        onSuccess: (data) => {
            toast.success("Progress updated successfully");
            queryClient.invalidateQueries(['singleEnrolledCourse', titleSlug])
        },
        onError: (err) => {
            const message = err.response?.data?.message || "Something went wrong!";
            toast.error(message);
        }
    });
}
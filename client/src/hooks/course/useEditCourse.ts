import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { editCourse } from '../../api/course/editCourse';
import { EditCourseFormData } from "types/course";
import { handleError } from '../../utils/handleError';

export const useEditCourse = (courseId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (updatedData: Partial<EditCourseFormData>) => editCourse(courseId, updatedData),
        onSuccess: () => {
            toast.success("Course edited successfully");
            queryClient.invalidateQueries({ queryKey: ['singleCourse'] });
        },
        onError: handleError
    });
}
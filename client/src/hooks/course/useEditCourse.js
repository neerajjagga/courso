import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { editCourse } from '../../api/course/editCourse';

export const useEditCourse = (courseId) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (updatedData) => editCourse(courseId, updatedData),
        onSuccess: () => {
            toast.success("Course edited successfully");
            queryClient.invalidateQueries(['singleCourse']);
        },
        onError: (err) => {
            const message = err.response?.data?.error || "Something went wrong!";
            toast.error(message);
        }
    });
}
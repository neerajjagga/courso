import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteLecture } from '../../api/lecture/deleteLecture';

export const useDeleteLecture = (moduleId) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (lectureId) => deleteLecture(lectureId),
        onSuccess: () => {
            toast.success("Lecture deleted successfully");
            queryClient.invalidateQueries(['modules'], moduleId);
        },
        onError: (err) => {
            const message = err.response?.data?.error || "Something went wrong!";
            toast.error(message);
        }
    });
}
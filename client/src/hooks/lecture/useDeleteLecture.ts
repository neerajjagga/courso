import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteLecture } from '../../api/lecture/deleteLecture';

export const useDeleteLecture = (moduleId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (lectureId: string) => deleteLecture(lectureId),
        onSuccess: () => {
            toast.success("Lecture deleted successfully");
            queryClient.invalidateQueries({ queryKey: ['modules', moduleId] });
        },
        onError: (err: any) => {
            const message = err.response?.data?.error || "Something went wrong!";
            toast.error(message);
        }
    });
}
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteLecture } from '../../api/lecture/deleteLecture';
import { handleError } from '../../utils/handleError';

export const useDeleteLecture = (moduleId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (lectureId: string) => deleteLecture(lectureId),
        onSuccess: () => {
            toast.success("Lecture deleted successfully");
            queryClient.invalidateQueries({ queryKey: ['modules', moduleId] });
        },
        onError: handleError
    });
}
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { editLecture } from "../../api/lecture/editLecture";
import { handleError } from '../../utils/handleError';

export const useEditLecture = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ lectureId, data }: { lectureId: string, data: { videoUrl?: string, description?: string } }) => editLecture(lectureId, data),
        onSuccess: () => {
            toast.success("Lecture updated successfully");
            queryClient.invalidateQueries({ queryKey: ['modules'] });
        },
        onError: handleError
    });
}
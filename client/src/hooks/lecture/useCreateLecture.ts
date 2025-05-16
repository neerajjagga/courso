import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createLecture } from '../../api/lecture/createLecture';
import { handleError } from '../../utils/handleError';

export const useCreateLecture = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: { title: string, isFreePreview: boolean, moduleId: string }) => createLecture(data),
        onSuccess: () => {
            toast.success("Lecture created successfully");
            queryClient.invalidateQueries({ queryKey: ['modules'] });
        },
        onError: handleError
    });
}
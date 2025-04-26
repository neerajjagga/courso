import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createLecture } from '../../api/lecture/createLecture';

export const useCreateLecture = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data) => createLecture(data),
        onSuccess: () => {
            toast.success("Lecture created successfully");
            queryClient.invalidateQueries(['modules']);
        },
        onError: (err) => {
            console.log(err);
            const message = err.response?.data?.message || "Something went wrong!";
            toast.error(message);
        }
    });
}
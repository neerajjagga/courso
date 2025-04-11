import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createModule } from "../api/module/createModule";
import toast from "react-hot-toast";

export const useCreateModule = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data) => createModule(data),
        onSuccess: () => {
            toast.success("Section created successfully");
            queryClient.invalidateQueries(['modules']);
        },
        onError: (err) => {
            console.log(err);
            const message = err.response?.data?.error || "Something went wrong!";
            toast.error(message);
        }
    });
}
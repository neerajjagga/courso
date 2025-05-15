import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createModule } from "../../api/module/createModule";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

export const useCreateModule = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: { title: string, courseId: string }) => createModule(data),
        onSuccess: () => {
            toast.success("Section created successfully");
            queryClient.invalidateQueries({ queryKey: ['modules'] });
        },
        onError: (err: AxiosError<{ error?: string }>) => {
            const message = err.response?.data?.error || "Something went wrong!";
            toast.error(message);
        }
    });
}
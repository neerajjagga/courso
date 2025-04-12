import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteModule } from '../api/module/deleteModule';
import toast from "react-hot-toast";

export const useDeleteModule = (moduleId) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (moduleId) => deleteModule(moduleId),
        onSuccess: () => {
            toast.success("Module deleted successfully");
            queryClient.invalidateQueries(['modules'], moduleId);
        },
        onError: (err) => {
            const message = err.response?.data?.error || "Something went wrong!";
            toast.error(message);
        }
    });
}
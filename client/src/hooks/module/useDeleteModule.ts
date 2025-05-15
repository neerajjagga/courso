import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteModule } from '../../api/module/deleteModule';

export const useDeleteModule = (moduleId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (moduleId: string) => deleteModule(moduleId),
        onSuccess: () => {
            toast.success("Module deleted successfully");
            queryClient.invalidateQueries({ queryKey: ['modules', moduleId] });
        },
        onError: (err: any) => {
            const message = err.response?.data?.error || "Something went wrong!";
            toast.error(message);
        }
    });
}
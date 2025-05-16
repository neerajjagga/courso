import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteModule } from '../../api/module/deleteModule';
import { handleError } from '../../utils/handleError';

export const useDeleteModule = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (moduleId: string) => deleteModule(moduleId),
        onSuccess: () => {
            toast.success("Module deleted successfully");
            queryClient.invalidateQueries({ queryKey: ['modules'] });
        },
        onError: handleError
    });
}
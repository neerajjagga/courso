import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutUser } from "../../api/auth/logoutUser";
import toast from "react-hot-toast";

export const useLogoutUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: logoutUser,
        onSuccess: (data) => {
            toast.success(data?.message || "Logged out successfully");
            queryClient.setQueryData(['user'], null);
        },
        onError: (err) => {
            const message = err.response?.data?.message || "Something went wrong!";
            toast.error(message);
        }
    });
}
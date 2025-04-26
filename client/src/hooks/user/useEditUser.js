import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editUser } from "../../api/user/editUser";
import toast from "react-hot-toast";

export const useEditUser = (setProfileImage, setIsEditView) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: editUser,
        onSuccess: (data) => {
            toast.success(data?.message || "Profile edited successfully");
            queryClient.setQueryData(['user'], data.user);
            setProfileImage(null);
            setIsEditView(false);
        },
        onError: (err) => {
            const message = err.response?.data?.error || "Something went wrong!";
            toast.error(message);
        }
    });
}
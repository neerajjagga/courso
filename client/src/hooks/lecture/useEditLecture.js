import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { editLecture } from "../../api/lecture/editLecture";

export const useEditLecture = (setIsDescriptionDialogOpened) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ lectureId, data }) => editLecture(lectureId, data),
        onSuccess: () => {
            toast.success("Description updated successfully!");
            queryClient.invalidateQueries(['modules']);
            setIsDescriptionDialogOpened(false);
        },
        onError: (err) => {
            console.log(err);
            const message = err.response?.data?.message || "Something went wrong!";
            toast.error(message);
        }
    });
}
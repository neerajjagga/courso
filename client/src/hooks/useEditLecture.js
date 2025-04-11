import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { editLecture } from "../api/lecture/editLecture";

export const useEditLecture = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ lectureId, data }) => editLecture(lectureId, data),
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
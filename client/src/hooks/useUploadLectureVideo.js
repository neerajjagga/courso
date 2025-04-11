import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadVideo } from "../api/lecture/uploadVideo";
import toast from "react-hot-toast";

export const useUploadLectureVideo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ lectureId, formData }) => uploadVideo(lectureId, formData),
        onSuccess: () => {
            toast.success("Video uploaded successfully");
            queryClient.invalidateQueries(['modules']);
        },
        onError: (err) => {
            console.log(err);
            const message = err.response?.data?.error || "Error uploading video!";
            toast.error(message);
        }
    });
}
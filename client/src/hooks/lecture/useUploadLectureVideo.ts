import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadVideo } from "../../api/lecture/uploadVideo";
import toast from "react-hot-toast";

export const useUploadLectureVideo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ lectureId, formData }: { lectureId: string, formData: FormData }) => uploadVideo(lectureId, formData),
        onSuccess: () => {
            toast.success("Video uploaded successfully");
            queryClient.invalidateQueries({ queryKey: ['modules'] });
        },
        onError: (err: any) => {
            console.log(err);
            const message = err.response?.data?.error || "Error uploading video!";
            toast.error(message);
        }
    });
}
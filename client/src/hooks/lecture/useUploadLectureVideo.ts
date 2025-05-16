import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadVideo } from "../../api/lecture/uploadVideo";
import toast from "react-hot-toast";
import { handleError } from '../../utils/handleError';

export const useUploadLectureVideo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ lectureId, formData }: { lectureId: string, formData: FormData }) => uploadVideo(lectureId, formData),
        onSuccess: () => {
            toast.success("Video uploaded successfully");
            queryClient.invalidateQueries({ queryKey: ['modules'] });
        },
        onError: handleError
    });
}
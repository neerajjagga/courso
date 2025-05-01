import { FileVideo, Loader, Youtube } from "lucide-react";
import { useRef, useState } from "react"
import { useUploadLectureVideo } from '../../../hooks/lecture/useUploadLectureVideo';
import { useEditLecture } from "../../../hooks/lecture/useEditLecture";

const AddContent = ({ setIsAddContentDialogOpened, lectureId }) => {
    const [contentType, setContentType] = useState('');
    const [isContentTypeSelected, setIsContentTypeSelected] = useState(false)

    const inputRef = useRef(null);
    const [fileName, setFileName] = useState("No file selected");
    const [selectedFile, setSelectedFile] = useState(null);

    const [youtubeVideoUrl, setYoutubeVideoUrl] = useState('');

    const { mutate: uploadVideo, isPending, isSuccess, isError } = useUploadLectureVideo();
    const { mutate: editLecture, isPending: isEditingLecture, isSuccess: isLectureEdited } = useEditLecture();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const video = document.createElement('video');
        video.preload = 'metadata';

        video.onloadedmetadata = function () {
            window.URL.revokeObjectURL(video.src);
            const duration = video.duration;

            const maxDuration = 5 * 60;

            if (duration > maxDuration) {
                alert('Video is too long! Max allowed duration is 5 minutes.');
                e.target.value = '';
            } else {
                setFileName(file.name);
                setSelectedFile(file);
            }
        };
        video.src = URL.createObjectURL(file);
    };

    const handleUpload = () => {
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append("video", selectedFile);

        uploadVideo({ lectureId, formData });
    }

    if (isError) {
        setFileName('No file selected');
        setSelectedFile(null);
    }

    if (isSuccess || isLectureEdited) setIsAddContentDialogOpened(false);

    return (
        <div className="px-2 py-6 pb-6 bg-gray-400 rounded-md sm:px-6 bg-opacity-15">
            {!isContentTypeSelected ? (
                <div className="flex flex-col gap-4">
                    <div>
                        <h3 className="text-base md:text-lg">Select the main type of content. Files and links can be added as resources.</h3>
                    </div>

                    <div className="flex items-start gap-1 sm:gap-6">
                        <button
                            onClick={() => {
                                setContentType('video')
                                setIsContentTypeSelected(true)
                            }}
                            className={`rounded-md ${contentType === "video" ? "border border-blue-500 border-opacity-80" : "border border-gray-300 border-opacity-40"} flex flex-col items-center gap-2 px-6 py-5 bg-gray-800 w-1/2 sm:w-36 `}>
                            <FileVideo />
                            <h4 className="text-base sm:text-lg">Video File</h4>
                        </button>

                        <button
                            onClick={() => {
                                setContentType('youtube')
                                setIsContentTypeSelected(true)
                            }}
                            className={`rounded-md ${contentType === "youtube" ? "border border-blue-500 border-opacity-80" : "border border-gray-300 border-opacity-40"} flex flex-col items-center gap-2 px-6 py-5 bg-gray-800 w-1/2  sm:w-36 `}>
                            <Youtube />
                            <h4 className="text-base sm:text-lg">Video Url</h4>
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    {contentType === "video" && (
                        <div className="flex flex-col gap-2 md:gap-4">
                            <div>
                                <h2 className="text-xl font-semibold">Upload Video</h2>
                            </div>

                            <div className="flex flex-col justify-between gap-4 sm:items-center sm:flex-row">
                                <input
                                    type="file"
                                    ref={inputRef}
                                    onChange={handleFileChange}
                                    className="hidden"
                                    accept="video/*"
                                />

                                <div className="flex-1 px-4 py-2 overflow-hidden text-sm text-gray-700 bg-gray-200 border rounded line-clamp-1">
                                    {fileName}
                                </div>

                                <button
                                    disabled={isPending}
                                    type="button"
                                    onClick={() => inputRef.current.click()}
                                    className="w-44 btn-special"
                                >
                                    Select Video
                                </button>
                            </div>

                            <button
                                onClick={handleUpload}
                                disabled={!selectedFile || isPending}
                                className={`self-end ${(selectedFile && !isPending) ? "btn-primary" : "btn-primary-disabled"} flex justify-center items-center gap-2`}>
                                Upload
                                {isPending && <span><Loader className="animate-spin" size={22} /></span>}
                            </button>
                        </div>
                    )}

                    {contentType === "youtube" && (
                        <div className="flex flex-col gap-4">
                            <div>
                                <h2 className="text-xl font-semibold">Enter Youtube Video URL</h2>
                            </div>

                            <div className="flex items-center justify-between gap-4">
                                <input
                                    type="text"
                                    value={youtubeVideoUrl}
                                    onChange={(e) => setYoutubeVideoUrl(e.target.value)}
                                    className="flex-1 input-primary"
                                    placeholder="e.g. https://youtu.be/IJkYipYNEtI?si=kXHohqiPVeHTdhcf"
                                    disabled={isPending}
                                />
                            </div>

                            <button
                                disabled={!youtubeVideoUrl.trim() || isEditingLecture}
                                onClick={() => editLecture({ lectureId, data: { videoUrl: youtubeVideoUrl } })}
                                className={`self-end ${(youtubeVideoUrl.trim() && !isEditingLecture) ? "btn-safe" : "btn-safe-disabled"} flex justify-center items-center gap-2`}>
                                Save
                                {isEditingLecture && <span><Loader className="animate-spin" size={22} /></span>}
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default AddContent
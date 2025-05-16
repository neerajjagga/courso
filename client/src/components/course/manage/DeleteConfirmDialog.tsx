import { Loader } from "lucide-react";
import { useEffect } from "react";
import { useDeleteModule } from "../../../hooks/module/useDeleteModule";
import { useDeleteLecture } from "../../../hooks/lecture/useDeleteLecture";

interface PropType {
    setIsDeleteClicked: React.Dispatch<React.SetStateAction<boolean>>;
    contentId: string;
    type: string;
}

const DeleteConfirmDialog = ({ type, contentId, setIsDeleteClicked }: PropType) => {
    const {
        mutate: deleteModule,
        isPending: isModulePending,
        isSuccess: isModuleSuccess,
        isError: isModuleError,
    } = useDeleteModule(contentId);

    const {
        mutate: deleteLecture,
        isPending: isLecturePending,
        isSuccess: isLectureSuccess,
        isError: isLectureError,
    } = useDeleteLecture(contentId);

    const handleDelete = () => {
        if (type === "module") {
            deleteModule(contentId);
        }
        if (type === "lecture") {
            deleteLecture(contentId);
        }
    }

    useEffect(() => {
        if (
            (type === "module" && (isModuleSuccess || isModuleError)) ||
            (type === "lecture" && (isLectureSuccess || isLectureError))
        ) {
            setIsDeleteClicked(false);
        }
    }, [isModuleSuccess, isModuleError, isLectureSuccess, isLectureError]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black bg-opacity-50">
            <div className="relative w-full max-w-md p-6 bg-gray-700 shadow-lg rounded-xl bg-opacity-80">
                <button
                    disabled={isModulePending || isLecturePending}
                    onClick={() => setIsDeleteClicked(false)}
                    className="absolute text-xl text-gray-400 top-3 right-4 hover:text-gray-600"
                >
                    &times;
                </button>

                <h2 className="mb-3 text-xl font-semibold">Please confirm</h2>

                <p className="mb-6 text-sm text-gray-200">
                    You are about to remove a curriculum item. Are you sure you want to continue?
                </p>

                <div className="flex justify-end space-x-4">
                    <button
                        disabled={isModulePending || isLecturePending}
                        className="text-blue-600 hover:underline"
                        onClick={() => setIsDeleteClicked(false)}
                    >
                        Cancel
                    </button>
                    <button
                        disabled={isModulePending || isLecturePending}
                        onClick={handleDelete}
                        className={`flex items-center justify-center gap-2 ${isModulePending || isLecturePending ? "btn-danger-disabled" : "btn-danger"
                            }`}
                    >
                        OK
                        {(isModulePending || isLecturePending) && <Loader size={18} className="animate-spin" />}
                    </button>

                </div>
            </div>
        </div>
    )
}

export default DeleteConfirmDialog
import { useEffect, useState } from "react";
import { FileText, Plus, Trash2 } from "lucide-react";
import AddCurriculum from "./AddCurriculum";
import LectureCard from "./LectureCard";
import DeleteConfirmDialog from "./DeleteConfirmDialog";

const SectionCard = ({ module }) => {
    const [showAddCurriculum, setShowAddCurriculum] = useState(false);
    const [isDeleteClicked, setIsDeleteClicked] = useState(false);

    useEffect(() => {
        if (isDeleteClicked) {
            document.body.style.overflow = "hidden"
        }

        return () => {
            document.body.style.overflow = "auto"
        }
    }, [isDeleteClicked]);

    return (
        <div className="flex flex-col gap-6 px-2 py-6 pb-6 bg-gray-500 rounded-md sm:px-6 bg-opacity-20">
            <div className="relative flex flex-col gap-10">
                <h3 className="flex gap-5 group">
                    <span className="text-lg text-gray-300 md:text-xl">Section:</span>
                    <span className="flex items-center gap-2 text-lg"><FileText size={20} /> {module.title}
                        <button
                            onClick={() => setIsDeleteClicked(true)}
                            className="pl-4 transition-all duration-200 ease-in opacity-0 group-hover:opacity-100"><Trash2 size={20} className="text-red-500" /></button>
                    </span>
                </h3>

                <div className="flex flex-col gap-2 md:gap-6">
                    {module.lectures.length > 0 && (
                        module.lectures.map((lecture, index) => (
                            <LectureCard
                                key={index}
                                lecture={lecture}
                            />
                        ))
                    )}
                </div>

                <div>
                    <button
                        onClick={() => setShowAddCurriculum(true)}
                        className="flex items-center justify-center gap-2 btn-primary"><Plus /> Curriculum item</button>
                </div>

                {isDeleteClicked && (
                    <DeleteConfirmDialog
                        type="module"
                        contentId={module.id}
                        setIsDeleteClicked={setIsDeleteClicked}
                    />
                )}

            </div>

            {showAddCurriculum && (
                <AddCurriculum
                    setShowAddCurriculum={setShowAddCurriculum}
                    moduleId={module.id}
                />
            )}
        </div>
    )
}

export default SectionCard
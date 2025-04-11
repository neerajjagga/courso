import { useState } from "react";
import { FileText, Plus } from "lucide-react";
import AddCurriculum from "./AddCurriculum";
import LectureCard from './LectureCard';

const SectionCard = ({ module }) => {
    console.log(module);
    const [showAddCurriculum, setShowAddCurriculum] = useState(false);

    return (
        <div className="flex flex-col gap-6 px-6 py-6 pb-6 bg-gray-500 rounded-md bg-opacity-20">
            <div className="flex flex-col gap-10">
                <h3 className="flex gap-5">
                    <span className="text-xl text-gray-300">Section:</span>
                    <span className="flex items-center gap-2 text-lg"><FileText size={20} /> {module.title}</span>
                </h3>

                <div className="flex flex-col gap-6">
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
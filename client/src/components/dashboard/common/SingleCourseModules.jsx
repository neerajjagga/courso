import { ChevronDown, CircleCheckBig, FileText, Lock, Square, Video } from "lucide-react"
import { useState } from "react";

const SingleCourseModules = ({ modules, type, activeLecture, setActiveLecture, progressSummary, updateProgress, isUpdatingProgress }) => {
    const [openModuleIndexes, setOpenModuleIndexes] = useState({
        0: true
    });

    const toggleModule = (index) => {
        setOpenModuleIndexes(prev => ({
            ...prev,
            [index]: !prev[index]
        }))
    }

    const completedLectureIds = new Set();
    progressSummary?.forEach(summary => {
        summary.completedLectures.forEach(id => completedLectureIds.add(id));
    });

    return (
        <div className="flex flex-col w-full gap-4">
            {type !== "learn" && (
                <div className="pb-3 text-2xl border-b border-gray-400 md:text-3xl border-opacity-20">
                    Course Content
                </div>
            )}

            <div className={`${type !== "learn" && "xl:w-[70%] gap-4"} flex flex-col`}>
                {modules.map((module, index) => (
                    <div
                        key={index}
                        className={`flex flex-col gap-6 px-2 py-6 pb-6 bg-gray-500  bg-opacity-20 ${type !== "learn" ? "rounded-md sm:px-6" : "border-b border-gray-300 border-opacity-15 sm:px-4"} `}>
                        <div className="relative flex flex-col gap-10">
                            <div className="flex flex-col gap-3">
                                <div className="flex justify-between gap-5 group">
                                    <h3 className={`flex ${type !== "learn" ? "gap-6" : "gap-2"}`}>
                                        <span className="text-xl text-gray-300">Section:</span>
                                        <span className="flex items-center gap-2 text-lg">
                                            {type !== "learn" && <FileText className="text-gray-300" />}
                                            {module.title}
                                        </span>
                                    </h3>

                                    <button
                                        onClick={() => toggleModule(index)}
                                        className={`${openModuleIndexes[index] && "rotate-180"} text-[#3e75f3] transition-all ease-in-out duration-300`}>
                                        <ChevronDown />
                                    </button>
                                </div>

                                {/* progress */}
                                {type && (
                                    <div className="w-full h-2 bg-gray-600 rounded-xl">
                                        <div className='h-full bg-green-600 rounded-xl'
                                            style={{ width: `${progressSummary[index]?.percentage || 0}%` }}
                                        >
                                        </div>
                                    </div>
                                )}
                            </div>

                            {openModuleIndexes[index] && (
                                <div className={`flex flex-col ${type !== "learn" ? "gap-6" : "gap-1"}`}>
                                    {module.lectures.length > 0 && (
                                        module.lectures.map((lecture, index) => (
                                            <div
                                                key={index}
                                                onClick={() => {
                                                    type === "learn" && setActiveLecture(lecture);
                                                }}
                                                className={`transition-all ease-in duration-150 flex justify-between gap-6 px-2 md:py-6 md:pb-6 py-4 pb-4 rounded-md  bg-opacity-15 ${type !== "learn" ? "bg-gray-500 sm:px-6 shadow-xl " : "hover:bg-gray-500 hover:shadow-xl hover:bg-opacity-15 sm:px-4 cursor-pointer"}`}>
                                                <div className="flex items-center justify-between w-full gap-2 md:gap-4">
                                                    <div className={`flex items-center gap-4 ${activeLecture?.id === lecture.id && "text-blue-500"}`}>
                                                        <span>
                                                            {lecture.videoUrl && (
                                                                <Video size={22} />
                                                            )}
                                                        </span>
                                                        <h2 className="text-[0.90rem] md:text-base">{lecture.title}</h2>
                                                    </div>
                                                    {type === "learn" && (
                                                        <button
                                                            disabled={isUpdatingProgress}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                const isCompleted = completedLectureIds.has(lecture.id);
                                                                updateProgress({ lectureId: lecture.id, isCompleted: !isCompleted });
                                                            }}
                                                            className={`text-gray-400 ${completedLectureIds.has(lecture.id) && "text-green-500"}`}>
                                                            {completedLectureIds.has(lecture.id) ? <CircleCheckBig /> : <Square />}
                                                        </button>
                                                    )}
                                                </div>

                                                {(!lecture.isFreePreview && type !== "learn") && (
                                                    <span className="text-gray-400">
                                                        <Lock />
                                                    </span>
                                                )}
                                            </div>
                                        ))
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SingleCourseModules
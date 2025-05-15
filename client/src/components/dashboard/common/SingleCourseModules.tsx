import React, { useState } from "react";
import { ChevronDown, CircleCheckBig, FileText, Lock, Square, Video } from "lucide-react"
import { Lecture as LectureType } from 'types/lecture';
import { UseMutateFunction } from "@tanstack/react-query";
import { LearningModule } from "types/module";
import { SingleEnrolledCourseProgressSummary } from '../../../types/progressSummary';
import { EditCourseFormData } from "types/course";

interface PropType {
    modules: [];
    type?: string;
    activeLecture?: LectureType;
    setActiveLecture?: React.Dispatch<React.SetStateAction<LectureType | null>>
    updateProgress?: UseMutateFunction<any, unknown, any, unknown>;
    isUpdatingProgress?: boolean
    progressSummary?: SingleEnrolledCourseProgressSummary[];
}

const SingleCourseModules = ({ modules, type, activeLecture, setActiveLecture, progressSummary, updateProgress, isUpdatingProgress }: PropType) => {

    const [openModuleIndexes, setOpenModuleIndexes] = useState<{ [key: number]: boolean }>({
        0: true
    });

    const toggleModule = (index: number) => {
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
        <div className="flex flex-col w-full gap-2 md:gap-4">
            {type !== "learn" && (
                <div className="text-lg text-gray-500 border-b border-gray-400 md:pb-1 sm:pb-2 md:text-2xl border-opacity-20">
                    Content
                </div>
            )}

            <div className={`${type !== "learn" && "xl:w-[70%] gap-2 md:gap-4"} flex flex-col`}>
                {modules.map((module: LearningModule, index: number) => (
                    <div
                        key={index}
                        className={`flex flex-col gap-6 px-2 md:py-6 py-4 md:pb-6 bg-gray-500  bg-opacity-20 ${type !== "learn" ? "rounded-md sm:px-6" : "border-b border-gray-300 border-opacity-15 sm:px-4"} `}>
                        <div className="relative flex flex-col gap-4 md:gap-10">
                            <div className="flex flex-col gap-3">
                                <div className="flex justify-between gap-5 group">
                                    <h3 className={`flex ${type !== "learn" ? "gap-6" : "gap-2"}`}>
                                        <span className="hidden text-base text-gray- 300 md:text-xl lg:block">Section:</span>
                                        <span className="flex items-center gap-2 text-md">
                                            {type !== "learn" && <FileText className="hidden text-gray-300 md:block" />}
                                            <span className="px-1">{module.title + ' '}</span>
                                            {(type && progressSummary) && (
                                                <span className="text-sm text-gray-300 md:text-base">{progressSummary[index]?.percentage}% Completed</span>
                                            )}
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
                                    <div className="w-full h-[0.38rem] bg-gray-600">
                                        <div className='h-full bg-blue-600 rounded-tr-3xl rounded-br-3xl'
                                            style={{ width: progressSummary && `${progressSummary[index]?.percentage || 0}%` }}
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
                                                    type === "learn" && setActiveLecture && setActiveLecture(lecture);
                                                }}
                                                className={`transition-all ease-in duration-150 items-center flex justify-between gap-6 px-2 md:py-6 md:pb-6 py-4 pb-4 rounded-md  bg-opacity-15 ${type !== "learn" ? "bg-gray-500 sm:px-6 shadow-xl " : "hover:bg-gray-500 hover:shadow-xl hover:bg-opacity-15 sm:px-4 cursor-pointer"}`}>
                                                <div className="flex items-center justify-between w-full gap-2 md:gap-4">
                                                    <div className={`flex items-center gap-4 ${activeLecture?.id === lecture.id && "text-blue-500"}`}>
                                                        <span>
                                                            {lecture.videoUrl && (
                                                                <Video size={20} />
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
                                                                updateProgress && updateProgress({ lectureId: lecture.id, isCompleted: !isCompleted });
                                                            }}
                                                            className={`text-gray-400 ${completedLectureIds.has(lecture.id) && "text-green-500"}`}>
                                                            {completedLectureIds.has(lecture.id) ? <CircleCheckBig size={20} /> : <Square size={20} />}
                                                        </button>
                                                    )}
                                                </div>

                                                {(!lecture.isFreePreview && type !== "learn") && (
                                                    <span className="text-gray-400">
                                                        <Lock size={18} />
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
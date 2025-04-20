import { ChevronDown, FileText, Lock } from "lucide-react"
import { useState } from "react";

const SingleCourseModules = ({ modules }) => {
    const [openModuleIndexes, setOpenModuleIndexes] = useState({
        0: true
    });

    const toggleModule = (index) => {
        setOpenModuleIndexes(prev => ({
            ...prev,
            [index]: !prev[index]
        }))
    }

    return (
        <div className="flex flex-col w-full gap-4">
            <div className="pb-3 text-2xl border-b border-gray-400 md:text-3xl border-opacity-20">
                Course Content
            </div>

            <div className="xl:w-[70%] flex flex-col gap-4">
                {modules.map((module, index) => (
                    <div
                        key={index}
                        className="flex flex-col gap-6 px-2 py-6 pb-6 bg-gray-500 rounded-md sm:px-6 bg-opacity-20">
                        <div className="relative flex flex-col gap-10">
                            <div className="flex justify-between gap-5 group">
                                <h3 className="flex gap-6">
                                    <span className="text-xl text-gray-300">Section:</span>
                                    <span className="flex items-center gap-2 text-lg"><FileText size={20} /> {module.title}
                                    </span>
                                </h3>

                                <button
                                    onClick={() => toggleModule(index)}
                                    className={`${openModuleIndexes[index] && "rotate-180"} text-[#3e75f3] transition-all ease-in-out duration-300`}>
                                    <ChevronDown />
                                </button>
                            </div>

                            {openModuleIndexes[index] && (
                                <div className="flex flex-col gap-6">
                                    {module.lectures.length > 0 && (
                                        module.lectures.map((lecture, index) => (
                                            <div className="flex justify-between gap-6 px-2 py-6 pb-6 bg-gray-500 rounded-md shadow-xl sm:px-6 bg-opacity-15">
                                                <div>
                                                    <h2>{lecture.title}</h2>
                                                </div>

                                                {!lecture.isFreePreview && (
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
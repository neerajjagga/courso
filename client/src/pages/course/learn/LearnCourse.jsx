import { useEffect, useMemo, useState } from 'react';
import CustomLoader from '../../../components/common/CustomLoader';
import { useNavigate, useParams } from "react-router-dom"
import { Menu } from 'lucide-react'
import SingleCourseModules from '../../../components/dashboard/common/SingleCourseModules';
import VideoPlayer from '../../../components/course/learn/VideoPlayer';
import DOMPurify from 'dompurify';

import { useFetchSingleEnrolledCourse } from '../../../hooks/enrolledCourse/useFetchSingleEnrolledCourse';
import { useUpdateCourseProgress } from '../../../hooks/courseProgress/courseProgress.hooks';

const LearnCourse = () => {
    const navigate = useNavigate();
    const { titleSlug } = useParams();

    const [activeLecture, setActiveLecture] = useState(null);
    const [isSidebarActive, setIsSidebarActive] = useState(true);
    const [isShowMoreDescActive, setIsShowMoreDescActive] = useState(false);

    const { data: { course, progressSummary } = {}, isPending } = useFetchSingleEnrolledCourse(titleSlug);

    const { mutate: updateProgress, isPending: isUpdatingProgress } = useUpdateCourseProgress(course?.id, course?.titleSlug);

    const videoPlayerOptions = useMemo(() => ({
        autoplay: false,
        controls: true,
        responsive: true,
        fluid: true,
        sources: [{
            src: activeLecture?.videoUrl || '',
            type: 'video/mp4'
        }]
    }), [activeLecture?.videoUrl]);

    useEffect(() => {
        if (course?.modules?.length > 0) {
            setActiveLecture(course.modules[0].lectures[0]);
        }
    }, [course]);

    if (isPending) return <CustomLoader />

    return (
        <div className='min-h-screen'>
            <div className=''>
                {/* header */}
                <div className="fixed z-50 w-full py-1 border-b border-gray-400 border-opacity-50 md:h-16 md:py-2 bg-bg-primary">
                    <div className="container flex items-center justify-between">
                        <div className="flex items-center gap-2 md:gap-6">
                            <div className="flex items-center gap-6 text-base text-gray-100 md:text-xl line-clamp-1">
                                <button
                                    onClick={() => setIsSidebarActive(!isSidebarActive)}
                                >
                                    <Menu />
                                </button>
                                <span className='line-clamp-1'>{course?.title}</span>
                            </div>
                        </div>

                        <div>
                            <button
                                disabled={isPending}
                                onClick={() => navigate('/dashboard/enrollments')}
                                className={`${isPending ? "btn-primary-disabled" : "btn-primary"}`}>
                                Exit
                            </button>
                        </div>
                    </div>
                </div>

                {course?.modules?.length > 0 ? (
                    <div className='flex gap-2 pt-12 md:pt-16'>
                        {/* sidebar */}
                        <div className={`w-[18rem] xs:w-[20rem] md:w-[22rem] lg:w-[32rem] bg-gray-950 md:z-50 z-30 fixed left-0 md:top-16 top-10 min-h-dvh ${!isSidebarActive && "-translate-x-full"} transition-all ease-in-out duration-300 overflow-y-auto bottom-0 pb-16 border-r border-gray-500 border-opacity-40`}>
                            <SingleCourseModules
                                modules={course?.modules}
                                type="learn"
                                activeLecture={activeLecture}
                                setActiveLecture={setActiveLecture}
                                progressSummary={progressSummary}
                                updateProgress={updateProgress}
                                isUpdatingProgress={isUpdatingProgress}
                                setIsSidebarActive={setIsSidebarActive}
                            />
                        </div>

                        {/* content */}
                        <div
                            className={`flex-1 min-h-screen p-4 transition-all ease-in-out duration-300
                        ${isSidebarActive ? "xl:pl-[33rem]" : ""}`}
                        >
                            {activeLecture?.videoUrl ? (
                                <div className='flex flex-col w-full min-h-full gap-5 md:gap-5'>
                                    {activeLecture.videoUrl.includes("youtube") ? (
                                        <div className='w-full overflow-hidden bg-gray-900 rounded-xl'>
                                            <iframe
                                                src={activeLecture.videoUrl}
                                                className="w-full shadow-lg aspect-video rounded-xl"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                                                allowFullScreen
                                                loading="lazy"
                                                title="Course Video Player"
                                            />
                                        </div>
                                    ) : (
                                        <div className=''>
                                            <VideoPlayer options={videoPlayerOptions} />
                                        </div>
                                    )}

                                    {/* information */}
                                    <div className='flex flex-col gap-6 md:gap-12 md:px-4'>
                                        <div>
                                            <h2 className='text-lg font-semibold text-gray-200 md:text-2xl lg:md:text-3xl'>{activeLecture.title}</h2>
                                        </div>

                                        {activeLecture.description && (
                                            <div className='flex flex-col gap-1 sm:gap-2'>
                                                <div className="text-lg text-gray-500 border-b border-gray-400 md:pb-1 sm:pb-2 md:text-2xl border-opacity-20">
                                                    Description
                                                </div>

                                                <div className={`md:text-[1.20rem] text-[0.90rem] text-gray-400 break-all md:break-words`}>
                                                    <span
                                                        dangerouslySetInnerHTML={{
                                                            __html: isShowMoreDescActive
                                                                ? DOMPurify.sanitize(course.description)
                                                                : DOMPurify.sanitize(course.description)
                                                                    .replace(/<[^>]*>/g, "")
                                                                    .slice(0, 200) + '...',
                                                        }}
                                                    />
                                                </div>

                                                {DOMPurify.sanitize(course.description).replace(/<[^>]*>/g, "").length > 200 && (
                                                    <button
                                                        onClick={() => setIsShowMoreDescActive(!isShowMoreDescActive)}
                                                        className='text-blue-600 underline w-fit'>
                                                        {isShowMoreDescActive ? "Show less" : "Show more"}
                                                    </button>
                                                )}
                                            </div>
                                        )}

                                        {/* reviews */}
                                        {/* <div className='space-y-4'>
                                            <div className="pb-1 text-lg text-gray-500 border-b border-gray-400 sm:pb-2 md:text-2xl border-opacity-20">
                                                Comments
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                            ) : (
                                <div className='flex items-center justify-center w-full h-full text-gray-300'>
                                    <h2 className='text-2xl md:text-4xl'>Content not available</h2>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center justify-center min-h-screen p-4 text-center">
                        <h2 className="text-2xl text-gray-300 md:text-3xl">
                            No modules available for this course yet.
                        </h2>
                    </div>
                )}
            </div>
        </div>
    )
}

export default LearnCourse
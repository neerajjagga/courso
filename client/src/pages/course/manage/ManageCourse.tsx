import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom"
import { ChevronLeft, Circle, Menu, X } from 'lucide-react'
import { useState } from "react";
import { useFetchSingleCourse } from '../../../hooks/course/useFetchSingleCourse';

const ManageCourse = () => {
    const location = useLocation();
    const lastRoute = location.pathname.split('/').pop();

    const navigate = useNavigate();
    const { titleSlug } = useParams<{ titleSlug: string }>();
    const { data: course, isPending } = useFetchSingleCourse(titleSlug);
    const [isHamburgerOpened, setIsHamburgerOpened] = useState<boolean>(false);

    return (
        <div className="relative min-min-h-screen">
            <div>
                <div className="fixed z-50 w-full py-1 border-b border-gray-400 border-opacity-50 md:h-16 md:py-2 bg-bg-primary">
                    <div className="container flex items-center justify-between">
                        <div className="flex items-center gap-2 md:gap-6">
                            <div className="">
                                <button onClick={() => navigate('/dashboard/instructor/courses')} className="flex items-center gap-2"><ChevronLeft /> <span className="hidden md:block">Back to Courses</span></button>
                            </div>

                            <span className="text-4xl text-gray-800 md:text-5xl">|</span>

                            <div className="text-base text-gray-100 md:text-xl line-clamp-1">
                                {course?.title}
                            </div>
                        </div>

                        <div>
                            {/* {location.pathname.split('/')[5] === "basics" && (
                                <button disabled={isPending} className='text-lg px-5 py-[0.40rem] rounded-md transition-all ease-in duration-100 hover:bg-[#1949b8] border border-[#2a5acb] hover:border-[#8cafff] flex justify-center items-center gap-2'>
                                    <span className='hidden sm:block'>Dashboard</span>
                                </button>
                            )} */}
                            <button
                                disabled={isPending}
                                onClick={() => navigate('/dashboard/instructor/courses')}
                                className={`${isPending ? "btn-primary-disabled" : "btn-primary"}`}>
                                Exit
                            </button>
                        </div>
                    </div>
                </div>

                <div className="w-full pt-16">
                    <div className="container relative flex flex-col min-h-screen lg:flex-row">
                        {/* sidebar */}
                        <div className="fixed flex-col hidden gap-8 w-60 pt-52 lg:flex">
                            <div className="flex flex-col gap-6">
                                <h3 className="text-xl font-bold">Create your content</h3>
                                <div className="px-4 text-gray-200">
                                    <button
                                        onClick={() => navigate(`/instructor/course/${course.titleSlug}/manage/curriculum`)}
                                        className={`flex items-center w-full gap-1 px-4 py-2 transition-all duration-200 ease-in rounded-md hover:bg-gray-800 ${lastRoute === "curriculum" && "text-blue-500"}`}>
                                        <Circle className={`${lastRoute === "curriculum" && "bg-blue-900 rounded-full"}`} size={18} />
                                        Curriculum
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-col gap-6">
                                <h3 className="text-xl font-bold">Standout your course</h3>
                                <div className="flex flex-col gap-4 px-4 text-gray-200">
                                    <button
                                        onClick={() => navigate(`/instructor/course/${course.titleSlug}/manage/basics`)}
                                        className={`flex items-center gap-1 px-4 py-2 transition-all duration-200 ease-in rounded-md hover:bg-gray-800 ${lastRoute === "basics" && "text-blue-500"}`}>
                                        <Circle className={`${lastRoute === "basics" && "bg-blue-900 rounded-full"}`} size={18} />
                                        Course landing page
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="md:pt-4 lg:hidden">
                            <button
                                onClick={() => setIsHamburgerOpened(!isHamburgerOpened)}>
                                {isHamburgerOpened ? <X size={30} /> : <Menu size={30} />}
                            </button>
                            {isHamburgerOpened && (
                                <div className="flex justify-between px-2 py-4 bg-gray-900 rounded-md sm:justify-normal sm:gap-10 xs:px-4">
                                    <div className="flex flex-col gap-2">
                                        <h3 className="hidden font-bold md:text-base">Create your content</h3>
                                        <div className="text-gray-200">
                                            <button
                                                onClick={() => navigate(`/instructor/course/${course.titleSlug}/manage/curriculum`)}
                                                className="flex items-center w-full gap-1 transition-all duration-200 ease-in rounded-md hover:bg-gray-800"><Circle className={`${lastRoute === "curriculum" && "bg-blue-900 rounded-full"}`} size={18} /> Curriculum</button>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <h3 className="hidden text-base font-bold">Standout your course</h3>
                                        <div className="text-gray-200">
                                            <button
                                                onClick={() => navigate(`/instructor/course/${course.titleSlug}/manage/basics`)}
                                                className="flex items-center w-full gap-1 transition-all duration-200 ease-in rounded-md hover:bg-gray-800"><Circle className={`${lastRoute === "basics" && "bg-blue-900 rounded-full"}`} size={18} /> Course landing page</button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <main className="w-full pt-4 pb-24 lg:pt-16 lg:pl-60">
                            <Outlet
                                context={{ courseId: course?.id, titleSlug: course?.titleSlug }}
                            />
                        </main>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManageCourse
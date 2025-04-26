import { useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { Globe, BarChart } from 'lucide-react';
import SingleCourseModules from '../../components/dashboard/common/SingleCourseModules';
import CustomLoader from '../../components/common/CustomLoader';
import { useFetchSingleCourse } from '../../hooks/course/useFetchSingleCourse';
import SingleCourseCard from '../../components/dashboard/SingleCourse/SingleCourseCard';
import InstructorCard from '../../components/dashboard/SingleCourse/InstructorCard';

const SingleCourse = () => {
    const { titleSlug } = useParams();
    const { data: course, isPending } = useFetchSingleCourse(titleSlug);

    if (isPending) return <CustomLoader />

    return (
        <div className='min-h-screen'>
            <div className='flex flex-col gap-4 md:gap-10'>
                <div className='bg-[linear-gradient(180deg,_#3e75f3_0%,_#0b3db2_70%)]'>
                    <div className='relative flex gap-10 px-2 py-6 sm:py-12 sm:px-10 xl:pl-12'>
                        <div className='lg:w-[50%] text-center'>
                            <h1 className='text-2xl sm:text-3xl'>{course.title}</h1>
                        </div>

                        <div className='absolute z-30 hidden xl:right-20 right-5 lg:block'>
                            <SingleCourseCard
                                course={course}
                            />
                        </div>
                    </div>
                </div>

                {/* course card */}
                <div className='flex flex-col gap-6 px-4 md:gap-8 md:px-12'>
                    <div className='flex flex-col items-start gap-6'>
                        <div className='self-center lg:hidden'>
                            <SingleCourseCard
                                course={course}
                            />
                        </div>
                    </div>

                    {/* description */}
                    <div className='flex flex-col gap-10'>
                        {/* extra info */}
                        <div className='flex flex-col gap-6'>
                            <div className='flex gap-6'>
                                <div className='flex items-center gap-2'>
                                    <Globe className='text-[#3e75f3]' size={20} />
                                    <span>{course.language}</span>
                                </div>

                                <div className='flex items-center gap-2'>
                                    <BarChart className='text-[#3e75f3]' size={20} />
                                    <span>{course.level.split('')[0].toUpperCase()}{course.level.split('').slice(1)}</span>
                                </div>
                            </div>
                            <div className='text-[1.3rem] text-gray-300 lg:w-[50%]'
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(course.description)
                                }}
                            />
                        </div>
                    </div>

                    {/* sections */}
                    <div className={`flex flex-col lg:gap-20 gap-10 ${!course.description ? 'lg:mt-36' : 'lg:mt-12'}`}>
                        <div className='flex flex-col gap-2'>
                            {course.modules.length > 0 && (
                                <SingleCourseModules
                                    modules={course.modules}
                                />
                            )}
                        </div>

                        {/* instructor */}
                        <div className="flex flex-col w-full gap-4">
                            <div className="pb-3 text-2xl border-b border-gray-400 border-opacity-20 md:text-3xl ">
                                Instructor
                            </div>

                            <div>
                                <InstructorCard
                                    instructor={course.instructor}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleCourse
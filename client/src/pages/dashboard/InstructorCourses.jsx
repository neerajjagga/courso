import { Search } from 'lucide-react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { useFetchInstructorCreatedCourses } from '../../hooks/useFetchInstructorCreatedCourses';

const InstructorCourses = () => {
    const navigate = useNavigate();
    const { data: courses, isLoading } = useFetchInstructorCreatedCourses();

    return (
        <div className="w-full px-3 pt-2 md:pt-4 sm:px-12 xl:px-28">
            <div className="flex flex-col gap-8">
                <div className='text-[1.2rem] font-bold xs:text-[1.3rem] sm:text-3xl lg:text-4xl px-2 pb-2 border-b border-opacity-30 border-b-gray-500 flex justify-between items-center'>
                    <h2>Manage Your Courses</h2>

                    <div className='md:hidden'>
                        <button onClick={() => navigate('/course/create/1')} className=' btn-secondary'>New Course</button>
                    </div>
                </div>

                <main className='flex flex-col gap-20'>
                    {/* search and new course */}
                    <div className='flex items-center justify-between'>
                        <div className='flex gap-2'>
                            <input
                                type="text"
                                className="input-search-primary"
                                placeholder="Search your courses"
                            />
                            <div className='flex items-center justify-center btn-primary'>
                                <Search size={20} />
                            </div>
                        </div>

                        <div className='hidden md:block'>
                            <button onClick={() => navigate('/course/create/1')} className='btn-secondary'>New Course</button>
                        </div>
                    </div>

                    {/* all Courses should come */}
                    <div className=''>
                        {!isLoading && courses.map((course, index) => (
                            <div>
                                <img src={course.courseImageUrl} alt="" />
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    )
}

export default InstructorCourses
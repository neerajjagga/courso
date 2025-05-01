import { useNavigate } from 'react-router-dom'
import CourseCard from '../../components/dashboard/common/CourseCard';
import CourseCardSkeleton from '../../components/skeletons/InstructorCourseCardSkeleton';
import { useFetchInstructorCreatedCourses } from '../../hooks/course/useFetchInstructorCreatedCourses';

const InstructorCourses = () => {
    const navigate = useNavigate();
    const { data: courses, isLoading } = useFetchInstructorCreatedCourses();

    return (
        <div className="w-full px-2 md:pt-2 sm:px-10">
            <div className="flex flex-col gap-4 md:gap-8">
                <div className='text-[1.2rem] font-bold xs:text-[1.3rem] sm:text-3xl px-2 pb-2 border-b border-opacity-30 border-b-gray-500 flex justify-between items-center'>
                    <h2>Manage Your Courses</h2>

                    <div>
                        <button onClick={() => navigate('/instructor/course/create/1')} className='btn-secondary'>
                            New Course
                        </button>
                    </div>
                </div>

                <main className='flex flex-col gap-8'>
                    {!isLoading && courses?.length === 0 ? (
                        <div className="w-full py-10 text-2xl text-center text-gray-300 md:text-3xl">
                            No courses found. Start by creating a new course!
                        </div>
                    ) : (
                        <div className='flex flex-wrap justify-center gap-5 md:gap-10 md:justify-normal'>
                            {!isLoading ? (
                                (courses ?? []).map((course, index) => (
                                    <CourseCard key={index} course={course}>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigate(`/instructor/course/${course.titleSlug}/manage`);
                                            }}
                                            className="btn-secondary"
                                        >
                                            Edit / manage
                                        </button>
                                    </CourseCard>
                                ))
                            ) : (
                                new Array(4).fill(0).map((_, index) => (
                                    <CourseCardSkeleton key={index} />
                                ))
                            )}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

export default InstructorCourses;

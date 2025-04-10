import { useNavigate } from 'react-router-dom';

const InstructorCourseCard = ({ course }) => {
    const navigate = useNavigate();

    return (
        <div>
            <div className="flex w-full overflow-hidden bg-gray-900 rounded-md">
                <div>
                    <img
                        className="h-[180px] min-w-[320px] pointer-events-none object-contain"
                        src={course.courseImageUrl ? course.courseImageUrl : "https://res.cloudinary.com/dabywmj68/image/upload/t_placeholder/v1738051049/placeholder_pg74id.webp"}
                        alt={`${course.title} Image`}
                    />
                </div>

                <div className="relative w-full px-6 py-4 space-x-2 group">
                    <h2 className="text-3xl">{course.title}</h2>

                    <div className="absolute inset-0 z-50 flex items-center justify-center w-full h-full transition-all duration-200 ease-in opacity-0 bg-gray-950 bg-opacity-80 group-hover:opacity-100">
                        <button
                            onClick={() => navigate(`/instructor/course/${course.id}/manage`)}
                            className="md:text-2xl text-3xl font-bold bg-[linear-gradient(180deg,_#3e75f3_50%,_#0b3db2_120%)] bg-clip-text text-transparent w-[50%] h-full">Edit / manage course</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InstructorCourseCard
import { useNavigate } from 'react-router-dom'
import { Star } from 'lucide-react'

const CourseCard = ({ course, children }) => {
    const navigate = useNavigate()
    const cleanDescription = course?.description && course?.description?.replace(/<[^>]*>?/gm, '')?.slice(0, 120) + '...'

    return (
        <div
            className="rounded-xl overflow-hidden bg-[#1e1e1e] hover:shadow-xl transition-all duration-200 w-[320px] max-h-[500px] flex flex-col"
        >
            <div className="w-full h-[180px] pointer-events-none">
                <img
                    src={
                        course.courseImageUrl ||
                        'https://res.cloudinary.com/dabywmj68/image/upload/t_placeholder/v1738051049/placeholder_pg74id.webp'
                    }
                    alt={course.title}
                    className="object-cover w-full h-full pointer-events-none"
                />
            </div>

            <div className="flex flex-col justify-between flex-grow gap-2 p-4">
                <div className='flex flex-col flex-grow gap-2 text-white pointer-events-none'>
                    <div className="flex items-center gap-2">
                        <span className="px-2 py-1 text-xs font-semibold text-yellow-400 bg-yellow-800 rounded-md">
                            PREMIUM
                        </span>
                        <span className="text-sm text-gray-400">{course.language}</span>
                    </div>

                    <h3 className="text-xl font-bold lg:text-xl">{course.title}</h3>

                    <p className="text-sm text-gray-300">
                        {cleanDescription}
                    </p>

                    <div className='flex items-center gap-2 mt-2 overflow-hidden'>
                        {course.instructor.profileImageUrl && (
                            <img
                                src={course.instructor?.profileImageUrl}
                                className='object-cover rounded-full w-7 h-7'
                                alt={`${course.instructor.fullname} Profile Image`}
                            />
                        )}
                        <h4 className='text-sm text-gray-300 line-clamp-1'>{course.instructor.fullname}</h4>
                    </div>
                </div>

                {children}

            </div>
        </div>
    )
}

export default CourseCard


const MyCoursesCard = ({ course }) => {
    return (
        <div className='flex flex-col gap-4'>
            <div className='relative'>
                <img className='rounded-t-2xl ' src={course.courseImageUrl} alt={course.title} />
                <span className='text-black absolute top-2 left-2 text-sm font-bold bg-gradient-to-b from-amber-200 to-yellow-400 py-1 px-2 rounded-2xl'>{course.category.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, (str) => str.toUpperCase())}</span>
            </div>
            <div className='flex flex-col gap-2 px-4'>
                <span className='sm:text-3xl text-2xl font-bold bg-gradient-to-bl from-white to-gray-300 bg-clip-text text-transparent'>{course.title}</span>
                {course?.subtitle && (
                    <span className='truncate text-lg text-gray-300 border-b border-gray-700 pb-3'>{course.subtitle}</span>
                )}
                <span className='text-lg'>Language - <span className='font-semibold'>{course.language}</span> </span>
                {course.description && (
                    <span className='text-lg text-gray-400'>{course.description.slice(0, 150)}...</span>
                )}
            </div>
            <div className='px-4'>
                <span className='text-lg text-gray-300'>Launched on - {''}
                    <span className='font-semibold'>
                        {new Date(course.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </span>
                </span>
            </div>
        </div>
    )
}

export default MyCoursesCard
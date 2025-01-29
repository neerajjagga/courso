
const MyCoursesCard = ({ course }) => {
    return (
        <div className='flex flex-col gap-4 w-full h-full'>
            <div className='relative flex justify-center'>
                <img className='' src={course.courseImageUrl || "https://res.cloudinary.com/dabywmj68/image/upload/v1738051049/placeholder_pg74id.webp"} alt={course.title} />
                <span className='text-black absolute top-2 left-2 text-sm font-bold bg-gradient-to-b from-amber-200 to-yellow-400 py-1 px-2 rounded-2xl'>{course.category.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, (str) => str.toUpperCase())}</span>
                <div className="absolute inset-0 bg-black bg-opacity-5"></div>
            </div>
            <div className='flex flex-col gap-2 px-4'>
                <span className='sm:text-[1.7rem] text-2xl font-bold bg-gradient-to-bl from-white to-gray-300 bg-clip-text text-transparent'>{course.title.length > 50 ? (
                    <span>{course.title.slice(0, 50)}...</span>
                ) : (
                    <span>{course.title}</span>
                )}</span>
                {course?.subtitle && (
                    <span className='truncate text-lg text-gray-300 border-b border-gray-700 pb-3'>{course.subtitle}</span>
                )}
                <div className="flex gap-5 items-center">
                    <span className=''>Price - <span className='text-xl font-semibold bg-blue-700 px-1'>{course.price.currencySymbol}{course.price.amount}</span> </span>

                    <span className='flex items-center gap-1'>Language - <span className='font-semibold text-xl'>{course.language}</span> </span>
                </div>
                {course.description && (
                    <span className='text-lg text-gray-400'>{course.description.slice(0, 120)}...</span>
                )}
            </div>
            <div className='px-4 flex h-full items-end'>
                <span className='text-gray-300'>Launched on - {''}
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
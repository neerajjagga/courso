const MyCoursesShimmer = () => {
    return (
        <div className="rounded-2xl shadow-md bg-gradient-to-t from-gray-800 to-gray-700 pb-4 overflow-hidden relative">
            <div className="flex flex-col gap-4 w-full h-full">
                <div className="h-56 w-full bg-gray-800 skeleton">
                    <span className='absolute top-2 left-2 py-1 px-2 rounded-2xl bg-gray-600 w-24 h-7 animate-pulse'></span>
                </div>
                <div className="h-16 w-full bg-gray-700 skeleton"></div>
                <div className="flex gap-5 items-center">
                    <div className="h-8 w-32 bg-gray-700 rounded-2xl animate-pulse"></div>
                    <div className="h-8 w-32 bg-gray-700 rounded-2xl animate-pulse"></div>
                </div>
                <div className="h-20 w-full bg-gray-700 skeleton"></div>
                <div className="h-8 w-48 rounded-2xl bg-gray-700 animate-pulse"></div>
            </div>
        </div>
    )
}

export default MyCoursesShimmer;

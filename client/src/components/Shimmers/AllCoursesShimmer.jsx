
const AllCoursesShimmer = () => {
    return (
        <div className="rounded-2xl shadow-md bg-gradient-to-t from-gray-800 to-gray-700 pb-4 overflow-hidden relative mt-5">
            <div className="flex flex-col gap-4 w-full h-full">
                <div className="h-56 w-full bg-gray-800 skeleton">
                    <span className='absolute top-2 left-2 py-1 px-2 rounded-2xl bg-gray-600 w-24 h-7 animate-pulse'></span>
                </div>
                <div className="px-2 flex flex-col gap-3">
                    <div className="h-10 w-full bg-gray-700 skeleton"></div>
                    <div className="flex gap-2 items-center">
                        <div className="h-10 w-10 rounded-full bg-gray-700 skeleton"></div>
                        <div className="h-7 w-20 bg-gray-700 animate-pulse rounded-md"></div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 items-center">
                        <div className="h-8 w-28 bg-gray-700 rounded-2xl animate-pulse"></div>
                        <div className="h-8 w-28 bg-gray-700 rounded-2xl animate-pulse"></div>
                        <div className="h-8 w-28 bg-gray-700 rounded-2xl animate-pulse"></div>
                        <div className="h-8 w-28 bg-gray-700 rounded-2xl animate-pulse"></div>
                    </div>
                    <div className="h-12 w-full rounded-2xl bg-gray-700 skeleton"></div>
                </div>
            </div>
        </div>
    )
}

export default AllCoursesShimmer
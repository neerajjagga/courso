const CourseCardSkeleton = () => {
    return (
        <div className="w-[320px] h-[450px] rounded-xl overflow-hidden shadow-md bg-[#1e1e1e] animate-pulse flex flex-col">
            <div className="w-full h-[180px] bg-gray-700" />

            <div className="flex flex-col justify-between flex-grow gap-2 p-4">
                <div className="flex flex-col flex-grow gap-3">
                    <div className="flex items-center gap-2">
                        <div className="w-16 h-4 bg-gray-600 rounded" />
                        <div className="w-10 h-4 bg-gray-600 rounded" />
                    </div>

                    <div className="w-3/4 h-5 bg-gray-600 rounded" />

                    <div className="w-full h-3 bg-gray-700 rounded" />
                    <div className="w-[90%] h-3 bg-gray-700 rounded" />
                    <div className="w-[80%] h-3 bg-gray-700 rounded" />
                </div>

                <div className="w-full h-10 bg-gray-600 rounded" />
            </div>
        </div>
    )
}

export default CourseCardSkeleton

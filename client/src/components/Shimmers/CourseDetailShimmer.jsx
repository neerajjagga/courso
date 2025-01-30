import React from 'react'

const CourseDetailShimmer = () => {
    return (
        <div className='min-h-screen w-full mt-16'>
            <div className='flex flex-col bg-gray-900 gap-3 px-5'>
                <div className='h-[26rem] flex flex-col gap-5'>
                    <div className='h-8 w-[50%] bg-gray-700 skeleton mt-4'>
                    </div>
                    <div className='w-full h-full gap-5 flex flex-col lg:flex-row'>
                        <div className='w-[65%] md:h-[90%] min-h-[20%] bg-gray-700 rounded-2xl skeleton'>
                        </div>
                        <div className='lg:w-[35%] lg:h-[95%] min-h-[90%] bg-gray-700 skeleton flex flex-col gap-2'>
                            <div className='lg:h-[70%] min-h-[55%] w-full bg-gray-600 skeleton'>
                            </div>
                            <div className='px-5 pb-5'>
                                <div className='mt-3 h-10 w-[50%] bg-gray-600 animate-pulse rounded-2xl'></div>
                                <div className='mt-3 h-12 w-full bg-gray-600 animate-pulse rounded-2xl'></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='bg-gray-700 h-[20rem] rounded-2xl skeleton mt-16 lg:mt-5'></div>
            </div>
        </div>
    )
}

export default CourseDetailShimmer

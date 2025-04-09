import { FileVideo, ListTodo } from 'lucide-react'
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom'

const StepOne = () => {
    const [isCourseTypeSelected, setIsCourseTypeSelected] = useState(true);
    const { isNextBtnEnabled, setIsNextBtnEnabled } = useOutletContext();

    useEffect(() => {
        setIsNextBtnEnabled(true);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center gap-10 md:gap-20 md:pt-16">
            <div className='text-center'>
                <h1 className="text-2xl font-bold text-gray-200 sm:text-3xl md:text-4xl">First, let's find out what type of course you're making.</h1>
            </div>

            <div className='flex flex-col gap-6 md:gap-8 md:flex-row'>
                <button
                    onClick={() => {
                        setIsCourseTypeSelected(!isCourseTypeSelected)
                        setIsNextBtnEnabled(!isNextBtnEnabled)
                    }}
                    className={`flex flex-col items-center p-6 text-center transition border rounded-md shadow-sm xs:w-72 w-full hover:shadow-md ${isCourseTypeSelected && "border-[#3e75f3]"}`}>
                    <FileVideo className="w-8 h-8 mb-3 text-gray-200" />
                    <h2 className="text-lg font-semibold">Course</h2>
                    <p className="mt-2 text-sm text-gray-400">
                        Create rich learning experiences with the help of video lectures,
                        quizzes, coding exercises, etc.
                    </p>
                </button>

                {/* Practice Test Card */}
                <button disabled className="relative flex flex-col items-center w-full p-6 text-center transition bg-gray-800 border border-gray-600 rounded-md shadow-sm xs:w-72 hover:shadow-md">
                    <ListTodo className="w-8 h-8 mb-3 text-gray-200" />
                    <h2 className="text-lg font-semibold">Practice Test</h2>
                    <p className="mt-2 text-sm text-gray-200">
                        Help students prepare for certification exams by providing practice
                        questions.
                    </p>

                    <span className='absolute px-2 py-1 bg-yellow-700 rounded-md top-2 left-2'>Upcoming</span>
                </button>
            </div>
        </div>
    )
}

export default StepOne
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom'

const StepTwo = () => {
  const { courseFormData, setCourseFormData, setIsNextBtnEnabled } = useOutletContext();

  useEffect(() => {
    if (courseFormData.title.trim()) {
      setIsNextBtnEnabled(true);
    } else {
      setIsNextBtnEnabled(false);
    }
  }, [courseFormData]);

  return (
    <div className="flex flex-col items-center justify-center w-full gap-16 md:gap-20 md:pt-16">
      <div className='space-y-4 text-center md:space-y-8'>
        <h1 className="text-2xl font-bold text-gray-200 sm:text-3xl md:text-4xl">How about a working title?</h1>
        <p className='text-gray-400'>It's ok if you can't think of a good title now. You can change it later.</p>
      </div>

      <div className='flex gap-8 md:w-[500px] w-full relative'>
        <input
          type="text"
          className='w-full pr-16 input-primary'
          value={courseFormData.title}
          onChange={(e) => setCourseFormData((prev) => ({ ...prev, title: e.target.value }))}
          placeholder='e.g. Learn Photoshop CS6 from Scratch'
          maxLength={60}
        />
        <span className='absolute text-xl text-gray-300 -translate-y-1/2 top-1/2 right-4'>{courseFormData.title.length}</span>
      </div>
    </div>
  )
}

export default StepTwo
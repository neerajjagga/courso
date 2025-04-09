import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom'
import { categories } from '../../../../constants/categories';
import { languages } from '../../../../constants/languages';

const StepFive = () => {
  const { courseFormData, setCourseFormData, setIsNextBtnEnabled } = useOutletContext();

  useEffect(() => {
    setIsNextBtnEnabled(false);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full gap-6 md:gap-12 md:pt-8">
      <div className='space-y-4 text-center md:space-y-8'>
        <h1 className="text-2xl font-bold text-gray-200 sm:text-3xl md:text-4xl">You're nearly done!</h1>
        <p className="text-gray-400">This is the final step. Add a few final touches to make your course stand out.</p>
      </div>

      <div className='flex flex-col gap-8 md:w-[500px] sm:min-w-[400px] min-w-[300px] relative'>
        <div className="flex flex-col gap-2">
          <label className="text-base text-gray-300 xs:text-lg md:text-xl">
            Select Category:
          </label>
          <select
            value={courseFormData.category}
            onChange={(e) => setCourseFormData({ ...courseFormData, category: e.target.value })}
            className="py-2 input-primary"
            required
          >
            {categories.map((category, index) => {
              return <option className='bg-bg-primary' key={index} value={category.for}>{category.name}</option>
            })}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-base text-gray-300 xs:text-lg md:text-xl">
            Select Level:
          </label>
          <select
            value={courseFormData.level}
            onChange={(e) => setCourseFormData({ ...courseFormData, level: e.target.value })}
            className="py-2 input-primary"
            required
          >
            <option className='bg-bg-primary' value="">Choose a level</option>
            <option className='bg-bg-primary' value="beginner">Beginner Level</option>
            <option className='bg-bg-primary' value="intermediate">Intermediate Level</option>
            <option className='bg-bg-primary' value="expert">Expert Level</option>
            <option className='bg-bg-primary' value="all">All Levels</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-base text-gray-300 xs:text-lg md:text-xl">
            Select Language:
          </label>
          <select
            value={courseFormData.language}
            onChange={(e) => setCourseFormData({ ...courseFormData, language: e.target.value })}
            className="py-2 input-primary"
            required
          >
            {languages.map((category, index) => {
              return <option className='bg-bg-primary' key={index} value={category.name}>{category.name}</option>
            })}
          </select>
        </div>

        <div className="relative flex flex-col gap-2">
          <label className="text-base text-gray-300 xs:text-lg md:text-xl">
            Price: <span className="text-md">(in ₹)</span>
          </label>
          <div>
            <input
              value={courseFormData.price}
              onChange={(e) => {
                const newValue = e.target.value;
                if (/^\d{0,8}$/.test(newValue)) {
                  setCourseFormData({
                    ...courseFormData,
                    price: newValue
                  });
                }
              }}
              type="number"
              className="w-full input-primary" placeholder={`in ₹`}
              required
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default StepFive
import codingLinesLeft from '../assets/codingLinesLeft.webp';
import codingLinesRight from '../assets/codingLinesRight.webp';
import { ChevronsUp } from 'lucide-react';
import { indexCategories } from '../constants/indexCategories';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className='w-full min-h-full'>

      {/* content */}
      <div className='flex flex-col items-center justify-center gap-10 xl:gap-20'>
        <div className='z-10 flex flex-col items-center gap-4 pt-12 md:gap-6'>
          {/* <img className='object-cover h-28 w-28 md:h-32 md:w-32' src={akshayLandingPageLogo} alt="" /> */}
          <div className='h-28 w-28 md:h-32 md:w-32 bg-[linear-gradient(180deg,#ffffff_0%,#a6a6a6_80%)] flex items-center justify-center rounded-full border-2 border-[#0b3db2]'>
            <h2 className='text-[#0b3db2] font-extrabold text-2xl md:text-3xl'>Courso</h2>
          </div>

          <div className='relative flex flex-col items-center gap-4'>

            <div className='flex flex-col items-center gap-2'>
              <p className='text-center text-md xs:text-lg xl:text-xl 2xl:text-2xl text-gradient-secondary'>Welcome Learner! Ready to <span className='text-blue-600 text-gradient-primary'>Unlock Your Potential?</span></p>

              <h1 className='text-3xl font-extrabold text-center xs:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-gradient-primary'>Learn. Grow. Achieve.<br />
                <span className='text-gradient-secondary'>Start Your Journey Today</span></h1>
            </div>

            <p className='text-sm text-center text-gray-400 xs:text-md md:text-lg xl:px-12'>Discover top-quality courses designed to help you master new skills and elevate your career. Learn from expert instructors across a wide range of topics—from business and marketing to design, language learning, and more. Wherever you want to grow, we’re here to support you ❤️</p>

            <button onClick={() => navigate('/dashboard/courses')} className='mt-2 md:mt-4 btn-secondary'>Explore Courses</button>

            <div className='hidden gap-2 mt-6 xl:flex'>
              {indexCategories.map((category, index) => (
                <div key={index} className='z-10 px-4 py-2 text-sm bg-gray-800 rounded-2xl'>
                  {category}
                </div>
              ))}
            </div>

            {/* gradient */}
            <div className="absolute bottom-0 right-0 bg-gray-300 rounded-full w-32 h-32 blur-[30px] md:opacity-40 opacity-30">
            </div>
          </div>
        </div>

        <div className='flex flex-col items-center justify-center gap-4'>
          <ChevronsUp size={30} />
          <h3 className='text-lg text-gray-300 md:text-2xl'>Explore Best Courses</h3>
        </div>
      </div>


      {/* left and right illustrations */}
      <img
        className="absolute top-0 left-0 z-0 hidden mt-20 pointer-events-none md:block opacity-60"
        src={codingLinesLeft}
        alt="Left Illustration"
      />
      <img
        className="absolute top-0 right-0 z-0 hidden mt-20 pointer-events-none select-none opacity-60 md:block"
        src={codingLinesRight}
        alt="Right Illustration"
      />

      {/* gradient */}
      <div className="absolute top-0 bg-blue-600 rounded-full w-40 h-80 blur-[200px] opacity-70">
      </div>
    </div>
  )
}

export default Index
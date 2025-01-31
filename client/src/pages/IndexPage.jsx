import { Link } from 'react-router-dom';
import TutorCard from '../components/TutorCard';
import { tutorsInfo } from '../data/tutorsInfo';
import { testimonialsImages } from '../data/testimonialsImages';

const IndexPage = () => {
  return (
    <div className='z-9 max-w-7xl mx-auto flex-col flex pt-36 px-5'>
      <div className='flex'>
        <section className='max-w-3xl flex flex-col gap-4'>
          <div className='flex flex-col gap-1 text-5xl sm:text-7xl font-bold'>
            <span className='text-bg-primary'>Master <span className='text-white'>new skills <br /> with</span></span>
            <span className='text-bg-primary animate-pulse'>Courso</span>
          </div>
          <div>
            <p className='text-gray-300'>Access a world of knowledge on your schedule. Affordable, interactive, and tailored courses designed to transform your career. Browse hundreds of courses in tech, business, and creativity. Build real-world skills with engaging content and expert guidance.
            </p>
          </div>
          <div className='mt-2 flex gap-16 items-center'>
            <Link to={'/courses'} className='btn-primary px-16 rounded-md py-2'>
              Explore Courses
            </Link>
            <div className='flex gap-2'>
              <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                {testimonialsImages.map((image, index) => (
                  <div key={index} className="avatar">
                    <div className="w-12 hover:z-20 hover:scale-125 transition-all ease-in">
                      <img src={image} />
                    </div>
                  </div>
                ))}
              </div>
              <div className='flex flex-col items-center'>
                <span className='font-bold text-2xl'>42K+</span>
                <span className='text-gray-400'>using this platform</span>
              </div>
            </div>
          </div>
          <div className='relative flex gap-4 mt-20 animate-scroll-left'>
            {[...tutorsInfo, ...tutorsInfo].map((tutor, index) => (
              <TutorCard key={index} item={tutor} />
            ))}
          </div>
        </section>

        <section className='hidden lg:block'>
          <div className='py-2 px-4 bg-purple-600 rounded-2xl inline animate-bounce'>
            Join our Learning Platform!
          </div>
          <img className='h-80 object-cover rounded-lg' src="https://res.cloudinary.com/dabywmj68/image/upload/v1738257142/man-sitting-front-laptop-computer-focusing-elearning-studying-online-student-learning-via-laptop-elearning-simple-minimalist-flat-vector-illustration_538213-119024_kifsoz.avif" alt="Image" />
          <div className='mt-4 bg-black py-4 px-8 rounded-full shadow-sm shadow-white'>
            <p className='text-center'>Master new skills and boost your career with us</p>
          </div>
        </section>
      </div>
    </div>
  )
}

export default IndexPage
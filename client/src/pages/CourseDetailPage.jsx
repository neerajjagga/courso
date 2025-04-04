
import { Youtube, ChevronRight, Star, Users, Globe, Gauge, BadgeInfo, CalendarDays } from 'lucide-react';
import { useCourseStore } from './../stores/useCourseStore';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ViewInstructorCard from '../components/ViewInstructorCard';
import { motion } from 'motion/react';
import { useUserStore } from '../stores/useUserStore';
import toast from 'react-hot-toast';
import CourseDetailShimmer from '../components/Shimmers/CourseDetailShimmer';
import { usePaymentStore } from '../stores/usePaymentStore';

const CourseDetailPage = () => {

  const [showFullDesc, setShowFullDesc] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const callFromDashboard = location.pathname.startsWith('/dashboard');
  const { titleSlug } = useParams();

  const { selectedCourse, getACourse } = useCourseStore();
  const { createOrder, order } = usePaymentStore();

  const { user } = useUserStore();
  const navigate = useNavigate();

  const { verifyPayment, setOrder } = usePaymentStore();

  useEffect(() => {
    setLoading(true);
    const fetchACourse = async () => {
      await getACourse(titleSlug);
    };

    fetchACourse();

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [titleSlug]);

  useEffect(() => {
    console.log("Order of second useEffect");
    console.log(order);

    if (order) {
      const options = {
        key: order.keyId,
        amount: order.amount,
        currency: 'INR',
        name: 'Courso',
        description: 'Master new skills with Courso',
        order_id: order.orderId,
        // callback_url: 'http://localhost:3000/api/payments/verify', 
        prefill: {
          name: user.fullname,
          email: user.email,
        },
        handler: async function (response) {
          console.log(response);
          const paymentDetails = {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
          }
          console.log("---------------------------paymentDetails in handler");
          console.log(paymentDetails);
          await verifyPayment(paymentDetails);
        },
        theme: {
          color: '#030712'
        },
        "modal": {
          "ondismiss": async function () {
            await setOrder();
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    }
  }, [order, user]);

  const handleEnrollNow = async () => {
    if (!user) {
      setTimeout(() => {
        navigate('/login');
      }, 1000);
      toast.error("Please first login to enroll");
      return;
    }
    await createOrder(selectedCourse.id);
  }

  return (
    <div className={`min-h-screen w-full ${callFromDashboard ? 'mt-14' : 'mt-16'}`}>
      {!loading ? (
        selectedCourse ? (
          <div className='flex flex-col'>
            {!callFromDashboard && (
              <div
                className="bg-[#1c1f27] flex items-center gap-1 font-semibold text-gray-300 truncate pt-8 px-10">
                <Link to="/" className="underline">Home</Link>
                <ChevronRight size={20} />
                <Link to="/courses" className="underline">Courses</Link>
                <ChevronRight size={20} />
                <span>{selectedCourse?.title}</span>
              </div>
            )}
            <div className='flex flex-col'>
              <section className="bg-[#1c1f27] px-4 md:px-10 md:pb-10 pb-5 md:gap-10 gap-2 grid grid-cols-3">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="md:col-span-2 col-span-3">
                  <div className="flex flex-col sm:gap-5 gap-3 mt-5 sm:mt-10">
                    <span className="sm:text-3xl text-2xl font-bold">{selectedCourse.title}</span>
                    {selectedCourse.subtitle && (
                      <span className="sm:text-lg text-md text-gray-300 line-clamp-1 lg:line-clamp-2">{selectedCourse.subtitle}</span>
                    )}
                    <div className='flex flex-col sm:gap-2 gap-1 text-gray-300'>
                      <div className='flex items-center gap-2'>
                        <BadgeInfo size={18} />
                        <div>
                          <span>Create by </span>
                          <span className='text-blue-500 underline'>{selectedCourse.instructor.fullname}</span>
                        </div>
                      </div>
                      <div className='flex gap-2 '>
                        <div className='flex gap-2 items-center'>
                          <CalendarDays size={17} />
                          <span>Last updated at </span>
                        </div>
                        <span>{new Date(selectedCourse.updatedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 sm:gap-4 text-gray-300 text-sm lg:text-lg mt-5">
                    <span className="bg-gray-800 px-3 py-1 rounded-full flex items-center gap-2">
                      <Gauge size={20} className='text-red-500' />
                      {selectedCourse.level.charAt(0).toUpperCase()}{selectedCourse.level.slice(1).replace(/([a-z])([A-Z])/g, '$1 $2')}</span>
                    <span className="bg-gray-800 px-3 py-1 rounded-full flex items-center gap-2">
                      <Globe size={18} className="text-blue-500" /> {selectedCourse.language}
                    </span>
                    <span className="bg-gray-800 px-3 py-1 rounded-full flex items-center gap-2">
                      <Users size={18} /> {selectedCourse.students.length || "0"} Students
                    </span>
                    <span className="bg-gray-800 px-3 py-1 rounded-full flex items-center gap-2">
                      <Star size={18} className="text-yellow-400" /> {selectedCourse.reviews.length || "0"} Reviews
                    </span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="border-2 border-neutral-700 flex flex-col gap-3 rounded-2xl overflow-hidden w-full pb-4 max-w-md mx-auto lg:mx-0 mt-5 md:col-span-1 col-span-3">
                  <div className="">
                    <img className="" src={selectedCourse.courseImageUrl || "https://res.cloudinary.com/dabywmj68/image/upload/v1738051049/placeholder_pg74id.webp"} alt={`${selectedCourse.title} Image`} />
                  </div>
                  <div className="px-4 pb-2 text-center text-3xl font-bold flex items-center gap-1">
                    <span>{selectedCourse.price.currencySymbol}</span>
                    <span>{selectedCourse.price.amount}</span>
                  </div>
                  <div className="px-4 h-full flex items-end">
                    <button onClick={handleEnrollNow} className="w-full flex justify-center items-center gap-2 rounded-lg py-[0.4rem] bg-blue-600 hover:bg-blue-500 transition-all">
                      <Youtube size={24} />
                      <span className="sm:text-xl font-semibold">Enroll Now</span>
                    </button>
                  </div>
                </motion.div>
              </section>

              <section className='md:px-10 px-4 mt-4 md:mt-5 flex flex-col gap-5'>
                {selectedCourse.description && (
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className='flex flex-col gap-2 items-start'>
                    <span className='text-2xl font-semibold'>Description:</span>
                    <span className='font-extralight'>
                      <p className={`text-gray-300 ${showFullDesc ? "" : "line-clamp-3"} transition-all`}>
                        {selectedCourse.description}
                      </p>
                    </span>
                    <button
                      onClick={() => setShowFullDesc(!showFullDesc)}
                      className="text-purple-600 font-semibold hover:underline"
                    >
                      {showFullDesc ? "Show less ▲" : "Show more ▼"}
                    </button>
                  </motion.div>
                )}
                <div>
                  <ViewInstructorCard instructor={selectedCourse.instructor} />
                </div>
              </section>
            </div >
          </div >
        ) : (
          <div className='text-3xl font-bold text-center mt-20'>
            <span className='text-red-500'>404</span> - <span>Oops! The page you're looking for doesn't exist.</span>
            <div className="mt-4">
              <p className="text-lg text-gray-500">It seems the page has been moved, deleted, or never existed. You can:</p>
              <ul className="mt-2 text-gray-500">
                <li>Go back to the <a href="/" className="text-blue-500 underline">homepage</a></li>
                <li>Check the URL for typos</li>
              </ul>
            </div>
          </div>
        )
      ) : (
        <CourseDetailShimmer />
      )}
    </div >
  )
}

export default CourseDetailPage;

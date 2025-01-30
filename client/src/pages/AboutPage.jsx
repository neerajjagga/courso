import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="bg-gray-900 min-h-screen py-10 px-5 sm:px-10 text-white mt-16">
      <div className="max-w-7xl mx-auto text-center">
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Master New Skills with Courso</h1>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Access a world of knowledge on your schedule. Affordable, interactive, and tailored courses designed to transform your career.
            Browse hundreds of courses in tech, business, and creativity. Build real-world skills with engaging content and expert guidance.
          </p>
        </header>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6">Why Choose Courso?</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <li className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out">
              <h3 className="font-semibold text-xl mb-2">Flexible Learning</h3>
              <p className="text-gray-400">Learn at your own pace, anytime, anywhere.</p>
            </li>
            <li className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out">
              <h3 className="font-semibold text-xl mb-2">Affordable Courses</h3>
              <p className="text-gray-400">Get access to high-quality courses at budget-friendly prices.</p>
            </li>
            <li className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out">
              <h3 className="font-semibold text-xl mb-2">Expert Instructors</h3>
              <p className="text-gray-400">Learn from industry professionals with hands-on experience.</p>
            </li>
            <li className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out">
              <h3 className="font-semibold text-xl mb-2">Interactive Content</h3>
              <p className="text-gray-400">Engage with quizzes, assignments, and hands-on projects.</p>
            </li>
            <li className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out">
              <h3 className="font-semibold text-xl mb-2">Real-World Skills</h3>
              <p className="text-gray-400">Gain practical skills that directly apply to your career goals.</p>
            </li>
          </ul>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6">Join Over 42K+ Learners</h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Thousands of users around the world are transforming their careers with Courso. From tech to business and creativity, you’ll gain the skills needed to stay ahead in a rapidly changing job market.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6">Our Impact</h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Courso is more than just a learning platform – it's a community of like-minded individuals committed to personal growth. Whether you're looking to start a new career, level up in your current job, or explore a passion, we’re here to help you every step of the way.
          </p>
        </section>

        <div className="text-center">
          <Link to={'/courses'} className="bg-blue-600 text-white text-xl font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out">
            Explore Courses
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
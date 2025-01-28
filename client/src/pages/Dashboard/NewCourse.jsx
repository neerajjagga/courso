import { useState } from "react"
import { motion } from "motion/react";
import CourseSpecificationForm from './../../components/CourseSpecificationForm';
import NewCourseBasicForm from "../../components/NewCourseBasicForm";
import { useCourseStore } from './../../stores/useCourseStore';
import toast from "react-hot-toast";
import { Loader } from 'lucide-react';
import NewCoursePopUp from "../../components/NewCoursePopUp";

const NewCourse = () => {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    category: "",
    level: "",
    language: "",
    price: {
      amount: "",
    },
    courseImageUrl: "",
  });

  const [courseImage, setCourseImage] = useState('');
  const [currentTab, setCurrentTab] = useState(1);
  const [error, setError] = useState("");

  const { createCourse, loading, success } = useCourseStore();

  const handlePrevButton = (e) => {
    e.preventDefault();
    setCurrentTab(prev => prev - 1);
  }

  const handleNextButton = (e) => {
    e.preventDefault();

    if (!formData.title) {
      setError("Title is required");
      toast.error("Title is required");
      return;
    }
    setCurrentTab(prev => prev + 1);
    setError("");
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.language) {
      setError("Please select language 🦜");
      toast.error("Language is required");
      return;
    }
    if (!formData.level) {
      setError("Please select appropriate level");
      toast.error("Please select appropriate level");
      return;
    }
    if (!formData.category) {
      setError("Please select category, to react your target audience");
      toast.error("Category is required");
      return;
    }
    if (!formData.price.amount) {
      setError("Price is required 💰");
      toast.error("Price is required");
      return;
    }
    if (courseImage) {
      formData["courseImageUrl"] = courseImage;
    }
    createCourse(formData);
  }

  return (
    <div className="relative h-full w-full py-3 px-10 mt-14 flex flex-col gap-8">
      {success && (
        <NewCoursePopUp />
      )}

      <div className="flex flex-col items-center gap-1">
        <span className="text-4xl font-bold">
          Create a new
          <span className="text-blue-500"> Course</span>
        </span>
        {currentTab === 1 ? (
          <motion.span
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-400">
            Let’s start building your course.
          </motion.span>
        ) : (
          <motion.span
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-400">
            Define Your Course Specifications.
          </motion.span>
        )}
        {error && (
          <motion.span
            className="text-red-500 text-md font-semibold -mb-7 ml-1 mt-2"
            initial={{ opacity: 0, }}
            animate={{ opacity: 1, }}
            transition={{ duration: 0.4 }}
          >
            {error}
          </motion.span>
        )}
      </div>

      <section>
        <div>
          {currentTab === 1 && (
            <NewCourseBasicForm
              formData={formData}
              setFormData={setFormData}
            />
          )}

          {currentTab === 2 && (
            <CourseSpecificationForm
              formData={formData}
              setFormData={setFormData}
              courseImage={courseImage}
              setCourseImage={setCourseImage}
            />
          )}

          <div className="w-full flex justify-between mt-3">
            {currentTab !== 1 && (
              <motion.button
                disabled={loading || currentTab === 1}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                onClick={handlePrevButton} className={`border-2 border-blue-600 py-2  px-8 rounded-md mt-2 font-semibold flex items-center justify-center gap-2 ${currentTab === 1 || loading && "border-gray-600"}`}>
                Previous
              </motion.button>
            )}
            {currentTab !== 2 && (
              <motion.button
                disabled={loading}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                onClick={handleNextButton}
                className={`btn-primary py-2 px-8 rounded-md mt-2 font-semibold flex items-center justify-center gap-2`}>
                Next
              </motion.button>
            )}
            {currentTab !== 1 && (
              <motion.button
                disabled={loading}
                onClick={handleSubmit}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className={`${loading ? "bg-green-500" : "bg-green-600"} py-2 px-8 rounded-md mt-2 font-semibold flex items-center justify-center gap-2`}>
                {loading && (
                  <Loader className="animate-spin" />
                )}
                Live your course
              </motion.button>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default NewCourse
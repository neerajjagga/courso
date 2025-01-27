import { useState } from "react"
import { motion } from "motion/react";

const NewCourse = () => {

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    category: "",
    level: "",
    language: "",
    price: "",
    courseImageUrl: "",
  });

  const [currentTab, setCurrentTab] = useState(1);
  const [error, setError] = useState("");

  const handlePrevButton = (e) => {
    e.preventDefault();
    setCurrentTab(prev => prev - 1);
  }

  const handleNextButton = (e) => {
    e.preventDefault();

    if (formData.title !== formData.title) {
      setError("Title is required");
      toast.error("Title is required");
      return;
    }
    setCurrentTab(prev => prev + 1);
    setError("");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className="relative h-full w-full py-3 px-10 mt-14 flex flex-col gap-8">
      <div className="flex flex-col items-center gap-1">
        <span className="text-4xl font-bold">
          Create a new
          <span className="text-blue-500"> Course</span>
        </span>
        <span className="text-xl text-gray-400">
          Let’s start building your course.
        </span>
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
            <form className="flex flex-col gap-5">
              <div className="relative flex flex-col gap-2">
                <label className="text-xl text-gray-300">
                  Title:
                </label>
                <input
                  value={formData.title}
                  onChange={(e) => {
                    if (e.target.value.length <= 80) {
                      setFormData({ ...formData, title: e.target.value })
                    }
                  }}
                  type="text"
                  className="w-full input-instructor-primary px-4 py-2 pr-10" placeholder="eg. Cohort 3.0 - Web Development Program"
                  required
                />
                <span className="absolute right-3 top-10 text-lg">
                  {80 - formData.title.length}
                </span>
              </div>

              <div className="relative flex flex-col gap-2">
                <label className="text-xl text-gray-300">
                  Subtitle:
                </label>
                <input
                  value={formData.subtitle}
                  onChange={(e) => {
                    if (e.target.value.length <= 200) {
                      setFormData({ ...formData, subtitle: e.target.value })
                    }
                  }}
                  type="text"
                  className="w-full input-instructor-primary px-4 py-2 pr-10" placeholder="eg. Cohort 3.0 - Web Development Program"
                />
                <span className="absolute right-3 top-10 text-lg">
                  {200 - formData.subtitle.length}
                </span>
              </div>

              <div className="relative flex flex-col gap-2">
                <label className="text-xl text-gray-300">
                  Description:
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => {
                    if (e.target.value.length <= 3000) {
                      setFormData({ ...formData, description: e.target.value })
                    }
                  }}
                  className="w-full input-instructor-primary px-4 py-2 pr-16" placeholder="eg. Cohort 3.0 - Web Development Program"
                  rows={15}
                />
                <span className="absolute right-6 top-10 text-lg">
                  {3000 - formData.description.length}
                </span>
              </div>
            </form>
          )}

          {/* {currentTab === 2 && (
             // TODO: build second form
          )} */}

          <div className="w-full flex justify-between">
            {currentTab !== 1 && (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                onClick={handlePrevButton} className={`border-2 border-blue-600 py-2 px-4 rounded-md mt-2 font-semibold flex items-center justify-center gap-2 ${currentTab === 1 && "bg-gray-600"}`}>
                Previous
              </motion.button>
            )}
            {currentTab !== 2 && (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                onClick={handleNextButton}
                className={`btn-primary py-2 px-4 rounded-md mt-2 font-semibold flex items-center justify-center gap-2`}>
                Next
              </motion.button>
            )}
            {currentTab !== 1 && (
              <motion.button
                onClick={handleSubmit}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className={`bg-green-600 py-2 px-4 rounded-md mt-2 font-semibold flex items-center justify-center gap-2`}>
                Create Account
              </motion.button>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default NewCourse
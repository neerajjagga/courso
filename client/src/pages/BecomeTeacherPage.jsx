import { motion } from "motion/react";
import { useState } from "react";
import SignUpForm from "../components/SignUpForm";
import { categoryItems } from "../data/CategoryItems";
import { toast } from 'react-hot-toast';
import { useUserStore } from "../stores/useUserStore";
import { useNavigate } from 'react-router-dom';

const BecomeTeacherPage = () => {
    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        password: "",
        confirmPassword: "",
        biography: "",
        category: "",
        headline: "",
        role: "instructor",
    });

    const [currentTab, setCurrentTab] = useState(1);
    const [error, setError] = useState("");
    const { signUp } = useUserStore();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.category) {
            setError("Please select category")
        }
        await signUp(formData);
        setError("");
    }

    const handlePrevButton = (e) => {
        e.preventDefault();
        setCurrentTab(prev => prev - 1);
    }

    const handleNextButton = (e) => {
        e.preventDefault();
        if (!formData.fullname || !formData.email || !formData.password || !formData.confirmPassword) {
            setError("Please fill all the fields");
            toast.error("Please fill all the fields");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Password doesn't match");
            toast.error("Password doesn't match");
            return;
        }
        setCurrentTab(prev => prev + 1);
        setError("");
    }

    return (
        <div className="mt-10 flex justify-center items-center pt-20">
            <div className="bg-[url('https://res.cloudinary.com/dabywmj68/image/upload/v1738048982/SignupLoginGradient_ije0ql.png')] bg-bottom bg-cover flex flex-col gap-2 py-10 px-10 rounded-md border-b border-r">
                <motion.div
                    className="sm:mx-auto sm:w-full sm:max-w-md text-center flex flex-col gap-2"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-3xl font-bold">Set Up <span className="text-blue-500">Instructor Account</span></span>
                    {currentTab === 1 && (
                        <motion.span
                            className="text-gray-300 text-lg"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            Begin your journey as an instructor and start teaching.
                        </motion.span>
                    )}

                    {currentTab === 2 && (
                        <motion.span
                            className="text-gray-300 text-lg"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            Tell us more about yourself
                        </motion.span>
                    )}
                </motion.div>

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

                {currentTab === 1 && (
                    <motion.div
                        className="mt-6 sm:mx-auto sm:w-full sm:max-w-md"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <SignUpForm
                            formData={formData}
                            setFormData={setFormData}
                            handleSubmit={handleSubmit}
                        />
                    </motion.div>
                )}

                {currentTab === 2 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
                        <form className="flex flex-col gap-3">
                            <div className="relative">
                                <input
                                    value={formData.headline}
                                    onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                                    type="text"
                                    className="w-full input-primary px-4 py-2 pr-10" placeholder="Developer and Lead Instructor"
                                    required
                                />
                                <span className="absolute right-3 top-1 text-lg">
                                    {60 - formData.headline.length}
                                </span>
                            </div>

                            <div className="relative">
                                <textarea
                                    value={formData.biography}
                                    onChange={(e) => setFormData({ ...formData, biography: e.target.value })}
                                    type="text"
                                    className="w-full input-primary px-4 py-2 pr-11 text-xl" placeholder="Developer and Lead Instructor"
                                    required
                                    rows={10}
                                    cols={56}
                                />
                                <span className="absolute right-3 top-1 text-lg">
                                    {1000 - formData.biography.length}
                                </span>
                            </div>

                            <div className="">
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full input-primary px-4 py-2 pr-11"
                                    required
                                >
                                    {categoryItems.map((category, index) => {
                                        return <option key={index} value={category.for}>{category.name}</option>
                                    })}
                                </select>
                            </div>
                        </form>
                    </motion.div>
                )}

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
        </div>
    )
}

export default BecomeTeacherPage
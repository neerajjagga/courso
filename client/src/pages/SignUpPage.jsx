import { useState } from "react"
import { motion } from 'motion/react';
import { useUserStore } from './../stores/useUserStore';
import SignUpForm from "../components/SignUpForm";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const SignUpPage = () => {
    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const { loading } = useUserStore();
    const { signUp } = useUserStore();

    function handleSubmit(e) {
        e.preventDefault();

        if (!formData.fullname || !formData.email || !formData.password || !formData.confirmPassword) {
            toast.error("Please fill all the fields");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            toast.error("Password doesn't match");
            return;
        }
        signUp(formData);
    }

    return (
        <div className="mt-10 flex justify-center items-center pt-20 ">
            <div className="bg-gradient-to-b from-blue-950 to-black-900 flex flex-col gap-2 py-10 px-10 rounded-md border-b border-r">
                <motion.div
                    className="sm:mx-auto sm:w-full sm:max-w-md text-center"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-3xl font-bold">Create your <span className="text-blue-500">Account</span></span>
                </motion.div>

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
                    >
                        <div>
                            <p className="text-sm text-gray-400 mt-1">Already have an account. <Link to={'/login'} className="text-blue-500 underline">Login</Link></p>
                        </div>
                        <button disabled={loading} type="submit" className="btn-primary py-2 rounded-md mt-2 font-semibold flex items-center justify-center gap-2">
                            {loading && <span className="loading loading-dots loading-md"></span>}
                            Create Account
                        </button>
                    </SignUpForm>
                </motion.div>
            </div>
        </div>
    )
}

export default SignUpPage
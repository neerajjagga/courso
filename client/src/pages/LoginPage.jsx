import { useState } from "react"
import { motion } from 'motion/react';
import { Link } from "react-router-dom";
import { useUserStore } from './../stores/useUserStore';
import { Eye, EyeClosed } from "lucide-react";

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [hidePassword, setHidePassword] = useState(true);

    const { login, loading } = useUserStore();

    function handleSubmit(e) {
        e.preventDefault();
        console.log(formData);
        login({
            email: formData.email,
            password: formData.password,
        });
    }

    function toggleHidePassword(e) {
        e.preventDefault();
        setHidePassword((prev) => {
            return !prev
        })
    }

    return (
        <div className="mt-10 shadow-white shadow-sm">
            <div className="bg-gray-800 bg-opacity-35 flex flex-col gap-2 py-10 px-10">
                <motion.div
                    className="sm:mx-auto sm:w-full sm:max-w-md text-center"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-3xl font-bold">Login <span className="text-blue-500">Now</span></span>
                </motion.div>

                <motion.div
                    className="mt-6 sm:mx-auto sm:w-full sm:max-w-md"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                        <div>
                            <input
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                type="email"
                                className="w-full input-primary px-4 py-2 sm:w-96" placeholder="Email"
                                required
                            />
                        </div>

                        <div className="flex gap-2">
                            <div className="relative">
                                <input
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    type={hidePassword ? "password" : "text"}
                                    className="input-primary px-4 py-2 pr-10 sm:w-96" placeholder="Password"
                                />
                                {
                                    hidePassword ? (
                                        <button onClick={toggleHidePassword}>
                                            <EyeClosed className="absolute top-2 right-2" />
                                        </button>
                                    ) : (
                                        <button onClick={toggleHidePassword}>
                                            <Eye className="absolute top-2 right-2" />
                                        </button>
                                    )
                                }
                            </div>
                        </div>
                        <div>
                            <p className="text-sm text-gray-400 mt-1">Don't have an account. <Link to={'/signup'} className="text-blue-500 underline">Create now</Link></p>
                        </div>
                        <button disabled={loading} type="submit" className="btn-primary py-2 rounded-md mt-2 font-semibold flex items-center justify-center gap-2">
                            {loading && <span className="loading loading-dots loading-md"></span>}
                            Login
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    )
}

export default LoginPage
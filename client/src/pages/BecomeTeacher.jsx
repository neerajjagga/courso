import { motion } from "motion/react";
import { useState } from "react";

const BecomeTeacher = () => {
    const [formData, setFormData] = useState({

    });

    return (
        <div className="mt-10 flex justify-center items-center pt-20">
            <div>
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
                    <form className="flex flex-col gap-3" onSubmit="">
                        <div className="">
                            <input
                                value=""
                                onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                                type="text"
                                className="w-full input-primary px-4 py-2" placeholder="Full Name"
                                required
                            />
                        </div>

                        <button disabled={false} type="submit" className="btn-primary py-2 rounded-md mt-2 font-semibold flex items-center justify-center gap-2">
                            {true && <span className="loading loading-dots loading-md"></span>}
                            Create Account
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    )
}

export default BecomeTeacher
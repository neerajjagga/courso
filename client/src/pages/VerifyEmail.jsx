import { useEffect, useState } from "react";
import { useUserStore } from "../stores/useUserStore";
import { motion } from "motion/react";
import { useNavigate } from 'react-router-dom';
import { Loader } from "lucide-react";

const VerifyEmail = () => {
    const { user, verifyVerificationCode, sendVerificationCode, loading, redirect } = useUserStore();
    const [code, setCode] = useState('');
    const [resendTime, setResendTime] = useState(120);
    const [isResendDisabled, setIsResendDisabled] = useState(true);
    const [isVerifyingCode, setIsVerifyingCode] = useState(false);
    const [isResendingCode, setIsResendingCode] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (resendTime === 0) {
            setIsResendDisabled(false);
            return;
        };

        const timer = setInterval(() => {
            setResendTime((prev) => prev - 1);
        }, 1000)

        return () => clearInterval(timer);
    }, [resendTime]);

    // TODO: fix not re-triggering after change in redirect 
    useEffect(() => {
        console.log("inside useEffect for redirect");
        console.log("Redirecting to:", redirect);
        if (redirect) {
            console.log("redirecting");
            navigate(redirect);
        }
    }, [redirect, navigate]);

    const handleSubmit = async (e) => {
        setIsVerifyingCode(true);
        if (code.length < 6) return;

        e.preventDefault();
        await verifyVerificationCode(code);

        setIsVerifyingCode(false);
    }

    const handleCodeChange = (e) => {
        const value = e.target.value;
        if (/^\d{0,6}$/.test(value)) {
            setCode(value);
        }
    };

    const handleResendVerCode = async () => {
        setIsResendingCode(true);
        setIsResendDisabled(true);

        await sendVerificationCode();

        setResendTime(120);
        setIsResendingCode(false);
    }

    return (
        <div className="mt-10 flex justify-center items-center pt-20 ">
            <div className="bg-gray-800 bg-opacity-35 flex flex-col gap-2 py-10 px-10">
                <motion.div
                    className="flex flex-col gap-3 sm:mx-auto sm:w-full sm:max-w-md text-center"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-3xl font-bold">Verify your <span className="text-blue-500">Email</span></span>
                    <div className="flex gap-2">
                        <span className="text-gray-400">
                            We sent a verification code to
                        </span>
                        <span>
                            {user?.email}
                        </span>
                    </div>
                </motion.div>

                <motion.div
                    className="mt-6 sm:mx-auto sm:w-full sm:max-w-md"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-1">
                            <label className="text-lg text-gray-400">Enter Code:</label>
                            <input
                                className="bg-gray-800 border border-gray-600 rounded-md shadow-sm h-12 pl-3
                                `placeholder-gray-400 focus:outline-none tracking-[1rem] focus:ring-blue-500 focus:border-blue-500 text-xl"
                                type="text"
                                required
                                maxLength={6}
                                value={code}
                                onChange={handleCodeChange}
                            />
                        </div>
                        <button
                            disabled={isVerifyingCode || code.length < 6 || isResendingCode || !isResendDisabled}
                            className={`flex items-center justify-center gap-2 transition-all duration-200 ease-in py-2 rounded-md text-lg font-semibold ${(code.length < 6 || isResendingCode || !isResendDisabled) ? "bg-gray-600" : "bg-green-600"}`}>
                            {isVerifyingCode && (
                                <Loader size={20} className="text-white animate-spin text-center" />
                            )}
                            Verify
                        </button>
                    </form>
                    <div className="flex flex-col">
                        <button
                            onClick={handleResendVerCode}
                            disabled={isResendDisabled}
                            className={`flex items-center justify-center gap-2  transition-all duration-200 ease-in py-2 rounded-md mt-3 text-lg font-semibold ${isResendDisabled ? "bg-gray-600" : "btn-primary"}`}
                        >
                            {isResendingCode && (
                                <Loader size={20} className="text-white animate-spin text-center" />
                            )}
                            Resend

                            {resendTime > 0 && (
                                <div className="flex gap-1">
                                    <span>
                                        in
                                    </span>
                                    <span>
                                        {resendTime}s
                                    </span>
                                </div>
                            )}
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default VerifyEmail
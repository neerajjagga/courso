import React, { useState } from "react";
import { Eye, EyeClosed, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../../store/useUserStore";

const LoginForm = () => {
    const [formData, setFormData] = useState<{ email: string, password: string }>({
        email: "",
        password: ""
    });
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

    const { login, isLoading } = useUserStore();

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        login(formData);
    }

    return (
        <div>
            <form onSubmit={handleLogin} className="flex flex-col gap-3">

                <div className="flex flex-col gap-1">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        name="email"
                        placeholder="name@gmail.com"
                        className="input-primary"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        required
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="password">Password</label>
                    <div className="relative">
                        <input
                            id="password"
                            name="password"
                            className="w-full input-primary"
                            type={isPasswordVisible ? "text" : "password"}
                            value={formData.password}
                            onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                            required
                        />
                        <div className="absolute -translate-y-1/2 opacity-50 cursor-pointer right-3 top-1/2">
                            {isPasswordVisible ? (
                                <EyeClosed onClick={() => setIsPasswordVisible(!isPasswordVisible)} />
                            ) : (
                                <Eye onClick={() => setIsPasswordVisible(!isPasswordVisible)} />
                            )}
                        </div>
                    </div>
                </div>

                <p className="text-sm md:text-base">Don't have an account, <Link className="text-blue-500" to='/signup'>Create now</Link></p>

                <div className="mt-3">
                    <button
                        disabled={isLoading}
                        className="flex items-center justify-center w-full gap-2 btn-secondary">
                        Login {isLoading && <span className="animate-spin"><Loader size={20} /></span>}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm;

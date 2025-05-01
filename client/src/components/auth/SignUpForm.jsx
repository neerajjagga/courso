import { useState } from "react";
import { Eye, EyeClosed, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../../store/useUserStore";

const SignUpForm = () => {
    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        password: ""
    });
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const { signUp, isLoading } = useUserStore();

    const handleSignUp = (e) => {
        e.preventDefault();
        signUp(formData);
    }

    return (
        <div>
            <form onSubmit={handleSignUp} className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                    <label htmlFor="name">Full Name</label>
                    <input
                        id="name"
                        name="name"
                        className="input-primary"
                        type="text"
                        placeholder="John Doe"
                        maxLength={20}
                        value={formData.fullname}
                        onChange={(e) => setFormData(prev => ({ ...prev, fullname: e.target.value }))}
                        required
                    />
                </div>

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

                <p className="text-sm md:text-base">Already have an account, <Link className="text-blue-500" to='/login'>Login now</Link></p>

                <div className="mt-3">
                    <button
                        disabled={isLoading}
                        className="flex items-center justify-center w-full gap-2 btn-secondary">Join now {isLoading && <span className="animate-spin"><Loader size={20} /></span>}</button>
                </div>
            </form>
        </div>
    )
}

export default SignUpForm
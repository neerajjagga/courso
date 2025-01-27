import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";

const SignUpForm = ({ formData, setFormData, handleSubmit, children }) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [hideConfirmPassword, setHideConfirmPassword] = useState(true);

    function toggleHidePassword(e) {
        e.preventDefault();
        setHidePassword((prev) => {
            return !prev
        })
    }

    function toggleHideConfirmPassword(e) {
        e.preventDefault();
        setHideConfirmPassword((prev) => {
            return !prev
        })
    }
    return (
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <div className="">
                <input
                    value={formData.fullname}
                    onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                    type="text"
                    className="w-full input-primary px-4 py-2" placeholder="Full Name"
                    required
                />
            </div>

            <div>
                <input
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    type="email"
                    className="w-full input-primary px-4 py-2" placeholder="Email"
                    required
                />
            </div>

            <div className="flex gap-2">
                <div className="relative">
                    <input
                        value={formData.password}
                        onChange={(e) => {
                            if (e.target.value.endsWith(' ')) {
                                return;
                            }
                            setFormData({ ...formData, password: e.target.value });
                        }}
                        type={hidePassword ? "password" : "text"}
                        className="input-primary px-4 py-2 pr-10" placeholder="Password"
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

                <div className="relative">
                    <input
                        value={formData.confirmPassword}
                        onChange={(e) => {
                            if (e.target.value.endsWith(' ')) {
                                return;
                            }
                            setFormData({ ...formData, confirmPassword: e.target.value })
                        }}
                        type={hideConfirmPassword ? "password" : "text"}
                        className="input-primary px-4 py-2 pr-10"
                        placeholder="Confirm Password"
                    />
                    {
                        hideConfirmPassword ? (
                            <button onClick={toggleHideConfirmPassword}>
                                <EyeClosed className="absolute top-2 right-2" />
                            </button>
                        ) : (
                            <button onClick={toggleHideConfirmPassword}>
                                <Eye className="absolute top-2 right-2" />
                            </button>
                        )
                    }
                </div>
            </div>
            {children}
        </form>
    )
}

export default SignUpForm
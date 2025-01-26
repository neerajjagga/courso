import SocialLinks from "./SocialLinks";
import { useUserStore } from "../stores/useUserStore";
import { Shield, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EditProfileForm = ({ handleEditProfileSubmit, fullNameCount, setFullNameCount, textareaCount, setTextareaCount, formData, setFormData }) => {

    const { user, sendVerificationCode, loading } = useUserStore();
    const navigate = useNavigate();

    const handleVerifyEmail = async (e) => {
        e.preventDefault();
        await sendVerificationCode();
        navigate('/verify-email');
    }

    return (
        <>
            <div>
                <span className="text-xl text-gray-400">Basics</span>
            </div>

            <div className="mt-4">
                <form onSubmit={handleEditProfileSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1 relative">
                        <div className="flex gap-10">
                            <label>Full Name:</label>
                            <div className="absolute left-80">
                                <span className={fullNameCount > 20 ? "text-red-600" : null}>{fullNameCount}</span>
                                /20
                            </div>
                        </div>
                        <input
                            value={formData.fullname}
                            onChange={(e) => {
                                setFullNameCount(e.target.value.length);
                                setFormData({ ...formData, fullname: e.target.value });
                            }}
                            type="text"
                            className="w-full input-primary px-4 py-2 sm:w-96" placeholder="John Doe"
                        />
                    </div>

                    <div className="flex flex-col gap-1 relative">
                        <div className="flex gap-10">
                            <label>Short Bio:</label>
                            <div className="absolute left-80">
                                <span className={textareaCount > 100 ? "text-red-600" : null}>{textareaCount}</span>
                                /100
                            </div>
                        </div>

                        <textarea
                            value={formData.bio}
                            onChange={(e) => {
                                setTextareaCount(e.target.value.length);
                                setFormData({ ...formData, bio: e.target.value });
                            }}
                            type="text"
                            className="w-full input-primary px-4 py-2 sm:w-96" placeholder="Remote Software Engineer"
                            rows={4}
                        />
                    </div>

                    <div className="flex flex-col gap-1 relative">
                        <div className="flex gap-10">
                            <label>Email:</label>
                        </div>
                        <div className="flex gap-2">
                            <input
                                disabled={true}
                                value={user?.email}
                                type="text"
                                className="w-full px-4 py-2 sm:w-96 bg-gray-700 rounded-md font-semibold"
                            />
                            {user?.isEmailVerified ? (
                                <button
                                    className="flex items-center gap-2 border border-green-500 py-2 px-4 bg-black rounded-md"
                                    disabled={true}
                                >
                                    <ShieldCheck size={18} />
                                    <span className="text-green-500 font-semibold">Verified</span>
                                </button>
                            ) : (
                                <button
                                    disabled={loading}
                                    onClick={handleVerifyEmail}
                                    className={`flex items-center gap-2 border py-2 px-4 bg-black rounded-md ${loading ? "border-red-400" : "border-red-500"}`}>
                                    <Shield size={18} />
                                    <span className={` font-semibold ${loading ? "text-red-400" : "text-red-500"}`}>Verify</span>
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="lg:w-[60%]">
                        <SocialLinks formData={formData} setFormData={setFormData} />
                    </div>

                    {/* update button */}
                    <div className="text-center">
                        <button
                            type="submit"
                            className={
                                "py-1 px-4 text-lg font-semibold rounded-md  transition-all ease bg-green-600 hover:bg-green-700"
                            }>
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default EditProfileForm
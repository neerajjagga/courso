import SocialLinks from "./SocialLinks";
import { useUserStore } from "../stores/useUserStore";
import { Shield, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EditProfileForm = ({ handleEditProfileSubmit, formData, setFormData }) => {

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
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-10">
                            <label>Full Name:</label>
                        </div>
                        <div className="relative">
                            <input
                                value={formData.fullname}
                                onChange={(e) => {
                                    if (e.target.value.length <= 20) {
                                        setFormData({ ...formData, fullname: e.target.value });
                                    }
                                }}
                                type="text"
                                className="w-full input-primary px-4 py-2" placeholder="John Doe"
                            />
                            <span className={`absolute right-3 top-1 text-lg ${formData.fullname.length > 20 ? "text-red-500 " : "text-gray-300 "}`}>
                                {20 - formData.fullname.length}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1 relative">
                        <label>Headline:</label>
                        <div className="relative">
                            <input
                                value={formData.headline}
                                onChange={(e) => {
                                    if (e.target.value.length <= 60) {
                                        setFormData({ ...formData, headline: e.target.value })
                                    }
                                }}
                                type="text"
                                className="w-full input-primary px-4 py-2 pr-10" placeholder="Developer and Lead Instructor"
                            />
                            <span className={`absolute right-3 top-1 text-lg ${formData.headline.length > 60 ? "text-red-500 " : "text-gray-300 "}`}>
                                {60 - formData.headline.length}
                            </span>
                        </div>
                    </div>

                    {user.role === "instructor" && (
                        <div className="flex flex-col gap-1 relative">
                            <label>Biography:</label>
                            <div className="relative">
                                <textarea
                                    value={formData.biography}
                                    onChange={(e) => {
                                        if (e.target.value.length <= 1000) {
                                            setFormData({ ...formData, biography: e.target.value })
                                        }
                                    }}
                                    type="text"
                                    className="w-full input-primary px-4 py-2 pr-11 text-xl" placeholder="Developer and Lead Instructor"
                                    rows={10}
                                    cols={56}
                                />
                                <span className={`absolute right-3 top-1 text-lg ${formData.biography.length > 1000 ? "text-red-500 " : "text-gray-300 "}`}>
                                    {1000 - formData.biography.length}
                                </span>
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col gap-1 relative">
                        <div className="flex gap-10">
                            <label>Email:</label>
                        </div>
                        <div className="flex gap-2">
                            <input
                                disabled={true}
                                value={user?.email}
                                type="text"
                                className="w-full px-4 py-2 sm:w-96 bg-gray-700 rounded-md font-semibold text-gray-400"
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
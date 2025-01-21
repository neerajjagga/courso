import SocialLinks from "./SocialLinks";

const EditProfileForm = ({ handleEditProfileSubmit, fullNameCount, setFullNameCount, textareaCount, setTextareaCount, formData, setFormData }) => {
    const isDisabled = Object.values(formData).every(value => !value);

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

                    <div className="w-[60%]">
                        <SocialLinks formData={formData} setFormData={setFormData} />
                    </div>

                    {/* update button */}
                    <div className="text-center">
                        <button
                            type="submit"
                            disabled={isDisabled}
                            className={
                                `py-1 px-4 text-lg font-semibold rounded-md  transition-all ease 
                                ${isDisabled ? "bg-gray-400 text-lg font-semibold rounded-md"
                                    : "bg-green-600 hover:bg-green-700"}`
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
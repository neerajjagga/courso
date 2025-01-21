
const SocialLinks = ({ formData, setFormData }) => {
    return (
        <>
            <label className="text-xl text-gray-400">Social Links:</label>

            <div className="mt-4 flex flex-col gap-5">

                <div className="flex flex-col gap-1">
                    <div className="flex">
                        <span className="bg-gray-600 px-4 py-2 rounded-l-md">http://twitter.com/</span>
                        <input
                            value={formData.twitterUrl}
                            onChange={(e) => {
                                setFormData({ ...formData, twitterUrl: e.target.value });
                            }}
                            type="url"
                            className="w-full rounded-r-md input-profile-primary px-4 py-2 sm:w-96" placeholder="Twitter Profile"
                        />
                    </div>
                    <span className="text-sm text-gray-400">Add your Twitter username (e.g. johnsmith).</span>
                </div>

                <div className="flex flex-col gap-1">
                    <div className="flex">
                        <span className="bg-gray-600 px-4 py-2 rounded-l-md">http://www.linkedin.com/</span>
                        <input
                            value={formData.linkedInUrl}
                            onChange={(e) => {
                                setFormData({ ...formData, linkedInUrl: e.target.value });
                            }}
                            type="url"
                            className="w-full rounded-r-md input-profile-primary px-4 py-2 sm:w-96" placeholder="LinkedIn Profile"
                        />
                    </div>
                    <span className="text-sm text-gray-400">Input your LinkedIn resource id (e.g. in/johnsmith).
                    </span>
                </div>


                <div className="flex flex-col gap-1">
                    <div className="flex">
                        <span className="bg-gray-600 px-4 py-2 rounded-l-md">http://www.facebook.com/
                        </span>
                        <input
                            value={formData.facebookUrl}
                            onChange={(e) => {
                                setFormData({ ...formData, facebookUrl: e.target.value });
                            }}
                            type="url"
                            className="w-full rounded-r-md input-profile-primary px-4 py-2 sm:w-96" placeholder="Facebook Profile"
                        />
                    </div>
                    <span className="text-sm text-gray-400">Input your Facebook username (e.g. johnsmith).
                    </span>
                </div>
            </div>
        </>
    )
}

export default SocialLinks
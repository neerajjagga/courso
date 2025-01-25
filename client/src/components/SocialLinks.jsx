
const SocialLinks = ({ formData, setFormData }) => {
    
    const socialLinksData = [
        {
            label: "Twitter",
            prefix: "https://twitter.com/",
            value: formData.twitterUrl,
            placeholder: "Twitter Profile",
            hint: "Add your Twitter username (e.g. johnsmith).",
            field: "twitterUrl",
        },
        {
            label: "LinkedIn",
            prefix: "https://www.linkedin.com/",
            value: formData.linkedInUrl,
            placeholder: "LinkedIn Profile",
            hint: "Input your LinkedIn resource id (e.g. in/johnsmith).",
            field: "linkedInUrl",
        },
        {
            label: "Facebook",
            prefix: "https://www.facebook.com/",
            value: formData.facebookUrl,
            placeholder: "Facebook Profile",
            hint: "Input your Facebook username (e.g. johnsmith).",
            field: "facebookUrl",
        },
        {
            label: "Github",
            prefix: "https://www.github.com/",
            value: formData.githubUrl,
            placeholder: "Github Profile",
            hint: "Input your Github username (e.g. johnsmith123).",
            field: "githubUrl",
        },
    ];

    return (
        <>
            <label className="text-xl text-gray-400">Social Links:</label>
            <div className="mt-4 flex flex-col gap-5">
                {socialLinksData.map((link, index) => (
                    <div key={index} className="flex flex-col gap-1">
                        <div className="flex">
                            <span className="bg-gray-600 px-4 py-2 rounded-l-md">{link.prefix}</span>
                            <input
                                value={link.value}
                                onChange={(e) =>
                                    setFormData({ ...formData, [link.field]: e.target.value })
                                }
                                type="text"
                                className="w-full rounded-r-md input-profile-primary px-4 py-2 sm:w-96"
                                placeholder={link.placeholder}
                            />
                        </div>
                        <span className="text-sm text-gray-400">{link.hint}</span>
                    </div>
                ))}
            </div>
        </>
    );
};

export default SocialLinks;

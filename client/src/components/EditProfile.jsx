import { useState } from "react"
import EditProfileForm from "./EditProfileForm";
import { useUserStore } from './../stores/useUserStore';
import toast from "react-hot-toast";

const EditProfile = () => {
    const { user, editProfile } = useUserStore();
    
    const [formData, setFormData] = useState({
        fullname: user.fullname || "",
        bio: user.bio || "",
        twitterUrl: user.socialLinks.find(link => link.name === "Twitter")?.url?.split('com/')[1] || "",
        facebookUrl: user.socialLinks.find(link => link.name === "Facebook")?.url?.split('com/')[1] || "",
        linkedInUrl: user.socialLinks.find(link => link.name === "LinkedIn")?.url?.split('com/')[1] || "",
        githubUrl: user.socialLinks.find(link => link.name === "Github")?.url?.split('com/')[1] || "",
    })
    const [textareaCount, setTextareaCount] = useState(user.bio.length || 0);
    const [fullNameCount, setFullNameCount] = useState(user.fullname.length || 0);

    function handleEditProfileSubmit(e) {
        e.preventDefault();

        const trimmedFullname = formData.fullname.trim();
        const trimmedBio = formData.bio.trim();

        if (trimmedFullname === '') {
            toast.error("Fullname cannot be empty");
            return;
        }

        let dataToBeUpdated = {}

        if (user.fullname !== trimmedFullname) {
            dataToBeUpdated["fullname"] = trimmedFullname;
        }

        if (user.bio !== trimmedBio) {
            dataToBeUpdated["bio"] = trimmedBio;
        }

        const socialLinksArray = [
            createSocialLink("Twitter", "http://twitter.com", formData.twitterUrl),
            createSocialLink("Facebook", "http://facebook.com", formData.facebookUrl),
            createSocialLink("LinkedIn", "http://linkedin.com", formData.linkedInUrl),
            createSocialLink("Github", "http://github.com", formData.githubUrl),
        ].filter(Boolean);

        function createSocialLink(urlName, baseUrl, username) {
            const trimmedUsername = username.trim();
            return {
                name: urlName.trim(),
                url: trimmedUsername ? `${baseUrl}/${trimmedUsername}` : baseUrl,
            }
        }

        if (socialLinksArray.length > 0) {
            dataToBeUpdated["socialLinks"] = socialLinksArray
        }
        if (user.bio !== formData.bio.trim()) {
            dataToBeUpdated["bio"] = formData.bio;
        }
        if (Object.keys(dataToBeUpdated).length > 0) {
            editProfile(dataToBeUpdated);
        } else {
            toast.error("No changes detected.");
        }
    }

    return (
        <div className="h-full flex flex-col px-10 pb-5">

            <div className="flex flex-col items-center border-b w-full pb-4 gap-1">
                <span className="text-2xl font-bold">Edit Profile</span>
                <span className="text-gray-300">Add information about yourself</span>
            </div>

            <div className="mt-10">
                <EditProfileForm handleEditProfileSubmit={handleEditProfileSubmit} fullNameCount={fullNameCount} setFullNameCount={setFullNameCount} textareaCount={textareaCount} setTextareaCount={setTextareaCount} formData={formData} setFormData={setFormData} />
            </div>
        </div>
    )
}

export default EditProfile
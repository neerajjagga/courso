import { useState } from "react"
import EditProfileForm from "./EditProfileForm";
import { useUserStore } from './../stores/useUserStore';
import toast from "react-hot-toast";

const EditProfile = () => {
    const {user} = useUserStore();
    const [formData, setFormData] = useState({
        fullname: user.fullname || "",
        bio: "",
        twitterUrl: "",
        facebookUrl: "",
        instagramUrl: "",
        linkedInUrl: "",
    })
    const [textareaCount, setTextareaCount] = useState(0);
    const [fullNameCount, setFullNameCount] = useState(user.fullname.length || 0);

    function handleEditProfileSubmit(e) {
        e.preventDefault();
        if(user.fullname === formData.fullname) {
            return toast.error("Full name cannot be same as previous one");        
        }
        let socialLinksArray = [];
        if(twitterUrl) {
            socialLinksArray.push({
                name : "Twitter",
                url : formData.twitterUrl
            })
        }
        if(facebookUrl) {
            socialLinksArray.push({
                name : "Facebook",
                url : formData.facebookUrl
            })
        }
        if(twitterUrl) {
            socialLinksArray.push({
                name : "LinkedIn",
                url : formData.linkedInUrl
            })
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
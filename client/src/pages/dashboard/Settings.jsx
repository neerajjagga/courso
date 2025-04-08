import { useState } from "react";
import { useAuthUser } from "../../hooks/useAuthUser";
import { Pencil } from "lucide-react";
import { convertImageToBase64 } from "../../utils/imageToBase64";

const Settings = () => {
  const user = useAuthUser();
  const [isEditView, setIsEditView] = useState(false);
  const [fullname, setFullname] = useState(user.fullname);
  const [profileImage, setProfileImage] = useState(user.profileImageUrl);

  const handleImageChange = async (e) => {
    try {
      const base64 = await convertImageToBase64(e);
      console.log(base64);
      setProfileImage(base64);
    } catch (error) {
      console.log("Image upload error:", error);
    }
  };

  return (
    <div className="pt-4 xl:px-28">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between pb-2 border-b border-opacity-30 border-b-gray-500">
          <h1 className="text-4xl font-bold">Account Settings</h1>
          <button onClick={() => setIsEditView(prev => !prev)} className="flex items-center justify-center gap-2 px-3 py-1 text-xl bg-gray-700 rounded-md"><Pencil size={18} /> {isEditView ? "Edit" : "View"}</button>
        </div>

        <div className="flex flex-col gap-12 px-8 py-4 pb-8 border border-gray-500 rounded-lg border-opacity-30">
          <h2 className="text-2xl">Profile Information</h2>
          <div className="flex items-center gap-4">
            {profileImage ? (
              <img
                className="object-cover w-32 h-32 rounded-full"
                src={profileImage}
                alt="User Uploaded Profile Image"
              />
            ) : user.profileImageUrl ? (
              <img
                className="object-cover w-32 h-32 rounded-full"
                src={user.profileImageUrl}
                alt="User Profile Image"
              />
            ) : (
              <span className='flex items-center justify-center w-32 h-32 text-4xl font-bold text-white bg-red-600 rounded-full'>
                {user.fullname?.charAt(0).toUpperCase()}
              </span>
            )}

            {isEditView && (
              <div className="relative flex items-center gap-2">
                <input
                  type="file"
                  accept="image/*"
                  id="upload"
                  className="hidden"
                  onChange={(e) => handleImageChange(e)}
                  disabled={profileImage}
                />
                <label
                  htmlFor="upload"
                  className={`px-4 py-2 text-white transition bg-blue-600 ${profileImage ? "bg-gray-800" : "bg-blue-600 cursor-pointer  hover:bg-blue-700"} rounded`}
                >
                  Select File
                </label>

                {profileImage && <button
                  onClick={() => setProfileImage(null)}
                  className="px-4 py-2 text-white transition-all duration-300 ease-in bg-red-700 rounded hover:bg-red-500">Remove</button>}
              </div>
            )}
          </div>

          {user.role === "user" ? (
            // user profile form
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="name">Full Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className={`${isEditView ? "input-primary" : "input-primary-disabled"} lg:w-1/2`}
                  placeholder=""
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  disabled={!isEditView}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  disabled
                  type="text"
                  className="input-primary-disabled lg:w-1/2"
                  value={user.email}
                />
                <span className="text-gray-400">You cannot change your email address.</span>
              </div>
            </div>
          ) : (
            <div>

            </div>
          )}

          {/* update settings */}
          <button className="self-start btn-primary">Update Settings</button>
        </div>
      </div>
    </div>
  )
}

export default Settings
import { useState } from "react";
import { Loader, Pencil } from "lucide-react";
import { convertImageToBase64 } from "../../utils/imageToBase64";
import toast from "react-hot-toast";
import InstructorProfileForm from '../../components/dashboard/settings/InstructorProfileForm';
import { useUserStore } from "../../store/useUserStore";
import { User } from "types/user";
import CustomLoader from '../../components/common/CustomLoader';
import { InstructorSocialLink } from "types/course";
import { InstructorSettingsProfileForm } from "types/user";

const Settings = () => {
  const { user } = useUserStore();

  if (!user) {
    return <CustomLoader />
  }

  const [isEditView, setIsEditView] = useState(false);

  const [fullname, setFullname] = useState<string>(user.fullname);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const [instructorFormData, setInstructorFormData] = useState<InstructorSettingsProfileForm>({
    fullname: user.fullname || "",
    bio: user?.bio || null,
    profileImageUrl: user.profileImageUrl || profileImage,
    twitterUsername: user?.socialLinks?.find(obj => obj.name === "twitter")?.username || null,
    facebookUsername: user?.socialLinks?.find(obj => obj.name === "facebook")?.username || null,
    instagramUsername: user?.socialLinks?.find(obj => obj.name === "instagram")?.username || null,
    linkedInUsername: user?.socialLinks?.find(obj => obj.name === "linkedin")?.username || null,
    githubUsername: user?.socialLinks?.find(obj => obj.name === "github")?.username || null,
  });

  const { updateProfile: editUser, isUpdatingProfile: isPending } = useUserStore();

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const base64: string = await convertImageToBase64(e);
      setProfileImage(base64);
    } catch (error) {
      console.log("Image upload error:", error);
    }
  };

  const handleUserUpdateSettings = async () => {
    const updatedData: Partial<User> = {};
    const trimmedFullname = fullname.trim();

    if (trimmedFullname && trimmedFullname !== user.fullname) {
      updatedData.fullname = trimmedFullname;
    }

    if (profileImage && profileImage !== user.profileImageUrl) {
      updatedData.profileImageUrl = profileImage;
    }

    if (Object.keys(updatedData).length === 0) {
      return toast.error("Please edit something to update.");
    }

    await editUser(updatedData);
    setProfileImage(null);
    setIsEditView(false);
  }

  const handleInstructorUpdateSettings = async () => {

    const updatedSocialLinks: InstructorSocialLink[] = [
      {
        name: "linkedin",
        url: "http://linkedin.com",
        username: instructorFormData.linkedInUsername || null,
      },
      {
        name: "facebook",
        url: "http://facebook.com",
        username: instructorFormData.facebookUsername || null,
      },
      {
        name: "twitter",
        url: "http://x.com",
        username: instructorFormData.twitterUsername || null,
      },
      {
        name: "github",
        url: "http://github.com",
        username: instructorFormData.githubUsername || null,
      },
      {
        name: "instagram",
        url: "http://instagram.com",
        username: instructorFormData.instagramUsername || null,
      },
    ];

    const hasChangesInNameOrBio =
      instructorFormData.fullname !== user.fullname ||
      instructorFormData.bio !== (user.bio || "");

    const hasChangesInSocialMedia = updatedSocialLinks.some((updatedLink) => {
      const original = user.socialLinks.find((l) => l.name === updatedLink.name);
      return original?.username !== updatedLink.username;
    });

    if (!hasChangesInNameOrBio && !profileImage && !hasChangesInSocialMedia) {
      toast.error("No changes found to update.");
      return;
    }

    const updateData: Partial<User> = {}
    if (hasChangesInNameOrBio) {
      updateData.fullname = instructorFormData.fullname;
      updateData.bio = instructorFormData.bio;
    }
    if (hasChangesInSocialMedia) {
      updateData.socialLinks = updatedSocialLinks;
    }
    if (profileImage) {
      updateData.profileImageUrl = profileImage;
    }

    await editUser(updateData);
    setProfileImage(null);
    setIsEditView(false);
  }

  return (
    <div className="px-3 pt-2 md:pt-2 sm:px-10">
      <div className="flex flex-col gap-2 md:gap-6">
        <div className="flex items-center justify-between px-2 pb-2 border-b border-opacity-30 border-b-gray-500">
          <h1 className="text-[1.30rem] font-bold xs:text-2xl sm:text-3xl">Account Settings</h1>
          <button onClick={() => setIsEditView(prev => !prev)} className="flex items-center justify-center gap-2 px-3 py-1 text-sm bg-gray-700 rounded-md xs:text-base md:text-xl"><Pencil size={16} /> {isEditView ? "Edit" : "View"}</button>
        </div>

        <div className="flex flex-col gap-4 px-3 py-6 pb-8 border border-gray-500 rounded-lg xs:px-4 md:px-6 lg:px-8 xs:gap-6 xs:py-8 md:gap-8 lg:gap-10 border-opacity-30">
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
              <div className="relative flex flex-col gap-2 sm:items-center sm:flex-row">
                <input
                  type="file"
                  accept="image/*"
                  id="upload"
                  className="hidden"
                  onChange={(e) => handleImageChange(e)}
                  disabled={!!profileImage}
                />
                <label
                  htmlFor="upload"
                  className={`md:px-5 px-4 md:py-[0.40rem] py-[0.30rem] text-white transition bg-blue-600 ${profileImage ? "bg-gray-800" : "bg-blue-600 cursor-pointer  hover:bg-blue-700"} rounded`}
                >
                  Select File
                </label>

                {profileImage && <button
                  disabled={isPending}
                  onClick={() => setProfileImage(null)}
                  className="md:px-5 px-4 md:py-[0.40rem] py-[0.30rem] text-white transition-all duration-300 ease-in bg-red-700 rounded hover:bg-red-500">Remove</button>}
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
                  maxLength={20}
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
              <InstructorProfileForm
                instructorFormData={instructorFormData}
                setInstructorFormData={setInstructorFormData}
                isEditView={isEditView}
              />
            </div>
          )}

          {/* update settings */}
          <button
            disabled={isPending || !isEditView}
            onClick={user.role === "user" ? handleUserUpdateSettings : handleInstructorUpdateSettings}
            className={`flex items-center self-start justify-center gap-2 ${!isPending && isEditView ? "btn-primary" : "btn-primary-disabled"} text-base`}>
            Update Settings
            {isPending &&
              <span className="animate-spin">
                <Loader />
              </span>}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Settings
import { Loader, Pencil } from "lucide-react";
import { useUserStore } from "../stores/useUserStore"
import { useState } from "react";
import { handleFileChange } from "../utils/handleFileChange";

const EditPhoto = () => {
  const { user, editPhoto, loading } = useUserStore();
  const [profileImage, setProfileImage] = useState('');
  const [isSelectedImage, setIsSelectedImage] = useState(false);
  const [isCompressingImage, setIsCompressingImage] = useState(false);

  const handleUpdatePhoto = async (e) => {
    console.log(profileImage);
    e.preventDefault();
    let updatedData = {}
    updatedData["profileImageUrl"] = profileImage;
    await editPhoto(updatedData);
    setIsSelectedImage(false);
    if (isDeletingImage) setIsDeletingImage(false);
  };

  return (
    <div className="h-full flex flex-col items-center">
      <div className="flex flex-col items-center border-b-2 w-full pb-4 gap-1">
        <span className="text-2xl font-bold">Edit Profile Photo</span>
        <span className="text-gray-300">Edit your profile photo and attract more people</span>
      </div>

      <section className="mt-10 w-full flex flex-col items-center gap-4">
        <form onSubmit={handleUpdatePhoto} className="flex flex-col items-center">
          <div>
            <div className="relative">
              {user.profileImageUrl ? (
                <img
                  className="h-36 w-36 rounded-full object-cover transition-all ease shadow-md shadow-black"
                  src={profileImage || user.profileImageUrl}
                  alt={user.fullname}
                />
              ) : (
                profileImage ? (
                  <img
                    className="h-36 w-36 rounded-full object-cover transition-all ease shadow-md shadow-black"
                    src={profileImage}
                    alt={user.fullname}
                  />
                ) : (
                  <div className="h-36 w-36 bg-blue-950 text-5xl text-white rounded-full flex items-center justify-center font-semibold transition-all ease shadow-md shadow-black">
                    {user.fullname.charAt(0).toUpperCase()}
                  </div>
                )
              )}
              {loading && (
                <div className="flex justify-center items-center absolute inset-0 bg-black rounded-full bg-opacity-45">
                  <Loader size={32} className="text-white animate-spin text-center" />
                </div>
              )}
            </div>

            <div className="relative">
              <label className="absolute bottom-0 right-0 mb-2 mr-2 cursor-pointer h-10 w-10 bg-black flex justify-center items-center rounded-full">
                <input
                  disabled={loading || isCompressingImage}
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    handleFileChange(e, setIsSelectedImage, setIsCompressingImage, setProfileImage, profileImage);
                  }}
                />
                <Pencil size={24} />
              </label>
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-4 items-center">

            <div className="flex flex-col gap-2 items-center">
              {isSelectedImage ? (
                <p className="text-green-500">Image selected successfully</p>
              ) : (
                <p className="text-red-500">Please select an image to update</p>
              )}
              {loading && (
                <p className="text-gray-500">Processing....</p>
              )}
              {isCompressingImage && (
                <p className="text-gray-500">Compressing image....</p>
              )}
            </div>

            <div className="flex gap-2">
              <button
                disabled={!isSelectedImage || loading}
                type="submit"
                className={`flex gap-2 py-2 px-4 rounded-md ${isSelectedImage && !loading ? "bg-green-500" : "bg-gray-500"}`}>
                Save
              </button>

              {user.profileImageUrl && (
                <button
                  type="submit"
                  onClick={() => {
                    setProfileImage('');
                  }}
                  disabled={isSelectedImage}
                  className={`flex gap-2 py-2 px-4 rounded-md  ${!isSelectedImage ? "bg-red-600" : "bg-gray-500"}`}>
                  Remove
                </button>
              )}
            </div>

          </div>
        </form>
      </section>
    </div>
  )
}

export default EditPhoto
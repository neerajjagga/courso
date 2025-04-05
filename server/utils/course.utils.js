import cloudinary from "../lib/cloudinary.js";

export const uploadImageOnCloudinary = async (courseImageUrl) => {
    try {
        const uploadRes = await cloudinary.uploader.upload(courseImageUrl, {
            transformation: [
                {
                    crop: 'fill',
                    gravity: 'auto',
                    quality: "auto",
                }
            ]
        });
        return uploadRes.secure_url;
    } catch (error) {
        console.error("Cloudinary upload error in updateCourse:", error.message);
        throw error;
    }
}

export const deleteImageOnCloudinary = async (courseImageUrl) => {
    const publicId = courseImageUrl.split('/').pop().split('.')[0];

    try {
        await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        console.log("Error coming while deleting course image from cloudinary");
        throw error;
    }
}
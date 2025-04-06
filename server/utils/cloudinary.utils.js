import cloudinary from "../lib/cloudinary.js";

export const uploadImageOnCloudinary = async (imageUrl) => {
    try {
        const uploadRes = await cloudinary.uploader.upload(imageUrl, {
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
        console.error("Cloudinary upload error while uploading image on cloudinary:", error.message);
        throw error;
    }
}

export const deleteImageOnCloudinary = async (imageUrl) => {
    const publicId = imageUrl.split('/').pop().split('.')[0];
    
    try {
        await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        console.log("Error coming while deleting course image from cloudinary");
        throw error;
    }
}
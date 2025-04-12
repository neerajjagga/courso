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

export const deleteCloudinaryVideo = async (videoUrl) => {
    try {
        if (!videoUrl.includes("res.cloudinary.com")) return;

        const parts = videoUrl.split("/upload/")[1];
        const noExtension = parts.split(".")[0];
        const publicId = noExtension.replace(/^v\d+\//, "");

        await cloudinary.uploader.destroy(publicId, {
            resource_type: "video",
        });

    } catch (error) {
        console.error("Cloudinary deletion failed", error);
        throw error;
    }
};
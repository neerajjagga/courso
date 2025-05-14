import cloudinary from "../lib/cloudinary.js";

export const uploadImageOnCloudinary = async (imageUrl: string) => {
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
        if (error instanceof Error) {
            console.error("Cloudinary upload error while uploading image on cloudinary:", error.message);
        }
        throw error;
    }
}

export const deleteImageOnCloudinary = async (imageUrl: string) => {
    try {
        if (!imageUrl) throw new Error("Image URL is required");
        const publicId = imageUrl.split('/').pop()?.split('.')[0];

        if (!publicId) throw new Error("Could not extract publicId from URL");
        
        await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error coming while deleting course image from cloudinary", error.message);
        }
        throw error;
    }
}

export const deleteCloudinaryVideo = async (videoUrl: string) => {
    try {
        if (!videoUrl.includes("res.cloudinary.com")) return;

        const parts = videoUrl.split("/upload/")[1];
        const noExtension = parts.split(".")[0];
        const publicId = noExtension.replace(/^v\d+\//, "");

        await cloudinary.uploader.destroy(publicId, {
            resource_type: "video",
        });

    } catch (error) {
        if (error instanceof Error) {
            console.error("Cloudinary deletion failed", error.message);
        }
        throw error;
    }
};
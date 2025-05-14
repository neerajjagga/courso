import 'dotenv/config';
import { uploadImageOnCloudinary, deleteImageOnCloudinary } from '../utils/cloudinary.utils.js';

export const getUserProfile = async (req, res) => {
    const user = req.user;
    try {
        res.status(200).json({
            success: true,
            user,
        })
    } catch (error) {
        console.log("Error while getting profile" + error.message);
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const editUserProfile = async (req, res) => {
    const user = req.user;
    try {
        const { fullname, profileImageUrl, bio, socialLinks, isEmailVerified, isProfileCompleted } = req.body;

        let profileImageCloudinaryUrl = null;
        if (profileImageUrl && user.profileImageUrl) {
            await deleteImageOnCloudinary(user.profileImageUrl);
        }
        if (profileImageUrl) {
            profileImageCloudinaryUrl = await uploadImageOnCloudinary(profileImageUrl);
        }

        user.fullname = fullname ?? user.fullname;
        user.bio = bio ?? user.bio;
        user.profileImageUrl = profileImageCloudinaryUrl ?? user.profileImageUrl;
        user.socialLinks = socialLinks ?? user.socialLinks;
        user.isProfileCompleted = isProfileCompleted ?? user.isProfileCompleted;

        const updatedUser = await user.save();

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: updatedUser,
        });

    } catch (error) {
        console.log("Error while editing profile" + error.message);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
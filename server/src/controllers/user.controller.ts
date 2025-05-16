import { RequestHandler, Request, Response } from 'express';
import { asyncHandler } from '../middlewares/asyncHandler.js';
import 'dotenv/config';
import { uploadImageOnCloudinary, deleteImageOnCloudinary } from '../utils/cloudinary.utils.js';

export const getUserProfile: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        user,
    })
});

export const editUserProfile: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;
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

    res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        user: updatedUser,
    });
});
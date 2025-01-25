import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";
import dotenv from "dotenv";
dotenv.config();

export const getUserProfile = async (req, res) => {
    try {
        const user = req.user;
        res.json({
            user,
            success: true,
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
    try {
        const user = req.user;
        const { updatedData } = req.body;

        console.log(updatedData);
        
        if (updatedData.profileImageUrl) {
            try {
                const res = await cloudinary.uploader.upload(updatedData.profileImageUrl, {
                    transformation: [
                        {
                            width: 500,
                            height: 500,
                            crop: 'fill',
                            gravity: 'auto',
                            quality: "auto",
                        }
                    ]
                });
                updatedData["profileImageUrl"] = res.secure_url;
            } catch (error) {
                console.log("Error coming wile uploading image on cloudinary");
                res.status(500).json({
                    success: false,
                    error: "Try again later",
                });
            }
        }

        if (updatedData.profileImageUrl === '') {
            try {
                const publicId = user.profileImageUrl.split('/').pop().split('.')[0];
                const res = await cloudinary.uploader.destroy(publicId);
                console.log(res);
            } catch (error) {
                console.log("Error coming wile deleting image from cloudinary");
                res.status(500).json({
                    success: false,
                    error: "Try again later",
                });
            }
        }

        const updatedUser = await User.findByIdAndUpdate(user._id, {
            $set: updatedData
        }, { new: true })

        res.json({
            user: updatedUser,
            message: "Profile update successfully",
        });
    } catch (error) {
        console.log("Error while editing profile" + error.message);
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
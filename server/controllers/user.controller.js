import User from "../models/user.model.js";
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
        const {updatedData} = req.body;
        
        const updatedUser = await User.findByIdAndUpdate(user._id, {
            $set : updatedData
        }, {new : true})

        res.json({
            user: updatedUser,
            message : "Profile update successfully",
        });
    } catch (error) {
        console.log("Error while editing profile" + error.message);
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
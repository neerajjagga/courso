import User from "../models/user.model.js";
import jwt from 'jsonwebtoken';
import { signupValidationSchema, userProfileUpdateSchema } from '../validators/user.validator.js';
import dotenv from "dotenv";
dotenv.config();

export const checkAuth = async (req, res, next) => {
    try {
        const { access_token } = req.cookies;

        if (!access_token) {
            return res.status(401).json({
                message: "Unauthorized - No access token provided"
            })
        }

        try {
            const { userId } = jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET);

            const user = await User.findById(userId);

            if (!user) {
                return res.status(401).json({
                    message: "Unauthorized - User not found"
                })
            }

            req.user = user;
            next();
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                return res.status(401).json({
                    message: "Unauthorized - Token expired",
                })
            }
            return res.status(401).json({
                message: "Unauthorized - Invalid token",
            });
        }
    } catch (error) {
        console.error("Error in checkAuth middleware:", error.stack);
        return res.status(401).json({
            message: "Unauthorized - An error occurred",
        });
    }
}

export const checkInstructor = async(req, res, next) => {
    try {
        const user = req.user;
        if(user.role !== "instructor") {
            return res.status(403).json({
                success : false,
                message : "Forbidden. You are not allowed to perform this action."
            });
        }

        next();
    } catch (error) {
        console.error("Error in checkInstructor middleware:", error.stack);
        return res.status(500).json({
            message: "Try again later",
        });
    }
}

export const validateSignUpData = async (req, res, next) => {
    const { error } = signupValidationSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        })
    }

    next();
}

export const validateEditProfileData = async (req, res, next) => {
    const { error } = userProfileUpdateSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            success: false,
            error: error.details[0].message,
        })
    }

    next();
}
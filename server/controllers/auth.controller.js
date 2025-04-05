import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { Redis } from "../lib/redis.js"
import dotenv from "dotenv";
import { generateTokens, setCookies, storeRefreshToken } from '../utils/user.utils.js';
import { sendVerificationEmail } from './../lib/nodemailer.js';
dotenv.config();

export const signUpUser = async (req, res) => {
    try {
        const { fullname, email, password, role } = req.body;

        const isUserAlreadyPresent = await User.findOne({
            email,
        });

        if (isUserAlreadyPresent) {
            return res.status(409).json({
                success: false,
                message: "An account with this email already exists. Please try logging in or use a different email."
            });
        }

        const user = await User.create({
            fullname,
            email,
            password,
            role,
        });

        // generate tokens
        const { accessToken, refreshToken } = generateTokens(user._id);

        // store refresh token in redis
        await storeRefreshToken(refreshToken, user._id);

        // set both tokens in secure cookies
        setCookies(accessToken, refreshToken, res);

        res.status(201).json({
            user,
            success: true,
            message: "Account created successfully"
        });

    } catch (error) {
        console.log("Error coming while signup" + error.message);
        res.status(500).json({ success: false, message: error.message })
    }
}

export const sendVerificationCode = async (req, res) => {
    const user = req.user;
    try {
        const code = Math.floor(100000 + Math.random() * 900000);

        await sendVerificationEmail(user.email, code);

        // store verification code in redis along with userId
        await Redis.set(`verification_code/${user._id.toString()}`, code, "EX", 2 * 60);

        res.status(200).json({
            success: true,
            message: "Verification code send successfully",
        });
    } catch (error) {
        console.log("Error coming while sending verification code to user" + error.message);
        res.status(500).json({ success: false, message: error.message });
    }
}

export const verifyVerificationCode = async (req, res) => {
    const user = req.user;

    try {
        const { code: verificationCode } = req.body;

        // store verification code in redis along with userId
        const redisCode = await Redis.get(`verification_code/${user._id.toString()}`);

        if (!redisCode) {
            return res.status(400).json({
                success: false,
                message: "Please resend verification code",
            });
        }

        if (verificationCode !== redisCode) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP",
            });
        }

        // delete the code from redis as well
        await Redis.del(`verification_code/${user._id.toString()}`);

        // update the email verification status
        await User.findByIdAndUpdate({ _id: user.id }, { isEmailVerified: true });

        res.json({
            success: true,
            message: "Email verified successfully",
        });
    } catch (error) {
        console.log("Error coming while sending verification code to user" + error.message);
        res.status(500).json({ message: error.message })
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // find the user first
        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({
            message: "Invalid credentials",
            success: false,
        })

        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) return res.status(400).json({ success: false, message: "Invalid credentials" })

        // generate tokens
        const { accessToken, refreshToken } = generateTokens(user._id);

        await storeRefreshToken(refreshToken, user._id);

        setCookies(accessToken, refreshToken, res);

        res.status(200).json({
            user,
            success: true,
            message: "User loggedIn successfully"
        });

    } catch (error) {
        console.log("Error while login user" + error.message);
        res.status(500).json({ success: false, message: error.message })
    }
}

export const logoutUser = async (req, res) => {
    try {
        const { access_token: accessToken, refresh_token: refreshToken } = req.cookies;

        if (!accessToken && !refreshToken) {
            return res.status(400).json({
                message: "You are already logged out",
            });
        }

        if (refreshToken) {
            try {
                const decodedObj = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
                await Redis.del(`refresh_token:${decodedObj.userId}`)
            } catch (error) {
                console.log("Invalid or expired refresh token.");
            }
        }

        res.clearCookie("access_token");
        res.clearCookie("refresh_token");
        res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });

    } catch (error) {
        console.log("Error coming while logout user" + error.message);
        res.status(500).json({ success: false, message: error.message })
    }
}

export const refreshTokens = async (req, res) => {
    try {
        const { refresh_token } = req.cookies;

        if (!refresh_token) {
            return res.status(401).json({
                message: "Your session has expired. Please log in again.",
                tokenExpired: true,
            });
        }

        const decodedObj = jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET);
        console.log(decodedObj);

        const userId = decodedObj.userId;

        const storedRefreshToken = await Redis.get(`refresh_token:${userId}`);

        if (!storedRefreshToken || refresh_token !== storedRefreshToken) {
            return res.status(403).json({
                message: "Your session has expired. Please log in again."
            });
        }

        // Generate both access token and refresh token to rotate refresh token
        const { accessToken, refreshToken } = generateTokens(userId);
        await storeRefreshToken(refreshToken, userId);
        setCookies(accessToken, refreshToken, res);

        res.status(200).json({ success: true, message: "Your session has been refreshed successfully." });
    } catch (error) {
        console.error("Error occurred while refreshing tokens:", error.message);
        res.status(500).json({ success: false, message: "Internal server error. Please try again later." });
    }
};

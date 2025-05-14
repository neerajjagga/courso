import { RequestHandler, Response, Request } from "express";
import User from "../models/user.model.js";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Redis } from "../lib/redis.js"
import dotenv from "dotenv";
import { generateTokens, setCookies, storeRefreshToken } from '../utils/user.utils.js';
import { sendVerificationEmail } from "../lib/nodemailer.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";
dotenv.config();

const { REFRESH_TOKEN_SECRET } = process.env;

if (!REFRESH_TOKEN_SECRET) {
    throw new Error("REFRESH_TOKEN_SECRET not exists in env");
}

export const signUpUser: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const { fullname, email, password, role } = req.body;

    const isUserAlreadyPresent = await User.findOne({ email });

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

    const { accessToken, refreshToken } = generateTokens(user._id.toString());

    await storeRefreshToken(refreshToken, user._id.toString());

    setCookies(accessToken, refreshToken, res);

    res.status(201).json({
        user,
        success: true,
        message: "Account created successfully"
    });
});

export const sendVerificationCode: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;
    const code = Math.floor(100000 + Math.random() * 900000);

    await sendVerificationEmail(user.email, code);

    // store verification code in redis along with userId
    await Redis.set(`verification_code/${user._id.toString()}`, code, "EX", 2 * 60);

    res.status(200).json({
        success: true,
        message: "Verification code send successfully",
    });
});

export const verifyVerificationCode: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;

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
});

export const loginUser: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({
        message: "Invalid credentials",
        success: false,
    });

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) return res.status(400).json({ success: false, message: "Invalid credentials" })

    const { accessToken, refreshToken } = generateTokens(user._id.toString());

    await storeRefreshToken(refreshToken, user._id.toString());

    setCookies(accessToken, refreshToken, res);

    res.status(200).json({
        user,
        success: true,
        message: "Login successful"
    });
});

export const logoutUser: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const { access_token: accessToken, refresh_token: refreshToken } = req.cookies;

    if (!accessToken && !refreshToken) {
        return res.status(400).json({
            message: "You are already logged out",
        });
    }

    if (refreshToken) {
        try {
            const decodedObj = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) as JwtPayload;
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
})

export const refreshTokens = async (refresh_token: string, res: Response) => {
    try {
        const decodedObj = jwt.verify(refresh_token, REFRESH_TOKEN_SECRET) as JwtPayload;
        const userId = decodedObj.userId;

        const storedRefreshToken = await Redis.get(`refresh_token:${userId}`);

        if (!storedRefreshToken || refresh_token !== storedRefreshToken) {
            throw new Error("TokenExpiredError");
        }

        const { accessToken, refreshToken } = generateTokens(userId);
        setCookies(accessToken, refreshToken, res);
        await storeRefreshToken(refreshToken, userId);

        return accessToken;
    } catch (error) {
        throw error;
    }
}

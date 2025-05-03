import jwt from "jsonwebtoken";
import { Redis } from "../lib/redis.js"
import dotenv from "dotenv";
dotenv.config();

export const generateTokens = (userId) => {
    const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15m"
    })

    const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "7d"
    })

    return { accessToken, refreshToken }
}

export const setCookies = (accessToken, refreshToken, res) => {
    const isProd = process.env.NODE_ENV === "production";

    const cookieOptions = {
        secure: isProd,
        httpOnly: true,
        sameSite: isProd ? "None" : "Lax",
    };

    res.cookie("access_token", accessToken, {
        ...cookieOptions,
        maxAge: 15 * 60 * 1000,
    });

    res.cookie("refresh_token", refreshToken, {
        ...cookieOptions,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
};

export const storeRefreshToken = async (refreshToken, userId) => {
    await Redis.set(`refresh_token:${userId}`, refreshToken, "EX", 7 * 24 * 60 * 60);
}
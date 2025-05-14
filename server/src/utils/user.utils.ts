import { Response } from "express";
import jwt from "jsonwebtoken";
import { Redis } from "../lib/redis.js"
import dotenv from "dotenv";
dotenv.config();

interface ICookieOptions {
    secure: boolean,
    httpOnly: boolean,
    sameSite: "none" | "lax",
}

export const generateTokens = (userId: string) => {
    const accessToken = jwt.sign({ userId }, (process.env.ACCESS_TOKEN_SECRET as string), {
        expiresIn: "15m"
    })

    const refreshToken = jwt.sign({ userId }, (process.env.REFRESH_TOKEN_SECRET as string), {
        expiresIn: "7d"
    })

    return { accessToken, refreshToken }
}

export const setCookies = (accessToken: string, refreshToken: string, res: Response) => {
    const isProd = process.env.NODE_ENV === "production";

    const cookieOptions: ICookieOptions = {
        secure: isProd,
        httpOnly: true,
        sameSite: isProd ? "none" : "lax",
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

export const storeRefreshToken = async (refreshToken: string, userId: string) => {
    await Redis.set(`refresh_token:${userId}`, refreshToken, "EX", 7 * 24 * 60 * 60);
}
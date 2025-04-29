import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/node";
import dotenv from 'dotenv';
dotenv.config();

export const aj = arcjet({
    key: process.env.ARCJET_KEY,
    characteristics: ["ip.src"],
    rules: [
        shield({ mode: "LIVE" }),
        detectBot({
            mode: "LIVE",
            allow: [
                "CATEGORY:SEARCH_ENGINE",
            ],
        }),
        tokenBucket({
            mode: "LIVE",
            refillRate: 5,
            interval: 10,
            capacity: 20,
        }),
    ],
});
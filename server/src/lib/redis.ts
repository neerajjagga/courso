import redis from "ioredis";
import dotenv from "dotenv";
dotenv.config();

const { REDIS_URL } = process.env;

if (!REDIS_URL) {
    throw new Error("REDIS_URL is not present in env file");
}

export const Redis = new redis(REDIS_URL);
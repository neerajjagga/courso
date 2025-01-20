import redis from "ioredis";
import dotenv from "dotenv";
dotenv.config();

export const Redis = new redis(process.env.REDIS_URL);
import mongoose, { MongooseError } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

async function connectDB() {
    const MONGO_URI = process.env.MONGO_URI;

    if (!MONGO_URI) {
        console.error("MONGO_URI not defined in environment variables");
        process.exit(1);
    }

    try {
        await mongoose.connect(MONGO_URI);
        console.log("DB connected successfully");
    } catch (error) {
        if (error instanceof Error) {
            console.log("Error while connecting to DB", error.name);
        } else {
            console.log("Error while connecting to DB");
        }
        process.exit(1);
    }
}

export default connectDB;
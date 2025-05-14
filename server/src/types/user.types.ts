import mongoose, { Document } from "mongoose";

type SocialLinkName = 'linkedin' | 'facebook' | 'twitter' | 'github' | 'instagram';

type UserRole = 'user' | 'instructor';

export interface SocialLink {
    name: SocialLinkName;
    url: string;
    username?: string;
}

export interface User {
    fullname: string;
    email: string;
    password: string;
    role: UserRole;
    profileImageUrl: string;
    socialLinks: SocialLink[];
    isEmailVerified?: boolean;
    category: string;
    bio?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IUserDocument extends User, Document {
    _id: mongoose.Schema.Types.ObjectId;
    comparePassword: (password: string) => Promise<boolean>
}
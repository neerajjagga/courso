import { InstructorSocialLink } from "./course";

type UserRole = "instructor" | "user";

export interface User {
    bio: string | null;
    email: string;
    fullname: string;
    id: string;
    isEmailVerified: boolean;
    isProfileCompleted: boolean;
    profileImageUrl: string | null;
    role: UserRole;
    socialLinks: InstructorSocialLink[];
    createdAt: string;
    updatedAt: string;
}

export interface InstructorSettingsProfileForm {
    fullname: string;
    bio: string | null;
    profileImageUrl: string | null;
    twitterUsername: string | null;
    facebookUsername: string | null;
    instagramUsername: string | null;
    linkedInUsername: string | null;
    githubUsername: string | null;
}

export interface InstructorProfileCard {
    bio: string | null;
    fullname: string;
    id: string;
    isEmailVerified: boolean;
    profileImageUrl: string | null;
    socialLinks: InstructorSocialLink[];
}
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
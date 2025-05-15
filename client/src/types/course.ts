import React from "react";

export interface EditCourseFormData {
  courseImageUrl: string | null;
  title: string;
  description: string | null;
  language?: string;
  level?: string;
  price?: number;
  category?: string;
}

export interface NewCourseFormData {
  title: string;
  description: string;
  language: string;
  level: string;
  courseImageUrl: string;
  price: string;
  category: string;
}

export interface NewCourseStepsOutletContextType {
  courseFormData: NewCourseFormData;
  setCourseFormData: React.Dispatch<React.SetStateAction<NewCourseFormData>>;
  setIsNextBtnEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsBackBtnEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  isNextBtnEnabled: boolean;
}

export interface InstructorSocialLink {
  name: string;
  url: string;
  username: string | null;
  _id?: string
}

export interface AllCoursesCourseInstructor {
  fullname: string;
  profileImageUrl: string | null;
  socialLinks: InstructorSocialLink[];
}

export interface AllCoursesCourse {
  category: string;
  courseImageUrl: string | null;
  createdAt: string;
  description: string | null;
  id: string;
  instructor: AllCoursesCourseInstructor;
  language: string;
  level: string;
  price: number;
  reviews: [];
  subtitle: string | null;
  title: string;
  titleSlug: string;
  updatedAt: string;
}

export type CreateCoursesCourse = Omit<AllCoursesCourse, "instructor"> & {
  instructor: string;
}

type EnrolledCoursesCourseContent = Pick<AllCoursesCourse, "courseImageUrl" | "instructor" | "title" | "titleSlug"> & {
  _id: string;
};

type EnrolledCoursesCourseProgressSummary = {
  percentage: number;
}

export interface EnrolledCoursesCourse {
  course: EnrolledCoursesCourseContent;
  id: string;
  progressSummary: EnrolledCoursesCourseProgressSummary;
  updatedAt: string;
}

export interface Category {
  for: string;
  name: string;
}
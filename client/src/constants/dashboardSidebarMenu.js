import {
    Home,
    LibraryBig,
    BookOpenCheck,
    Settings,
    History,
    ListChecks
} from "lucide-react";

export const dashboardSidebarMenuUser = [
    {
        name: "Home",
        icon: Home,
        path: "/dashboard/home",
    },
    {
        name: "All Courses",
        icon: LibraryBig,
        path: "/dashboard/courses",
    },
    {
        name: "Enrollments",
        icon: BookOpenCheck,
        path: "/dashboard/enrollments",
    },
    {
        name: "Settings",
        icon: Settings,
        path: "/dashboard/settings",
    },
    {
        name: "History",
        icon: History,
        path: "/dashboard/history",
    },
];

export const dashboardSidebarMenuInstructor = [
    {
        name: "Home",
        icon: Home,
        path: "/dashboard/home",
    },
    {
        name: "All Courses",
        icon: LibraryBig,
        path: "/dashboard/all-courses",
    },
    {
        name: "My Courses",
        icon: ListChecks,
        path: "/dashboard/my-courses",
    },
    {
        name: "Settings",
        icon: Settings,
        path: "/dashboard/settings",
    },
];

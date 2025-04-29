import {
    Home,
    LibraryBig,
    FileCog,
    BookOpenCheck,
    Settings,
    History,
    ListChecks,
    ChartNoAxesColumn
} from "lucide-react";

export const dashboardSidebarMenuUser = [
    // {
    //     name: "Home",
    //     icon: Home,
    //     path: "/dashboard/home",
    // },
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
        name: "Payment History",
        icon: History,
        path: "/dashboard/payment-history",
    },
];

export const dashboardSidebarMenuInstructor = [
    {
        name: "All Courses",
        icon: LibraryBig,
        path: "/dashboard/courses",
    },
    {
        name: "Manage Courses",
        icon: FileCog,
        path: "/dashboard/instructor/courses",
    },
    {
        name: "Performance",
        icon: ChartNoAxesColumn,
        path: "/dashboard/performance",
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
        name: "Payment History",
        icon: History,
        path: "/dashboard/payment-history",
    },
];

import {
    Home,
    LibraryBig,
    FileCog,
    BookOpenCheck,
    Settings,
    History,
    ListChecks,
    ChartNoAxesColumn,
    LucideProps
} from "lucide-react";

interface SidebarMenuItems {
    name: string;
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    path: string;
}

export const dashboardSidebarMenuUser: SidebarMenuItems[] = [
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

export const dashboardSidebarMenuInstructor: SidebarMenuItems[] = [
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

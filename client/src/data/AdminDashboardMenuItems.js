import { House, LibraryBig, CirclePlus } from "lucide-react";

export const InstructorDashboardMenu = [
    {
        icon: House,
        name: "Home",
        url: "/",
    },
    {
        icon: LibraryBig,
        name: "My Courses",
        url: "/dashboard/my-courses"
    },
    {
        icon: CirclePlus,
        name: "Create Course",
        url: "/dashboard/new-course"
    },
]

import { House, SquareLibrary, LibraryBig, Bookmark, History } from "lucide-react";

export const UserDashboardMenu = [
    {
        icon: House,
        name: "Home",
        url: "/"
    },
    {
        icon: SquareLibrary,
        name: "All Courses",
        url: "/dashboard/all-courses"
    },
    {
        icon: LibraryBig,
        name: "Active Courses",
        url: "/dashboard/active-courses"
    },
    {
        icon: Bookmark,
        name: "Bookmarks",
        url: "/dashboard/bookmarks"
    },
    {
        icon: History,
        name: "History",
        url: "/"
    }
]

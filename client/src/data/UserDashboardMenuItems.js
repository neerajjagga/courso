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
        url: "/"
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

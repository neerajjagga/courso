import { Link } from "react-router-dom";

const SettingsMenu = ({ activeTab, setActiveTab }) => {
    // Define the menu items
    const menuItems = [
        { path: "/s/view-profile", label: "View public profile" },
        { path: "/s/edit-profile", label: "Edit profile" },
        { path: "/s/edit-photo", label: "Photo" },
        { path: "/s/close-account", label: "Close Account", isDanger: true },
    ];

    return (
        <div className="flex flex-col gap-0 border-y border-gray-600">
            {menuItems.map((item, index) => (
                <Link
                    to={item.path}
                    onClick={() => setActiveTab(item.path)}
                    key={index}
                    className={`py-2 px-4 border-b border-gray-600 last:border-none ${activeTab === item.path
                        ? "bg-slate-800 hover:bg-slate-600"
                        : "hover:bg-slate-600 cursor-pointer"
                        }`}
                >
                    <span
                        className={`${item.isDanger ? "text-red-500" : ""}`}
                    >
                        {item.label}
                    </span>
                </Link>
            ))}
        </div>
    );
};

export default SettingsMenu;

// components/UserPage/Sidebar/NavigationMenu.jsx
import { HardDrive, Users, Clock, Star, Trash2 } from "lucide-react";

const menuItems = [
  { id: "my-zone", icon: HardDrive, label: "Zone của tôi" },
  { id: "shared", icon: Users, label: "Được chia sẻ" },
  { id: "recent", icon: Clock, label: "Gần đây" },
  { id: "starred", icon: Star, label: "Đánh dấu sao" },
  { id: "trash", icon: Trash2, label: "Thùng rác" },
];

export default function NavigationMenu({ activeView, onViewChange }) {
  return (
    <nav className="flex-1">
      <ul className="space-y-1">
        {menuItems.map(({ id, icon: Icon, label }) => (
          <li
            key={id}
            onClick={() => onViewChange(id)}
            className={`flex cursor-pointer items-center gap-4 rounded-r-full px-4 py-2.5 transition-colors ${
              activeView === id
                ? "bg-blue-50 text-blue-600"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Icon className="h-5 w-5" />
            <span className="font-medium">{label}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
}

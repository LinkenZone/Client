// components/AdminDashboard/Sidebar/index.jsx
import { FoldersIcon, LayoutDashboardIcon, ListCheckIcon, Users } from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboardIcon, label: 'Dashboard', active: false },
  { icon: ListCheckIcon, label: 'Kiểm duyệt tài liệu', active: false },
  { icon: FoldersIcon, label: 'Quản lý danh mục', active: false },
  { icon: Users, label: 'Quản lý người dùng', active: false },
];

export default function AdminSidebar({ activeMenu = 'Dashboard', onMenuChange }) {
  return (
    <div className="flex h-screen w-64 flex-col border-r border-gray-200 bg-white">
      {/* Logo */}
      <div className="flex items-center gap-2 border-b border-gray-200 p-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-orange-400 to-pink-500">
            <span className="text-sm font-bold text-white">M</span>
          </div>
          <span className="text-lg font-semibold text-gray-800">Admin Dashboard</span>
        </div>
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto p-4">
        <nav className="space-y-1">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                onClick={() => onMenuChange && onMenuChange(item.label)}
                className={`flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-left text-sm transition-colors ${
                  item.label === activeMenu
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </div>
                <span className="text-gray-400">›</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

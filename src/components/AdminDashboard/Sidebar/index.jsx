// components/AdminDashboard/Sidebar/index.jsx
import { FoldersIcon, LayoutDashboardIcon, ListCheckIcon, Users } from 'lucide-react';
import LinkenZoneLogo from '../../../assets/LinkenZone_Logo.png';

const menuItems = [
  { icon: LayoutDashboardIcon, label: 'Dashboard', active: false },
  { icon: ListCheckIcon, label: 'Kiểm duyệt tài liệu', active: false },
  { icon: FoldersIcon, label: 'Quản lý danh mục', active: false },
  { icon: Users, label: 'Quản lý người dùng', active: false },
];

export default function AdminSidebar({ activeMenu = 'Dashboard', onMenuChange, isOpen = true, onClose }) {
  const handleMenuClick = (label) => {
    if (onMenuChange) {
      onMenuChange(label);
    }
    // Đóng sidebar trên mobile sau khi chọn menu
    if (window.innerWidth < 1024 && onClose) {
      onClose();
    }
  };

  return (
    <div 
      className={`flex h-screen w-64 flex-col border-r border-gray-200 bg-white z-40 fixed lg:relative flex-shrink-0 transition-all duration-500 ease-in-out will-change-transform ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-0 lg:border-0 lg:overflow-hidden'}`}
      style={{
        transitionProperty: 'transform, width, opacity, border-width',
      }}
    >
      <div className={`flex items-center gap-2 border-b border-gray-200 p-6 transition-opacity duration-500 ease-in-out ${isOpen ? 'opacity-100 delay-100' : 'lg:opacity-0'}`}>
        <div className="flex items-center gap-2 whitespace-nowrap">
          <img 
            src={LinkenZoneLogo} 
            alt="LinkenZone Logo" 
            className="h-7 w-8 rounded-lg object-contain flex-shrink-0"
          />
          <span className="text-lg font-semibold text-gray-800">Admin Dashboard</span>
        </div>
      </div>

      <div className={`flex-1 overflow-y-auto p-4 transition-opacity duration-500 ease-in-out ${isOpen ? 'opacity-100 delay-100' : 'lg:opacity-0'}`}>
        <nav className="space-y-1">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                onClick={() => handleMenuClick(item.label)}
                className={`flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-left text-sm transition-colors whitespace-nowrap ${item.label === activeMenu ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </div>
                <span className="text-gray-400"></span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

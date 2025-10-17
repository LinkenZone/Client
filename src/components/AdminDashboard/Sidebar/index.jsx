// components/AdminDashboard/Sidebar/index.jsx
import React from "react";
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  Calendar,
  Building,
  BarChart3,
  Package,
  FolderOpen,
  MessageSquare,
  Layers,
  Grid,
  Map,
  Palette,
  Box,
  PieChart,
} from "lucide-react";

const menuItems = [
  { icon: Users, label: "User Management", active: false },
  { icon: FileText, label: "Application", active: false },
  { icon: FolderOpen, label: "Pages", active: false },
  { icon: Building, label: "Admins", active: false },
  { icon: Settings, label: "Role & Permissions", active: false },
  { icon: MessageSquare, label: "Navs", active: false },
  { icon: Users, label: "Users", active: false },
  { icon: Box, label: "Builder", active: false },
  { icon: FileText, label: "Invoice", active: false },
  { icon: FileText, label: "forms", active: false },
  { icon: LayoutDashboard, label: "Board", active: false },
  { icon: Calendar, label: "Calander", active: false },
  { icon: Palette, label: "Themes", active: false },
  { icon: Settings, label: "General", active: false },
  { icon: Package, label: "Products", active: false },
  { icon: Grid, label: "Icons", active: false },
  { icon: Layers, label: "Animations", active: false },
  { icon: Box, label: "Components", active: false },
  { icon: Grid, label: "Table", active: false },
  { icon: Grid, label: "Cards", active: false },
  { icon: BarChart3, label: "Charts", active: false },
  { icon: Grid, label: "UI Kits", active: false },
  { icon: PieChart, label: "Widgets", active: false },
  { icon: Map, label: "Maps", active: false },
];

export default function AdminSidebar({ activeMenu = "Dashboard" }) {
  return (
    <div className="flex h-screen w-64 flex-col border-r border-gray-200 bg-white">
      {/* Logo */}
      <div className="flex items-center gap-2 border-b border-gray-200 p-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-orange-400 to-pink-500">
            <span className="text-sm font-bold text-white">M</span>
          </div>
          <span className="text-lg font-semibold text-gray-800">
            Mege Users
          </span>
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
                className={`flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-left text-sm transition-colors ${
                  item.label === activeMenu
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
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

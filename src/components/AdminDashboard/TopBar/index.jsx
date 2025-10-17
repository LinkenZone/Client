// components/AdminDashboard/TopBar/index.jsx
import React from "react";
import {
  Menu,
  Search,
  Bell,
  MessageSquare,
  Calendar,
  User,
} from "lucide-react";

export default function DashboardTopBar() {
  return (
    <div className="sticky top-0 z-30 border-b border-gray-200 bg-white px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Menu and Search */}
        <div className="flex items-center gap-4">
          <button className="rounded-lg p-2 hover:bg-gray-100">
            <Menu className="h-5 w-5 text-gray-600" />
          </button>

          <div className="relative">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="w-64 rounded-lg border border-gray-200 bg-white py-2 pr-4 pl-10 text-sm focus:border-blue-500 focus:outline-none"
            />
          </div>

          <button className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600">
            Search
          </button>
        </div>

        {/* Right side - Date and Icons */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>August 3, 2020 - August 31, 2020</span>
          </div>

          <button className="relative rounded-lg p-2 hover:bg-gray-100">
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-orange-500"></span>
          </button>

          <button className="relative rounded-lg p-2 hover:bg-gray-100">
            <MessageSquare className="h-5 w-5 text-gray-600" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-orange-500"></span>
          </button>

          <button className="flex items-center gap-2 rounded-lg p-2 hover:bg-gray-100">
            <img
              src="https://i.pravatar.cc/150?img=12"
              alt="User"
              className="h-8 w-8 rounded-full"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

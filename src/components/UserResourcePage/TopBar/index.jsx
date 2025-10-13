// components/UserResourcePage/TopBar/index.jsx
import React from "react";
import { Search, Filter, LayoutGrid, List } from "lucide-react";

export default function TopBar({ viewMode, onViewModeChange }) {
  return (
    <div className="sticky top-0 z-10 border-b border-gray-200 bg-white p-4">
      <div className="flex items-center justify-between">
        {/* Search Bar */}
        <div className="max-w-2xl flex-1">
          <div className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2.5">
            <Search className="h-5 w-5 text-gray-500" />
            <input
              type="text"
              placeholder="Tìm kiếm trong Zone"
              className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-500 outline-none"
            />
            <Filter className="h-5 w-5 cursor-pointer text-gray-500 hover:text-gray-700" />
          </div>
        </div>

        {/* View Toggle */}
        <div className="ml-4 flex items-center gap-2">
          <button
            onClick={() => onViewModeChange("grid")}
            className={`rounded-lg p-2 transition-colors ${
              viewMode === "grid" ? "bg-gray-200" : "hover:bg-gray-100"
            }`}
            title="Xem dạng lưới"
          >
            <LayoutGrid className="h-5 w-5 text-gray-700" />
          </button>
          <button
            onClick={() => onViewModeChange("list")}
            className={`rounded-lg p-2 transition-colors ${
              viewMode === "list" ? "bg-gray-200" : "hover:bg-gray-100"
            }`}
            title="Xem dạng danh sách"
          >
            <List className="h-5 w-5 text-gray-700" />
          </button>
        </div>
      </div>
    </div>
  );
}

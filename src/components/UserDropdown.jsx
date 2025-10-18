import React, { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, LayoutDashboard, User } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

export default function UserDropdown({
  avatarSrc,
  avatarSize = "h-8 w-8",
  showBorder = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsOpen(false);
  };

  const handleNavigateToUser = () => {
    navigate("/user");
    setIsOpen(false);
  };

  const handleNavigateToAdmin = () => {
    navigate("/admin");
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex cursor-pointer items-center gap-2 rounded-full p-0.5 transition-all hover:ring-2 hover:ring-blue-400 ${
          isOpen ? "ring-2 ring-blue-500" : ""
        }`}
        type="button"
      >
        <img
          src={avatarSrc}
          alt="User Avatar"
          className={`${avatarSize} rounded-full object-cover ${
            showBorder ? "border-2 border-white" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full right-0 z-50 mt-2 w-56 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
          {/* User Info Section */}
          <div className="border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-3">
            <p className="text-sm font-semibold text-gray-800">
              {user?.full_name || "User"}
            </p>
            <p className="text-xs text-gray-500">
              {user?.email || "user@example.com"}
            </p>
            <span className="mt-1 inline-block rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
              {user?.role === "admin" ? "Admin" : "User"}
            </span>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            {/* Navigate to User Page (only show if not already on user page) */}
            {window.location.pathname !== "/user" && (
              <button
                onClick={handleNavigateToUser}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-700"
              >
                <User className="h-4 w-4" />
                <span>
                  {window.location.pathname === "/admin"
                    ? "Trang người dùng"
                    : "Zone của tôi"}
                </span>
              </button>
            )}

            {/* Navigate to Admin Dashboard (only show if user is admin and not on admin page) */}
            {user?.role === "admin" &&
              window.location.pathname !== "/admin" && (
                <button
                  onClick={handleNavigateToAdmin}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-gray-700 transition-colors hover:bg-purple-50 hover:text-purple-700"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Admin Dashboard</span>
                </button>
              )}

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 border-t border-gray-100 px-4 py-2.5 text-left text-sm text-red-600 transition-colors hover:bg-red-50"
            >
              <LogOut className="h-4 w-4" />
              <span>Đăng xuất</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

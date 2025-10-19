// components/UserResourcePage/Sidebar/UserInfo.jsx
import { Cloud } from "lucide-react";
import avatar from "../../../assets/avatar_ic.jpg";

export default function UserInfo({ user }) {

  return (
    <>
      {/* Storage Info */}
      <div className="mt-4 border-t border-gray-200 pt-4">
        <div className="mb-2 flex items-center gap-2">
          <Cloud className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-600">Dung lượng lưu trữ</span>
        </div>
        <div className="mb-1 h-1.5 overflow-hidden rounded-full bg-gray-200">
          <div className="h-full w-3/5 bg-blue-500"></div>
        </div>
        <p className="text-xs text-gray-500">6 GB / 10 GB đã sử dụng</p>
      </div>

      {/* User Info & Logout */}
      <div className="mt-4 border-t border-gray-200 pt-4">
        <div className="mb-3 flex items-center gap-3">
          <img
            src={avatar}
            alt="Avatar"
            className="h-10 w-10 rounded-full border-2 border-blue-500"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-gray-800">
              {user ? user.full_name : "Người dùng"}
            </p>
            <p className="truncate text-xs text-gray-500">{user?.email}</p>
          </div>
        </div>
      </div>
    </>
  );
}

// components/UserResourcePage/Sidebar/UserInfo.jsx
import { Cloud } from "lucide-react";
import { useState, useEffect } from "react";
import { api } from "../../../services/api";
import avatar from "../../../assets/avatar_ic.png";

export default function UserInfo({ user }) {
  const [storageStats, setStorageStats] = useState({
    totalSize: '0',
    storageLimit: '10737418240', // 10GB in bytes
    usagePercentage: 0,
    totalDocuments: 0,
  });

  useEffect(() => {
    const fetchStorageStats = async () => {
      try {
        const res = await api.get('/document/storage-stats');
        if (res.data.status === 'success') {
          setStorageStats(res.data.data.storage);
        }
      } catch (error) {
        console.error('Error fetching storage stats:', error);
      }
    };

    if (user) {
      fetchStorageStats();
    }
  }, [user]);

  const formatSize = (bytes) => {
    const size = parseInt(bytes);
    if (isNaN(size) || size === 0) return '0 GB';
    
    const gb = size / (1024 * 1024 * 1024);
    return gb.toFixed(2) + ' GB';
  };

  return (
    <>
      {/* Storage Info */}
      <div className="mt-4 border-t border-gray-200 pt-4">
        <div className="mb-2 flex items-center gap-2">
          <Cloud className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-600">Dung lượng lưu trữ</span>
        </div>
        <div className="mb-1 h-1.5 overflow-hidden rounded-full bg-gray-200">
          <div 
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${Math.min(storageStats.usagePercentage, 100)}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-500">
          {formatSize(storageStats.totalSize)} / {formatSize(storageStats.storageLimit)} đã sử dụng
          <span className="ml-1">({storageStats.usagePercentage}%)</span>
        </p>
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

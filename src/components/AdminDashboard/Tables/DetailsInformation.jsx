// components/AdminDashboard/Tables/SalesDetailsTable.jsx
import React, { useEffect, useState } from "react";
import {
  LucideFileText,
  DownloadCloud,
  MessageSquare,
  User2,
} from "lucide-react";
import { api } from "../../../services/api";
import { toast } from "react-toastify";

export default function SalesDetailsTable() {
  const [stats, setStats] = useState({
    totalFiles: 0,
    totalDownloads: 0,
    totalComments: 0,
    totalAccounts: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await api.get('/reports/');
        const data = response.data.data;
        
        setStats({
          totalFiles: data.total_files || 0,
          totalDownloads: data.total_download || 0,
          totalComments: data.total_comments || 0,
          totalAccounts: data.total_accounts || 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
        toast.error('Không thể tải thông tin tổng quan!');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const salesData = [
    {
      id: 1,
      icon: <LucideFileText className="h-5 w-5 text-purple-500" />,
      amount: loading ? "..." : stats.totalFiles.toLocaleString(),
      label: "Tổng số file",
      bgColor: "bg-purple-50",
    },
    {
      id: 2,
      icon: <DownloadCloud className="h-5 w-5 text-orange-500" />,
      amount: loading ? "..." : stats.totalDownloads.toLocaleString(),
      label: "Tổng số lượt download",
      bgColor: "bg-orange-50",
    },
    {
      id: 3,
      icon: <MessageSquare className="h-5 w-5 text-cyan-500" />,
      amount: loading ? "..." : stats.totalComments.toLocaleString(),
      label: "Tổng số lượt bình luận",
      bgColor: "bg-cyan-50",
    },
    {
      id: 4,
      icon: <User2 className="h-5 w-5 text-green-500" />,
      amount: loading ? "..." : stats.totalAccounts.toLocaleString(),
      label: "Tổng số tài khoản",
      bgColor: "bg-green-50",
    },
  ];

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">
          Thông tin tổng quan
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {salesData.map((item) => (
          <div
            key={item.id}
            className="rounded-xl border border-gray-100 p-4 transition-shadow hover:shadow-md"
          >
            <div className="mb-3 flex items-center gap-3">
              <div className={`rounded-lg p-2 ${item.bgColor}`}>
                {item.icon}
              </div>
            </div>
            <h4 className="mb-1 text-xl font-bold text-gray-800">
              {item.amount}
            </h4>
            <p className="text-sm text-gray-500">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

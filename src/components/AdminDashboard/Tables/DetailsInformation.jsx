// components/AdminDashboard/Tables/SalesDetailsTable.jsx
import React from "react";
import {
  Crown,
  Award,
  ShoppingBag,
  TrendingUp,
  LucideFileText,
  DownloadCloud,
  Command,
  MessageSquare,
  User2,
} from "lucide-react";

const salesData = [
  {
    id: 1,
    icon: <LucideFileText className="h-5 w-5 text-purple-500" />,
    amount: "2,034",
    label: "Tổng số file",
    bgColor: "bg-purple-50",
  },
  {
    id: 2,
    icon: <DownloadCloud className="h-5 w-5 text-orange-500" />,
    amount: "706",
    label: "Tổng số lượt download",
    bgColor: "bg-orange-50",
  },
  {
    id: 3,
    icon: <MessageSquare className="h-5 w-5 text-cyan-500" />,
    amount: "49",
    label: "Tổng số lượt bình luận",
    bgColor: "bg-cyan-50",
  },
  {
    id: 4,
    icon: <User2 className="h-5 w-5 text-green-500" />,
    amount: "5.8M",
    label: "Tổng số tài khoản",
    bgColor: "bg-green-50",
  },
];

export default function SalesDetailsTable() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">
          Thông tin tổng quan
        </h3>
        <button className="text-gray-400 hover:text-gray-600">
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            />
          </svg>
        </button>
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

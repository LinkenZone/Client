// components/AdminDashboard/Charts/SalesProgress.jsx
import React from "react";
import { Download, TrendingUp, FileText, File } from "lucide-react";

// Dữ liệu mẫu - Thay thế bằng data từ API
const topDocuments = [
  {
    id: 1,
    name: "Giáo trình React.js cơ bản",
    downloads: 1245,
    trend: "+12%",
    category: "Programming",
    icon: "📘",
  },
  {
    id: 2,
    name: "Hướng dẫn Node.js & Express",
    downloads: 987,
    trend: "+8%",
    category: "Backend",
    icon: "📗",
  },
  {
    id: 3,
    name: "Database Design Best Practices",
    downloads: 856,
    trend: "+15%",
    category: "Database",
    icon: "📙",
  },
  {
    id: 4,
    name: "UI/UX Design Fundamentals",
    downloads: 742,
    trend: "+5%",
    category: "Design",
    icon: "🎨",
  },
  {
    id: 5,
    name: "Python for Data Science",
    downloads: 698,
    trend: "+10%",
    category: "Data Science",
    icon: "📊",
  },
];

export default function TopDocuments() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            Top 5 Tài Liệu
          </h3>
          <p className="text-sm text-gray-500">Được tải nhiều nhất tháng này</p>
        </div>
        <div className="rounded-lg bg-purple-50 p-2">
          <TrendingUp className="h-5 w-5 text-purple-600" />
        </div>
      </div>

      <div className="space-y-3">
        {topDocuments.map((doc, index) => (
          <div
            key={doc.id}
            className="group relative overflow-hidden rounded-xl border border-gray-100 bg-gradient-to-r from-gray-50 to-white p-4 transition-all hover:border-purple-200 hover:shadow-md"
          >
            {/* Rank Badge */}
            <div className="absolute -top-2 -right-2 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-lg font-bold text-white shadow-lg">
              {index + 1}
            </div>

            <div className="flex items-start gap-3 pr-8">
              {/* Icon */}
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-purple-50 text-2xl">
                {doc.icon}
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1">
                <h4 className="mb-1 truncate font-semibold text-gray-800 group-hover:text-purple-600">
                  {doc.name}
                </h4>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span className="rounded-full bg-gray-100 px-2 py-0.5">
                    {doc.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Download className="h-3 w-3" />
                    <span className="font-semibold text-gray-700">
                      {doc.downloads.toLocaleString()}
                    </span>
                  </div>
                  <span className="flex items-center gap-0.5 text-green-600">
                    <TrendingUp className="h-3 w-3" />
                    {doc.trend}
                  </span>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all"
                style={{
                  width: `${(doc.downloads / topDocuments[0].downloads) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Stats */}
      <div className="mt-6 grid grid-cols-2 gap-4 border-t border-gray-100 pt-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-800">
            {topDocuments
              .reduce((sum, doc) => sum + doc.downloads, 0)
              .toLocaleString()}
          </div>
          <div className="text-xs text-gray-500">Tổng lượt tải</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">5</div>
          <div className="text-xs text-gray-500">Top tài liệu</div>
        </div>
      </div>
    </div>
  );
}

// components/UserResourcePage/FileGrid/index.jsx
import React from "react";
import { Folder, File, MoreVertical, Star, MessageCircle } from "lucide-react";

export default function FileGrid({ files }) {
  const getStatusText = (status) => {
    switch (status) {
      case "approved":
        return "Đã duyệt";
      case "pending":
        return "Chờ duyệt";
      case "rejected":
        return "Từ chối";
      default:
        return "Không xác định";
    }
  };

  const getStatusClasses = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getFileIcon = (fileType) => {
    if (!fileType) return "📄";

    if (fileType.includes("pdf")) return "📕";
    if (fileType.includes("word") || fileType.includes("document")) return "📘";
    if (fileType.includes("excel") || fileType.includes("spreadsheet"))
      return "📊";
    if (fileType.includes("powerpoint") || fileType.includes("presentation"))
      return "📙";
    if (fileType.includes("image")) return "🖼️";
    if (fileType.includes("video")) return "🎥";
    if (fileType.includes("audio")) return "🎵";
    if (fileType.includes("zip") || fileType.includes("rar")) return "📦";

    return "📄";
  };

  const formatFileSize = (size) => {
    if (!size || size === "N/A") return "N/A";
    if (typeof size === "string" && size.includes("MB")) return size;

    const bytes = parseInt(size);
    if (isNaN(bytes)) return "N/A";

    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  const formatDate = (dateString) => {
    if (!dateString || dateString === "N/A") return "N/A";

    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffTime = Math.abs(now - date);
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 0) return "Hôm nay";
      if (diffDays === 1) return "Hôm qua";
      if (diffDays < 7) return diffDays + " ngày trước";
      if (diffDays < 30) return Math.floor(diffDays / 7) + " tuần trước";
      if (diffDays < 365) return Math.floor(diffDays / 30) + " tháng trước";

      return date.toLocaleDateString("vi-VN");
    } catch {
      return dateString;
    }
  };

  if (!files || files.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-gray-400">
        <Folder className="mb-4 h-20 w-20" />
        <p className="text-lg">Không có tài liệu nào</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {files.map((item) => (
        <div
          key={item.id}
          className="group cursor-pointer rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md"
        >
          <div className="mb-3 flex items-start justify-between">
            {item.type === "folder" ? (
              <Folder className="h-8 w-8 text-gray-400" />
            ) : (
              <div className="text-3xl">{getFileIcon(item.file_type)}</div>
            )}
            <button className="opacity-0 transition-opacity group-hover:opacity-100">
              <MoreVertical className="h-4 w-4 text-gray-500" />
            </button>
          </div>

          <p
            className="mb-1 truncate text-sm font-medium text-gray-800"
            title={item.name}
          >
            {item.name}
          </p>

          <p className="mb-2 text-xs text-gray-500">
            {item.type === "folder"
              ? `${item.items} items`
              : formatFileSize(item.size)}
          </p>

          {/* Rating and Comments */}
          {item.type !== "folder" && (
            <div className="mb-2 flex items-center gap-3 text-xs text-gray-500">
              {item.avgRating && (
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span>{item.avgRating.toFixed(1)}</span>
                </div>
              )}
              {item.commentCount > 0 && (
                <div className="flex items-center gap-1">
                  <MessageCircle className="h-3 w-3" />
                  <span>{item.commentCount}</span>
                </div>
              )}
            </div>
          )}

          <p className="mb-2 text-xs text-gray-400">
            {formatDate(item.modified)}
          </p>

          <div className="mt-2">
            <span
              className={`inline-block rounded-full px-2 py-0.5 text-xs ${getStatusClasses(
                item.status,
              )}`}
            >
              {getStatusText(item.status)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

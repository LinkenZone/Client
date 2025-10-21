// components/UserResourcePage/FileList/index.jsx
import React from "react";
import { Folder, Star, MessageCircle, MoreVertical } from "lucide-react";

export default function FileList({ files, onFileClick, onContextMenu, onMoreClick }) {
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
      <div className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white py-16 text-gray-400">
        <Folder className="mb-4 h-20 w-20" />
        <p className="text-lg">Không có tài liệu nào</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white">
      {/* Header */}
      <div className="grid grid-cols-12 gap-4 border-b border-gray-200 bg-gray-50 px-4 py-3 text-xs font-medium text-gray-500">
        <div className="col-span-5">Tên</div>
        <div className="col-span-2">Trạng thái</div>
        <div className="col-span-2">Đánh giá</div>
        <div className="col-span-2">Kích thước</div>
        <div className="col-span-1">Sửa đổi</div>
      </div>

      {/* Rows */}
      {files.map((item) => (
        <div
          key={item.id}
          className="grid cursor-pointer grid-cols-12 gap-4 border-b border-gray-100 px-4 py-3 transition-colors last:border-b-0 hover:bg-gray-50"
          onClick={() => item.type !== "folder" && onFileClick && onFileClick(item)}
          onContextMenu={(e) => {
            if (item.type !== "folder") {
              e.preventDefault();
              onContextMenu && onContextMenu(e, item);
            }
          }}
        >
          <div className="col-span-5 flex items-center gap-3">
            {item.type === "folder" ? (
              <Folder className="h-5 w-5 flex-shrink-0 text-gray-400" />
            ) : (
              <span className="flex-shrink-0 text-xl">
                {getFileIcon(item.file_type)}
              </span>
            )}
            <span className="truncate text-sm text-gray-800" title={item.name}>
              {item.name}
            </span>
            {item.type !== "folder" && (
              <button
                className="ml-auto opacity-0 transition-opacity hover:opacity-100 group-hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation();
                  onMoreClick && onMoreClick(e, item);
                }}
              >
                <MoreVertical className="h-4 w-4 text-gray-500" />
              </button>
            )}
          </div>

          <div className="col-span-2 flex items-center">
            <span
              className={`rounded-full px-2 py-0.5 text-xs ${getStatusClasses(
                item.status,
              )}`}
            >
              {getStatusText(item.status)}
            </span>
          </div>

          <div className="col-span-2 flex items-center gap-3">
            {item.avgRating && (
              <div className="flex items-center gap-1 text-xs">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-gray-700">
                  {item.avgRating.toFixed(1)}
                </span>
              </div>
            )}
            {item.commentCount > 0 && (
              <div className="flex items-center gap-1 text-xs">
                <MessageCircle className="h-3 w-3 text-gray-500" />
                <span className="text-gray-700">{item.commentCount}</span>
              </div>
            )}
          </div>

          <div className="col-span-2 flex items-center">
            <span className="text-sm text-gray-600">
              {item.type === "folder"
                ? `${item.items} items`
                : formatFileSize(item.size)}
            </span>
          </div>

          <div className="col-span-1 flex items-center">
            <span className="text-xs text-gray-500" title={item.modified}>
              {formatDate(item.modified)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

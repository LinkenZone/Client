// components/UserResourcePage/DocumentViewer/index.jsx
import React, { useEffect } from "react";
import { X, Download, ExternalLink } from "lucide-react";

export default function DocumentViewer({ document, onClose }) {
  // Handle ESC key to close
  useEffect(() => {
    if (!document) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.document.addEventListener('keydown', handleKeyDown);
    
    // Prevent body scroll
    window.document.body.style.overflow = 'hidden';

    return () => {
      window.document.removeEventListener('keydown', handleKeyDown);
      window.document.body.style.overflow = 'unset';
    };
  }, [document, onClose]);

  if (!document) return null;

  const getFileType = (fileType) => {
    if (!fileType) return "unknown";
    if (fileType.includes("powerpoint") || fileType.includes("presentation")) return "presentation";
    if (fileType.includes("pdf")) return "pdf";
    if (fileType.includes("word") || fileType.includes("document")) return "document";
    if (fileType.includes("excel") || fileType.includes("spreadsheet")) return "spreadsheet";
    if (fileType.includes("image")) return "image";
    if (fileType.includes("video")) return "video";
    if (fileType.includes("audio")) return "audio";
    
    return "unknown";
  };

  const fileType = getFileType(document.file_type);
  const fileUrl = document.file_url || document.url;

  const renderContent = () => {
    switch (fileType) {
      case "pdf":
        // Sử dụng Google Docs Viewer cho PDF để tránh lỗi CORS
        return (
          <iframe
            src={`https://docs.google.com/viewer?url=${encodeURIComponent(fileUrl)}&embedded=true`}
            className="h-full w-full"
            title={document.name}
            frameBorder="0"
          />
        );

      case "image":
        return (
          <div className="flex h-full items-center justify-center bg-gray-100">
            <img
              src={fileUrl}
              alt={document.name}
              className="max-h-full max-w-full object-contain"
            />
          </div>
        );

      case "video":
        return (
          <div className="flex h-full items-center justify-center bg-black">
            <video
              controls
              className="max-h-full max-w-full"
              src={fileUrl}
            >
              Trình duyệt của bạn không hỗ trợ video.
            </video>
          </div>
        );

      case "audio":
        return (
          <div className="flex h-full items-center justify-center">
            <div className="w-full max-w-2xl rounded-lg bg-white p-8 shadow-lg">
              <h3 className="mb-4 text-lg font-semibold text-gray-800">
                {document.name}
              </h3>
              <audio controls className="w-full" src={fileUrl}>
                Trình duyệt của bạn không hỗ trợ audio.
              </audio>
            </div>
          </div>
        );

      case "document":
      case "spreadsheet":
      case "presentation":
        // Xóa icon và tên file, chỉ hiển thị iframe toàn màn hình
        return (
          <iframe
            src={`https://docs.google.com/viewer?url=${encodeURIComponent(fileUrl)}&embedded=true`}
            className="h-full w-full"
            title={document.name}
            frameBorder="0"
          />
        );

      default:
        return (
          <div className="flex h-full flex-col items-center justify-center gap-4 p-8">
            <div className="text-center">
              <div className="mb-4 text-6xl">📄</div>
              <h3 className="mb-2 text-xl font-semibold text-gray-800">
                {document.name}
              </h3>
              <p className="mb-6 text-gray-600">
                Không thể xem trước loại tài liệu này trực tiếp
              </p>
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
              >
                <ExternalLink className="h-5 w-5" />
                Mở trong tab mới
              </a>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
      <div className="relative flex h-screen w-screen flex-col bg-white">
        {/* Header - Compact */}
        <div className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3 shadow-sm">
          <div className="flex-1 min-w-0">
            <h2 className="truncate text-base font-semibold text-gray-800">
              {document.name}
            </h2>
            <p className="text-xs text-gray-500">
              {document.file_type || "Không rõ loại file"}
            </p>
          </div>
          
          <div className="flex items-center gap-2 ml-4">
            <a
              href={fileUrl}
              download
              className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100"
              title="Tải xuống"
            >
              <Download className="h-5 w-5" />
            </a>
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100"
              title="Mở trong tab mới"
            >
              <ExternalLink className="h-5 w-5" />
            </a>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-red-600"
              title="Đóng (ESC)"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content - Full height */}
        <div className="flex-1 overflow-hidden bg-gray-50">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

// components/UserResourcePage/UploadModal/index.jsx
import React, { useState } from "react";
import { Upload, X } from "lucide-react";

export default function UploadModal({
  isOpen,
  onClose,
  file,
  previewUrl,
  onFileChange,
  onUpload,
}) {
  const [dragActive, setDragActive] = useState(false);

  if (!isOpen) return null;

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // Create a synthetic event for compatibility with onFileChange
      const syntheticEvent = {
        target: {
          files: e.dataTransfer.files,
        },
      };
      onFileChange(syntheticEvent);
    }
  };

  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 transition-colors hover:text-gray-600"
        >
          <X className="h-6 w-6" />
        </button>

        <h3 className="mb-4 text-xl font-semibold text-gray-800">
          Tải lên tài liệu
        </h3>

        <div
          className={`cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition-all ${
            dragActive
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-blue-500 hover:bg-blue-50"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            id="fileUpload"
            className="hidden"
            multiple={false}
            onChange={onFileChange}
          />
          <label htmlFor="fileUpload" className="block cursor-pointer">
            <Upload className="mx-auto mb-3 h-12 w-12 text-gray-400" />
            <p className="mb-2 text-sm text-gray-700">
              Kéo thả file vào đây hoặc{" "}
              <span className="font-semibold text-blue-600">chọn file</span>
            </p>
            <p className="text-xs text-gray-500">
              Hỗ trợ: PDF, DOC, PPT, MP4, ZIP
            </p>
          </label>

          {file && (
            <div className="mt-4 rounded-lg bg-gray-100 p-3 text-left">
              <p className="text-sm font-medium text-gray-800">
                📂 {file.name}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
              {file.type.startsWith("image/") && previewUrl && (
                <img
                  src={previewUrl}
                  alt="preview"
                  className="mt-2 max-h-48 w-full rounded-lg object-cover"
                />
              )}
              {file.type.startsWith("video/") && previewUrl && (
                <video
                  src={previewUrl}
                  controls
                  className="mt-2 max-h-48 w-full rounded-lg"
                />
              )}
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
          >
            Hủy
          </button>
          <button
            onClick={onUpload}
            disabled={!file}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            Tải lên
          </button>
        </div>
      </div>
    </div>
  );
}

// components/UserResourcePage/RenameModal/index.jsx
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function RenameModal({ isOpen, onClose, document, onRename }) {
  const [newName, setNewName] = useState("");

  useEffect(() => {
    if (isOpen && document) {
      // Remove file extension from name
      const nameWithoutExt = document.name.replace(/\.[^/.]+$/, "");
      setNewName(nameWithoutExt);
    }
  }, [isOpen, document]);

  if (!isOpen || !document) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newName.trim()) {
      // Get file extension
      const extension = document.name.match(/\.[^/.]+$/)?.[0] || "";
      const finalName = newName.trim() + extension;
      onRename(document.id, finalName);
      onClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 transition-colors hover:text-gray-600"
        >
          <X className="h-6 w-6" />
        </button>

        <h3 className="mb-4 text-xl font-semibold text-gray-800">
          Đổi tên tài liệu
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="documentName"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Tên mới
            </label>
            <input
              id="documentName"
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
              placeholder="Nhập tên mới..."
            />
            <p className="mt-1 text-xs text-gray-500">
              Phần mở rộng:{" "}
              <span className="font-medium">
                {document.name.match(/\.[^/.]+$/)?.[0] || "Không có"}
              </span>
            </p>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={!newName.trim()}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              Đổi tên
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

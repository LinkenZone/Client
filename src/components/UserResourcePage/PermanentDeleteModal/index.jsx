// components/UserResourcePage/PermanentDeleteModal/index.jsx
import { useEffect } from 'react';

export default function PermanentDeleteModal({ isOpen, document, onClose, onConfirm }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      window.document.body.style.overflow = 'hidden';
    }

    return () => {
      window.document.removeEventListener('keydown', handleEscape);
      window.document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl animate-fadeIn">
        {/* Icon Warning - More severe */}
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 mb-4">
          <svg
            className="h-8 w-8 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </div>

        {/* Title */}
        <h3 className="text-center text-lg font-bold text-red-600 mb-2">
          Xóa vĩnh viễn tài liệu
        </h3>

        {/* Message */}
        <p className="text-center text-sm text-gray-600 mb-2">
          Bạn có chắc chắn muốn xóa vĩnh viễn tài liệu
        </p>
        <p className="text-center text-sm font-semibold text-gray-800 mb-4">
          "{document?.name}"?
        </p>
        
        {/* Warning Box */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6">
          <div className="flex items-start">
            <svg
              className="h-5 w-5 text-red-600 mr-2 mt-0.5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <p className="text-xs font-semibold text-red-800 mb-1">Cảnh báo:</p>
              <p className="text-xs text-red-700">
                Hành động này không thể hoàn tác. Tài liệu sẽ bị xóa vĩnh viễn khỏi hệ thống.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Hủy
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex-1 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 shadow-md"
          >
            Xóa vĩnh viễn
          </button>
        </div>
      </div>
    </div>
  );
}

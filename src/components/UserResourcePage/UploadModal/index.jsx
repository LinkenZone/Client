// components/UserResourcePage/UploadModal/index.jsx
import React, { useState } from "react";
import { Upload, X, AlertCircle } from "lucide-react";

export default function UploadModal({
  isOpen,
  onClose,
  file,
  previewUrl,
  onFileChange,
  onUpload,
  uploading,
  uploadProgress = 0,
}) {
  const [dragActive, setDragActive] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
  });
  const [errors, setErrors] = useState({});

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
      const syntheticEvent = {
        target: {
          files: e.dataTransfer.files,
        },
      };
      onFileChange(syntheticEvent);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate title (required)
    if (!formData.title.trim()) {
      newErrors.title = 'Tiêu đề bài học là bắt buộc';
    }

    // Validate description (required)
    if (!formData.description.trim()) {
      newErrors.description = 'Giới thiệu ngắn là bắt buộc';
    }

    // Validate content or file (at least one required)
    if (!formData.content.trim() && !file) {
      newErrors.contentOrFile = 'Phải có ít nhất nội dung bài học hoặc file đính kèm';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onUpload(formData);
    }
  };

  const handleClose = () => {
    setFormData({ title: '', description: '', content: '' });
    setErrors({});
    onClose();
  };

  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black p-4">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg bg-white p-6 shadow-xl">
        {/* Close button */}
        <button
          onClick={handleClose}
          disabled={uploading}
          className="absolute top-4 right-4 text-gray-400 transition-colors hover:text-gray-600 disabled:opacity-50"
        >
          <X className="h-6 w-6" />
        </button>

        <h3 className="mb-6 text-2xl font-bold text-gray-800">
          Đăng bài học mới
        </h3>

        <div className="space-y-5">
          {/* Title Field */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Tiêu đề bài học <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Nhập tiêu đề bài học..."
              className={`w-full rounded-lg border-2 ${errors.title ? 'border-red-500' : 'border-gray-300'} px-4 py-3 text-sm transition-colors focus:border-blue-500 focus:outline-none`}
              disabled={uploading}
            />
            {errors.title && (
              <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                <AlertCircle size={12} />
                {errors.title}
              </p>
            )}
          </div>

          {/* Description Field */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Giới thiệu ngắn <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Mô tả ngắn gọn về bài học này..."
              rows="3"
              className={`w-full resize-none rounded-lg border-2 ${errors.description ? 'border-red-500' : 'border-gray-300'} px-4 py-3 text-sm transition-colors focus:border-blue-500 focus:outline-none`}
              disabled={uploading}
            />
            {errors.description && (
              <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                <AlertCircle size={12} />
                {errors.description}
              </p>
            )}
          </div>

          {/* Content Field */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Nội dung bài học 
              <span className="ml-2 text-xs font-normal text-gray-500">
                (Không bắt buộc nếu có file đính kèm)
              </span>
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Nhập nội dung chi tiết bài học tại đây..."
              rows="6"
              className={`w-full resize-none rounded-lg border-2 ${errors.contentOrFile ? 'border-red-500' : 'border-gray-300'} px-4 py-3 text-sm transition-colors focus:border-blue-500 focus:outline-none`}
              disabled={uploading}
            />
            {errors.contentOrFile && (
              <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                <AlertCircle size={12} />
                {errors.contentOrFile}
              </p>
            )}
          </div>

          {/* File Upload Area */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              File đính kèm
              <span className="ml-2 text-xs font-normal text-gray-500">
                (Không bắt buộc nếu có nội dung bài học)
              </span>
            </label>
            <div
              className={`cursor-pointer rounded-xl border-2 border-dashed p-6 text-center transition-all ${
                dragActive
                  ? "border-blue-500 bg-blue-50"
                  : errors.contentOrFile
                  ? "border-red-500 bg-red-50"
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
                disabled={uploading}
              />
              <label htmlFor="fileUpload" className={`block ${uploading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}>
                <Upload className="mx-auto mb-3 h-10 w-10 text-gray-400" />
                <p className="mb-2 text-sm text-gray-700">
                  Kéo thả file vào đây hoặc{" "}
                  <span className="font-semibold text-blue-600">chọn file</span>
                </p>
                <p className="text-xs text-gray-500">
                  Hỗ trợ: PDF, DOC, DOCX, PPT, PPTX, MP4, ZIP (Max 100MB)
                </p>
              </label>

              {file && (
                <div className="mt-4 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-4 text-left">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-800">
                        📂 {file.name}
                      </p>
                      <p className="mt-1 text-xs text-gray-600">
                        {(file.size / 1024 / 1024).toFixed(2)} MB • {file.type || 'Unknown type'}
                      </p>
                    </div>
                    {!uploading && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          onFileChange({ target: { files: [] } });
                        }}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        <X size={18} />
                      </button>
                    )}
                  </div>
                  {file.type.startsWith("image/") && previewUrl && (
                    <img
                      src={previewUrl}
                      alt="preview"
                      className="mt-3 max-h-48 w-full rounded-lg object-cover"
                    />
                  )}
                  {file.type.startsWith("video/") && previewUrl && (
                    <video
                      src={previewUrl}
                      controls
                      className="mt-3 max-h-48 w-full rounded-lg"
                    />
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          {uploading && (
            <div className="rounded-lg bg-blue-50 p-4">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium text-gray-700">Đang tải lên...</span>
                <span className="font-bold text-blue-600">{uploadProgress}%</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end gap-3 border-t pt-4">
          <button
            onClick={handleClose}
            disabled={uploading}
            className="rounded-lg px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Hủy
          </button>
          <button
            onClick={handleSubmit}
            disabled={uploading}
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:from-blue-700 hover:to-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {uploading ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                <span>Đang đăng...</span>
              </>
            ) : (
              <>
                <Upload size={16} />
                <span>Đăng bài học</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

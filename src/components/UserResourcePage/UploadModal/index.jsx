// components/UserResourcePage/UploadModal/index.jsx
import React, { useState, useEffect } from "react";
import { Upload, X, Tag as TagIcon } from "lucide-react";
import { api } from "../../../services/api";
import { toast } from "react-toastify";

export default function UploadModal({
  isOpen,
  onClose,
  file,
  previewUrl,
  onFileChange,
  onUpload,
  uploading,
  uploadProgress = 0,
  description,
  onDescriptionChange,
  selectedTags,
  onTagsChange,
}) {
  const [dragActive, setDragActive] = useState(false);
  const [availableTags, setAvailableTags] = useState([]);
  const [loadingTags, setLoadingTags] = useState(false);

  // Fetch available tags
  useEffect(() => {
    if (isOpen) {
      fetchTags();
    }
  }, [isOpen]);

  const fetchTags = async () => {
    try {
      setLoadingTags(true);
      const response = await api.get('/tags');
      setAvailableTags(response.data.data.tags);
    } catch (error) {
      console.error('Error fetching tags:', error);
      toast.error('Không thể tải danh sách tags!');
    } finally {
      setLoadingTags(false);
    }
  };

  const toggleTag = (tagId) => {
    if (selectedTags.includes(tagId)) {
      onTagsChange(selectedTags.filter(id => id !== tagId));
    } else {
      onTagsChange([...selectedTags, tagId]);
    }
  };

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
      <div className="relative w-full max-w-4xl rounded-lg bg-white p-6 shadow-xl">
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

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Left Column - File Upload */}
          <div>
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

            {/* Progress Bar */}
            {uploading && (
              <div className="mt-4">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-gray-600">Đang tải lên...</span>
                  <span className="font-semibold text-blue-600">{uploadProgress}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-full bg-blue-600 transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Description & Tags */}
          <div className="flex flex-col gap-4">
            {/* Description Field */}
            <div>
              <label htmlFor="description" className="mb-2 block text-sm font-medium text-gray-700">
                Mô tả tài liệu
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => onDescriptionChange(e.target.value)}
                rows={6}
                placeholder="Nhập mô tả cho tài liệu (không bắt buộc)..."
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Tags Selection */}
            <div className="flex-1">
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                <TagIcon className="h-4 w-4" />
                Tags
              </label>
              <div className="max-h-60 overflow-y-auto rounded-lg border border-gray-200 p-3">
                {loadingTags ? (
                  <div className="py-4 text-center text-sm text-gray-500">Đang tải tags...</div>
                ) : availableTags.length === 0 ? (
                  <div className="py-4 text-center text-sm text-gray-500">Chưa có tags nào</div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {availableTags.map((tag) => (
                      <button
                        key={tag.tag_id}
                        type="button"
                        onClick={() => toggleTag(tag.tag_id)}
                        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                          selectedTags.includes(tag.tag_id)
                            ? 'text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                        style={{
                          backgroundColor: selectedTags.includes(tag.tag_id) ? tag.color : undefined,
                        }}
                      >
                        <div
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: selectedTags.includes(tag.tag_id) ? 'white' : tag.color }}
                        />
                        {tag.tag_name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={uploading}
            className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Hủy
          </button>
          <button
            onClick={onUpload}
            disabled={!file || uploading}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            {uploading ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                <span>Đang tải lên...</span>
              </>
            ) : (
              "Tải lên"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

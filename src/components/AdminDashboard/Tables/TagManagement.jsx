import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Tag as TagIcon, FileText } from 'lucide-react';
import { toast } from 'react-toastify';
import { api } from '../../../services/api';

export default function TagManagement() {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTag, setEditingTag] = useState(null);
  const [formData, setFormData] = useState({
    tag_name: '',
    description: '',
    color: '#3B82F6',
  });

  // Fetch tags
  const fetchTags = async () => {
    try {
      setLoading(true);
      const response = await api.get('/tags');
      setTags(response.data.data.tags);
    } catch (error) {
      console.error('Error fetching tags:', error);
      toast.error('Không thể tải danh sách tags!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingTag) {
        // Update tag
        await api.patch(`/tags/${editingTag.tag_id}`, formData);
        toast.success('Cập nhật tag thành công!');
      } else {
        // Create tag
        await api.post('/tags', formData);
        toast.success('Tạo tag mới thành công!');
      }

      fetchTags();
      closeModal();
    } catch (error) {
      console.error('Error saving tag:', error);
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra!');
    }
  };

  // Handle delete
  const handleDelete = async (tagId, tagName) => {
    if (!window.confirm(`Bạn có chắc muốn xóa tag "${tagName}"?`)) {
      return;
    }

    try {
      await api.delete(`/tags/${tagId}`);
      toast.success('Xóa tag thành công!');
      fetchTags();
    } catch (error) {
      console.error('Error deleting tag:', error);
      toast.error('Không thể xóa tag!');
    }
  };

  // Open modal for create/edit
  const openModal = (tag = null) => {
    if (tag) {
      setEditingTag(tag);
      setFormData({
        tag_name: tag.tag_name,
        description: tag.description || '',
        color: tag.color || '#3B82F6',
      });
    } else {
      setEditingTag(null);
      setFormData({
        tag_name: '',
        description: '',
        color: '#3B82F6',
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTag(null);
    setFormData({
      tag_name: '',
      description: '',
      color: '#3B82F6',
    });
  };

  // Color presets
  const colorPresets = [
    '#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6',
    '#EC4899', '#14B8A6', '#F97316', '#6366F1', '#84CC16',
  ];

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p className="text-gray-500">Đang tải...</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Quản lý Tags</h3>
          <p className="mt-1 text-sm text-gray-500">
            Tạo và quản lý các tags cho tài liệu
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          Thêm Tag
        </button>
      </div>

      {/* Tags Grid */}
      {tags.length === 0 ? (
        <div className="py-12 text-center">
          <TagIcon className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-4 text-gray-500">Chưa có tag nào</p>
          <button
            onClick={() => openModal()}
            className="mt-4 text-blue-600 hover:underline"
          >
            Tạo tag đầu tiên
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tags.map((tag) => (
            <div
              key={tag.tag_id}
              className="rounded-lg border border-gray-200 p-4 transition hover:shadow-md"
            >
              <div className="mb-3 flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: tag.color }}
                  />
                  <h4 className="font-semibold text-gray-800">{tag.tag_name}</h4>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openModal(tag)}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(tag.tag_id, tag.tag_name)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {tag.description && (
                <p className="mb-3 text-sm text-gray-600">{tag.description}</p>
              )}

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <FileText className="h-4 w-4" />
                <span>{tag.document_count} tài liệu</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6">
            <h3 className="mb-4 text-xl font-semibold">
              {editingTag ? 'Chỉnh sửa Tag' : 'Tạo Tag Mới'}
            </h3>

            <form onSubmit={handleSubmit}>
              {/* Tag Name */}
              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Tên Tag <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.tag_name}
                  onChange={(e) =>
                    setFormData({ ...formData, tag_name: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>

              {/* Description */}
              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Mô tả
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                />
              </div>

              {/* Color Picker */}
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Màu sắc
                </label>
                <div className="flex flex-wrap gap-2">
                  {colorPresets.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setFormData({ ...formData, color })}
                      className={`h-8 w-8 rounded-full transition ${
                        formData.color === color
                          ? 'ring-2 ring-gray-400 ring-offset-2'
                          : 'hover:scale-110'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
                >
                  {editingTag ? 'Cập nhật' : 'Tạo mới'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

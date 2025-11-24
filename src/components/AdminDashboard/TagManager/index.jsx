import { useState, useEffect } from 'react';
import { X, Save, Tag as TagIcon, Plus, Minus } from 'lucide-react';
import { api } from '../../../services/api';
import { toast } from 'react-toastify';

export default function TagManager({ documentId, isOpen, onClose, onUpdate }) {
  const [allTags, setAllTags] = useState([]);
  const [documentTags, setDocumentTags] = useState([]);
  const [selectedTagIds, setSelectedTagIds] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && documentId) {
      fetchAllTags();
      fetchDocumentTags();
    }
  }, [isOpen, documentId]);

  const fetchAllTags = async () => {
    try {
      const response = await api.get('/tags');
      setAllTags(response.data.data.tags || []);
    } catch (error) {
      console.error('Lỗi tải danh sách tags:', error);
    }
  };

  const fetchDocumentTags = async () => {
    try {
      const response = await api.get(`/document/${documentId}/tags`);
      const tags = response.data.data.tags || [];
      setDocumentTags(tags);
      setSelectedTagIds(tags.map(t => t.tag_id));
    } catch (error) {
      console.error('Lỗi tải tags của document:', error);
    }
  };

  const handleAddTag = (tagId) => {
    if (!selectedTagIds.includes(tagId)) {
      setSelectedTagIds(prev => [...prev, tagId]);
    }
  };

  const handleRemoveTag = (tagId) => {
    setSelectedTagIds(prev => prev.filter(id => id !== tagId));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await api.put(`/document/${documentId}/tags`, {
        tagIds: selectedTagIds,
      });

      toast.success('Cập nhật tags thành công!');
      
      if (onUpdate) {
        onUpdate();
      }
      
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Không thể cập nhật tags');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  // Phân loại tags
  const selectedTags = allTags.filter(tag => selectedTagIds.includes(tag.tag_id));
  const unselectedTags = allTags.filter(tag => !selectedTagIds.includes(tag.tag_id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <TagIcon size={24} />
            Quản lý Tags
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Tags đã chọn */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              Tags đang được chọn ({selectedTags.length})
            </h3>
            {selectedTags.length === 0 ? (
              <p className="text-sm text-gray-400 italic">Chưa có tag nào được chọn</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {selectedTags.map((tag) => (
                  <button
                    key={tag.tag_id}
                    onClick={() => handleRemoveTag(tag.tag_id)}
                    className="group relative px-3 py-1.5 rounded-full text-sm font-medium text-white transition-all hover:opacity-80"
                    style={{ backgroundColor: tag.color || '#3B82F6' }}
                  >
                    <span className="flex items-center gap-1">
                      {tag.tag_name}
                      <Minus size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Tags chưa chọn */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              Tags có sẵn ({unselectedTags.length})
            </h3>
            {unselectedTags.length === 0 ? (
              <p className="text-sm text-gray-400 italic">Tất cả tags đã được chọn</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {unselectedTags.map((tag) => (
                  <button
                    key={tag.tag_id}
                    onClick={() => handleAddTag(tag.tag_id)}
                    className="group relative px-3 py-1.5 rounded-full text-sm font-medium text-white transition-all hover:opacity-80"
                    style={{ backgroundColor: tag.color || '#3B82F6' }}
                  >
                    <span className="flex items-center gap-1">
                      {tag.tag_name}
                      <Plus size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Hủy
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Đang lưu...
              </>
            ) : (
              <>
                <Save size={18} />
                Lưu thay đổi
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

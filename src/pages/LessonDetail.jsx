import { useEffect, useState, useContext, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Send, User, Calendar, Download, ExternalLink, MessageSquare, Tag } from 'lucide-react';
import { api } from '../services/api';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';

function LessonDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);
  const [ratings, setRatings] = useState([]);

  const fetchDocumentDetail = useCallback(async () => {
    try {
      const response = await api.get(`/document/${id}`);
      setDocument(response.data.data.document || response.data.data);
    } catch (error) {
      toast.error('Không thể tải thông tin tài liệu');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const fetchRatings = useCallback(async () => {
    try {
      const response = await api.get(`/document/${id}/rating`);
      setRatings(response.data.data || []);
    } catch (error) {
      console.error('Lỗi tải đánh giá:', error);
    }
  }, [id]);

  const fetchComments = useCallback(async () => {
    try {
      const response = await api.get(`/document/${id}/comment`);
      setComments(response.data.data || []);
    } catch (error) {
      console.error('Lỗi tải bình luận:', error);
    }
  }, [id]);

  useEffect(() => {
    fetchDocumentDetail();
    fetchComments();
    fetchRatings();
  }, [fetchDocumentDetail, fetchComments, fetchRatings]);

  const handleSubmitRating = async (e) => {
    e.preventDefault();
    if (userRating === 0) {
      toast.warning('Vui lòng chọn số sao đánh giá');
      return;
    }

    try {
      await api.post(`/document/${id}/rating`, {
        score: userRating,
      });
      toast.success('Đã gửi đánh giá thành công!');
      setUserRating(0);
      fetchRatings();
      fetchDocumentDetail(); // Cập nhật lại rating trung bình
    } catch (error) {
      toast.error(error.response?.data?.message || 'Không thể gửi đánh giá');
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) {
      toast.warning('Vui lòng nhập nội dung bình luận');
      return;
    }

    try {
      await api.post(`/document/${id}/comment`, {
        content: newComment,
      });
      toast.success('Đã gửi bình luận thành công!');
      setNewComment('');
      fetchComments();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Không thể gửi bình luận');
    }
  };

  const formatFileSize = (size) => {
    if (!size || size === 'N/A') return 'N/A';
    if (typeof size === 'string' && size.includes('MB')) return size;
    
    const bytes = parseInt(size);
    if (isNaN(bytes)) return 'N/A';
    
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
  };

  const getAverageRating = () => {
    if (!ratings || ratings.length === 0) return 0;
    const sum = ratings.reduce((acc, r) => acc + r.score, 0);
    return (sum / ratings.length).toFixed(1);
  };

  // Hàm render nội dung document viewer
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

  const renderDocumentContent = () => {
    if (!document) return null;
    
    const fileType = getFileType(document.file_type);
    const fileUrl = document.file_url;

    switch (fileType) {
      case "pdf":
        return (
          <iframe
            src={`https://docs.google.com/viewer?url=${encodeURIComponent(fileUrl)}&embedded=true`}
            className="w-full h-full"
            title={document.file_name}
            frameBorder="0"
          />
        );

      case "image":
        return (
          <div className="flex h-full items-center justify-center bg-gray-100">
            <img
              src={fileUrl}
              alt={document.file_name}
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
                {document.file_name}
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
        return (
          <iframe
            src={`https://docs.google.com/viewer?url=${encodeURIComponent(fileUrl)}&embedded=true`}
            className="w-full h-full"
            title={document.file_name}
            frameBorder="0"
          />
        );

      default:
        return (
          <div className="flex h-full flex-col items-center justify-center gap-4 p-8">
            <div className="text-center">
              <div className="mb-4 text-6xl">📄</div>
              <h3 className="mb-2 text-xl font-semibold text-gray-800">
                {document.file_name}
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

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
          <p className="mt-4 text-xl text-gray-600">Đang tải tài liệu...</p>
        </div>
      </div>
    );
  }

  if (!document) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-2xl text-gray-600">Không tìm thấy tài liệu</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 rounded-lg bg-blue-500 px-6 py-2 text-white hover:bg-blue-600 transition-colors"
          >
            Quay lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            ← Quay lại
          </button>
          <h1 className="text-lg font-semibold text-gray-900 truncate flex-1 mx-4">
            {document.file_name}
          </h1>
        </div>
      </div>

      {/* 2-Column Layout */}
      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          
          {/* Left Column - Document Viewer */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              {/* Document Preview - Embedded Viewer */}
              <div className="relative bg-gray-50" style={{ height: '700px' }}>
                {renderDocumentContent()}
              </div>

              {/* Download Button */}
              <div className="p-4 border-t flex gap-2">
                <a
                  href={document.file_url}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 flex-1 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Download size={20} />
                  Tải xuống tài liệu
                </a>
                <a
                  href={document.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  title="Mở trong tab mới"
                >
                  <ExternalLink size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Info, Comments, Rating */}
          <div className="lg:col-span-1 space-y-4">
            
            {/* Document Info */}
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">{document.file_name}</h2>
              
              {/* Author & Date */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <User size={18} className="text-blue-500" />
                  <span className="text-sm">
                  <span className="font-medium">Tác giả:</span> {document.uploader?.full_name || 'Ẩn danh'}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar size={18} className="text-blue-500" />
                  <span className="text-sm">
                    {new Date(document.created_at).toLocaleDateString('vi-VN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4 pb-4 border-b">
                <Star className="fill-yellow-400 text-yellow-400" size={20} />
                <span className="text-lg font-semibold">
                  {getAverageRating()}/5
                </span>
                <span className="text-sm text-gray-500">
                  ({ratings.length} đánh giá)
                </span>
              </div>

              {/* Description */}
              {document.description && (
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Mô tả</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {document.description}
                  </p>
                </div>
              )}

              {/* Tags */}
              {document.tags && document.tags.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
                    <Tag size={16} />
                    Thẻ
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {document.tags.map((tag) => (
                      <span
                        key={tag.tag_id}
                        className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium"
                      >
                        {tag.tag_name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* File Info */}
              <div className="text-xs text-gray-500 space-y-1">
                <p>Kích thước: {formatFileSize(document.file_size)}</p>
                <p>Loại: {document.file_type}</p>
                <p>Lượt xem: {document.view_count || 0}</p>
              </div>
            </div>

            {/* Rating Section */}
            {user && (
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-4">⭐ Đánh giá</h3>
                <form onSubmit={handleSubmitRating} className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Chọn số sao:
                    </label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setUserRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="transition-transform hover:scale-110"
                        >
                          <Star
                            size={32}
                            className={
                              star <= (hoverRating || userRating)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }
                          />
                        </button>
                      ))}
                    </div>
                    {userRating > 0 && (
                      <p className="text-sm text-gray-600 mt-1">
                        Bạn đã chọn: {userRating}/5
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors font-medium"
                  >
                    <Send size={18} />
                    Gửi đánh giá
                  </button>
                </form>

                {/* Ratings List */}
                {ratings.length > 0 && (
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">
                      Các đánh giá ({ratings.length})
                    </h4>
                    <div className="space-y-3 max-h-60 overflow-y-auto">
                      {ratings.map((rating) => (
                        <div key={rating.rating_id} className="pb-3 border-b last:border-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-gray-900">
                              {rating.user?.full_name || 'Người dùng'}
                            </span>
                            <div className="flex gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  size={14}
                                  className={
                                    i < rating.score
                                      ? 'fill-yellow-400 text-yellow-400'
                                      : 'text-gray-300'
                                  }
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-xs text-gray-500">
                            {new Date(rating.rated_at).toLocaleDateString('vi-VN')}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Comments Section */}
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MessageSquare size={20} />
                Bình luận ({comments.length})
              </h3>

              {/* New Comment Form */}
              {user && (
                <form onSubmit={handleSubmitComment} className="mb-4">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Viết bình luận của bạn..."
                    className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none resize-none"
                    rows="3"
                  />
                  <button
                    type="submit"
                    className="mt-2 w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                  >
                    <Send size={18} />
                    Gửi bình luận
                  </button>
                </form>
              )}

              {/* Comments List */}
              {comments.length > 0 ? (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {comments.map((comment) => (
                    <div
                      key={comment.comment_id}
                      className="pb-3 border-b last:border-0"
                    >
                      <div className="flex items-start gap-2">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-semibold">
                          {comment.user?.full_name?.[0]?.toUpperCase() || 'U'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-semibold text-gray-900">
                              {comment.user?.full_name || 'Người dùng'}
                            </span>
                            <span className="text-xs text-gray-500">
                              {new Date(comment.created_at).toLocaleDateString('vi-VN')}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 break-words">
                            {comment.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <MessageSquare className="mx-auto mb-2 text-gray-400" size={32} />
                  <p className="text-sm">Chưa có bình luận nào</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LessonDetail;

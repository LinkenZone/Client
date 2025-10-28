import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Download, Star, Send, ChevronDown, ChevronUp, User, FileText, Calendar } from 'lucide-react';
import { api } from '../services/api';
import { toast } from 'react-toastify';
import noPict from '../assets/no_pic.png';

function LessonDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviews, setReviews] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [expandedComments, setExpandedComments] = useState({});

  useEffect(() => {
    fetchLessonDetail();
    fetchReviews();
    fetchComments();
  }, [id]);

  const fetchLessonDetail = async () => {
    try {
      const response = await api.get(`/lessons/${id}`);
      setLesson(response.data.data);
    } catch (error) {
      toast.error('Không thể tải thông tin bài học');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await api.get(`/lessons/${id}/reviews`);
      setReviews(response.data.data || []);
    } catch (error) {
      console.error('Lỗi tải đánh giá:', error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await api.get(`/lessons/${id}/comments`);
      setComments(response.data.data || []);
    } catch (error) {
      console.error('Lỗi tải bình luận:', error);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (userRating === 0) {
      toast.warning('Vui lòng chọn số sao đánh giá');
      return;
    }
    if (!reviewText.trim()) {
      toast.warning('Vui lòng viết nội dung đánh giá');
      return;
    }

    try {
      await api.post(`/lessons/${id}/reviews`, {
        rating: userRating,
        content: reviewText,
      });
      toast.success('Đã gửi đánh giá thành công!');
      setUserRating(0);
      setReviewText('');
      fetchReviews();
      fetchLessonDetail(); // Cập nhật lại rating trung bình
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
      await api.post(`/lessons/${id}/comments`, {
        content: newComment,
      });
      toast.success('Đã gửi bình luận thành công!');
      setNewComment('');
      fetchComments();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Không thể gửi bình luận');
    }
  };

  const handleDownloadFile = async (fileUrl, fileName) => {
    try {
      const response = await api.get(fileUrl, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success('Đang tải xuống...');
    } catch (error) {
      toast.error('Không thể tải xuống tệp');
    }
  };

  const toggleCommentReplies = (commentId) => {
    setExpandedComments(prev => ({
      ...prev,
      [commentId]: !prev[commentId]
    }));
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
          <p className="mt-4 text-xl text-gray-600">Đang tải bài học...</p>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-2xl text-gray-600">Không tìm thấy bài học</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 rounded-lg bg-blue-500 px-6 py-2 text-white hover:bg-blue-600"
          >
            Quay lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f9ff] via-white to-[#e0f2f1] py-8">
      <div className="mx-auto max-w-6xl px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-gray-700 shadow-md transition-all hover:bg-gray-50 hover:shadow-lg"
        >
          ← Quay lại
        </button>

        {/* Header Section */}
        <div className="mb-8 overflow-hidden rounded-3xl bg-white shadow-2xl">
          {/* Image */}
          <div className="h-[400px] w-full overflow-hidden bg-gray-100">
            <img
              src={lesson.image || noPict}
              alt={lesson.title}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Title and Author */}
          <div className="border-t-4 border-[#4AA4FF] bg-gradient-to-r from-[#ecfdf5] to-[#f0f9ff] p-8">
            <h1 className="mb-4 text-4xl font-bold text-gray-800">{lesson.title}</h1>
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <User className="text-[#4AA4FF]" size={20} />
                <span className="text-lg text-gray-700">
                  Giảng viên: <span className="font-semibold">{lesson.author || 'Ẩn danh'}</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="fill-yellow-400 text-yellow-400" size={20} />
                <span className="text-lg font-semibold text-gray-800">
                  {lesson.rating}/5 ({lesson.reviewCount || 0} đánh giá)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="text-[#4AA4FF]" size={20} />
                <span className="text-lg text-gray-700">
                  {new Date(lesson.createdAt).toLocaleDateString('vi-VN')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="mb-8 rounded-3xl bg-white p-8 shadow-xl">
          <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-gray-800">
            <FileText className="text-[#4AA4FF]" />
            Nội dung bài giảng
          </h2>
          <div className="prose max-w-none text-gray-700">
            <p className="text-lg leading-relaxed">{lesson.content || lesson.description}</p>
          </div>

          {/* Files Section */}
          {(lesson.powerpoint || lesson.contentFile) && (
            <div className="mt-8 rounded-2xl bg-gradient-to-r from-[#f0f9ff] to-[#ecfdf5] p-6">
              <h3 className="mb-4 text-xl font-semibold text-gray-800">📎 Tài liệu đính kèm</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {lesson.powerpoint && (
                  <button
                    onClick={() => handleDownloadFile(lesson.powerpoint, 'BaiGiang.pptx')}
                    className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-md transition-all hover:scale-105 hover:shadow-lg"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
                      <span className="text-2xl">📊</span>
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-semibold text-gray-800">Slide PowerPoint</p>
                      <p className="text-sm text-gray-500">Bài giảng trình chiếu</p>
                    </div>
                    <Download className="text-[#4AA4FF]" size={24} />
                  </button>
                )}

                {lesson.contentFile && (
                  <button
                    onClick={() => handleDownloadFile(lesson.contentFile, 'TaiLieu.pdf')}
                    className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-md transition-all hover:scale-105 hover:shadow-lg"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                      <span className="text-2xl">📄</span>
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-semibold text-gray-800">Tài liệu nội dung</p>
                      <p className="text-sm text-gray-500">File học tập chi tiết</p>
                    </div>
                    <Download className="text-[#4AA4FF]" size={24} />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Rating Section */}
        <div className="mb-8 rounded-3xl bg-white p-8 shadow-xl">
          <h2 className="mb-6 text-2xl font-bold text-gray-800">⭐ Đánh giá bài học</h2>
          <form onSubmit={handleSubmitReview} className="space-y-4">
            {/* Star Rating */}
            <div>
              <label className="mb-2 block text-lg font-semibold text-gray-700">
                Chọn số sao (1-5):
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setUserRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="transition-transform hover:scale-125"
                  >
                    <Star
                      size={40}
                      className={
                        star <= (hoverRating || userRating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }
                    />
                  </button>
                ))}
                <span className="ml-4 flex items-center text-xl font-semibold text-gray-700">
                  {userRating > 0 ? `${userRating}/5` : 'Chưa chọn'}
                </span>
              </div>
            </div>

            {/* Review Text */}
            <div>
              <label className="mb-2 block text-lg font-semibold text-gray-700">
                Viết đánh giá của bạn:
              </label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Chia sẻ trải nghiệm của bạn về bài học này..."
                className="w-full rounded-xl border-2 border-gray-200 p-4 text-base transition-all focus:border-[#4AA4FF] focus:outline-none focus:ring-2 focus:ring-[#4AA4FF]/20"
                rows="4"
              />
            </div>

            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#4AA4FF] to-[#6B8DD1] px-8 py-3 text-lg font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
            >
              <Send size={20} />
              Gửi đánh giá
            </button>
          </form>

          {/* Reviews List */}
          {reviews.length > 0 && (
            <div className="mt-8">
              <h3 className="mb-4 text-xl font-semibold text-gray-800">
                Các đánh giá ({reviews.length})
              </h3>
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div
                    key={review._id}
                    className="rounded-xl border border-gray-200 bg-gradient-to-r from-[#f9fafb] to-white p-4"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4AA4FF] text-white font-semibold">
                          {review.user?.name?.[0]?.toUpperCase() || 'U'}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">
                            {review.user?.name || 'Người dùng'}
                          </p>
                          <p className="text-sm text-gray-500">
                            {new Date(review.createdAt).toLocaleDateString('vi-VN')}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={18}
                            className={
                              i < review.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700">{review.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Comments Section */}
        <div className="mb-8 rounded-3xl bg-white p-8 shadow-xl">
          <h2 className="mb-6 text-2xl font-bold text-gray-800">💬 Hỏi đáp & Thảo luận</h2>

          {/* New Comment Form */}
          <form onSubmit={handleSubmitComment} className="mb-8">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Đặt câu hỏi hoặc chia sẻ ý kiến của bạn..."
              className="w-full rounded-xl border-2 border-gray-200 p-4 text-base transition-all focus:border-[#4AA4FF] focus:outline-none focus:ring-2 focus:ring-[#4AA4FF]/20"
              rows="3"
            />
            <button
              type="submit"
              className="mt-3 flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#10b981] to-[#059669] px-6 py-3 font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
            >
              <Send size={18} />
              Gửi bình luận
            </button>
          </form>

          {/* Comments List */}
          {comments.length > 0 ? (
            <div className="space-y-4">
              {comments.map((comment) => (
                <div
                  key={comment._id}
                  className="rounded-xl border border-gray-200 bg-gradient-to-r from-[#f0f9ff] to-white p-5"
                >
                  <div className="mb-3 flex items-start gap-3">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-[#4AA4FF] to-[#6B8DD1] text-lg font-semibold text-white">
                      {comment.user?.name?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-gray-800">
                          {comment.user?.name || 'Người dùng'}
                        </p>
                        <span className="text-sm text-gray-500">•</span>
                        <p className="text-sm text-gray-500">
                          {new Date(comment.createdAt).toLocaleDateString('vi-VN')}
                        </p>
                      </div>
                      <p className="mt-2 text-gray-700">{comment.content}</p>

                      {/* Replies Toggle */}
                      {comment.replies && comment.replies.length > 0 && (
                        <button
                          onClick={() => toggleCommentReplies(comment._id)}
                          className="mt-3 flex items-center gap-2 text-sm font-semibold text-[#4AA4FF] transition-colors hover:text-[#6B8DD1]"
                        >
                          {expandedComments[comment._id] ? (
                            <>
                              <ChevronUp size={16} />
                              Ẩn {comment.replies.length} phản hồi
                            </>
                          ) : (
                            <>
                              <ChevronDown size={16} />
                              Xem {comment.replies.length} phản hồi
                            </>
                          )}
                        </button>
                      )}

                      {/* Replies */}
                      {expandedComments[comment._id] && comment.replies && (
                        <div className="mt-4 space-y-3 border-l-2 border-[#4AA4FF] pl-4">
                          {comment.replies.map((reply) => (
                            <div key={reply._id} className="rounded-lg bg-white p-3">
                              <div className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-700">
                                  {reply.user?.name?.[0]?.toUpperCase() || 'U'}
                                </div>
                                <div>
                                  <p className="text-sm font-semibold text-gray-800">
                                    {reply.user?.name || 'Người dùng'}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {new Date(reply.createdAt).toLocaleDateString('vi-VN')}
                                  </p>
                                </div>
                              </div>
                              <p className="mt-2 text-sm text-gray-700">{reply.content}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-xl bg-gray-50 p-8 text-center">
              <p className="text-gray-500">Chưa có bình luận nào. Hãy là người đầu tiên!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LessonDetail;

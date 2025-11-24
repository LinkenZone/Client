import { useNavigate } from 'react-router-dom';
import { Star, MessageSquare, User, Calendar } from 'lucide-react';

function LessonListItem({ lesson }) {
  const navigate = useNavigate();

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  // Render stars (gray if no rating)
  const renderStars = () => {
    const rating = lesson.avgRating || 0;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center gap-1">
        {/* Full stars */}
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        ))}
        {/* Half star */}
        {hasHalfStar && (
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" style={{ clipPath: 'inset(0 50% 0 0)' }} />
        )}
        {/* Empty stars */}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className="h-4 w-4 fill-gray-300 text-gray-300" />
        ))}
        <span className="ml-1 text-sm text-gray-600">
          {rating > 0 ? rating.toFixed(1) : '0.0'}
        </span>
      </div>
    );
  };

  // Get file icon based on file type
  const getFileIcon = () => {
    const fileType = lesson.file_type?.toLowerCase() || '';
    if (fileType.includes('pdf')) return '📄';
    if (fileType.includes('doc')) return '📝';
    if (fileType.includes('ppt') || fileType.includes('presentation')) return '📊';
    if (fileType.includes('video') || fileType.includes('mp4')) return '🎥';
    if (fileType.includes('zip') || fileType.includes('rar')) return '📦';
    return '📁';
  };

  return (
    <div
      onClick={() => navigate(`/lesson/${lesson.document_id}`)}
      className="group cursor-pointer rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-blue-300 hover:shadow-md"
    >
      <div className="flex items-center gap-4">
        {/* File Icon */}
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50 text-2xl">
          {getFileIcon()}
        </div>

        {/* File Info - Grows to fill space */}
        <div className="min-w-0 flex-1">
          <h3 className="mb-1 truncate text-base font-semibold text-gray-800 group-hover:text-blue-600">
            {lesson.title}
          </h3>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600">
            {/* Rating */}
            <div className="flex items-center gap-1">
              {renderStars()}
            </div>

            {/* Comments */}
            <div className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4 text-gray-400" />
              <span>{lesson.commentCount || 0} bình luận</span>
            </div>

            {/* Author */}
            <div className="flex items-center gap-1">
              <User className="h-4 w-4 text-gray-400" />
              <span className="truncate">{lesson.uploader?.full_name || 'Unknown'}</span>
            </div>

            {/* Upload Date */}
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span>{formatDate(lesson.uploaded_at)}</span>
            </div>
          </div>
        </div>

        {/* File Type Badge */}
        <div className="hidden flex-shrink-0 md:block">
          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
            {lesson.file_type?.toUpperCase() || 'FILE'}
          </span>
        </div>
      </div>
    </div>
  );
}

export default LessonListItem;

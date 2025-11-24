import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { Star } from 'lucide-react';

// LessonCard component
function LessonCard({ lesson }) {
  const navigate = useNavigate();

  const getFileIcon = () => {
    const fileType = lesson.file_type?.toLowerCase() || '';
    if (fileType.includes('pdf')) return '📄';
    if (fileType.includes('doc')) return '📝';
    if (fileType.includes('ppt') || fileType.includes('presentation')) return '📊';
    if (fileType.includes('video') || fileType.includes('mp4')) return '🎥';
    if (fileType.includes('zip') || fileType.includes('rar')) return '📦';
    return '📁';
  };

  const renderStars = () => {
    const rating = lesson.avgRating || 0;
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;

    return (
      <div className="flex items-center gap-0.5">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
        ))}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className="h-3 w-3 fill-gray-300 text-gray-300" />
        ))}
      </div>
    );
  };

  return (
    <div
      onClick={() => navigate(`/lesson/${lesson.document_id}`)}
      className="group cursor-pointer rounded-xl bg-white p-4 shadow-md transition-all hover:scale-105 hover:shadow-xl"
    >
      <div className="mb-3 flex h-20 items-center justify-center rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 text-5xl">
        {getFileIcon()}
      </div>
      <h3 className="mb-2 truncate text-sm font-semibold text-gray-800 group-hover:text-blue-600">
        {lesson.title || lesson.file_name}
      </h3>
      <div className="mb-2 flex items-center justify-between">
        {renderStars()}
        <span className="text-xs text-gray-500">
          {lesson.avgRating ? lesson.avgRating.toFixed(1) : '0.0'}
        </span>
      </div>
      <p className="truncate text-xs text-gray-500">
        {lesson.uploader?.full_name || 'Ẩn danh'}
      </p>
    </div>
  );
}

export default function Home() {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch featured lessons từ API
  useEffect(() => {
    const fetchLessons = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/document/approved-documents`);
        setLessons(res.data.data.documents || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e6f7ff] via-[#f0f9ff] to-[#ffffff]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#4AA4FF] via-[#5A9EE8] to-[#6B8DD1] px-4 py-16 md:py-24">
        {/* Decorative Elements */}
        <div className="pointer-events-none absolute top-0 left-0 h-full w-full opacity-10">
          <div className="absolute top-20 left-10 text-9xl">📚</div>
          <div className="absolute top-40 right-20 text-8xl">🎓</div>
          <div className="absolute bottom-20 left-1/4 text-7xl">✏️</div>
          <div className="absolute right-1/3 bottom-10 text-6xl">💡</div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl text-center">
          <h1 className="mb-6 text-5xl font-bold text-white drop-shadow-lg md:text-6xl lg:text-7xl">
            Chào mừng đến với{' '}
            <span className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">
              LinkenZone
            </span>
          </h1>
          <p className="mx-auto mb-8 max-w-3xl text-xl text-white/90 drop-shadow md:text-2xl">
            Nền tảng quản lý tài nguyên học tập hàng đầu - Khám phá kiến thức Tự nhiên và Xã hội
          </p>

          {/* Stats */}
          <div className="mx-auto mt-12 grid max-w-4xl grid-cols-3 gap-4 md:gap-8">
            <div className="rounded-2xl bg-white/20 p-6 backdrop-blur-sm">
              <div className="text-4xl font-bold text-white md:text-5xl">100+</div>
              <div className="mt-2 text-sm text-white/80 md:text-base">Tài liệu</div>
            </div>
            <div className="rounded-2xl bg-white/20 p-6 backdrop-blur-sm">
              <div className="text-4xl font-bold text-white md:text-5xl">50K+</div>
              <div className="mt-2 text-sm text-white/80 md:text-base">Người dùng</div>
            </div>
            <div className="rounded-2xl bg-white/20 p-6 backdrop-blur-sm">
              <div className="text-4xl font-bold text-white md:text-5xl">4.8★</div>
              <div className="mt-2 text-sm text-white/80 md:text-base">Đánh giá</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="/lesson"
              className="rounded-full bg-white px-8 py-4 font-semibold text-[#4AA4FF] shadow-lg transition-all hover:scale-105 hover:shadow-xl"
            >
              Khám phá ngay 🚀
            </a>
            <a
              href="/intro"
              className="rounded-full border-2 border-white bg-transparent px-8 py-4 font-semibold text-white transition-all hover:bg-white hover:text-[#4AA4FF]"
            >
              Tìm hiểu thêm
            </a>
          </div>
        </div>

        {/* Wave decoration */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            <path
              d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Featured Lessons Section */}
      <section className="px-4 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-[#1e3a8a] md:text-4xl">
              Tài liệu nổi bật ⭐
            </h2>
            <p className="text-lg text-gray-600">
              Các tài liệu được yêu thích nhất bởi cộng đồngn
            </p>
          </div>

          {loading ? (
            <div className="mt-12 text-center">
              <div className="mx-auto mb-6 inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-[#4AA4FF] border-r-transparent"></div>
              <p className="text-xl text-gray-600">Đang tải...</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
              {lessons.map((lesson) => (
                <LessonCard key={lesson.document_id} lesson={lesson} />
              ))}
            </div>
          )}

          {/* View All Button */}
          <div className="mt-12 text-center">
            <a
              href="/lesson"
              className="inline-flex items-center gap-2 rounded-full bg-[#4AA4FF] px-8 py-4 font-semibold text-white transition-all hover:bg-[#3b8dd9] hover:shadow-lg"
            >
              Xem tất cả tài nguyên
              <span className="text-xl">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-gradient-to-b from-[#f8f9fa] to-white px-4 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-[#1e3a8a] md:text-4xl">
              Khám phá theo lĩnh vực
            </h2>
            <p className="text-lg text-gray-600">Chọn lĩnh vực bạn quan tâm</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Natural Science Card */}
            <a
              href="/natural"
              className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#e0f2f1] to-[#b2dfdb] p-8 shadow-lg transition-all hover:scale-105 hover:shadow-2xl"
            >
              <div className="relative z-10">
                <div className="mb-4 text-6xl">🔬</div>
                <h3 className="mb-3 text-3xl font-bold text-[#1e88e5]">Khoa học Tự nhiên</h3>
                <p className="mb-4 text-gray-700">Toán - Lý - Hóa - Sinh</p>
                <div className="inline-flex items-center gap-2 font-semibold text-[#1e88e5]">
                  Khám phá ngay
                  <span className="transition-transform group-hover:translate-x-2">→</span>
                </div>
              </div>
              <div className="pointer-events-none absolute right-0 bottom-0 text-9xl opacity-10">
                🧬
              </div>
            </a>

            {/* Social Science Card */}
            <a
              href="/social"
              className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#fff3e0] to-[#ffcc80] p-8 shadow-lg transition-all hover:scale-105 hover:shadow-2xl"
            >
              <div className="relative z-10">
                <div className="mb-4 text-6xl">📚</div>
                <h3 className="mb-3 text-3xl font-bold text-[#d84315]">Khoa học Xã hội</h3>
                <p className="mb-4 text-gray-700">Sử - Địa - Văn - GDCD</p>
                <div className="inline-flex items-center gap-2 font-semibold text-[#d84315]">
                  Khám phá ngay
                  <span className="transition-transform group-hover:translate-x-2">→</span>
                </div>
              </div>
              <div className="pointer-events-none absolute right-0 bottom-0 text-9xl opacity-10">
                🌏
              </div>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

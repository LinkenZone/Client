import { useState, useEffect, useMemo } from 'react';
import LessonCard from '../components/LessonCard';
import { getFeaturedLessons } from '../services/lessonService';

export default function Home() {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch featured lessons từ API
  useEffect(() => {
    const fetchLessons = async () => {
      setLoading(true);
      const data = await getFeaturedLessons(8);
      setLessons(data);
      setLoading(false);
    };

    fetchLessons();
  }, []);

  // Dữ liệu bài học nổi bật - chỉ dùng khi API không có dữ liệu
  const featuredLessons = useMemo(
    () => lessons.length > 0 ? lessons : [
      {
        id: 1,
        title: 'Toán cao cấp',
        description: 'Khóa học toán cao cấp dành cho sinh viên đại học',
        rating: 4.9,
        image: null,
      },
      {
        id: 2,
        title: 'Vật lý đại cương',
        description: 'Tìm hiểu các nguyên lý cơ bản của vật lý',
        rating: 4.7,
        image: null,
      },
      {
        id: 3,
        title: 'Văn học Việt Nam',
        description: 'Khám phá nền văn học phong phú của Việt Nam',
        rating: 4.8,
        image: null,
      },
      {
        id: 4,
        title: 'Lịch sử thế giới',
        description: 'Các sự kiện lịch sử quan trọng nhất thế giới',
        rating: 4.6,
        image: null,
      },
      {
        id: 5,
        title: 'Hóa học hữu cơ',
        description: 'Nghiên cứu về các hợp chất carbon',
        rating: 4.5,
        image: null,
      },
      {
        id: 6,
        title: 'Tiếng Anh giao tiếp',
        description: 'Học tiếng Anh cho người mới bắt đầu',
        rating: 4.9,
        image: null,
      },
      {
        id: 7,
        title: 'Địa lý Việt Nam',
        description: 'Tìm hiểu về đất nước và con người Việt Nam',
        rating: 4.7,
        image: null,
      },
      {
        id: 8,
        title: 'Sinh học tế bào',
        description: 'Khám phá thế giới vi mô của tế bào',
        rating: 4.8,
        image: null,
      },
    ],
    [lessons]
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e6f7ff] via-[#f0f9ff] to-[#ffffff]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#4AA4FF] via-[#5A9EE8] to-[#6B8DD1] px-4 py-16 md:py-24">
        {/* Decorative Elements */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-full opacity-10">
          <div className="absolute left-10 top-20 text-9xl">📚</div>
          <div className="absolute right-20 top-40 text-8xl">🎓</div>
          <div className="absolute bottom-20 left-1/4 text-7xl">✏️</div>
          <div className="absolute bottom-10 right-1/3 text-6xl">💡</div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl text-center">
          <h1 className="mb-6 text-5xl font-bold text-white drop-shadow-lg md:text-6xl lg:text-7xl">
            Chào mừng đến với{' '}
            <span className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">
              LinkenZone
            </span>
          </h1>
          <p className="mx-auto mb-8 max-w-3xl text-xl text-white/90 drop-shadow md:text-2xl">
            Nền tảng học tập trực tuyến hàng đầu - Khám phá kiến thức Tự nhiên và Xã hội
          </p>

          {/* Stats */}
          <div className="mx-auto mt-12 grid max-w-4xl grid-cols-3 gap-4 md:gap-8">
            <div className="rounded-2xl bg-white/20 p-6 backdrop-blur-sm">
              <div className="text-4xl font-bold text-white md:text-5xl">100+</div>
              <div className="mt-2 text-sm text-white/80 md:text-base">Bài học</div>
            </div>
            <div className="rounded-2xl bg-white/20 p-6 backdrop-blur-sm">
              <div className="text-4xl font-bold text-white md:text-5xl">50K+</div>
              <div className="mt-2 text-sm text-white/80 md:text-base">Học viên</div>
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
              Khóa học nổi bật ⭐
            </h2>
            <p className="text-lg text-gray-600">
              Các bài học được yêu thích nhất bởi cộng đồng học viên
            </p>
          </div>

          {loading ? (
            <div className="mt-12 text-center">
              <div className="mx-auto mb-6 inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-[#4AA4FF] border-r-transparent"></div>
              <p className="text-xl text-gray-600">Đang tải bài học...</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
              {featuredLessons.map((lesson) => (
                <LessonCard key={lesson.id} lesson={lesson} />
              ))}
            </div>
          )}

          {/* View All Button */}
          <div className="mt-12 text-center">
            <a
              href="/lesson"
              className="inline-flex items-center gap-2 rounded-full bg-[#4AA4FF] px-8 py-4 font-semibold text-white transition-all hover:bg-[#3b8dd9] hover:shadow-lg"
            >
              Xem tất cả khóa học
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
              <div className="pointer-events-none absolute bottom-0 right-0 text-9xl opacity-10">
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
              <div className="pointer-events-none absolute bottom-0 right-0 text-9xl opacity-10">
                🌏
              </div>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

import { useEffect, useMemo, useState } from 'react';
import LessonCard from '../components/LessonCard';
import { getLessonsByCategory } from '../services/lessonService';

export default function NaturalPage() {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch lessons từ API
  useEffect(() => {
    const fetchLessons = async () => {
      setLoading(true);
      const data = await getLessonsByCategory('natural');
      setLessons(data);
      setLoading(false);
    };

    fetchLessons();
  }, []);

  // Dữ liệu bài học Tự nhiên (Toán, Lý, Hóa, Sinh) - chỉ dùng khi API không có dữ liệu
  const allLessons = useMemo(
    () =>
      lessons.length > 0
        ? lessons
        : [
            {
              id: 1,
              title: 'Toán lớp 1',
              description: 'Học toán cơ bản cho học sinh lớp 1',
              rating: 4.5,
              image: null,
              category: 'natural',
              subject: 'toán',
            },
            {
              id: 2,
              title: 'Toán lớp 2',
              description: 'Các bài toán nâng cao cho lớp 2',
              rating: 4.8,
              image: null,
              category: 'natural',
              subject: 'toán',
            },
            {
              id: 3,
              title: 'Toán cao cấp',
              description: 'Toán học đại học và cao học',
              rating: 4.9,
              image: null,
              category: 'natural',
              subject: 'toán',
            },
            {
              id: 4,
              title: 'Vật lý đại cương',
              description: 'Kiến thức vật lý cơ bản',
              rating: 4.7,
              image: null,
              category: 'natural',
              subject: 'lý',
            },
            {
              id: 5,
              title: 'Cơ học Newton',
              description: 'Nghiên cứu chuyển động và lực',
              rating: 4.6,
              image: null,
              category: 'natural',
              subject: 'lý',
            },
            {
              id: 6,
              title: 'Hóa học hữu cơ',
              description: 'Tìm hiểu về hợp chất hữu cơ',
              rating: 4.4,
              image: null,
              category: 'natural',
              subject: 'hóa',
            },
            {
              id: 7,
              title: 'Hóa học phân tích',
              description: 'Phương pháp phân tích hóa học',
              rating: 4.5,
              image: null,
              category: 'natural',
              subject: 'hóa',
            },
            {
              id: 8,
              title: 'Sinh học tế bào',
              description: 'Nghiên cứu cấu trúc tế bào',
              rating: 4.8,
              image: null,
              category: 'natural',
              subject: 'sinh',
            },
          ],
    [lessons],
  );

  return (
    <div className="relative mx-auto flex min-h-screen flex-col items-center overflow-hidden bg-gradient-to-br from-[#e0f2f1] via-[#f0f9ff] to-[#e8f5e9] px-4 py-8 md:px-8">
      {/* Decorative Math/Science Elements - Left Side */}
      <div className="pointer-events-none absolute top-20 left-0 hidden opacity-20 lg:block">
        <div className="space-y-8 text-6xl text-[#1e88e5]">
          <div className="rotate-12">∑</div>
          <div className="-rotate-6">π</div>
          <div className="rotate-6">√</div>
          <div className="-rotate-12">∫</div>
          <div className="rotate-12">α</div>
        </div>
      </div>

      {/* Decorative Chemistry Elements - Right Side */}
      <div className="pointer-events-none absolute top-40 right-0 hidden opacity-20 lg:block">
        <div className="space-y-8 text-5xl text-[#43a047]">
          <div className="-rotate-12">H₂O</div>
          <div className="rotate-6">CO₂</div>
          <div className="-rotate-6">E=mc²</div>
          <div className="rotate-12">⚛️</div>
          <div className="-rotate-12">🧪</div>
        </div>
      </div>

      {/* Ruler decoration - Bottom */}
      <div className="pointer-events-none absolute right-0 bottom-0 left-0 hidden h-8 border-t-4 border-[#1e88e5] opacity-30 md:block">
        <div className="flex h-full items-end justify-around">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="w-0.5 bg-[#1e88e5]"
              style={{ height: i % 5 === 0 ? '100%' : '50%' }}
            />
          ))}
        </div>
      </div>

      {/* Header Section */}
      <div className="relative z-10 w-full py-8 text-center md:py-12">
        <div className="mb-4 flex items-center justify-center gap-3">
          <span className="text-5xl">🔬</span>
          <h1 className="font-roboto text-4xl font-bold text-[#1e88e5] md:text-5xl">
            Khoa học Tự nhiên
          </h1>
          <span className="text-5xl">🧬</span>
        </div>
        <p className="font-roboto mb-6 text-lg text-[#2e7d32] md:text-xl">
          Khám phá thế giới Toán - Lý - Hóa - Sinh
        </p>
      </div>

      {/* Results Section */}
      <div className="relative z-10 w-full max-w-7xl">
        {loading ? (
          <div className="mt-12 text-center">
            <div className="mx-auto mb-6 inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-[#1e88e5] border-r-transparent"></div>
            <p className="text-xl text-[#2e7d32]">Đang tải bài học...</p>
          </div>
        ) : (
          <>
            <div className="mb-6 text-left">
              <p className="font-roboto text-lg text-[#2e7d32]">
                Có <span className="font-bold text-[#1e88e5]">{allLessons.length}</span> bài học
              </p>
            </div>

            {/* Lesson Grid */}
            <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
              {allLessons.map((lesson) => (
                <LessonCard key={lesson.id} lesson={lesson} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

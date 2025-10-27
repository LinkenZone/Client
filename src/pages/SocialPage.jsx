import { useMemo } from 'react';
import LessonCard from '../components/LessonCard';

export default function SocialPage() {
  // Dữ liệu bài học Xã hội (Sử, Địa, GDCD, Văn)
  const allLessons = useMemo(
    () => [
      {
        id: 1,
        title: 'Lịch sử Việt Nam',
        description: 'Lịch sử dân tộc Việt Nam qua các thời kỳ',
        rating: 4.5,
        image: null,
        category: 'social',
        subject: 'sử',
      },
      {
        id: 2,
        title: 'Lịch sử thế giới',
        description: 'Các sự kiện lịch sử quan trọng thế giới',
        rating: 4.7,
        image: null,
        category: 'social',
        subject: 'sử',
      },
      {
        id: 3,
        title: 'Địa lý Việt Nam',
        description: 'Tìm hiểu đất nước và con người Việt Nam',
        rating: 4.6,
        image: null,
        category: 'social',
        subject: 'địa',
      },
      {
        id: 4,
        title: 'Địa lý thế giới',
        description: 'Nghiên cứu các quốc gia và châu lục',
        rating: 4.8,
        image: null,
        category: 'social',
        subject: 'địa',
      },
      {
        id: 5,
        title: 'Văn học Việt Nam',
        description: 'Tìm hiểu văn học Việt Nam qua các thời kỳ',
        rating: 4.6,
        image: null,
        category: 'social',
        subject: 'văn',
      },
      {
        id: 6,
        title: 'Văn học thế giới',
        description: 'Các tác phẩm văn học nổi tiếng thế giới',
        rating: 4.9,
        image: null,
        category: 'social',
        subject: 'văn',
      },
      {
        id: 7,
        title: 'Giáo dục công dân',
        description: 'Kiến thức về đạo đức và pháp luật',
        rating: 4.4,
        image: null,
        category: 'social',
        subject: 'gdcd',
      },
      {
        id: 8,
        title: 'Kinh tế chính trị',
        description: 'Tìm hiểu về kinh tế và chính trị xã hội',
        rating: 4.5,
        image: null,
        category: 'social',
        subject: 'ktct',
      },
    ],
    []
  );


  return (
    <div className="relative mx-auto flex min-h-screen flex-col items-center overflow-hidden bg-gradient-to-br from-[#fff3e0] via-[#fef5e7] to-[#fce4ec] px-4 py-8 md:px-8">
      {/* Decorative History/Culture Elements - Left Side */}
      <div className="pointer-events-none absolute left-0 top-20 hidden text-7xl opacity-20 lg:block">
        <div className="space-y-8">
          <div className="rotate-12">🏛️</div>
          <div className="-rotate-6">📚</div>
          <div className="rotate-6">🗺️</div>
          <div className="-rotate-12">⚖️</div>
        </div>
      </div>

      {/* Decorative Social Elements - Right Side */}
      <div className="pointer-events-none absolute right-0 top-40 hidden text-7xl opacity-20 lg:block">
        <div className="space-y-8">
          <div className="-rotate-12">🌍</div>
          <div className="rotate-6">📖</div>
          <div className="-rotate-6">🏺</div>
          <div className="rotate-12">✍️</div>
        </div>
      </div>

      {/* Decorative border pattern */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 hidden h-12 border-t-4 border-[#d84315] opacity-30 md:block">
        <div className="flex h-full items-center justify-around">
          {[...Array(15)].map((_, i) => (
            <div key={i} className="text-2xl text-[#d84315]">
              {i % 3 === 0 ? '◆' : i % 3 === 1 ? '◇' : '◈'}
            </div>
          ))}
        </div>
      </div>

      {/* Header Section */}
      <div className="relative z-10 w-full py-8 text-center md:py-12">
        <div className="mb-4 flex items-center justify-center gap-3">
          <span className="text-5xl">📚</span>
          <h1 className="font-roboto text-4xl font-bold text-[#d84315] md:text-5xl">
            Khoa học Xã hội
          </h1>
          <span className="text-5xl">🌏</span>
        </div>
        <p className="font-roboto mb-6 text-lg text-[#bf360c] md:text-xl">
          Khám phá Lịch sử - Địa lý - Văn học - Xã hội
        </p>
      </div>

      {/* Results Section */}
      <div className="relative z-10 w-full max-w-7xl">
        <div className="mb-6 text-left">
          <p className="font-roboto text-lg text-[#bf360c]">
            Có <span className="font-bold text-[#d84315]">{allLessons.length}</span> bài học
          </p>
        </div>

        {/* Lesson Grid */}
        <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          {allLessons.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} />
          ))}
        </div>
      </div>
    </div>
  );
}

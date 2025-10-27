import { useState, useMemo, useRef, useEffect } from 'react';
import LessonCard from '../components/LessonCard';

export default function LessonPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  // Dữ liệu mẫu - sau này sẽ lấy từ API
  const allLessons = useMemo(
    () => [
      {
        id: 1,
        title: 'Toán lớp 1',
        description: 'Học toán cơ bản cho học sinh lớp 1',
        rating: 4.5,
        image: null,
        category: 'toán',
      },
      {
        id: 2,
        title: 'Toán lớp 2',
        description: 'Các bài toán nâng cao cho lớp 2',
        rating: 4.8,
        image: null,
        category: 'toán',
      },
      {
        id: 3,
        title: 'Toán cao cấp',
        description: 'Toán học đại học và cao học',
        rating: 4.9,
        image: null,
        category: 'toán',
      },
      {
        id: 4,
        title: 'Văn học Việt Nam',
        description: 'Tìm hiểu văn học Việt Nam qua các thời kỳ',
        rating: 4.6,
        image: null,
        category: 'văn',
      },
      {
        id: 5,
        title: 'Vật lý đại cương',
        description: 'Kiến thức vật lý cơ bản',
        rating: 4.7,
        image: null,
        category: 'lý',
      },
      {
        id: 6,
        title: 'Hóa học hữu cơ',
        description: 'Tìm hiểu về hợp chất hữu cơ',
        rating: 4.4,
        image: null,
        category: 'hóa',
      },
      {
        id: 7,
        title: 'Lịch sử Việt Nam',
        description: 'Lịch sử dân tộc Việt Nam',
        rating: 4.5,
        image: null,
        category: 'sử',
      },
      {
        id: 8,
        title: 'Tiếng Anh cơ bản',
        description: 'Học tiếng Anh từ đầu',
        rating: 4.8,
        image: null,
        category: 'anh',
      },
    ],
    []
  );

  // Lọc bài học theo từ khóa tìm kiếm
  const filteredLessons = useMemo(() => {
    if (!searchTerm.trim()) return allLessons;
    const term = searchTerm.toLowerCase();
    return allLessons.filter(
      (lesson) =>
        lesson.title.toLowerCase().includes(term) ||
        lesson.description.toLowerCase().includes(term) ||
        lesson.category.toLowerCase().includes(term)
    );
  }, [searchTerm, allLessons]);

  // Gợi ý nhanh (chỉ hiển thị khi đang gõ)
  const suggestions = useMemo(() => {
    if (!searchTerm.trim() || searchTerm.length < 2) return [];
    const term = searchTerm.toLowerCase();
    return allLessons
      .filter(
        (lesson) =>
          lesson.title.toLowerCase().includes(term) ||
          lesson.category.toLowerCase().includes(term)
      )
      .slice(0, 5); // Chỉ hiển thị tối đa 5 gợi ý
  }, [searchTerm, allLessons]);

  // Đóng suggestions khi click bên ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (lesson) => {
    setSearchTerm(lesson.title);
    setShowSuggestions(false);
  };

  return (
    <div className="mx-auto flex min-h-screen flex-col items-center bg-gradient-to-b from-[#e6f2ff] to-[#fdfdfd] px-4 py-8 md:px-8">
      {/* Header Section */}
      <div className="w-full py-8 text-center md:py-12">
        <h1 className="font-roboto mb-6 text-3xl font-bold text-[#1e3a8a] md:mb-8 md:text-4xl">
          Tìm kiếm các bài giảng bạn cần tại đây
        </h1>

        {/* Search Box with Suggestions */}
        <div ref={searchRef} className="relative mx-auto w-full max-w-4xl">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={() => setShowSuggestions(true)}
            placeholder={searchTerm ? '' : 'Chưa có bài nào được tìm kiếm'}
            className="w-full rounded-full border-2 border-[#53ccec] bg-white px-6 py-4 text-base text-[#1e3a8a] shadow-lg outline-none transition-all duration-300 placeholder:text-center placeholder:text-[#999] focus:border-[#4AA4FF] focus:shadow-xl md:px-8 md:py-5 md:text-lg"
          />

          {/* Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute left-0 right-0 top-full z-10 mt-2 max-h-80 overflow-y-auto rounded-2xl border border-[#e5e5e5] bg-white shadow-2xl">
              {suggestions.map((lesson) => (
                <div
                  key={lesson.id}
                  onClick={() => handleSuggestionClick(lesson)}
                  className="cursor-pointer border-b border-[#f0f0f0] px-6 py-4 transition-all hover:bg-[#f8f9fa] last:border-b-0"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🔍</span>
                    <div className="flex-1 text-left">
                      <p className="font-roboto font-semibold text-[#1e3a8a]">{lesson.title}</p>
                      <p className="font-roboto text-sm text-gray-600">{lesson.description}</p>
                    </div>
                    <span className="text-sm text-gray-500">⭐ {lesson.rating}/5</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Results Section */}
      <div className="w-full max-w-7xl">
        {filteredLessons.length === 0 ? (
          <div className="mt-20 text-center">
            <div className="mx-auto mb-4 text-6xl">🔍</div>
            <p className="font-roboto text-xl text-gray-600">
              Không tìm thấy bài học nào phù hợp với "{searchTerm}"
            </p>
            <p className="font-roboto mt-2 text-sm text-gray-500">
              Thử tìm kiếm với từ khóa khác
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6 text-left">
              <p className="font-roboto text-lg text-gray-700">
                Tìm thấy <span className="font-bold text-[#4AA4FF]">{filteredLessons.length}</span>{' '}
                bài học
                {searchTerm && (
                  <>
                    {' '}
                    cho "<span className="font-semibold text-[#1e3a8a]">{searchTerm}</span>"
                  </>
                )}
              </p>
            </div>

            {/* Lesson Grid - Responsive */}
            <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
              {filteredLessons.map((lesson) => (
                <LessonCard key={lesson.id} lesson={lesson} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

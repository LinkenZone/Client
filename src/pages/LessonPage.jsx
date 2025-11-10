import { useEffect, useRef, useState } from 'react';
import LessonCard from '../components/LessonCard';
import { api } from '../services/api';

export default function LessonPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchRef = useRef(null);

  // Fetch lessons từ API
  useEffect(() => {
    const fetchLessons = async (query = '') => {
      setLoading(true);
      try {
        const isSearch = query.trim() !== '';
        const endpoint = isSearch
          ? `/document/search?q=${encodeURIComponent(query)}`
          : `/document/approved-documents`;

        const res = await api.get(endpoint);
        setLessons(res.data.data.documents || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLessons(searchTerm);
  }, [searchTerm]);

  // // Lọc bài học theo category và từ khóa
  // const filteredLessons = useMemo(() => {
  //   let filtered = lessons;

  //   // Lọc theo category
  //   if (selectedCategory !== 'all') {
  //     filtered = filtered.filter((lesson) => lesson.category === selectedCategory);
  //   }

  //   // Lọc theo từ khóa tìm kiếm
  //   if (searchTerm.trim()) {
  //     const term = searchTerm.toLowerCase();
  //     filtered = filtered.filter(
  //       (lesson) =>
  //         lesson.title.toLowerCase().includes(term) ||
  //         lesson.description.toLowerCase().includes(term) ||
  //         lesson.subject.toLowerCase().includes(term),
  //     );
  //   }

  //   return filtered;
  // }, [searchTerm, selectedCategory, allLessons]);

  // Gợi ý nhanh
  // const suggestions = useMemo(() => {
  //   if (!searchTerm.trim() || searchTerm.length < 2) return [];
  //   const term = searchTerm.toLowerCase();
  //   return lessons
  //     .filter(
  //       (lesson) =>
  //         lesson.title.toLowerCase().includes(term) || lesson.subject.toLowerCase().includes(term),
  //     )
  //     .slice(0, 5);
  // }, [searchTerm, lessons]);

  // Đóng suggestions khi click bên ngoài
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (searchRef.current && !searchRef.current.contains(event.target)) {
  //       setShowSuggestions(false);
  //     }
  //   };
  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => document.removeEventListener('mousedown', handleClickOutside);
  // }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (lesson) => {
    setSearchTerm(lesson.title);
    setShowSuggestions(false);
  };

  const categories = [
    { id: 'all', name: 'Tất cả', icon: '📚', color: 'from-[#667eea] to-[#764ba2]' },
    { id: 'natural', name: 'Tự nhiên', icon: '🔬', color: 'from-[#1e88e5] to-[#4db6ac]' },
    { id: 'social', name: 'Xã hội', icon: '🌏', color: 'from-[#d84315] to-[#ff8a65]' },
    { id: 'language', name: 'Ngoại ngữ', icon: '🗣️', color: 'from-[#43a047] to-[#66bb6a]' },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#f0f9ff] via-white to-[#f0f9ff]">
      {/* Decorative Background Elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[10%] left-[5%] h-64 w-64 rounded-full bg-[#4AA4FF]/10 blur-3xl" />
        <div className="absolute top-[30%] right-[10%] h-80 w-80 rounded-full bg-[#d84315]/10 blur-3xl" />
        <div className="absolute bottom-[20%] left-[15%] h-72 w-72 rounded-full bg-[#43a047]/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="text-5xl">🔍</span>
            <h1 className="font-roboto text-4xl font-bold text-[#1e3a8a] md:text-5xl">
              Tìm kiếm bài giảng
            </h1>
            <span className="text-5xl">📖</span>
          </div>
          <p className="font-roboto text-lg text-gray-600 md:text-xl">
            Khám phá hàng ngàn bài giảng chất lượng cao
          </p>
        </div>

        {/* Search Box */}
        <div ref={searchRef} className="relative mx-auto mb-12 w-full max-w-4xl">
          <div className="relative">
            <span className="absolute top-1/2 left-6 z-10 -translate-y-1/2 text-2xl">🔍</span>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={() => setShowSuggestions(true)}
              placeholder="Tìm kiếm bài học theo tên, môn học, nội dung..."
              className="w-full rounded-full border-2 border-[#4AA4FF] bg-white py-5 pr-6 pl-16 text-base text-[#1e3a8a] shadow-xl transition-all duration-300 outline-none placeholder:text-[#999] focus:border-[#667eea] focus:shadow-2xl md:py-6 md:text-lg"
            />
          </div>

          {/* Suggestions Dropdown */}
          {/* {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full right-0 left-0 z-20 mt-3 max-h-96 overflow-y-auto rounded-2xl border border-[#e5e5e5] bg-white shadow-2xl">
              <div className="p-2">
                {suggestions.map((lesson) => (
                  <div
                    key={lesson.document_id}
                    onClick={() => handleSuggestionClick(lesson)}
                    className="cursor-pointer rounded-xl px-6 py-4 transition-all hover:bg-gradient-to-r hover:from-[#f0f9ff] hover:to-[#e6f2ff]"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-3xl">
                        {lesson.category === 'natural'
                          ? '�'
                          : lesson.category === 'social'
                            ? '🌏'
                            : '🗣️'}
                      </span>
                      <div className="flex-1 text-left">
                        <p className="font-roboto font-semibold text-[#1e3a8a]">{lesson.title}</p>
                        <p className="font-roboto text-sm text-gray-600"></p>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500">⭐</span>
                        <span className="font-semibold text-gray-700"></span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )} */}
        </div>

        {/* Category Filter */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`group relative overflow-hidden rounded-full px-8 py-4 font-semibold shadow-lg transition-all hover:scale-105 hover:shadow-xl ${
                  selectedCategory === cat.id
                    ? `bg-gradient-to-r ${cat.color} text-white`
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span className="text-2xl">{cat.icon}</span>
                  <span>{cat.name}</span>
                  {selectedCategory === cat.id && (
                    <span className="ml-2 rounded-full bg-white/30 px-2 py-0.5 text-xs">
                      {lessons.length}
                    </span>
                  )}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Results Section */}
        {loading ? (
          <div className="mt-20 text-center">
            <div className="mx-auto mb-6 inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-[#4AA4FF] border-r-transparent"></div>
            <p className="font-roboto text-xl text-gray-600">Đang tải bài học...</p>
          </div>
        ) : lessons.length === 0 ? (
          <div className="mt-20 text-center">
            <div className="mx-auto mb-6 text-8xl">�</div>
            <h3 className="font-roboto mb-4 text-2xl font-bold text-gray-700">
              Không tìm thấy bài học nào
            </h3>
            {searchTerm ? (
              <>
                <p className="font-roboto mb-2 text-lg text-gray-600">
                  Không có kết quả cho "{searchTerm}"
                </p>
                <p className="font-roboto text-sm text-gray-500">
                  Thử tìm kiếm với từ khóa khác hoặc chọn danh mục khác
                </p>
              </>
            ) : (
              <p className="font-roboto text-lg text-gray-600">
                Chưa có bài học nào trong danh mục này
              </p>
            )}
          </div>
        ) : (
          <>
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="font-roboto text-xl font-semibold text-gray-700">
                  <span className="text-[#4AA4FF]">{lessons.length}</span> bài học
                  {searchTerm && (
                    <span className="ml-2 text-base font-normal text-gray-500">
                      cho "<span className="font-semibold text-[#1e3a8a]">{searchTerm}</span>"
                    </span>
                  )}
                </p>
              </div>
            </div>

            {/* Lesson Grid */}
            <div className="grid w-full grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
              {lessons.map((lesson) => (
                <LessonCard key={lesson.document_id} lesson={lesson} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

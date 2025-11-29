import { useEffect, useRef, useState } from 'react';
import LessonListItem from '../components/LessonListItem';
import { useDebounce } from '../hooks/useDebounce';
import { api } from '../services/api';

export default function LessonPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [lessons, setLessons] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;
  const [loading, setLoading] = useState(true);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const searchRef = useRef(null);

  // Fetch lessons từ API
  useEffect(() => {
    const fetchLessons = async (query = '', page, limit) => {
      setLoading(true);
      try {
        const isSearch = query.trim() !== '';
        const endpoint = isSearch
          ? `/document/search?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`
          : `/document/approved-documents?page=${page}&limit=${limit}`;

        const res = await api.get(endpoint);
        setLessons(res.data.data.documents || []);
        setTotalPages(res.data.data.totalPages || 1);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLessons(debouncedSearchTerm, page, limit);
  }, [debouncedSearchTerm, page]);

  const approvedLessons = lessons.filter((lesson) => lesson.status === 'approved');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  function nextPage() {
    if (page < totalPages) setPage(page + 1);
  }

  function prevPage() {
    if (page > 1) setPage(page - 1);
  }

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
              placeholder="Tìm kiếm bài học theo tên, môn học, nội dung..."
              className="w-full rounded-full border-2 border-[#4AA4FF] bg-white py-5 pr-6 pl-16 text-base text-[#1e3a8a] shadow-xl transition-all duration-300 outline-none placeholder:text-[#999] focus:border-[#667eea] focus:shadow-2xl md:py-6 md:text-lg"
            />
          </div>
        </div>

        {/* Results Section */}
        {loading ? (
          <div className="mt-20 text-center">
            <div className="mx-auto mb-6 inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-[#4AA4FF] border-r-transparent"></div>
            <p className="font-roboto text-xl text-gray-600">Đang tải bài học...</p>
          </div>
        ) : approvedLessons.length === 0 ? (
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
                  <span className="text-[#4AA4FF]">{approvedLessons.length}</span> kết quả tìm kiếm
                  {searchTerm && (
                    <span className="ml-2 text-base font-normal text-gray-500">
                      cho "<span className="font-semibold text-[#1e3a8a]">{searchTerm}</span>"
                    </span>
                  )}
                </p>
              </div>
            </div>

            {/* Lesson List */}
            <div className="flex flex-col gap-3">
              {approvedLessons.map((lesson) => (
                <LessonListItem key={lesson.document_id} lesson={lesson} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 md:px-8">
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={prevPage}
              disabled={page === 1}
              className="group relative flex items-center gap-2 rounded-full bg-white px-6 py-3 font-medium text-[#1e3a8a] shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#4AA4FF] hover:text-white hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100 disabled:hover:bg-white disabled:hover:text-[#1e3a8a]"
            >
              <span className="text-xl">←</span>
              <span className="font-roboto">Trang trước</span>
            </button>

            <div className="flex items-center gap-2 rounded-full bg-white px-8 py-3 shadow-lg">
              <span className="font-roboto text-lg font-bold text-[#4AA4FF]">{page}</span>
              <span className="font-roboto text-lg text-gray-400">/</span>
              <span className="font-roboto text-lg font-semibold text-gray-600">{totalPages}</span>
            </div>

            <button
              onClick={nextPage}
              disabled={page === totalPages}
              className="group relative flex items-center gap-2 rounded-full bg-white px-6 py-3 font-medium text-[#1e3a8a] shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#4AA4FF] hover:text-white hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100 disabled:hover:bg-white disabled:hover:text-[#1e3a8a]"
            >
              <span className="font-roboto">Trang sau</span>
              <span className="text-xl">→</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

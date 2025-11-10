// components/UserResourcePage/TopBar/index.jsx
import { Filter, LayoutGrid, List, Search, X } from 'lucide-react';
import { useState } from 'react';

export default function TopBar({ viewMode, onViewModeChange, onSearchChange, searchTerm }) {
  const [showFilter, setShowFilter] = useState(false);
  const [filterType, setFilterType] = useState('all'); // all, pdf, doc, ppt, excel

  const handleSearchInput = (e) => {
    onSearchChange(e.target.value);
  };

  const handleClearSearch = () => {
    onSearchChange('');
  };

  const handleFilterClick = () => {
    setShowFilter(!showFilter);
  };

  const handleFilterChange = (type) => {
    setFilterType(type);
    // You can add filter logic here if needed
    setShowFilter(false);
  };

  return (
    <div className="sticky top-0 z-40 border-b border-gray-200 bg-white p-4">
      <div className="flex items-center justify-between">
        {/* Search Bar */}
        <div className="relative max-w-2xl flex-1">
          <div className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2.5">
            <Search className="h-5 w-5 text-gray-500" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên tài liệu..."
              value={searchTerm}
              onChange={handleSearchInput}
              className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-500 outline-none"
            />
            {searchTerm && (
              <button
                onClick={handleClearSearch}
                className="rounded-full p-1 transition-colors hover:bg-gray-200"
                title="Xóa tìm kiếm"
              >
                <X className="h-4 w-4 text-gray-500" />
              </button>
            )}
            <button
              onClick={handleFilterClick}
              className="rounded-lg p-1 transition-colors hover:bg-gray-200"
              title="Bộ lọc"
            >
              <Filter className="h-5 w-5 cursor-pointer text-gray-500 hover:text-gray-700" />
            </button>
          </div>

          {/* Filter Dropdown */}
          {showFilter && (
            <div className="absolute top-full left-0 z-50 mt-2 w-64 rounded-lg border border-gray-200 bg-white py-2 shadow-lg">
              <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">
                Lọc theo loại file
              </div>
              <button
                onClick={() => handleFilterChange('all')}
                className={`w-full px-4 py-2 text-left text-sm transition-colors hover:bg-gray-50 ${
                  filterType === 'all' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                }`}
              >
                📄 Tất cả file
              </button>
              <button
                onClick={() => handleFilterChange('pdf')}
                className={`w-full px-4 py-2 text-left text-sm transition-colors hover:bg-gray-50 ${
                  filterType === 'pdf' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                }`}
              >
                📕 PDF
              </button>
              <button
                onClick={() => handleFilterChange('doc')}
                className={`w-full px-4 py-2 text-left text-sm transition-colors hover:bg-gray-50 ${
                  filterType === 'doc' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                }`}
              >
                📘 Word
              </button>
              <button
                onClick={() => handleFilterChange('ppt')}
                className={`w-full px-4 py-2 text-left text-sm transition-colors hover:bg-gray-50 ${
                  filterType === 'ppt' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                }`}
              >
                📙 PowerPoint
              </button>
              <button
                onClick={() => handleFilterChange('excel')}
                className={`w-full px-4 py-2 text-left text-sm transition-colors hover:bg-gray-50 ${
                  filterType === 'excel' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                }`}
              >
                📗 Excel
              </button>
            </div>
          )}
        </div>

        {/* View Toggle */}
        <div className="ml-4 flex items-center gap-2">
          <button
            onClick={() => onViewModeChange('grid')}
            className={`rounded-lg p-2 transition-colors ${
              viewMode === 'grid' ? 'bg-gray-200' : 'hover:bg-gray-100'
            }`}
            title="Xem dạng lưới"
          >
            <LayoutGrid className="h-5 w-5 text-gray-700" />
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            className={`rounded-lg p-2 transition-colors ${
              viewMode === 'list' ? 'bg-gray-200' : 'hover:bg-gray-100'
            }`}
            title="Xem dạng danh sách"
          >
            <List className="h-5 w-5 text-gray-700" />
          </button>
        </div>
      </div>
    </div>
  );
}

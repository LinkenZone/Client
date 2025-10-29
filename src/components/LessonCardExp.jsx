import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import noPict from '../assets/no_pic.png';

function LessonCardExp({ lesson, onClose }) {
    const navigate = useNavigate();

    //Ngăn chặn cuộn trang khi mở LessonCardExp và ẩn header
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        // Ẩn header khi modal mở
        const header = document.querySelector('header');
        if (header) {
            header.style.zIndex = '0';
        }
        
        return () => {
            document.body.style.overflow = 'unset';
            // Khôi phục header khi modal đóng
            if (header) {
                header.style.zIndex = '50';
            }
        }
    }, []);

    // Đóng LessonCardExp khi nhấn phím Escape
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    const handleStartLearning = () => {
        navigate(`/lesson/${lesson._id}`);
    };

    return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative mx-4 flex w-full max-w-2xl animate-scale-in flex-col overflow-hidden rounded-[35px] border border-[#e5e5e5] bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-2xl font-bold text-gray-700 shadow-lg transition-all hover:bg-white hover:text-black"
          aria-label="Close"
        >
          ×
        </button>

        {/* Image */}
        <div className="flex h-[300px] w-full items-center justify-center overflow-hidden bg-[#f0f0f0]">
          <img
            className="h-full w-full object-cover"
            src={lesson.image || noPict}
            alt={lesson.image ? lesson.title : 'No Image Available'}
          />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-4 p-6 bg-[#ecfdf5] border-[#d1fae5] border-t">
          <h2 className="font-roboto text-3xl font-bold text-black">{lesson.title}</h2>
          <p className="font-roboto text-lg text-gray-700">{lesson.description}</p>
          <div className="flex items-center gap-2">
            <span className="text-2xl">⭐</span>
            <span className="font-roboto text-xl font-semibold text-[#333]">
              {lesson.rating}/5
            </span>
          </div>

          {/* Action buttons */}
          <div className="mt-4 flex gap-3">
            <button 
              onClick={handleStartLearning}
              className="flex-1 rounded-full border-2 border-[#4AA4FF] bg-white px-6 py-3 font-roboto font-semibold text-[#4AA4FF] transition-all hover:bg-[#4AA4FF] hover:text-white"
            >
              Bắt đầu học
            </button>
            <button className="flex-1 rounded-full border-2 border-[#4AA4FF] bg-white px-6 py-3 font-roboto font-semibold text-[#4AA4FF] transition-all hover:bg-[#4AA4FF] hover:text-white">
              Thêm vào yêu thích
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}   

export default LessonCardExp;
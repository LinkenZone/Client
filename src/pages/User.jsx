import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import LessonCard from "../components/LessonCard";
import { lessonService } from "../services/api";
import avatar from "../assets/avatar_ic.jpg";

export default function UserPage() {
  const { user } = useAuth();
  const [recentLessons, setRecentLessons] = useState([]);
  const [favoriteLessons, setFavoriteLessons] = useState([]);
  const [uploadedLessons, setUploadedLessons] = useState([]);
  const [dragActive, setDragActive] = useState(false);

  // Mock data cho các bài đã đăng tải
  const mockUploadedLessons = [
    { id: 1, name: "Bài học Toán học cơ bản", status: "approved" },
    { id: 2, name: "Hướng dẫn Vật lý", status: "pending" },
    { id: 3, name: "Khoa học tự nhiên", status: "rejected" },
    { id: 4, name: "Sinh học phân tử", status: "approved" },
    { id: 5, name: "Hóa học hữu cơ", status: "pending" },
    { id: 6, name: "Địa lý thế giới", status: "approved" },
    { id: 7, name: "Lịch sử Việt Nam", status: "rejected" },
    { id: 8, name: "Văn học cổ điển", status: "approved" },
    { id: 9, name: "Tiếng Anh giao tiếp", status: "pending" },
    { id: 10, name: "Tin học căn bản", status: "approved" },
    { id: 11, name: "Toán cao cấp", status: "pending" },
    { id: 12, name: "Vật lý đại cương", status: "approved" },
  ];

  useEffect(() => {
    let mounted = true;
    lessonService.getRecentLessons(user).then((list) => {
      if (mounted) {
        setRecentLessons(list || []);
        setFavoriteLessons(list?.slice(0, 3) || []);
        setUploadedLessons(mockUploadedLessons);
      }
    });
    return () => {
      mounted = false;
    };
  }, [user]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files) => {
    console.log("Files uploaded:", files);
    // TODO: Handle file upload
  };

  const getStatusText = (status) => {
    switch (status) {
      case "approved":
        return "Đã duyệt";
      case "pending":
        return "Chờ duyệt";
      case "rejected":
        return "Từ chối";
      default:
        return "Không xác định";
    }
  };

  const getStatusClasses = (status) => {
    switch (status) {
      case "approved":
        return "bg-[#d4edda] text-[#155724]";
      case "pending":
        return "bg-[#fff3cd] text-[#856404]";
      case "rejected":
        return "bg-[#f8d7da] text-[#721c24]";
      default:
        return "bg-gray-200 text-gray-600";
    }
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-200px)] max-w-[1400px] flex-col gap-6 pt-[120px] lg:flex-row">
      <aside className="h-fit w-full rounded-xl bg-[#f8f9fa] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.1)] lg:sticky lg:top-[180px] lg:w-[280px]">
        <div className="mb-8 flex items-center gap-4 border-b border-[#e9ecef] pb-6 lg:block lg:text-center">
          <img
            src={avatar}
            alt="Avatar"
            className="h-20 w-20 rounded-full border-3 border-[#4AA4FF] object-cover lg:mb-3"
          />
          <h3 className="m-0 text-xl font-semibold text-[#333]">
            {user?.username || "Người dùng"}
          </h3>
        </div>
        <nav>
          <ul className="flex flex-wrap gap-2 lg:flex-col">
            <li className="flex cursor-pointer items-center rounded-lg px-4 py-3 font-medium text-[#666] transition-all duration-300 hover:bg-[#4AA4FF] hover:text-white">
              <span className="mr-3 text-lg">🔔</span>
              Thông báo
            </li>
            <li className="flex cursor-pointer items-center rounded-lg px-4 py-3 font-medium text-[#666] transition-all duration-300 hover:bg-[#4AA4FF] hover:text-white">
              <span className="mr-3 text-lg">👤</span>
              Tài khoản của tôi
            </li>
            <li className="flex cursor-pointer items-center rounded-lg px-4 py-3 font-medium text-[#666] transition-all duration-300 hover:bg-[#4AA4FF] hover:text-white">
              <span className="mr-3 text-lg">⚙️</span>
              Cài đặt
            </li>
          </ul>
        </nav>
      </aside>

      <main className="flex-1 p-5">
        {/* Section các bài học đã đăng tải */}
        <section className="mb-6 rounded-xl bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
          <h2 className="mb-5 border-b-2 border-[#4AA4FF] pb-2 text-2xl font-semibold text-[#333]">
            Các bài học đã đăng tải
          </h2>
          <div className="max-h-[400px] overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-sm [&::-webkit-scrollbar-thumb]:bg-[#4AA4FF] [&::-webkit-scrollbar-thumb:hover]:bg-[#3590E6] [&::-webkit-scrollbar-track]:rounded-sm [&::-webkit-scrollbar-track]:bg-[#f1f1f1]">
            {uploadedLessons.length > 0 ? (
              <div className="flex flex-col gap-3">
                {uploadedLessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="flex flex-col justify-between rounded-lg border-l-4 border-[#dee2e6] bg-[#f8f9fa] p-4 transition-all duration-300 hover:translate-x-1 hover:bg-[#e9ecef] md:flex-row md:items-center"
                  >
                    <span className="flex-1 font-medium text-[#333]">
                      {lesson.name}
                    </span>
                    <span
                      className={`mt-2 rounded-full px-3 py-1 text-sm font-semibold tracking-wider uppercase md:mt-0 ${getStatusClasses(lesson.status)}`}
                    >
                      {getStatusText(lesson.status)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="p-10 text-center text-[#666] italic">
                Chưa có bài học nào được đăng tải
              </p>
            )}
          </div>
        </section>

        {/* Section upload file */}
        <section className="mb-6 rounded-xl bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
          <h2 className="mb-5 border-b-2 border-[#4AA4FF] pb-2 text-2xl font-semibold text-[#333]">
            Đăng tải bài giảng mới
          </h2>
          <div
            className={`cursor-pointer rounded-xl border-2 border-dashed border-[#dee2e6] bg-[#f8f9fa] p-10 text-center transition-all duration-300 ${
              dragActive
                ? "border-[#4AA4FF] bg-[#e3f2fd]"
                : "hover:border-[#4AA4FF] hover:bg-[#e3f2fd]"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              id="fileUpload"
              className="hidden"
              multiple={true}
              onChange={handleChange}
            />
            <label htmlFor="fileUpload" className="block cursor-pointer">
              <div className="mb-4 text-5xl">📁</div>
              <p className="mb-2 text-lg text-[#333]">
                Kéo thả file vào đây hoặc{" "}
                <span className="font-semibold text-[#4AA4FF] underline">
                  chọn file
                </span>
              </p>
              <p className="m-0 text-sm text-[#666]">
                Hỗ trợ: PDF, DOC, PPT, MP4, ZIP
              </p>
            </label>
          </div>
        </section>

        {/* Section các bài học */}
        <section className="mb-6 rounded-xl bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
          <h2 className="mb-5 border-b-2 border-[#4AA4FF] pb-2 text-2xl font-semibold text-[#333]">
            Các bài học
          </h2>

          <div className="flex flex-col gap-8">
            <div className="border-t border-[#e9ecef] pt-6 first:border-t-0 first:pt-0">
              <h3 className="relative mb-4 pl-5 text-xl font-semibold text-[#444] before:absolute before:top-1/2 before:left-0 before:h-5 before:w-1 before:-translate-y-1/2 before:rounded-sm before:bg-[#4AA4FF]">
                Lịch sử xem
              </h3>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
                {recentLessons.map((lesson, i) => (
                  <LessonCard key={i} lesson={lesson} />
                ))}
              </div>
            </div>

            <div className="border-t border-[#e9ecef] pt-6">
              <h3 className="relative mb-4 pl-5 text-xl font-semibold text-[#444] before:absolute before:top-1/2 before:left-0 before:h-5 before:w-1 before:-translate-y-1/2 before:rounded-sm before:bg-[#4AA4FF]">
                Yêu thích
              </h3>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
                {favoriteLessons.map((lesson, i) => (
                  <LessonCard key={i} lesson={lesson} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

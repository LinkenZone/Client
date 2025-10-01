import React, { useState, useMemo } from "react";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("lessons");
  const [deleteModal, setDeleteModal] = useState({ show: false, lesson: null });
  const [deleteReason, setDeleteReason] = useState("");

  // Dữ liệu mẫu - sẽ được thay thế bằng API
  const pendingLessons = useMemo(() => [], []); // Hiện tại chưa có bài giảng cần duyệt
  const users = useMemo(() => [], []); // Hiện tại chưa có người dùng

  const handleApproveLesson = (lessonId) => {
    console.log("Approved lesson:", lessonId);
    // TODO: API call để duyệt bài học
  };

  const handleRejectLesson = (lessonId) => {
    console.log("Rejected lesson:", lessonId);
    // TODO: API call để từ chối bài học
  };

  const handleDeleteLesson = (lesson) => {
    setDeleteModal({ show: true, lesson });
  };

  const confirmDeleteLesson = () => {
    if (deleteReason.trim()) {
      console.log(
        "Deleted lesson:",
        deleteModal.lesson.id,
        "Reason:",
        deleteReason,
      );
      // TODO: API call để xóa bài học với lý do
      setDeleteModal({ show: false, lesson: null });
      setDeleteReason("");
    }
  };

  const cancelDelete = () => {
    setDeleteModal({ show: false, lesson: null });
    setDeleteReason("");
  };

  return (
    <div className="mx-auto min-h-screen max-w-[1400px] bg-[#f8f9fa] p-5">
      <div className="mb-10 rounded-2xl bg-gradient-to-br from-[#4AA4FF] to-[#5A6E7F] py-8 text-center text-white">
        <h1 className="m-0 mb-2.5 text-4xl font-bold">Quản trị hệ thống</h1>
        <p className="m-0 text-lg opacity-90">
          Quản lý người dùng và duyệt bài học
        </p>
      </div>

      <div className="mx-auto mb-10 flex max-w-[400px] justify-center rounded-xl bg-white p-2 shadow-[0_2px_12px_rgba(0,0,0,0.1)]">
        <button
          className={`flex-1 cursor-pointer rounded-lg border-none px-5 py-3 text-sm font-medium transition-all duration-300 ${
            activeTab === "lessons"
              ? "bg-[#4AA4FF] text-white"
              : "bg-transparent text-[#666] hover:bg-[#f8f9fa] hover:text-[#333]"
          }`}
          onClick={() => setActiveTab("lessons")}
        >
          📚 Duyệt bài học
        </button>
        <button
          className={`flex-1 cursor-pointer rounded-lg border-none px-5 py-3 text-sm font-medium transition-all duration-300 ${
            activeTab === "users"
              ? "bg-[#4AA4FF] text-white"
              : "bg-transparent text-[#666] hover:bg-[#f8f9fa] hover:text-[#333]"
          }`}
          onClick={() => setActiveTab("users")}
        >
          👥 Quản lý người dùng
        </button>
      </div>

      {activeTab === "lessons" && (
        <div className="rounded-2xl bg-white p-8 shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
          <div className="mb-8 flex items-center gap-4 border-b-2 border-[#f0f0f0] pb-4">
            <h2 className="m-0 text-2xl font-semibold text-[#333]">
              Bài học chờ duyệt
            </h2>
            <span className="rounded-full bg-[#4AA4FF] px-3 py-1 text-sm font-semibold text-white">
              {pendingLessons.length}
            </span>
          </div>

          {pendingLessons.length === 0 ? (
            <div className="px-5 py-20 text-center text-[#666]">
              <div className="mb-5 text-6xl">📝</div>
              <h3 className="mb-2.5 text-2xl text-[#333]">
                Hiện tại chưa có bài giảng cần duyệt
              </h3>
              <p className="mx-auto max-w-[400px] text-base leading-relaxed opacity-80">
                Tất cả bài học đã được xử lý hoặc chưa có bài học mới được gửi
                lên.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[repeat(auto-fill,minmax(400px,1fr))]">
              {pendingLessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="rounded-xl border border-[#e9ecef] bg-[#f8f9fa] p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_6px_25px_rgba(0,0,0,0.1)]"
                >
                  <div className="mb-4 flex items-start justify-between">
                    <h3 className="m-0 mr-4 flex-1 text-xl font-semibold text-[#333]">
                      {lesson.title}
                    </h3>
                    <span className="rounded-full border border-[#ffeaa7] bg-[#fff3cd] px-3 py-1 text-xs font-semibold text-[#856404]">
                      Chờ duyệt
                    </span>
                  </div>

                  <div className="mb-5">
                    <p className="my-2 text-[15px] text-[#555]">
                      <strong>Tác giả:</strong> {lesson.author}
                    </p>
                    <p className="my-2 text-[15px] text-[#555]">
                      <strong>Thể loại:</strong> {lesson.category}
                    </p>
                    <p className="my-2 text-[15px] text-[#555]">
                      <strong>Ngày tạo:</strong> {lesson.createdAt}
                    </p>
                    <p className="rounded-lg border-l-4 border-[#4AA4FF] bg-white p-3 italic">
                      {lesson.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2.5 md:flex-nowrap">
                    <button
                      className="cursor-pointer rounded-lg border border-[#c3e6cb] bg-[#d4edda] px-4 py-2 text-sm font-medium text-[#155724] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#c3e6cb]"
                      onClick={() => handleApproveLesson(lesson.id)}
                    >
                      ✅ Duyệt
                    </button>
                    <button
                      className="cursor-pointer rounded-lg border border-[#f5c6cb] bg-[#f8d7da] px-4 py-2 text-sm font-medium text-[#721c24] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#f5c6cb]"
                      onClick={() => handleRejectLesson(lesson.id)}
                    >
                      ❌ Từ chối
                    </button>
                    <button
                      className="cursor-pointer rounded-lg border border-[#ffccdd] bg-[#ffe6e6] px-4 py-2 text-sm font-medium text-[#d63384] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#ffccdd]"
                      onClick={() => handleDeleteLesson(lesson)}
                    >
                      🗑️ Xóa
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "users" && (
        <div className="rounded-2xl bg-white p-8 shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
          <div className="mb-8 flex items-center gap-4 border-b-2 border-[#f0f0f0] pb-4">
            <h2 className="m-0 text-2xl font-semibold text-[#333]">
              Danh sách người dùng
            </h2>
            <span className="rounded-full bg-[#4AA4FF] px-3 py-1 text-sm font-semibold text-white">
              {users.length}
            </span>
          </div>

          {users.length === 0 ? (
            <div className="px-5 py-20 text-center text-[#666]">
              <div className="mb-5 text-6xl">👤</div>
              <h3 className="mb-2.5 text-2xl text-[#333]">
                Hiện tại chưa có người dùng
              </h3>
              <p className="mx-auto max-w-[400px] text-base leading-relaxed opacity-80">
                Hệ thống chưa có người dùng nào đăng ký.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-0 overflow-hidden rounded-xl border border-[#e9ecef]">
              <div className="grid gap-5 bg-[#4AA4FF] p-4 px-5 text-[15px] font-semibold text-white lg:grid-cols-[1fr_1.2fr_1fr_0.8fr_0.8fr]">
                <div>Tên người dùng</div>
                <div>Email</div>
                <div>Ngày đăng ký</div>
                <div>Trạng thái</div>
                <div>Thao tác</div>
              </div>
              {users.map((user) => (
                <div
                  key={user.id}
                  className="grid items-center gap-5 border-b border-[#e9ecef] p-4 px-5 transition-colors duration-200 hover:bg-[#f8f9fa] lg:grid-cols-[1fr_1.2fr_1fr_0.8fr_0.8fr]"
                >
                  <div>{user.username}</div>
                  <div>{user.email}</div>
                  <div>{user.joinDate}</div>
                  <div>
                    <span
                      className={`inline-block rounded-full px-2.5 py-1 text-center text-xs font-semibold ${
                        user.status === "active"
                          ? "bg-[#d4edda] text-[#155724]"
                          : "bg-[#f8d7da] text-[#721c24]"
                      }`}
                    >
                      {user.status === "active" ? "Hoạt động" : "Bị khóa"}
                    </span>
                  </div>
                  <div>
                    <button className="cursor-pointer rounded-md border-none bg-[#4AA4FF] px-3 py-1.5 text-sm text-white transition-colors duration-300 hover:bg-[#3590E6]">
                      Quản lý
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Delete Modal */}
      {deleteModal.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-5 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-[500px] overflow-y-auto rounded-2xl bg-white shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
            <div className="flex items-center justify-between p-8 pb-5">
              <h3 className="m-0 text-2xl text-[#333]">Xóa bài học</h3>
              <button
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-none bg-transparent p-0 text-2xl text-[#999] transition-all duration-300 hover:bg-[#f0f0f0] hover:text-[#666]"
                onClick={cancelDelete}
              >
                ×
              </button>
            </div>

            <div className="px-8">
              <p className="mb-5 text-base leading-relaxed text-[#555]">
                Bạn có chắc chắn muốn xóa bài học{" "}
                <strong>"{deleteModal.lesson?.title}"</strong>?
              </p>

              <div className="mb-6">
                <label className="mb-2 block font-semibold text-[#333]">
                  Lý do xóa:
                </label>
                <textarea
                  value={deleteReason}
                  onChange={(e) => setDeleteReason(e.target.value)}
                  placeholder="Nhập lý do xóa bài học này..."
                  rows={4}
                  className="font-inherit box-border w-full resize-y rounded-lg border-2 border-[#e9ecef] p-3 text-[15px] transition-colors duration-300 outline-none placeholder:text-[#999] focus:border-[#4AA4FF]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 p-6">
              <button
                className="cursor-pointer rounded-lg border border-[#e9ecef] bg-[#f8f9fa] px-5 py-2.5 text-[15px] font-medium text-[#666] transition-all duration-300 hover:bg-[#e9ecef] hover:text-[#333]"
                onClick={cancelDelete}
              >
                Hủy
              </button>
              <button
                className="cursor-pointer rounded-lg border-none bg-[#dc3545] px-5 py-2.5 text-[15px] font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#c82333] disabled:transform-none disabled:cursor-not-allowed disabled:bg-gray-400"
                onClick={confirmDeleteLesson}
                disabled={!deleteReason.trim()}
              >
                Xác nhận xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;

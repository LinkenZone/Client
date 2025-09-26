import React, { useState, useMemo } from 'react';
import styles from './AdminPage.module.css';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('lessons');
  const [deleteModal, setDeleteModal] = useState({ show: false, lesson: null });
  const [deleteReason, setDeleteReason] = useState('');

  // Dữ liệu mẫu - sẽ được thay thế bằng API
  const pendingLessons = useMemo(() => [], []); // Hiện tại chưa có bài giảng cần duyệt
  const users = useMemo(() => [], []); // Hiện tại chưa có người dùng

  const handleApproveLesson = (lessonId) => {
    console.log('Approved lesson:', lessonId);
    // TODO: API call để duyệt bài học
  };

  const handleRejectLesson = (lessonId) => {
    console.log('Rejected lesson:', lessonId);
    // TODO: API call để từ chối bài học
  };

  const handleDeleteLesson = (lesson) => {
    setDeleteModal({ show: true, lesson });
  };

  const confirmDeleteLesson = () => {
    if (deleteReason.trim()) {
      console.log('Deleted lesson:', deleteModal.lesson.id, 'Reason:', deleteReason);
      // TODO: API call để xóa bài học với lý do
      setDeleteModal({ show: false, lesson: null });
      setDeleteReason('');
    }
  };

  const cancelDelete = () => {
    setDeleteModal({ show: false, lesson: null });
    setDeleteReason('');
  };

  return (
    <div className={styles.adminPage}>
      <div className={styles.adminHeader}>
        <h1 className={styles.pageTitle}>Quản trị hệ thống</h1>
        <p className={styles.pageSubtitle}>Quản lý người dùng và duyệt bài học</p>
      </div>

      <div className={styles.tabContainer}>
        <button 
          className={`${styles.tab} ${activeTab === 'lessons' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('lessons')}
        >
          📚 Duyệt bài học
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'users' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('users')}
        >
          👥 Quản lý người dùng
        </button>
      </div>

      {activeTab === 'lessons' && (
        <div className={styles.tabContent}>
          <div className={styles.sectionHeader}>
            <h2>Bài học chờ duyệt</h2>
            <span className={styles.badge}>{pendingLessons.length}</span>
          </div>

          {pendingLessons.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>📝</div>
              <h3>Hiện tại chưa có bài giảng cần duyệt</h3>
              <p>Tất cả bài học đã được xử lý hoặc chưa có bài học mới được gửi lên.</p>
            </div>
          ) : (
            <div className={styles.lessonGrid}>
              {pendingLessons.map((lesson) => (
                <div key={lesson.id} className={styles.lessonCard}>
                  <div className={styles.lessonHeader}>
                    <h3 className={styles.lessonTitle}>{lesson.title}</h3>
                    <span className={styles.statusBadge}>Chờ duyệt</span>
                  </div>
                  
                  <div className={styles.lessonInfo}>
                    <p><strong>Tác giả:</strong> {lesson.author}</p>
                    <p><strong>Thể loại:</strong> {lesson.category}</p>
                    <p><strong>Ngày tạo:</strong> {lesson.createdAt}</p>
                    <p className={styles.description}>{lesson.description}</p>
                  </div>

                  <div className={styles.actionButtons}>
                    <button 
                      className={styles.approveBtn}
                      onClick={() => handleApproveLesson(lesson.id)}
                    >
                      ✅ Duyệt
                    </button>
                    <button 
                      className={styles.rejectBtn}
                      onClick={() => handleRejectLesson(lesson.id)}
                    >
                      ❌ Từ chối
                    </button>
                    <button 
                      className={styles.deleteBtn}
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

      {activeTab === 'users' && (
        <div className={styles.tabContent}>
          <div className={styles.sectionHeader}>
            <h2>Danh sách người dùng</h2>
            <span className={styles.badge}>{users.length}</span>
          </div>

          {users.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>👤</div>
              <h3>Hiện tại chưa có người dùng</h3>
              <p>Hệ thống chưa có người dùng nào đăng ký.</p>
            </div>
          ) : (
            <div className={styles.userTable}>
              <div className={styles.tableHeader}>
                <div>Tên người dùng</div>
                <div>Email</div>
                <div>Ngày đăng ký</div>
                <div>Trạng thái</div>
                <div>Thao tác</div>
              </div>
              {users.map((user) => (
                <div key={user.id} className={styles.tableRow}>
                  <div>{user.username}</div>
                  <div>{user.email}</div>
                  <div>{user.joinDate}</div>
                  <div>
                    <span className={`${styles.userStatus} ${styles[user.status]}`}>
                      {user.status === 'active' ? 'Hoạt động' : 'Bị khóa'}
                    </span>
                  </div>
                  <div>
                    <button className={styles.userActionBtn}>Quản lý</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Delete Modal */}
      {deleteModal.show && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h3>Xóa bài học</h3>
              <button className={styles.closeBtn} onClick={cancelDelete}>×</button>
            </div>
            
            <div className={styles.modalContent}>
              <p>Bạn có chắc chắn muốn xóa bài học <strong>"{deleteModal.lesson?.title}"</strong>?</p>
              
              <div className={styles.reasonInput}>
                <label>Lý do xóa:</label>
                <textarea
                  value={deleteReason}
                  onChange={(e) => setDeleteReason(e.target.value)}
                  placeholder="Nhập lý do xóa bài học này..."
                  rows={4}
                />
              </div>
            </div>
            
            <div className={styles.modalActions}>
              <button className={styles.cancelBtn} onClick={cancelDelete}>
                Hủy
              </button>
              <button 
                className={styles.confirmDeleteBtn} 
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
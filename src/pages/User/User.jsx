import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import LessonCard from '../../components/LessonCard/LessonCard';
import { lessonService } from '../../services/api';
import styles from './User.module.css';
import avatar from '../../assets/avatar_ic.jpg';

export default function UserPage() {
  const { user } = useAuth();
  const [recentLessons, setRecentLessons] = useState([]);
  const [favoriteLessons, setFavoriteLessons] = useState([]);
  const [uploadedLessons, setUploadedLessons] = useState([]);
  const [dragActive, setDragActive] = useState(false);

  // Mock data cho các bài đã đăng tải
  const mockUploadedLessons = [
    { id: 1, name: 'Bài học Toán học cơ bản', status: 'approved' },
    { id: 2, name: 'Hướng dẫn Vật lý', status: 'pending' },
    { id: 3, name: 'Khoa học tự nhiên', status: 'rejected' },
    { id: 4, name: 'Sinh học phân tử', status: 'approved' },
    { id: 5, name: 'Hóa học hữu cơ', status: 'pending' },
    { id: 6, name: 'Địa lý thế giới', status: 'approved' },
    { id: 7, name: 'Lịch sử Việt Nam', status: 'rejected' },
    { id: 8, name: 'Văn học cổ điển', status: 'approved' },
    { id: 9, name: 'Tiếng Anh giao tiếp', status: 'pending' },
    { id: 10, name: 'Tin học căn bản', status: 'approved' },
    { id: 11, name: 'Toán cao cấp', status: 'pending' },
    { id: 12, name: 'Vật lý đại cương', status: 'approved' }
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
    return () => { mounted = false; };
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
    console.log('Files uploaded:', files);
    // TODO: Handle file upload
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'approved': return 'Đã duyệt';
      case 'pending': return 'Chờ duyệt';
      case 'rejected': return 'Từ chối';
      default: return 'Không xác định';
    }
  };

  return (
    <div className={styles.userPage}>
      <aside className={styles.sidebar}>
        <div className={styles.userProfile}>
          <img src={avatar} alt="Avatar" className={styles.profileAvatar} />
          <h3 className={styles.profileName}>{user?.username || 'Người dùng'}</h3>
        </div>
        <nav className={styles.sidebarNav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <span className={styles.navIcon}>🔔</span>
              Thông báo
            </li>
            <li className={styles.navItem}>
              <span className={styles.navIcon}>👤</span>
              Tài khoản của tôi
            </li>
            <li className={styles.navItem}>
              <span className={styles.navIcon}>⚙️</span>
              Cài đặt
            </li>
          </ul>
        </nav>
      </aside>

      <main className={styles.mainContent}>
        {/* Section các bài học đã đăng tải */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Các bài học đã đăng tải</h2>
          <div className={styles.uploadedLessonsContainer}>
            {uploadedLessons.length > 0 ? (
              <div className={styles.uploadedLessonsList}>
                {uploadedLessons.map((lesson) => (
                  <div key={lesson.id} className={styles.uploadedLessonItem}>
                    <span className={styles.lessonName}>{lesson.name}</span>
                    <span className={`${styles.lessonStatus} ${styles[lesson.status]}`}>
                      {getStatusText(lesson.status)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className={styles.emptyMessage}>Chưa có bài học nào được đăng tải</p>
            )}
          </div>
        </section>

        {/* Section upload file */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Đăng tải bài giảng mới</h2>
          <div 
            className={`${styles.uploadArea} ${dragActive ? styles.dragActive : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              id="fileUpload"
              className={styles.fileInput}
              multiple={true}
              onChange={handleChange}
            />
            <label htmlFor="fileUpload" className={styles.uploadLabel}>
              <div className={styles.uploadIcon}>📁</div>
              <p className={styles.uploadText}>
                Kéo thả file vào đây hoặc <span className={styles.browseText}>chọn file</span>
              </p>
              <p className={styles.uploadHint}>Hỗ trợ: PDF, DOC, PPT, MP4, ZIP</p>
            </label>
          </div>
        </section>

        {/* Section các bài học */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Các bài học</h2>
          
          <div className={styles.lessonsContainer}>
            <div className={styles.lessonSubsection}>
              <h3 className={styles.subsectionTitle}>Lịch sử xem</h3>
              <div className={styles.recentLessonsGrid}>
                {recentLessons.map((lesson, i) => (
                  <LessonCard key={i} lesson={lesson} />
                ))}
              </div>
            </div>

            <div className={styles.lessonSubsection}>
              <h3 className={styles.subsectionTitle}>Yêu thích</h3>
              <div className={styles.recentLessonsGrid}>
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

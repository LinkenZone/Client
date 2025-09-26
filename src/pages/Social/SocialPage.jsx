import React, { useMemo } from 'react';
import LessonCard from '../../components/LessonCard/LessonCard';
import styles from './SocialPage.module.css';

export default function SocialPage() {
  const lessons = useMemo(() => [], []); // Hiện tại chưa có bài học

  return (
    <div className={styles.socialPage}>
      <div className={styles.heroSection}>
        <h1 className={styles.pageTitle}>Xã hội</h1>
        <div className={styles.searchBar}>
          <input 
            type="text" 
            placeholder="Tìm kiếm bài học Xã hội..." 
            className={styles.searchInput}
          />
        </div>
      </div>

      {lessons.length === 0 ? (
        <p className={styles.noLesson}>Hiện tại chưa có bài học</p>
      ) : (
        <div className={styles.lessonList}>
          {lessons.map((l, idx) => (
            <LessonCard key={idx} lesson={l} />
          ))}
        </div>
      )}
    </div>
  );
}

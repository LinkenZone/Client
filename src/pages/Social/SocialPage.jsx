import React, { useMemo } from 'react';
import Hero from '../../components/Hero/Hero';
import LessonCard from '../../components/LessonCard/LessonCard';
import noPict from '../../assets/no_pic.png';
import './SocialPage.css';

export default function SocialPage() {
  const lessons = useMemo(() => [], []); // Hiện tại chưa có bài học

  return (
    <div className="social-page">
      <Hero imageUrl={noPict} />

      <div className="hero-section">
        <h1 className="page-title">Xã hội</h1>
        <div className="search-bar">
          <input type="text" placeholder="Tìm kiếm bài học Xã hội..." />
        </div>
      </div>

      {lessons.length === 0 ? (
        <p className="no-lesson">Hiện tại chưa có bài học</p>
      ) : (
        <div className="lesson-list">
          {lessons.map((l, idx) => (
            <LessonCard key={idx} lesson={l} />
          ))}
        </div>
      )}
    </div>
  );
}

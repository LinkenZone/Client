import React, { useMemo } from 'react';
import Hero from '../../components/Hero/Hero';
import LessonCard from '../../components/LessonCard/LessonCard';
import noPict from '../../assets/no_pic.png';
import './NaturalPage.css';

export default function NaturalPage() {
  const lessons = useMemo(() => [], []); // Hiện tại chưa có bài học

  return (
    <div className="natural-page">
      <Hero imageUrl={noPict} />

      <div className="hero-section">
        <h1 className="page-title">Tự nhiên</h1>
        <div className="search-bar">
          <input type="text" placeholder="Tìm kiếm bài học Tự nhiên..." />
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

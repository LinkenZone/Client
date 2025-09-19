import React from 'react';
import LessonCard from '../../components/LessonCard/LessonCard';
import styles from './Home.module.css';
import noPict from '../../assets/no_pic.png';
import Hero from "../../components/Hero/Hero";

const infoImg = null; // Thay bằng đường dẫn ảnh nếu có

export default function Home() {
  const finalImage = infoImg || noPict;

  return (
    <div className={styles.home}>
      <Hero imageUrl={finalImage} />

      <div className={styles.homeContent}>
        <h1>Trang chính LinkenZone</h1>
        <p>Chào mừng bạn đến với trang chính của hệ thống học tập LinkenZone!</p>

        <div className={styles.lessonList}>
          <LessonCard lesson={{ title: "Bài học 1", description: "Mô tả bài học 1", rating: 4.5 }} />
          <LessonCard lesson={{ title: "Bài học 2", description: "Mô tả bài học 2", rating: 4.0 }} />
          <LessonCard lesson={{ title: "Bài học 3", description: "Mô tả bài học 3", rating: 5.0 }} />
        </div>
      </div>
    </div>
  );
}
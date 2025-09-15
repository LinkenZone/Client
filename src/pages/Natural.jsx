import React from 'react';
import './Natural.css';
import { motion } from 'framer-motion';

const naturalSubjects = [
  {
    name: 'Toán',
    image: '/images/toan.jpg',
    summary: 'Các bài giảng Toán học từ cơ bản đến nâng cao.',
    rating: 4.8,
    reviews: 120
  },
  {
    name: 'Lý',
    image: '/images/ly.jpg',
    summary: 'Khám phá kiến thức Vật lý qua các bài giảng chất lượng.',
    rating: 4.6,
    reviews: 98
  },
  {
    name: 'Hóa',
    image: '/images/hoa.jpg',
    summary: 'Bài giảng Hóa học, thực hành và lý thuyết.',
    rating: 4.7,
    reviews: 85
  },
  {
    name: 'Sinh',
    image: '/images/sinh.jpg',
    summary: 'Kiến thức Sinh học, bài giảng và thực nghiệm.',
    rating: 4.5,
    reviews: 70
  }
];

const Natural = () => {
  const isEmpty = naturalSubjects.length === 0;
  return (
    <motion.section className="natural" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
      <h2>Chủ đề Tự nhiên</h2>
      <div className="search-filter-bar">
        <input className="search-input" type="text" placeholder="Tìm kiếm bài giảng..." />
        <select className="filter-select">
          <option value="">Tất cả môn học</option>
          <option value="toan">Toán</option>
          <option value="ly">Lý</option>
          <option value="hoa">Hóa</option>
          <option value="sinh">Sinh</option>
        </select>
      </div>
      {isEmpty ? (
        <motion.div className="no-lessons" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
          Hiện tại chưa có bài học.
        </motion.div>
      ) : (
        <div className="subjects-list">
          {naturalSubjects.map((subject, idx) => (
            <motion.div className="subject-card" key={idx} whileHover={{ scale: 1.05 }}>
              <img src={subject.image} alt={subject.name} className="subject-image" />
              <div className="subject-info">
                <h3>{subject.name}</h3>
                <p>{subject.summary}</p>
              </div>
              <div className="subject-rating">
                <span>⭐ {subject.rating} / 5</span>
                <span>({subject.reviews} đánh giá)</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.section>
  );
};

export default Natural;

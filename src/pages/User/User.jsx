import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import LessonCard from '../../components/LessonCard/LessonCard';
import { lessonService } from '../../services/api';

export default function UserPage() {
  const { user } = useAuth();
  const [recentLessons, setRecentLessons] = useState([]);

  useEffect(() => {
    let mounted = true;
    lessonService.getRecentLessons(user).then((list) => {
      if (mounted) setRecentLessons(list || []);
    });
    return () => { mounted = false; };
  }, [user]);

  return (
    <div style={{ maxWidth: 1200, margin: '120px auto', padding: '0 24px' }}>
      <h1>Xin chào, {user?.username || 'Người dùng'}</h1>

      <section>
        <h2>Xem gần đây</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
          {recentLessons.map((l, i) => (
            <LessonCard key={i} lesson={l} />
          ))}
        </div>
      </section>

      <section style={{ marginTop: 32 }}>
        <h2>Danh sách</h2>
        <ul>
          <li>Yêu thích</li>
          <li>Các bài toán</li>
          <li>Đã lưu</li>
        </ul>
      </section>
    </div>
  );
}

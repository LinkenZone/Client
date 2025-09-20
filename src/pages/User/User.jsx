import React, { useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import LessonCard from '../../components/LessonCard/LessonCard';

export default function UserPage() {
  const { user } = useAuth();

  // Demo recent lessons - in real app, load from storage or API
  const recentLessons = useMemo(() => [
    { title: 'Bài 1', description: 'Gần đây 1', rating: 4.5 },
    { title: 'Bài 2', description: 'Gần đây 2', rating: 4.0 },
    { title: 'Bài 3', description: 'Gần đây 3', rating: 5.0 },
    { title: 'Bài 4', description: 'Gần đây 4', rating: 4.2 },
    { title: 'Bài 5', description: 'Gần đây 5', rating: 3.9 },
  ], []);

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

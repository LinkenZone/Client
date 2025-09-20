import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const { setUser } = useAuth();
  const nav = useNavigate();
  const [username, setUsername] = useState('');

  function onSubmit(e) {
    e.preventDefault();
    if (!username.trim()) return;
    setUser({ username });
    nav('/user');
  }

  return (
    <div style={{ maxWidth: 480, margin: '120px auto', padding: 16 }}>
      <h1>Đăng nhập</h1>
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12 }}>
        <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Tên người dùng" />
        <button type="submit">Đăng nhập</button>
      </form>
      <p>Chưa có tài khoản? <Link to="/register">Đăng ký</Link></p>
    </div>
  );
}

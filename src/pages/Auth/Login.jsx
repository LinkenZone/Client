import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './Auth.module.css';

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [capsLockOn, setCapsLockOn] = useState(false);

  function onSubmit(e) {
    e.preventDefault();
    if (!username.trim()) return;
    
    login({ username, password }).then((data) => {
      // Nếu là admin, chuyển đến trang admin
      if (data?.user?.role === 'admin') {
        nav('/admin');
      } else {
        nav('/user');
      }
    });
  }

  function handlePasswordKeyPress(e) {
    const capsLock = e.getModifierState && e.getModifierState('CapsLock');
    setCapsLockOn(capsLock);
  }

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h1 className={styles.authTitle}>Đăng nhập</h1>
        <form onSubmit={onSubmit} className={styles.authForm}>
          <input 
            className={styles.authInput}
            value={username} 
            onChange={e => setUsername(e.target.value)} 
            placeholder="Tên người dùng" 
          />
          <div className={styles.inputWrapper}>
            <input
              type="password"
              className={styles.authInput}
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={handlePasswordKeyPress}
              onKeyUp={handlePasswordKeyPress}
              placeholder="Mật khẩu"
            />
            {capsLockOn && (
              <div className={styles.capsLockWarning}>Caps Lock</div>
            )}
          </div>
          <button type="submit" className={styles.authButton}>Đăng nhập</button>
        </form>
        <p className={styles.authLink}>Chưa có tài khoản? <Link to="/register">Đăng ký</Link></p>
      </div>
    </div>
  );
}

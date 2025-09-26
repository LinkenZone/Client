import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './Auth.module.css';

export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [capsLockOnPassword, setCapsLockOnPassword] = useState(false);
  const [capsLockOnConfirm, setCapsLockOnConfirm] = useState(false);
  const [errors, setErrors] = useState({});

  function validateForm() {
    const newErrors = {};

    // Kiểm tra độ dài tên người dùng (tối thiểu 3 ký tự)
    if (username.trim().length < 3) {
      newErrors.username = 'Tên người dùng phải có ít nhất 3 ký tự';
    }

    // Kiểm tra độ dài mật khẩu (tối thiểu 8 ký tự)
    if (password.length < 8) {
      newErrors.password = 'Mật khẩu phải có ít nhất 8 ký tự';
    }

    // Kiểm tra xác nhận mật khẩu
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function onSubmit(e) {
    e.preventDefault();
    if (!validateForm()) return;
    register({ username, password }).then(() => nav('/user'));
  }

  function handlePasswordKeyPress(e) {
    const capsLock = e.getModifierState && e.getModifierState('CapsLock');
    setCapsLockOnPassword(capsLock);
  }

  function handleConfirmPasswordKeyPress(e) {
    const capsLock = e.getModifierState && e.getModifierState('CapsLock');
    setCapsLockOnConfirm(capsLock);
  }

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h1 className={styles.authTitle}>Đăng ký</h1>
        <form onSubmit={onSubmit} className={styles.authForm}>
          <div className={styles.inputWrapper}>
            <input 
              className={`${styles.authInput} ${errors.username ? styles.inputError : ''}`}
              value={username} 
              onChange={e => setUsername(e.target.value)} 
              placeholder="Tên người dùng" 
            />
            {errors.username && (
              <div className={styles.errorMessage}>{errors.username}</div>
            )}
          </div>
          <div className={styles.inputWrapper}>
            <input
              type="password"
              className={`${styles.authInput} ${errors.password ? styles.inputError : ''}`}
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={handlePasswordKeyPress}
              onKeyUp={handlePasswordKeyPress}
              placeholder="Mật khẩu"
            />
            {capsLockOnPassword && (
              <div className={styles.capsLockWarning}>Caps Lock</div>
            )}
            {errors.password && (
              <div className={styles.errorMessage}>{errors.password}</div>
            )}
          </div>
          <div className={styles.inputWrapper}>
            <input
              type="password"
              className={`${styles.authInput} ${errors.confirmPassword ? styles.inputError : ''}`}
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              onKeyDown={handleConfirmPasswordKeyPress}
              onKeyUp={handleConfirmPasswordKeyPress}
              placeholder="Xác nhận mật khẩu"
            />
            {capsLockOnConfirm && (
              <div className={styles.capsLockWarning}>Caps Lock</div>
            )}
            {errors.confirmPassword && (
              <div className={styles.errorMessage}>{errors.confirmPassword}</div>
            )}
          </div>
          <button type="submit" className={styles.authButton}>Đăng ký</button>
        </form>
        <p className={styles.authLink}>Đã có tài khoản? <Link to="/login">Đăng nhập</Link></p>
      </div>
    </div>
  );
}

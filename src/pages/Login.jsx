import React from 'react';
import './Login.css';
import { motion } from 'framer-motion';

const Login = () => (
  <motion.section className="login" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
    <h2>Đăng nhập LinkenZone</h2>
    <form className="login-form">
      <label>Email</label>
      <input type="email" placeholder="Nhập email" required />
      <label>Mật khẩu</label>
      <input type="password" placeholder="Nhập mật khẩu" required />
      <button type="submit">Đăng nhập</button>
      <a href="/forgot">Quên mật khẩu?</a>
    </form>
    <div className="login-theme">Chủ đề: Học hành, kết nối tri thức!</div>
  </motion.section>
);

export default Login;

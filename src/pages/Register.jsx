import React from 'react';
import './Register.css';
import { motion } from 'framer-motion';

const Register = () => (
  <motion.section className="register" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
    <h2>Bắt đầu học cùng LinkenZone</h2>
    <form className="register-form">
      <label>Họ và tên</label>
      <input type="text" placeholder="Nhập họ tên" required />
      <label>Email</label>
      <input type="email" placeholder="Nhập email" required />
      <label>Mật khẩu</label>
      <input type="password" placeholder="Tạo mật khẩu" required />
      <button type="submit">Đăng ký</button>
    </form>
    <div className="register-theme">Chủ đề: Bắt đầu học, khám phá tri thức!</div>
  </motion.section>
);

export default Register;

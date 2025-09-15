import React from 'react';
import './ForgotPassword.css';
import { motion } from 'framer-motion';

const ForgotPassword = () => (
  <motion.section className="forgot-password" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
    <h2>Quên mật khẩu?</h2>
    <form className="forgot-form">
      <label>Email</label>
      <input type="email" placeholder="Nhập email để lấy lại mật khẩu" required />
      <button type="submit">Gửi yêu cầu</button>
    </form>
    <div className="forgot-theme">Chủ đề: Bài khỏi giải, lấy lại quyền truy cập!</div>
  </motion.section>
);

export default ForgotPassword;

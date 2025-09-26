import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  const [message, setMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // TODO: Implement message sending functionality when backend is ready
      console.log('Message sent:', message);
      alert('Cảm ơn bạn đã gửi thắc mắc! Chúng tôi sẽ phản hồi sớm nhất có thể.');
      setMessage('');
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        {/* Left side - Navigation and info (1/3) */}
        <div className={styles.footerLeft}>
          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>Điều hướng</h3>
            <ul className={styles.footerNav}>
              <li><Link to="/" className={styles.footerLink}>Trang chủ</Link></li>
              <li><Link to="/lessons" className={styles.footerLink}>Bài học</Link></li>
              <li><Link to="/user" className={styles.footerLink}>Tài khoản</Link></li>
              <li><Link to="/about" className={styles.footerLink}>Giới thiệu</Link></li>
            </ul>
          </div>
          
          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>Liên hệ</h3>
            <p className={styles.footerEmail}>
              Email: <a href="mailto:contact@linkenzone.com" className={styles.footerLink}>contact@linkenzone.com</a>
            </p>
          </div>
          
          <div className={styles.footerSection}>
            <p className={styles.footerCopyright}>
              © 2025 LinkenZone. Tất cả quyền được bảo lưu.
            </p>
          </div>
        </div>

        {/* Right side - Message box (2/3) */}
        <div className={styles.footerRight}>
          <div className={styles.messageSection}>
            <h3 className={styles.footerTitle}>Có thắc mắc? Hãy nhắn cho chúng tôi!</h3>
            <form onSubmit={handleSendMessage} className={styles.messageForm}>
              <div className={styles.messageInputWrapper}>
                <textarea
                  className={styles.messageInput}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Nhập câu hỏi hoặc thắc mắc của bạn tại đây..."
                  rows={4}
                />
                <button 
                  type="submit" 
                  className={styles.sendButton}
                  disabled={!message.trim()}
                >
                  Gửi
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
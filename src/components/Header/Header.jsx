import React from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import style from "./Header.module.css";
import logo from "../../assets/LinkenZone_Logo.png";
import avatar from "../../assets/avatar_ic.jpg";
import { useAuth } from '../../context/AuthContext';

function Header() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const navMap = {
    "Giới thiệu": "intro",
    "Trang chính": "home",
    "Các bài học": "lesson",
    "Tự nhiên": "natural",
    "Xã hội": "social"
  };

  // Thêm link Admin nếu user là admin
  if (user && (user.role === 'admin' || user.username === 'admin')) {
    navMap["Quản trị"] = "admin";
  }

  return (
    <header className={style.header}>
      <div className={style.topBar}>
        <img className={style.logo} src={logo} alt="Logo" />
        <div className={style.userSection}>
          <div className={style.userName}>
            {user ? user.username : 'Khách'}
          </div>
          <img
            className={style.avatar}
            src={avatar}
            alt="Avatar"
            onClick={() => navigate(user ? '/user' : '/login')}
            style={{ cursor: 'pointer' }}
          />
        </div>
      </div>

      <nav className={style.nav}>
        {Object.entries(navMap).map(([label, slug]) => {
          return (
            <div key={label} className={style.navItem}>
              <NavLink
                to={`/${slug}`}
                className={({ isActive }) => `${style.navLink} ${isActive ? style.active : ""}`}
              >
                {label}
              </NavLink>
            </div>
          );
        })}
      </nav>
    </header>
  );
}

export default Header;
import React from "react";
import style from "./Header.module.css";
import logo from "../../assets/LinkenZone_Logo.png";
import avatar from "../../assets/avatar_ic.jpg";

function Header({ currentPage }) {
  const navMap = {
    "Giới thiệu": "intro",
    "Trang chính": "home",
    "Các bài học": "lesson",
    "Tự nhiên": "natural",
    "Xã hội": "social"
  };

  return (
    <header className={style.header}>
      <div className={style.topBar}>
        <img className={style.logo} src={logo} alt="Logo" />
        <div className={style.userSection}>
          <div className={style.userName}>Chào mừng bạn đến với LinkenZone</div>
          <img className={style.avatar} src={avatar} alt="Avatar" />
        </div>
      </div>

      <nav className={style.nav}>
        {Object.entries(navMap).map(([label, slug]) => {
          const isActive = currentPage === slug;
          return (
            <div key={label} className={style.navItem}>
              <a
                href={`/${slug}`}
                className={`${style.navLink} ${isActive ? style.active : ""}`}
              >
                {label}
              </a>
            </div>
          );
        })}
      </nav>
    </header>
  );
}

export default Header;
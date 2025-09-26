import React from 'react';
import './Header.css';
import logo from '../assets/LinkenZone_Logo.png';
import avatarDefault from '../assets/avatar_ic.jpg';

const Header = () => {
  // Giả sử chưa đăng nhập, dùng avatar mặc định
  const avatar = avatarDefault;
  return (
    <header className="header">
      <div className="logo-area">
        <img src={logo} alt="LinkenZone Logo" className="logo-img" />
      </div>
      <nav className="nav-contain">
        <a href="/">Intro</a>
        <a href="/home">Home</a>
        <a href="/natural">Tự nhiên</a>
        <a href="/social">Xã hội</a>
      </nav>
      <div className="avatar-area">
        <img src={avatar} alt="Avatar" className="avatar-img" />
      </div>
    </header>
  );
};

export default Header;

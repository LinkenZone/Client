import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { assets } from "../assets/assets";
import { AuthContext } from "../context/AuthContext";
import UserDropdown from "./UserDropdown";


function Header() {
  const { user } = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navMap = {
    'Giới thiệu': '',
    'Trang chính': 'home',
    'Tìm bài học': 'lesson',
    'Tự nhiên': 'natural',
    'Xã hội': 'social',
  };

  return (
    <header className="fixed left-0 top-0 z-50 w-full bg-gradient-to-r from-[#4AA4FF] via-[#6B8DD1] to-[#95B1CE] shadow-lg backdrop-blur-sm">
      <div className="mx-auto max-w-[1400px] px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img className="h-14 w-auto transition-transform hover:scale-105" src={assets.logo} alt="Logo" />
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-white">LinkenZone</h1>
              <p className="text-xs text-white/80">Nền tảng học tập trực tuyến</p>
            </div>
          </div>

          {/* User Info - Desktop */}
          <div className="hidden items-center gap-3 md:flex">
            <div className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-md">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-bold text-[#4AA4FF]">
                {user ? user.full_name.split(' ').pop()[0].toUpperCase() : 'K'}
              </div>
              <span className="text-sm font-semibold text-white">
                {user ? user.full_name.split(' ').pop() : 'Khách'}
              </span>
            </div>
            <UserDropdown
              avatarSrc={assets.avatar}
              avatarSize="h-11 w-11"
              showBorder={true}
            />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center justify-center rounded-lg bg-white/20 p-2 text-white backdrop-blur-md transition-all hover:bg-white/30 md:hidden"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Navigation Bar - Desktop */}
        <nav className="hidden items-center justify-center gap-2 pb-3 md:flex">
          {Object.entries(navMap).map(([label, slug]) => {
            return (
              <NavLink
                key={label}
                to={`/${slug}`}
                className={({ isActive }) =>
                  isActive
                    ? 'relative overflow-hidden rounded-xl bg-white px-6 py-2.5 text-center text-base font-semibold text-[#4AA4FF] shadow-lg transition-all duration-300'
                    : 'relative overflow-hidden rounded-xl bg-white/10 px-6 py-2.5 text-center text-base font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20 hover:shadow-lg'
                }
              >
                <span className="relative z-10">{label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="flex flex-col gap-2 pb-4 md:hidden">
            {Object.entries(navMap).map(([label, slug]) => {
              return (
                <NavLink
                  key={label}
                  to={`/${slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? 'rounded-xl bg-white px-4 py-3 text-center text-base font-semibold text-[#4AA4FF] shadow-lg transition-all duration-300'
                      : 'rounded-xl bg-white/10 px-4 py-3 text-center text-base font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20'
                  }
                >
                  {label}
                </NavLink>
              );
            })}
            {/* Mobile User Info */}
            <div className="mt-2 flex items-center justify-center gap-3 rounded-xl bg-white/10 px-4 py-3 backdrop-blur-md">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-base font-bold text-[#4AA4FF]">
                {user ? user.full_name.split(' ').pop()[0].toUpperCase() : 'K'}
              </div>
              <span className="text-base font-semibold text-white">
                {user ? user.full_name.split(' ').pop() : 'Khách'}
              </span>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;

import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { AuthContext } from "../context/AuthContext";
import UserDropdown from "./UserDropdown";


function Header() {
  const { user } = useContext(AuthContext);
  const navMap = {
    'Giới thiệu': '',
    'Trang chính': 'home',
    'Các bài học': 'lesson',
    'Tự nhiên': 'natural',
    'Xã hội': 'social',
  };

  return (
    <header className="fixed top-0 left-0 z-50 flex w-full flex-col gap-2 bg-[#95B1CE] px-3 pt-1.2 shadow-md">
      <div className="flex w-full items-center justify-between">
        <img className="w-36" src={assets.logo} alt="Logo" />
        <div className="flex items-center gap-2">
          <div className="rounded-md bg-[#FDFDFD] p-2 px-3 py-1 text-sm font-semibold text-[#333]">
            {user ? user.full_name.split(' ').pop() : 'Khách'}
          </div>
          <UserDropdown
            avatarSrc={assets.avatar}
            avatarSize="h-20 w-20"
            showBorder={true}
          />
        </div>
      </div>

      <nav className="mx-auto flex w-[80%] items-center justify-center rounded-t-4xl bg-[#F2F2F2]">
        {Object.entries(navMap).map(([label, slug]) => {
          return (
            <div key={label} className="flex flex-1 justify-center">
              <NavLink
                to={`/${slug}`}
                className={({ isActive }) =>
                  isActive
                    ? 'w-full rounded-t-4xl bg-[#4aa4ff] px-3 py-1 text-center text-[18px] whitespace-nowrap text-white transition duration-300'
                    : 'w-full rounded-t-4xl bg-transparent px-3 py-1 text-center text-[18px] whitespace-nowrap text-black transition duration-300 hover:bg-[#4aa4ff] hover:text-white'
                }
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

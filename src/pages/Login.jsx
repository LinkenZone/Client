import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [capsLockOn, setCapsLockOn] = useState(false);

  function onSubmit(e) {
    e.preventDefault();
    if (!username.trim()) return;

    login({ username, password }).then((data) => {
      // Nếu là admin, chuyển đến trang admin
      if (data?.user?.role === "admin") {
        nav("/admin");
      } else {
        nav("/user");
      }
    });
  }

  function handlePasswordKeyPress(e) {
    const capsLock = e.getModifierState && e.getModifierState("CapsLock");
    setCapsLockOn(capsLock);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#95B1CE] to-[#E6F2FF] p-5">
      <div className="w-full max-w-[480px] rounded-xl bg-white p-10 shadow-[0_8px_32px_rgba(0,0,0,0.1)] sm:p-6">
        <h1 className="mb-8 text-center text-3xl font-semibold text-[#333] sm:text-2xl">
          Đăng nhập
        </h1>
        <form onSubmit={onSubmit} className="mb-6 grid gap-4">
          <input
            className="box-border w-full rounded-lg border-2 border-[#E6F2FF] p-3 px-4 text-base transition-colors duration-300 outline-none placeholder:text-[#999] focus:border-[#4AA4FF]"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Tên người dùng"
          />
          <div className="relative">
            <input
              type="password"
              className="box-border w-full rounded-lg border-2 border-[#E6F2FF] p-3 px-4 text-base transition-colors duration-300 outline-none placeholder:text-[#999] focus:border-[#4AA4FF]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handlePasswordKeyPress}
              onKeyUp={handlePasswordKeyPress}
              placeholder="Mật khẩu"
            />
            {capsLockOn && (
              <div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 animate-[fadeIn_0.3s_ease] rounded bg-[#ff6b6b] px-2 py-1 text-xs font-medium whitespace-nowrap text-white">
                Caps Lock
              </div>
            )}
          </div>
          <button
            type="submit"
            className="cursor-pointer rounded-lg bg-[#4AA4FF] px-6 py-3 text-base font-semibold text-white transition-colors duration-300 hover:bg-[#3590E6] active:translate-y-[1px]"
          >
            Đăng nhập
          </button>
        </form>
        <p className="text-center text-sm text-[#666]">
          Chưa có tài khoản?{" "}
          <Link
            to="/register"
            className="font-medium text-[#4AA4FF] no-underline hover:underline"
          >
            Đăng ký
          </Link>
        </p>
      </div>
    </div>
  );
}

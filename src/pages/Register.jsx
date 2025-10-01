import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [capsLockOnPassword, setCapsLockOnPassword] = useState(false);
  const [capsLockOnConfirm, setCapsLockOnConfirm] = useState(false);
  const [errors, setErrors] = useState({});

  function validateForm() {
    const newErrors = {};

    // Kiểm tra độ dài tên người dùng (tối thiểu 3 ký tự)
    if (username.trim().length < 3) {
      newErrors.username = "Tên người dùng phải có ít nhất 3 ký tự";
    }

    // Kiểm tra độ dài mật khẩu (tối thiểu 8 ký tự)
    if (password.length < 8) {
      newErrors.password = "Mật khẩu phải có ít nhất 8 ký tự";
    }

    // Kiểm tra xác nhận mật khẩu
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function onSubmit(e) {
    e.preventDefault();
    if (!validateForm()) return;
    register({ username, password }).then(() => nav("/user"));
  }

  function handlePasswordKeyPress(e) {
    const capsLock = e.getModifierState && e.getModifierState("CapsLock");
    setCapsLockOnPassword(capsLock);
  }

  function handleConfirmPasswordKeyPress(e) {
    const capsLock = e.getModifierState && e.getModifierState("CapsLock");
    setCapsLockOnConfirm(capsLock);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#95B1CE] to-[#E6F2FF] p-5">
      <div className="w-full max-w-[480px] rounded-xl bg-white p-10 shadow-[0_8px_32px_rgba(0,0,0,0.1)] sm:p-6">
        <h1 className="mb-8 text-center text-3xl font-semibold text-[#333] sm:text-2xl">
          Đăng ký
        </h1>
        <form onSubmit={onSubmit} className="mb-6 grid gap-4">
          <div className="relative">
            <input
              className={`border-2 p-3 px-4 ${errors.username ? "border-[#ff4444] shadow-[0_0_0_2px_rgba(255,68,68,0.2)]" : "border-[#E6F2FF]"} box-border w-full rounded-lg text-base transition-colors duration-300 outline-none placeholder:text-[#999] focus:border-[#4AA4FF]`}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Tên người dùng"
            />
            {errors.username && (
              <div className="absolute top-[calc(100%+5px)] left-0 z-10 rounded-lg border border-[#ff4444] bg-white/95 px-2 py-1 text-xs font-medium whitespace-nowrap text-[#ff4444]">
                {errors.username}
              </div>
            )}
          </div>
          <div className="relative">
            <input
              type="password"
              className={`border-2 p-3 px-4 ${errors.password ? "border-[#ff4444] shadow-[0_0_0_2px_rgba(255,68,68,0.2)]" : "border-[#E6F2FF]"} box-border w-full rounded-lg text-base transition-colors duration-300 outline-none placeholder:text-[#999] focus:border-[#4AA4FF]`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handlePasswordKeyPress}
              onKeyUp={handlePasswordKeyPress}
              placeholder="Mật khẩu"
            />
            {capsLockOnPassword && (
              <div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 animate-[fadeIn_0.3s_ease] rounded bg-[#ff6b6b] px-2 py-1 text-xs font-medium whitespace-nowrap text-white">
                Caps Lock
              </div>
            )}
            {errors.password && (
              <div className="absolute top-[calc(100%+5px)] left-0 z-10 rounded-lg border border-[#ff4444] bg-white/95 px-2 py-1 text-xs font-medium whitespace-nowrap text-[#ff4444]">
                {errors.password}
              </div>
            )}
          </div>
          <div className="relative">
            <input
              type="password"
              className={`border-2 p-3 px-4 ${errors.confirmPassword ? "border-[#ff4444] shadow-[0_0_0_2px_rgba(255,68,68,0.2)]" : "border-[#E6F2FF]"} box-border w-full rounded-lg text-base transition-colors duration-300 outline-none placeholder:text-[#999] focus:border-[#4AA4FF]`}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onKeyDown={handleConfirmPasswordKeyPress}
              onKeyUp={handleConfirmPasswordKeyPress}
              placeholder="Xác nhận mật khẩu"
            />
            {capsLockOnConfirm && (
              <div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 animate-[fadeIn_0.3s_ease] rounded bg-[#ff6b6b] px-2 py-1 text-xs font-medium whitespace-nowrap text-white">
                Caps Lock
              </div>
            )}
            {errors.confirmPassword && (
              <div className="absolute top-[calc(100%+5px)] left-0 z-10 rounded-lg border border-[#ff4444] bg-white/95 px-2 py-1 text-xs font-medium whitespace-nowrap text-[#ff4444]">
                {errors.confirmPassword}
              </div>
            )}
          </div>
          <button
            type="submit"
            className="cursor-pointer rounded-lg bg-[#4AA4FF] px-6 py-3 text-base font-semibold text-white transition-colors duration-300 hover:bg-[#3590E6] active:translate-y-[1px]"
          >
            Đăng ký
          </button>
        </form>
        <p className="text-center text-sm text-[#666]">
          Đã có tài khoản?{" "}
          <Link
            to="/login"
            className="font-medium text-[#4AA4FF] no-underline hover:underline"
          >
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
}

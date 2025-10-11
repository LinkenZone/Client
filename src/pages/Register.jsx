import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../services/api";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    role: "user",
  });

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    if (!isValidEmail(form.email)) {
      toast.error("Email không hợp lệ. Vui lòng nhập lại!");
      return;
    }

    if (form.password.length < 6) {
      toast.error("Mật khẩu phải có ít nhất 6 ký tự!");
      return;
    }

    try {
      await api.post("/auth/register", form);
      toast.success("Đăng ký thành công!");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Đăng ký thất bại!");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#95B1CE] to-[#E6F2FF] p-5">
      <div className="w-full max-w-[480px] rounded-xl bg-white p-10 shadow-[0_8px_32px_rgba(0,0,0,0.1)] sm:p-6">
        <h1 className="mb-8 text-center text-3xl font-semibold text-[#333] sm:text-2xl">
          Đăng ký
        </h1>
        <form onSubmit={handleSubmit} className="mb-6 grid gap-4">
          <div className="relative">
            <input
              className={`box-border w-full rounded-lg border-2 border-[#E6F2FF] p-3 px-4 text-base transition-colors duration-300 outline-none placeholder:text-[#999] focus:border-[#4AA4FF]`}
              onChange={handleChange}
              name="name"
              placeholder="Họ và tên"
            />
          </div>
          <div className="relative">
            <input
              className={`box-border w-full rounded-lg border-2 border-[#E6F2FF] p-3 px-4 text-base transition-colors duration-300 outline-none placeholder:text-[#999] focus:border-[#4AA4FF]`}
              onChange={handleChange}
              name="email"
              placeholder="Email"
            />
          </div>
          <div className="relative">
            <input
              type="password"
              className={`box-border w-full rounded-lg border-2 border-[#E6F2FF] p-3 px-4 text-base transition-colors duration-300 outline-none placeholder:text-[#999] focus:border-[#4AA4FF]`}
              onChange={handleChange}
              name="password"
              placeholder="Mật khẩu"
            />
          </div>
          <div className="relative">
            <input
              type="password"
              className={`box-border w-full rounded-lg border-2 border-[#E6F2FF] p-3 px-4 text-base transition-colors duration-300 outline-none placeholder:text-[#999] focus:border-[#4AA4FF]`}
              onChange={handleChange}
              name="passwordConfirm"
              placeholder="Xác nhận mật khẩu"
            />
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

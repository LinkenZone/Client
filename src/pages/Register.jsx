import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { api } from '../services/api';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    role: 'user',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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
      toast.error('Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    if (!isValidEmail(form.email)) {
      toast.error('Email không hợp lệ. Vui lòng nhập lại!');
      return;
    }

    if (form.password.length < 6) {
      toast.error('Mật khẩu phải có ít nhất 6 ký tự!');
      return;
    }

    try {
      await api.post('/auth/register', form);
      toast.success('Đăng ký thành công!');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Đăng ký thất bại!');
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#f093fb] via-[#f5576c] to-[#ffd140] p-5">
      {/* Decorative Background Elements - Starting Journey Theme */}
      <div className="pointer-events-none absolute inset-0">
        {/* Animated Paths - Multiple Routes */}
        <div className="absolute left-0 top-0 h-full w-full opacity-10">
          <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path
              d="M0,70 Q30,50 50,70 T100,70"
              stroke="white"
              strokeWidth="1"
              fill="none"
              strokeDasharray="3,3"
            />
            <path
              d="M0,50 Q25,30 50,50 T100,50"
              stroke="white"
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M0,30 Q30,10 50,30 T100,30"
              stroke="white"
              strokeWidth="1"
              fill="none"
              strokeDasharray="3,3"
            />
          </svg>
        </div>

        {/* Starting Point Icons */}
        <div className="absolute left-[8%] top-[10%] animate-bounce text-7xl opacity-20">🎯</div>
        <div className="absolute right-[12%] top-[20%] animate-pulse text-6xl opacity-20 delay-200">✨</div>
        <div className="absolute left-[15%] top-[50%] animate-bounce text-5xl opacity-20 delay-400">🌱</div>
        <div className="absolute right-[8%] bottom-[25%] animate-pulse text-7xl opacity-20 delay-600">🚀</div>
        <div className="absolute left-[10%] bottom-[15%] animate-bounce text-5xl opacity-20 delay-800">💡</div>
        
        {/* Glowing Orbs */}
        <div className="absolute left-[3%] top-[35%] h-40 w-40 animate-pulse rounded-full bg-white/10 blur-3xl" />
        <div className="absolute right-[5%] top-[55%] h-48 w-48 animate-pulse rounded-full bg-white/10 blur-3xl delay-700" />
        <div className="absolute bottom-[10%] left-1/2 h-36 w-36 animate-pulse rounded-full bg-white/10 blur-3xl delay-1000" />
      </div>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-[550px] overflow-hidden rounded-3xl bg-white/95 shadow-2xl backdrop-blur-sm">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-[#f5576c] to-[#ffd140] px-10 py-8 text-center">
          <div className="mb-3 flex items-center justify-center gap-3">
            <span className="text-5xl">🚀</span>
            <h1 className="text-4xl font-bold text-white">Bắt đầu hành trình</h1>
          </div>
          <p className="mb-4 text-lg text-white/90">Khởi đầu cuộc phiêu lưu tri thức của bạn</p>
          
          {/* Journey Steps */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <div className="flex flex-col items-center">
              <div className="mb-1 flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl font-bold text-[#f5576c]">1</div>
              <span className="text-xs text-white/80">Đăng ký</span>
            </div>
            <div className="h-0.5 w-12 bg-white/50"></div>
            <div className="flex flex-col items-center">
              <div className="mb-1 flex h-10 w-10 items-center justify-center rounded-full bg-white/30 text-xl text-white/50">2</div>
              <span className="text-xs text-white/60">Khám phá</span>
            </div>
            <div className="h-0.5 w-12 bg-white/30"></div>
            <div className="flex flex-col items-center">
              <div className="mb-1 flex h-10 w-10 items-center justify-center rounded-full bg-white/30 text-xl text-white/50">3</div>
              <span className="text-xs text-white/60">Thành công</span>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="p-10">
          <form onSubmit={handleSubmit} className="mb-6 grid gap-5">
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">👤</div>
              <input
                className="box-border w-full rounded-xl border-2 border-[#ffe5e5] bg-[#fff8f8] p-4 pl-12 text-base transition-all duration-300 outline-none placeholder:text-[#999] focus:border-[#f5576c] focus:bg-white focus:shadow-lg"
                onChange={handleChange}
                name="name"
                placeholder="Họ và tên của bạn"
              />
            </div>
            
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">📧</div>
              <input
                className="box-border w-full rounded-xl border-2 border-[#ffe5e5] bg-[#fff8f8] p-4 pl-12 text-base transition-all duration-300 outline-none placeholder:text-[#999] focus:border-[#f5576c] focus:bg-white focus:shadow-lg"
                onChange={handleChange}
                name="email"
                placeholder="Email của bạn"
              />
            </div>
            
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">🔒</div>
              <input
                type={showPassword ? 'text' : 'password'}
                className="box-border w-full rounded-xl border-2 border-[#ffe5e5] bg-[#fff8f8] p-4 pl-12 pr-12 text-base transition-all duration-300 outline-none placeholder:text-[#999] focus:border-[#f5576c] focus:bg-white focus:shadow-lg"
                onChange={handleChange}
                name="password"
                placeholder="Mật khẩu (tối thiểu 6 ký tự)"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 transition-all duration-300 hover:text-[#f5576c]"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">✅</div>
              <input
                type={showConfirm ? 'text' : 'password'}
                className="box-border w-full rounded-xl border-2 border-[#ffe5e5] bg-[#fff8f8] p-4 pl-12 pr-12 text-base transition-all duration-300 outline-none placeholder:text-[#999] focus:border-[#f5576c] focus:bg-white focus:shadow-lg"
                onChange={handleChange}
                name="passwordConfirm"
                placeholder="Xác nhận mật khẩu"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 transition-all duration-300 hover:text-[#f5576c]"
              >
                {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <button
              type="submit"
              className="group relative mt-2 cursor-pointer overflow-hidden rounded-xl bg-gradient-to-r from-[#f5576c] to-[#ffd140] px-6 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Khởi động hành trình
                <span className="text-2xl transition-transform group-hover:translate-x-1">🚀</span>
              </span>
              <div className="absolute inset-0 -z-0 bg-gradient-to-r from-[#ffd140] to-[#f093fb] opacity-0 transition-opacity group-hover:opacity-100" />
            </button>
          </form>

          {/* Benefits Section */}
          <div className="mb-6 rounded-2xl bg-gradient-to-r from-[#fff8f8] to-[#fffef8] p-4">
            <p className="mb-3 text-center text-sm font-semibold text-gray-700">
              ✨ Bạn sẽ nhận được:
            </p>
            <div className="grid gap-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span>📚</span>
                <span>Truy cập hàng ngàn bài học chất lượng</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🎓</span>
                <span>Chứng chỉ hoàn thành khóa học</span>
              </div>
              <div className="flex items-center gap-2">
                <span>👥</span>
                <span>Tham gia cộng đồng học tập sôi động</span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-4 text-gray-500">hoặc</span>
            </div>
          </div>

          <p className="text-center text-base text-[#666]">
            Đã có tài khoản?{' '}
            <Link
              to="/login"
              className="font-semibold text-[#f5576c] no-underline transition-all hover:text-[#ffd140] hover:underline"
            >
              Đăng nhập ngay 🎯
            </Link>
          </p>
        </div>

        {/* Footer Decoration */}
        <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#fff8f8] to-[#fffef8] py-4">
          <span className="text-sm text-gray-600">🌟 Miễn phí 100% - Không cần thẻ thanh toán</span>
        </div>
      </div>
    </div>
  );
}

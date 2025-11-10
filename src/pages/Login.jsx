import { Eye, EyeOff } from 'lucide-react';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';
import { api } from '../services/api';

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // // Quick fill tài khoản tester
  // const fillTesterAccount = (type) => {
  //   if (type === 'user') {
  //     setForm({ email: 'tester@linkenzone.com', password: 'tester123' });
  //   } else {
  //     setForm({ email: 'admin@linkenzone.com', password: 'admin123' });
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Form submitted:', form); // Debug log

    if (!isValidEmail(form.email)) {
      toast.error('Email không hợp lệ. Vui lòng nhập lại!');
      return;
    }

    console.log('Email valid, checking tester accounts...'); // Debug log

    // // Tài khoản tester cho frontend (không gọi backend)
    // if (form.email === 'tester@linkenzone.com' && form.password === 'tester123') {
    //   console.log('Logging in as tester user...'); // Debug log
    //   const mockUser = {
    //     token: 'mock-token-for-testing',
    //     data: {
    //       user: {
    //         _id: 'tester-id-123',
    //         full_name: 'Tester Frontend',
    //         email: 'tester@linkenzone.com',
    //         role: 'user',
    //       },
    //     },
    //   };
      
    //   login(mockUser);
    //   toast.success('🎨 Đăng nhập với tài khoản tester thành công!');
    //   navigate('/user');
    //   return;
    // }

    // // Tài khoản admin tester
    // if (form.email === 'admin@linkenzone.com' && form.password === 'admin123') {
    //   console.log('Logging in as admin tester...'); // Debug log
    //   const mockAdmin = {
    //     token: 'mock-admin-token-for-testing',
    //     data: {
    //       user: {
    //         _id: 'admin-id-123',
    //         full_name: 'Admin Tester',
    //         email: 'admin@linkenzone.com',
    //         role: 'admin',
    //       },
    //     },
    //   };
      
    //   login(mockAdmin);
    //   toast.success('🎨 Đăng nhập với tài khoản admin tester thành công!');
    //   navigate('/admin');
    //   return;
    // }

    console.log('Not a tester account, calling backend API...'); // Debug log

    try {
      const res = await api.post('/auth/login', form);
      login(res.data);
      toast.success('Đăng nhập thành công!');
      if (res.data.data.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/user');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Đăng nhập thất bại!');
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#667eea] via-[#764ba2] to-[#f093fb] p-5">
      {/* Decorative Background Elements - Journey Theme */}
      <div className="pointer-events-none absolute inset-0">
        {/* Animated Path/Road */}
        <div className="absolute left-0 top-0 h-full w-full opacity-10">
          <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path
              d="M0,50 Q25,30 50,50 T100,50"
              stroke="white"
              strokeWidth="0.5"
              fill="none"
              strokeDasharray="5,5"
            />
            <path
              d="M0,60 Q25,40 50,60 T100,60"
              stroke="white"
              strokeWidth="0.5"
              fill="none"
              strokeDasharray="5,5"
            />
          </svg>
        </div>

        {/* Journey Icons */}
        <div className="absolute left-[10%] top-[15%] animate-bounce text-6xl opacity-20">🎓</div>
        <div className="absolute right-[15%] top-[25%] animate-pulse text-5xl opacity-20 delay-300">📚</div>
        <div className="absolute left-[20%] bottom-[20%] animate-bounce text-5xl opacity-20 delay-500">🚀</div>
        <div className="absolute right-[10%] bottom-[30%] animate-pulse text-6xl opacity-20 delay-700">⭐</div>
        
        {/* Floating Elements */}
        <div className="absolute left-[5%] top-[40%] h-32 w-32 animate-pulse rounded-full bg-white/10 blur-2xl" />
        <div className="absolute right-[8%] top-[60%] h-40 w-40 animate-pulse rounded-full bg-white/10 blur-3xl delay-500" />
      </div>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-[500px] overflow-hidden rounded-3xl bg-white/95 shadow-2xl backdrop-blur-sm">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-[#667eea] to-[#764ba2] px-10 py-8 text-center">
          <div className="mb-3 flex items-center justify-center gap-3">
            <span className="text-5xl">🎯</span>
            <h1 className="text-4xl font-bold text-white">Tiếp tục hành trình</h1>
          </div>
          <p className="text-lg text-white/90">Đăng nhập để khám phá tri thức mới</p>
          
          {/* Progress Steps Indicator */}
          <div className="mt-6 flex items-center justify-center gap-2">
            <div className="h-2 w-2 rounded-full bg-white"></div>
            <div className="h-1 w-16 rounded-full bg-white/50"></div>
            <div className="h-2 w-2 rounded-full bg-white/30"></div>
            <div className="h-1 w-16 rounded-full bg-white/30"></div>
            <div className="h-2 w-2 rounded-full bg-white/30"></div>
          </div>
        </div>

        {/* Form Section */}
        <div className="p-10">
          <form onSubmit={handleSubmit} className="mb-6 grid gap-5">
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">📧</div>
              <input
                className="box-border w-full rounded-xl border-2 border-[#e0e7ff] bg-[#f8f9ff] p-4 pl-12 text-base transition-all duration-300 outline-none placeholder:text-[#999] focus:border-[#667eea] focus:bg-white focus:shadow-lg"
                onChange={handleChange}
                value={form.email}
                name="email"
                type="email"
                placeholder="Email của bạn"
              />
            </div>
            
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">🔒</div>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={form.password}
                className="box-border w-full rounded-xl border-2 border-[#e0e7ff] bg-[#f8f9ff] p-4 pl-12 pr-12 text-base transition-all duration-300 outline-none placeholder:text-[#999] focus:border-[#667eea] focus:bg-white focus:shadow-lg"
                onChange={handleChange}
                placeholder="Mật khẩu"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 transition-all duration-300 hover:text-[#667eea]"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <button
              type="submit"
              className="group relative mt-2 cursor-pointer overflow-hidden rounded-xl bg-gradient-to-r from-[#667eea] to-[#764ba2] px-6 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Bắt đầu học ngay
                <span className="text-2xl transition-transform group-hover:translate-x-1">→</span>
              </span>
              <div className="absolute inset-0 -z-0 bg-gradient-to-r from-[#764ba2] to-[#f093fb] opacity-0 transition-opacity group-hover:opacity-100" />
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-4 text-gray-500">hoặc</span>
            </div>
          </div>

          {/* Tester Account Info
          <div className="mb-6 rounded-2xl border-2 border-dashed border-[#667eea]/30 bg-gradient-to-r from-[#f0f4ff] to-[#fef3f8] p-4">
            <div className="mb-2 flex items-center gap-2">
              <span className="text-xl">🎨</span>
              <h3 className="text-sm font-bold text-[#667eea]">Tài khoản Test Frontend</h3>
            </div>
            <div className="space-y-2 text-xs text-gray-600">
              <div className="flex items-center justify-between rounded-lg bg-white/80 p-2">
                <span className="font-semibold">👤 User:</span>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <div className="font-mono text-[#667eea]">tester@linkenzone.com</div>
                    <div className="font-mono text-[#764ba2]">tester123</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => fillTesterAccount('user')}
                    className="rounded-lg bg-[#667eea] px-3 py-1.5 text-xs font-semibold text-white transition-all hover:bg-[#764ba2] hover:scale-105"
                  >
                    Điền
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-white/80 p-2">
                <span className="font-semibold">👑 Admin:</span>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <div className="font-mono text-[#667eea]">admin@linkenzone.com</div>
                    <div className="font-mono text-[#764ba2]">admin123</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => fillTesterAccount('admin')}
                    className="rounded-lg bg-[#667eea] px-3 py-1.5 text-xs font-semibold text-white transition-all hover:bg-[#764ba2] hover:scale-105"
                  >
                    Điền
                  </button>
                </div>
              </div>
            </div>
            <p className="mt-2 text-center text-xs italic text-gray-500">
              * Không ảnh hưởng đến backend
            </p>
          </div> */}

          <p className="text-center text-base text-[#666]">
            Chưa có tài khoản?{' '}
            <Link
              to="/register"
              className="font-semibold text-[#667eea] no-underline transition-all hover:text-[#764ba2] hover:underline"
            >
              Bắt đầu hành trình mới 🚀
            </Link>
          </p>
        </div>

        {/* Footer Decoration */}
        <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#f8f9ff] to-[#e0e7ff] py-4">
          <span className="text-sm text-gray-600">🌟 Hơn 50,000 học viên đã tin tưởng</span>
        </div>
      </div>
    </div>
  );
}

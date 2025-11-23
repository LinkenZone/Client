import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, Send } from 'lucide-react';

const Footer = () => {
  const [message, setMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // TODO: Implement message sending functionality when backend is ready
      console.log('Message sent:', message);
      alert('Cảm ơn bạn đã gửi thắc mắc! Chúng tôi sẽ phản hồi sớm nhất có thể.');
      setMessage('');
    }
  };

  return (
    <footer className="mt-auto bg-gradient-to-br from-[#2C3E50] via-[#34495E] to-[#2C3E50] text-white">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-[1400px] px-6 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="mb-4 text-2xl font-bold text-white">LinkenZone</h3>
            <p className="text-sm leading-relaxed text-gray-300">
              Nền tảng lưu trữ tài liệu hàng đầu, mang đến trải nghiệm chất lượng cao với 
              hàng ngàn tài liệu từ các nguồn uy tín đã được qua kiểm duyệt.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 pt-4">
              <div className="flex items-center gap-3 text-sm text-gray-300 transition-colors hover:text-white">
                <Mail size={18} className="text-[#4AA4FF]" />
                <a href="mailto:contact@linkenzone.com" className="hover:underline">
                  contact@linkenzone.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300 transition-colors hover:text-white">
                <Phone size={18} className="text-[#4AA4FF]" />
                <span>1900 xxxx (8:00 - 22:00)</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300 transition-colors hover:text-white">
                <MapPin size={18} className="text-[#4AA4FF]" />
                <span>123 Đường ABC, Quận XYZ, TP.HCM</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="pt-4">
              <h4 className="mb-3 text-sm font-semibold text-white">Kết nối với chúng tôi</h4>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white backdrop-blur-md transition-all hover:bg-[#4AA4FF] hover:scale-110"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white backdrop-blur-md transition-all hover:bg-[#4AA4FF] hover:scale-110"
                >
                  <Twitter size={20} />
                </a>
                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white backdrop-blur-md transition-all hover:bg-[#4AA4FF] hover:scale-110"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white backdrop-blur-md transition-all hover:bg-[#4AA4FF] hover:scale-110"
                >
                  <Youtube size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="mb-4 text-xl font-bold text-white">Khám phá</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-3">
                <Link
                  to="/home"
                  className="block text-sm text-gray-300 transition-all hover:translate-x-1 hover:text-[#4AA4FF]"
                >
                  → Trang chủ
                </Link>
                <Link
                  to="/lesson"
                  className="block text-sm text-gray-300 transition-all hover:translate-x-1 hover:text-[#4AA4FF]"
                >
                  → Bài học
                </Link>
                <Link
                  to="/natural"
                  className="block text-sm text-gray-300 transition-all hover:translate-x-1 hover:text-[#4AA4FF]"
                >
                  → Khoa học tự nhiên
                </Link>
                <Link
                  to="/social"
                  className="block text-sm text-gray-300 transition-all hover:translate-x-1 hover:text-[#4AA4FF]"
                >
                  → Khoa học xã hội
                </Link>
              </div>
              <div className="space-y-3">
                <Link
                  to="/user"
                  className="block text-sm text-gray-300 transition-all hover:translate-x-1 hover:text-[#4AA4FF]"
                >
                  → Tài khoản
                </Link>
                <Link
                  to="/"
                  className="block text-sm text-gray-300 transition-all hover:translate-x-1 hover:text-[#4AA4FF]"
                >
                  → Giới thiệu
                </Link>
                <Link
                  to="/login"
                  className="block text-sm text-gray-300 transition-all hover:translate-x-1 hover:text-[#4AA4FF]"
                >
                  → Đăng nhập
                </Link>
                <Link
                  to="/register"
                  className="block text-sm text-gray-300 transition-all hover:translate-x-1 hover:text-[#4AA4FF]"
                >
                  → Đăng ký
                </Link>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-6 grid grid-cols-2 gap-3 rounded-xl bg-white/5 p-4 backdrop-blur-md">
              <div className="text-center">
                <p className="text-2xl font-bold text-[#4AA4FF]">100+</p>
                <p className="text-xs text-gray-400">Bài học</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-[#4AA4FF]">50K+</p>
                <p className="text-xs text-gray-400">Học viên</p>
              </div>
            </div>
          </div>

          {/* Message Box */}
          <div className="space-y-4">
            <h3 className="mb-4 text-xl font-bold text-white">Liên hệ với chúng tôi</h3>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
              <p className="mb-4 text-sm text-gray-300">
                Có câu hỏi hoặc góp ý? Gửi tin nhắn cho chúng tôi!
              </p>
              <form onSubmit={handleSendMessage} className="space-y-3">
                <textarea
                  className="w-full resize-none rounded-xl border border-white/20 bg-white/10 p-3 text-sm text-white outline-none backdrop-blur-md transition-all placeholder:text-gray-400 focus:border-[#4AA4FF] focus:bg-white/15 focus:ring-2 focus:ring-[#4AA4FF]/20"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Nhập câu hỏi hoặc thắc mắc của bạn..."
                  rows={4}
                />
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#4AA4FF] to-[#6B8DD1] px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                  disabled={!message.trim()}
                >
                  <Send size={18} />
                  Gửi tin nhắn
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-black/20 py-6">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-gray-400">
              © 2025 <span className="font-semibold text-white">LinkenZone</span>. Tất cả quyền được bảo lưu.
            </p>
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <a href="#" className="text-gray-400 transition-colors hover:text-white">
                Điều khoản sử dụng
              </a>
              <span className="text-gray-600">•</span>
              <a href="#" className="text-gray-400 transition-colors hover:text-white">
                Chính sách bảo mật
              </a>
              <span className="text-gray-600">•</span>
              <a href="#" className="text-gray-400 transition-colors hover:text-white">
                Hỗ trợ
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

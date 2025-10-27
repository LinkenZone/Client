import { useState } from 'react';
import { Link } from 'react-router-dom';

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
    <footer className="mt-auto bg-[#5A6E7F] py-10 text-white">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-10 px-5 md:flex-row">
        {/* Left side - Navigation and info (1/3) */}
        <div className="max-w-full flex-1 md:max-w-[33.333%]">
          <div className="mb-8">
            <h3 className="mb-4 text-lg font-semibold text-white">Điều hướng</h3>
            <ul className="m-0 list-none p-0">
              <li className="mb-2">
                <Link
                  to="/Home"
                  className="text-sm text-[#E6F2FF] transition-colors duration-300 hover:text-white hover:underline"
                >
                  Trang chủ
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/LessonPage"
                  className="text-sm text-[#E6F2FF] transition-colors duration-300 hover:text-white hover:underline"
                >
                  Bài học
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/user"
                  className="text-sm text-[#E6F2FF] transition-colors duration-300 hover:text-white hover:underline"
                >
                  Tài khoản
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/about"
                  className="text-sm text-[#E6F2FF] transition-colors duration-300 hover:text-white hover:underline"
                >
                  Giới thiệu
                </Link>
              </li>
            </ul>
          </div>

          <div className="mb-8">
            <h3 className="mb-4 text-lg font-semibold text-white">Liên hệ</h3>
            <p className="text-sm text-[#E6F2FF]">
              Email:{' '}
              <a
                href="mailto:contact@linkenzone.com"
                className="text-[#E6F2FF] transition-colors duration-300 hover:text-white hover:underline"
              >
                contact@linkenzone.com
              </a>
            </p>
          </div>

          <div className="mb-8">
            <p className="border-t border-[#6B7F91] pt-5 text-xs text-[#B8C5D1]">
              © 2025 LinkenZone. Tất cả quyền được bảo lưu.
            </p>
          </div>
        </div>

        {/* Right side - Message box (2/3) */}
        <div className="max-w-full flex-2 md:max-w-[66.666%]">
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 sm:p-8">
            <h3 className="mb-4 text-lg font-semibold text-white">
              Có thắc mắc? Hãy nhắn cho chúng tôi!
            </h3>
            <form onSubmit={handleSendMessage} className="mt-4">
              <div className="flex flex-col gap-4">
                <textarea
                  className="min-h-[100px] w-full resize-y rounded-lg border-none bg-white p-4 text-sm text-[#333] outline-none placeholder:text-[#999] focus:ring-2 focus:ring-white/30"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Nhập câu hỏi hoặc thắc mắc của bạn tại đây..."
                  rows={4}
                />
                <button
                  type="submit"
                  className="min-w-[80px] self-end rounded-lg bg-[#5A6E7F] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-[1px] hover:bg-[#4A5D6E] active:translate-y-0 disabled:cursor-not-allowed disabled:bg-[#7A8B99] disabled:opacity-60"
                  disabled={!message.trim()}
                >
                  Gửi
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

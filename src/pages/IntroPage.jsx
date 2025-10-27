import { assets } from '../assets/assets';

export default function IntroPage() {
  return (
    <div className="overflow-hidden bg-white">
      {/* Hero Section - Modern & Animated */}
      <section className="relative min-h-screen bg-gradient-to-br from-[#4AA4FF] via-[#5A9EE8] to-[#6B8DD1] px-4 py-20">
        {/* Animated Background Elements */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-[10%] top-[20%] h-64 w-64 animate-pulse rounded-full bg-white/10 blur-3xl" />
          <div className="absolute right-[15%] top-[40%] h-96 w-96 animate-pulse rounded-full bg-white/10 blur-3xl delay-700" />
          <div className="absolute bottom-[20%] left-[30%] h-80 w-80 animate-pulse rounded-full bg-white/10 blur-3xl delay-1000" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-center text-center">
            {/* Logo Animation */}
            <div className="mb-8 animate-bounce">
              <img src={assets.logo} alt="LinkenZone Logo" className="h-32 w-auto drop-shadow-2xl" />
            </div>

            {/* Main Title */}
            <h1 className="mb-6 text-5xl font-bold text-white drop-shadow-lg md:text-7xl">
              Chào mừng đến với{' '}
              <span className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">
                LinkenZone
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mb-4 max-w-3xl text-xl text-white/90 drop-shadow md:text-2xl">
              Nền tảng học tập mở
            </p>
            <p className="mb-12 max-w-3xl text-lg text-white/80 drop-shadow">
              Nơi mọi người có thể chia sẻ, khám phá và kết nối tri thức với nhau
            </p>

            {/* CTA Button */}
            <button className="group relative overflow-hidden rounded-full bg-white px-12 py-5 text-lg font-semibold text-[#4AA4FF] shadow-2xl transition-all hover:scale-105 hover:shadow-3xl">
              <span className="relative z-10">Khám phá tri thức cùng LinkenZone</span>
              <div className="absolute inset-0 -z-0 bg-gradient-to-r from-[#FFD700] to-[#FFA500] opacity-0 transition-opacity group-hover:opacity-100" />
            </button>

            {/* Scroll Indicator */}
            <div className="mt-20 animate-bounce">
              <div className="text-4xl text-white/80">↓</div>
              <p className="mt-2 text-sm text-white/60">Cuộn xuống để tìm hiểu thêm</p>
            </div>
          </div>
        </div>

        {/* Wave Decoration */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* What is LinkenZone Section */}
      <section className="bg-gradient-to-b from-white to-[#f0f9ff] px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-16 text-center text-5xl font-bold text-[#1e3a8a]">
            LinkenZone là gì? 🤔
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Card 1 */}
            <div className="group rounded-3xl bg-white p-8 shadow-lg transition-all hover:scale-105 hover:shadow-2xl">
              <div className="mb-6 text-6xl">📚</div>
              <h3 className="mb-4 text-2xl font-bold text-[#4AA4FF]">Thư viện số tập trung</h3>
              <p className="leading-relaxed text-gray-700">
                Giải quyết tình trạng tài liệu học tập bị phân tán, khó tìm kiếm và thiếu kiểm chứng chất lượng
              </p>
            </div>

            {/* Card 2 */}
            <div className="group rounded-3xl bg-white p-8 shadow-lg transition-all hover:scale-105 hover:shadow-2xl">
              <div className="mb-6 text-6xl">🔍</div>
              <h3 className="mb-4 text-2xl font-bold text-[#4AA4FF]">Tìm kiếm mạnh mẽ</h3>
              <p className="leading-relaxed text-gray-700">
                Công cụ tìm kiếm toàn văn với bộ lọc theo môn học, giảng viên, loại tài liệu
              </p>
            </div>

            {/* Card 3 */}
            <div className="group rounded-3xl bg-white p-8 shadow-lg transition-all hover:scale-105 hover:shadow-2xl">
              <div className="mb-6 text-6xl">⭐</div>
              <h3 className="mb-4 text-2xl font-bold text-[#4AA4FF]">Đánh giá chất lượng</h3>
              <p className="leading-relaxed text-gray-700">
                Người dùng đánh giá tài liệu theo thang 5 sao, góp phần xây dựng cộng đồng học thuật
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Teacher Features Section */}
      <section className="bg-gradient-to-br from-[#e0f2f1] to-[#b2dfdb] px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <div className="mb-4 text-6xl">👨‍🏫</div>
            <h2 className="text-5xl font-bold text-[#1e88e5]">
              Người dạy có thể làm những gì?
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: '🎓',
                title: 'Khẳng định chuyên môn',
                description: 'Hồ sơ giảng viên hiển thị tài liệu, lớp học và đánh giá – giúp nâng cao uy tín',
                gradient: 'from-[#4AA4FF] to-[#5A9EE8]',
              },
              {
                icon: '✅',
                title: 'Kiểm duyệt tài liệu',
                description: 'Có quyền kiểm duyệt nội dung do người dùng đóng góp để đảm bảo chất lượng',
                gradient: 'from-[#5A9EE8] to-[#6B8DD1]',
              },
              {
                icon: '📝',
                title: 'Tạo lớp học dễ dàng',
                description: 'Tạo lớp học, tải lên slide, đề thi, ebook và chia sẻ với học viên',
                gradient: 'from-[#6B8DD1] to-[#7B7DC0]',
              },
              {
                icon: '⭐',
                title: 'Nhận đánh giá',
                description: 'Tài liệu được đánh giá theo thang 5 sao, giúp cải thiện nội dung',
                gradient: 'from-[#7B7DC0] to-[#8B6DB0]',
              },
            ].map((feature, i) => (
              <div
                key={i}
                className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${feature.gradient} p-6 text-white shadow-lg transition-all hover:scale-105 hover:shadow-2xl`}
              >
                <div className="relative z-10">
                  <div className="mb-4 text-5xl">{feature.icon}</div>
                  <h3 className="mb-3 text-xl font-bold">{feature.title}</h3>
                  <p className="leading-relaxed text-white/90">{feature.description}</p>
                </div>
                <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-white/10 transition-all group-hover:scale-150" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Student Features Section */}
      <section className="bg-gradient-to-b from-[#fff3e0] to-[#ffe0b2] px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <div className="mb-4 text-6xl">👨‍🎓</div>
            <h2 className="text-5xl font-bold text-[#d84315]">
              Học viên có thể làm gì?
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: '🔍',
                title: 'Tìm kiếm tài liệu',
                description: 'Tìm kiếm slide, đề thi, sách theo môn học một cách nhanh chóng và chính xác',
              },
              {
                icon: '🎯',
                title: 'Tham gia lớp học',
                description: 'Truy cập vào các lớp học được tạo bởi giảng viên và tải xuống tài liệu',
              },
              {
                icon: '⭐',
                title: 'Đánh giá chất lượng',
                description: 'Đánh giá tài liệu theo thang 5 sao để giúp cộng đồng có tài liệu tốt hơn',
              },
              {
                icon: '📤',
                title: 'Chia sẻ tài liệu',
                description: 'Đóng góp slide, bài tập, đề thi cho cộng đồng sau khi được kiểm duyệt',
              },
              {
                icon: '💾',
                title: 'Lưu trữ cá nhân',
                description: 'Tạo thư mục cá nhân để lưu trữ và quản lý tài liệu yêu thích',
              },
              {
                icon: '📊',
                title: 'Theo dõi tiến độ',
                description: 'Theo dõi lịch sử học tập và tiến độ hoàn thành các khóa học',
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="group rounded-2xl bg-white p-8 shadow-lg transition-all hover:scale-105 hover:shadow-2xl"
              >
                <div className="mb-4 flex items-center justify-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#d84315] to-[#ff8a65] text-4xl shadow-lg">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="mb-3 text-center text-xl font-bold text-[#d84315]">
                  {feature.title}
                </h3>
                <p className="text-center leading-relaxed text-gray-700">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#4AA4FF] to-[#6B8DD1] px-4 py-20 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-5xl font-bold">Sẵn sàng bắt đầu? 🚀</h2>
          <p className="mb-10 text-xl text-white/90">
            Tham gia LinkenZone ngay hôm nay và trải nghiệm cách học tập hiện đại!
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="/register"
              className="rounded-full bg-white px-10 py-4 font-semibold text-[#4AA4FF] shadow-lg transition-all hover:scale-105 hover:shadow-xl"
            >
              Đăng ký ngay
            </a>
            <a
              href="/login"
              className="rounded-full border-2 border-white bg-transparent px-10 py-4 font-semibold text-white transition-all hover:bg-white hover:text-[#4AA4FF]"
            >
              Đăng nhập
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

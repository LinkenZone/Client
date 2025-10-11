import { assets } from "../assets/assets";

export default function IntroPage() {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative mx-auto flex max-w-[1440px] items-center justify-center">
        <div className="h-[800px] w-full bg-gradient-to-b from-[#fdfdfd] via-[#e6f2ff] via-[93%] to-[#fdfdfd]" />
        <div className="absolute top-[180px] left-1/2 h-[520px] w-[750px] -translate-x-1/2">
          <div className="absolute top-0 left-1/2 h-[470px] w-[650px] -translate-x-1/2">
            <div className="absolute z-10 h-[470px] w-[650px] rounded-[30px] bg-gradient-to-br from-[#666666] to-[#555555] p-[15px]" />
            <div className="absolute top-[15px] left-[15px] z-20 h-[440px] w-[620px] rounded-[20px] bg-black" />
            <div className="absolute top-[25px] left-1/2 z-20 h-[420px] w-[600px] -translate-x-1/2 rounded-t-[25px] rounded-b-[4px] bg-white">
              <div
                className="absolute top-10 left-1/2 h-[100px] w-[130px] -translate-x-1/2 bg-contain bg-center bg-no-repeat"
                style={{ backgroundImage: `url('${assets.logo}')` }}
              />
              <div className="font-roboto absolute top-40 left-1/2 w-[520px] -translate-x-1/2 text-center text-[28px] font-bold text-[#1e3a8a]">
                Chào mừng bạn đến với LinkenZone
              </div>
              <div className="font-roboto absolute top-[220px] left-1/2 w-[520px] -translate-x-1/2 text-center text-lg leading-relaxed">
                <div>Nền tảng học tập mở</div>
                <div>
                  Nơi mọi người có thể chia sẻ, khám phá và kết nối tri thức với
                  nhau
                </div>
              </div>
              <div className="absolute bottom-[30px] left-1/2 -translate-x-1/2">
                <div className="relative h-[45px] w-[350px] cursor-pointer rounded-[25px] bg-[#53ccec]" />
                <div className="font-roboto absolute top-1/2 left-1/2 flex w-[350px] -translate-x-1/2 -translate-y-1/2 items-center justify-center text-center text-lg">
                  Khám phá tri thức cùng LinkenZone
                </div>
              </div>
            </div>
            <div className="absolute top-2 left-1/2 z-30 h-3 w-[60px] -translate-x-1/2 rounded-b-lg bg-black" />
            <div className="absolute top-3 left-1/2 z-40 h-1 w-1 -translate-x-1/2 rounded-full bg-[#333]" />
          </div>
          <div className="absolute top-[470px] left-1/2 z-10 h-[35px] w-[750px] -translate-x-1/2 rounded-b-[15px] bg-gradient-to-r from-[#ababab] via-[#888888] to-[#ababab]" />
        </div>
      </div>

      {/* Intro Section */}
      <div className="relative mx-auto min-h-[800px] max-w-[1440px] bg-[#fdfdfd] px-10 py-[50px]">
        {/* Cloud Title */}
        <div className="relative">
          <div
            className="font-roboto absolute right-[15%] flex h-[180px] w-[400px] items-center justify-center bg-contain bg-center bg-no-repeat text-center text-[32px] font-bold"
            style={{ backgroundImage: `url('${assets.cloud0}')` }}
          >
            <div>LinkenZone là gì?</div>
          </div>
        </div>

        {/* Main Description Cloud */}
        <div className="relative mt-[100px]">
          <div
            className="font-roboto absolute left-[15%] flex h-[250px] w-[500px] items-center justify-center bg-contain bg-center bg-no-repeat p-[30px] text-center text-base leading-relaxed"
            style={{ backgroundImage: `url('${assets.cloud1}')` }}
          >
            <div>
              LinkenZone là hệ thống Thư viện số tập trung, ra đời nhằm giải
              quyết tình trạng tài liệu học tập bị phân tán, khó tìm kiếm và
              thiếu kiểm chứng chất lượng.
            </div>
          </div>
        </div>

        {/* Bottom Clouds */}
        <div className="relative mt-[300px]">
          {/* Right Cloud */}
          <div
            className="font-roboto absolute right-[5%] flex h-[220px] w-[380px] items-center justify-center bg-contain bg-center bg-no-repeat p-[25px] text-center text-base leading-relaxed"
            style={{ backgroundImage: `url('${assets.cloud2}')` }}
          >
            <div>
              Website tích hợp công cụ tìm kiếm toàn văn mạnh mẽ, cùng các bộ
              lọc theo môn học, giảng viên, loại tài liệu.
            </div>
          </div>

          {/* Left Cloud */}
          <div
            className="font-roboto absolute left-[5%] flex h-[220px] w-[380px] -translate-y-[-50%] items-center justify-center bg-contain bg-center bg-no-repeat p-[25px] text-center text-base leading-relaxed"
            style={{ backgroundImage: `url('${assets.cloud3}')` }}
          >
            <div>
              Người dùng có thể đánh giá tài liệu theo thang 5 sao, góp phần xây
              dựng cộng đồng học thuật chất lượng.
            </div>
          </div>
        </div>
      </div>

      {/* Teacher Section */}
      <div className="relative mx-auto h-[600px] max-w-[1440px] bg-[#d0ebe9] px-10">
        <div className="font-roboto absolute top-10 left-1/2 w-[600px] -translate-x-1/2 text-center text-4xl font-bold">
          Người dạy có thể làm những gì?
        </div>
        {[
          {
            title: "Khẳng định chuyên môn",
            description:
              "Hồ sơ giảng viên hiển thị tài liệu, lớp học và đánh giá – giúp nâng cao uy tín.",
            bgColor: "white",
            position: "right-10 top-[120px]",
          },
          {
            title: "Kiểm duyệt tài liệu",
            description:
              "Giảng viên có quyền kiểm duyệt nội dung do người dùng đóng góp để đảm bảo chất lượng.",
            bgColor: "#a7c7e7",
            position: "left-1/2 -translate-x-1/2 top-[180px]",
          },
          {
            title: "Tạo lớp học dễ dàng",
            description:
              "Giảng viên có thể tạo lớp học, tải lên slide, đề thi, ebook và chia sẻ với học viên.",
            bgColor: "#e6f2ff",
            position: "left-10 top-[280px]",
          },
          {
            title: "Nhận đánh giá từ học viên",
            description:
              "Tài liệu được đánh giá theo thang 5 sao, giúp giảng viên cải thiện nội dung.",
            bgColor: "#cce3dc",
            position: "right-10 top-[380px]",
          },
        ].map((card, i) => (
          <div
            key={i}
            className={`absolute ${card.position} flex w-[280px] flex-col items-center rounded-xl p-4 text-center shadow-[0_2px_8px_rgba(0,0,0,0.1)]`}
            style={{ backgroundColor: card.bgColor }}
          >
            <div className="font-roboto mb-2.5 text-xl font-bold">
              {card.title}
            </div>
            <div className="font-roboto text-base leading-relaxed">
              {card.description}
            </div>
          </div>
        ))}
      </div>

      {/* Student Section */}
      <div className="relative mx-auto min-h-[700px] max-w-[1440px] bg-[#e6f2ff] px-10 py-16">
        <div className="font-roboto mx-auto mb-16 max-w-[600px] text-center text-4xl font-bold">
          Học viên có thể làm gì?
        </div>
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-3 gap-x-8 gap-y-20">
            {[
              {
                title: "Tìm kiếm tài liệu",
                description:
                  "Tìm kiếm slide, đề thi, sách theo môn học một cách nhanh chóng và chính xác",
              },
              {
                title: "Tham gia lớp học",
                description:
                  "Truy cập vào các lớp học được tạo bởi giảng viên và tải xuống tài liệu",
              },
              {
                title: "Đánh giá chất lượng",
                description:
                  "Đánh giá tài liệu theo thang 5 sao để giúp cộng đồng có tài liệu tốt hơn",
              },
              {
                title: "Chia sẻ tài liệu",
                description:
                  "Đóng góp slide, bài tập, đề thi cho cộng đồng sau khi được kiểm duyệt",
              },
              {
                title: "Lưu trữ cá nhân",
                description:
                  "Tạo thư mục cá nhân để lưu trữ và quản lý tài liệu yêu thích",
              },
              {
                title: "Theo dõi tiến độ",
                description:
                  "Theo dõi lịch sử học tập và tiến độ hoàn thành các khóa học",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex w-full flex-col items-center text-center"
              >
                <div className="font-roboto mb-4 flex h-[66px] items-center justify-center text-2xl font-bold">
                  {item.title}
                </div>
                <div className="font-roboto mb-6 flex h-[72px] max-w-[250px] items-center justify-center text-base leading-relaxed">
                  {item.description}
                </div>
                <div className="mt-2.5">
                  <svg
                    width="200px"
                    height="120px"
                    fill="none"
                    viewBox="0 0 263 140"
                  >
                    <g>
                      <rect fill="#D9D9D9" height="9" width="263" />
                      <rect
                        fill="#D9D9D9"
                        height="23"
                        width="245"
                        x="9"
                        y="9"
                      />
                      <path d="M19 32V140H9V32H19Z" fill="#D9D9D9" />
                      <path d="M254 32V140H244V32H254Z" fill="#D9D9D9" />
                      <rect
                        fill="black"
                        height="16"
                        width="210"
                        x="27"
                        y="13"
                      />
                    </g>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

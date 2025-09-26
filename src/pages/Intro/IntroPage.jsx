import "./IntroPage.css";
import svgPaths from "../imports/svg-zm03bdpe77";
import imgLinkenZoneLogo from "figma:asset/701acdf0ce113e71c0bf4d950ef8b94b8a942c7f.png";
import imgPic4 from "figma:asset/f00b5bdb1d83bc8b0650075717813e0650b990bc.png";
import imgTl2 from "figma:asset/d763a044342372ead0b0387e8ed6e519338c9da9.png";
import imgTl9 from "figma:asset/4f74294320a38516ed854688f33ccdb09098328b.png";
import imgTl4 from "figma:asset/484756e508982af1beee6cec169669ec12a3c21d.png";
import imgTl1 from "figma:asset/a935b2f8851a645329cacde89426058ae6c75f1f.png";

export default function IntroPage() {
  return (
    <div className="intro-page">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-bg" />
        <div className="laptop">
          <div className="laptop-display">
            <div className="display-body" />
            <div className="display-frame" />
            <div className="screen">
              <div
                className="logo"
                style={{ backgroundImage: `url('${imgLinkenZoneLogo}')` }}
              />
              <div className="welcome-title">Chào mừng bạn đến với LinkenZone</div>
              <div className="welcome-description">
                <div>Nền tảng học tập mở</div>
                <div>Nơi mọi người có thể chia sẻ, khám phá và kết nối tri thức với nhau</div>
              </div>
              <div className="btn-start">
                <div className="btn-bg" />
                <div className="btn-text">Khám phá tri thức cùng LinkenZone</div>
              </div>
            </div>
            <div className="notch" />
            <div className="camera" />
          </div>
          <div className="main-body" />
        </div>
        <div className="pic">
          {["pic4", "pic3", "pic2", "pic1"].map((cls, i) => (
            <div key={i} className={`pic-item ${cls}`}>
              <img src={imgPic4} alt={cls} />
            </div>
          ))}
        </div>
      </div>

      {/* Intro Section */}
      <div className="intro-section">
        <div
          className="cloud-title"
          style={{ backgroundImage: `url('${imgTl1}')` }}
        >
          <div>LinkenZone là gì?</div>
        </div>
        <div
          className="cloud-description"
          style={{ backgroundImage: `url('${imgTl9}')` }}
        >
          <div>
            LinkenZone là hệ thống Thư viện số tập trung, ra đời nhằm giải quyết tình trạng tài liệu học tập bị phân tán, khó tìm kiếm và thiếu kiểm chứng chất lượng.
          </div>
        </div>
        <div className="cloud-row">
          <div
            className="cloud-feature"
            style={{ backgroundImage: `url('${imgTl4}')` }}
          >
            Website tích hợp công cụ tìm kiếm toàn văn mạnh mẽ, cùng các bộ lọc theo môn học, giảng viên, loại tài liệu.
          </div>
          <div
            className="cloud-feature"
            style={{ backgroundImage: `url('${imgTl2}')` }}
          >
            Người dùng có thể đánh giá tài liệu theo thang 5 sao, góp phần xây dựng cộng đồng học thuật chất lượng.
          </div>
        </div>
      </div>

      {/* Teacher Section */}
      <div className="teacher-section">
        <div className="section-title">Người dạy có thể làm những gì?</div>
        {[
          {
            title: "Khẳng định chuyên môn",
            description:
              "Hồ sơ giảng viên hiển thị tài liệu, lớp học và đánh giá – giúp nâng cao uy tín.",
            bgColor: "white",
            className: "card-1",
          },
          {
            title: "Kiểm duyệt tài liệu",
            description:
              "Giảng viên có quyền kiểm duyệt nội dung do người dùng đóng góp để đảm bảo chất lượng.",
            bgColor: "#a7c7e7",
            className: "card-2",
          },
          {
            title: "Tạo lớp học dễ dàng",
            description:
              "Giảng viên có thể tạo lớp học, tải lên slide, đề thi, ebook và chia sẻ với học viên.",
            bgColor: "#e6f2ff",
            className: "card-3",
          },
          {
            title: "Nhận đánh giá từ học viên",
            description:
              "Tài liệu được đánh giá theo thang 5 sao, giúp giảng viên cải thiện nội dung.",
            bgColor: "#cce3dc",
            className: "card-4",
          },
        ].map((card, i) => (
          <div
            key={i}
            className={`teacher-card ${card.className}`}
            style={{ backgroundColor: card.bgColor }}
          >
            <div className="card-title">{card.title}</div>
            <div className="card-description">{card.description}</div>
          </div>
        ))}
      </div>

      {/* Student Section */}
      <div className="student-section">
        <div className="section-title">Học viên có thể làm gì?</div>
        {[
          {
            title: "Tìm kiếm tài liệu",
            description:
              "Tìm kiếm slide, đề thi, sách theo môn học một cách nhanh chóng và chính xác",
            className: "feature-1",
          },
          {
            title: "Tham gia lớp học",
            description:
              "Truy cập vào các lớp học được tạo bởi giảng viên và tải xuống tài liệu",
            className: "feature-2",
          },
          {
            title: "Đánh giá chất lượng",
            description:
              "Đánh giá tài liệu theo thang 5 sao để giúp cộng đồng có tài liệu tốt hơn",
            className: "feature-3",
          },
          {
            title: "Chia sẻ tài liệu",
            description:
              "Đóng góp slide, bài tập, đề thi cho cộng đồng sau khi được kiểm duyệt",
            className: "feature-4",
          },
          {
            title: "Lưu trữ cá nhân",
            description:
              "Tạo thư mục cá nhân để lưu trữ và quản lý tài liệu yêu thích",
            className: "feature-5",
          },
          {
            title: "Theo dõi tiến độ",
            description:
              "Theo dõi lịch sử học tập và tiến độ hoàn thành các khóa học",
            className: "feature-6",
          },
        ].map((item, i) => (
          <div key={i} className={`student-feature ${item.className}`}>
            <div className="feature-title">{item.title}</div>
            <div className="feature-description">{item.description}</div>
            <div className="feature-svg">
              <svg width="200px" height="120px" fill="none" viewBox="0 0 263 140">
                <g>
                  <rect fill="#D9D9D9" height="9" width="263" />
                  <rect fill="#D9D9D9" height="23" width="245" x="9" y="9" />
                  <path d="M19 32V140H9V32H19Z" fill="#D9D9D9" />
                  <path d="M254 32V140H244V32H254Z" fill="#D9D9D9" />
                  <rect fill="black" height="16" width="210" x="27" y="13" />
                </g>
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
import React from 'react';
import './Intro.css';
import { motion } from 'framer-motion';

const Intro = () => (
  <motion.section className="intro" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
    <h1>Chào mừng đến với LinkenZone</h1>
    <p>LinkenZone là nền tảng học tập mở, nơi mọi người có thể chia sẻ, khám phá và kết nối tri thức với nhau.</p>
    <h2>Giới thiệu hệ thống</h2>
    <p>LinkenZone là hệ thống Thư viện số tập trung, ra đời nhằm giải quyết tình trạng tài liệu học tập bị phân tán, khó tìm kiếm và thiếu kiểm chứng chất lượng. Nền tảng cho phép người dùng chủ động chia sẻ slide, đề thi, ebook… nhưng mọi nội dung đều được kiểm duyệt bởi Admin hoặc Giảng viên để đảm bảo độ tin cậy.</p>
    <p>Website tích hợp công cụ tìm kiếm toàn văn mạnh mẽ, cùng các bộ lọc theo môn học, giảng viên, loại tài liệu… giúp việc tra cứu trở nên nhanh chóng và chính xác. Người dùng dễ dàng tìm đúng tài liệu mình cần mà không mất thời gian.</p>
    <p>Người dùng có thể đánh giá tài liệu theo thang 5 sao, góp phần xây dựng cộng đồng học thuật chất lượng. Hệ thống cũng hỗ trợ lưu trữ các tệp dung lượng lớn một cách hiệu quả, giúp việc chia sẻ và truy cập tài liệu trở nên mượt mà hơn.</p>
    <h2 className="intro-role teacher">Người dạy có thể làm gì?</h2>
    <ul>
      <li>Kiểm duyệt tài liệu, khẳng định chuyên môn</li>
      <li>Nhận đánh giá từ học viên</li>
      <li>Tạo lớp học dễ dàng</li>
    </ul>
    <h2 className="intro-role student">Học viên có thể làm gì?</h2>
    <ul>
      <li>Tìm tài liệu, tham gia lớp học</li>
      <li>Đánh giá chất lượng, theo dõi tiến độ</li>
      <li>Lưu trữ cá nhân, chia sẻ tài liệu</li>
    </ul>
  </motion.section>
);

export default Intro;

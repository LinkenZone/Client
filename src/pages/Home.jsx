import React from "react";
import LessonCard from "../components/LessonCard";
import noPict from "../assets/no_pic.png";
import Hero from "../components/Hero";

const infoImg = null; // Thay bằng đường dẫn ảnh nếu có

export default function Home() {
  const finalImage = infoImg || noPict;

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-[#fdfdfd]">
      <Hero imageUrl={finalImage} />

      <div className="box-border w-full max-w-[1252px] p-8">
        <h1>Trang chính LinkenZone</h1>
        <p>
          Chào mừng bạn đến với trang chính của hệ thống học tập LinkenZone!
        </p>

        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <LessonCard
            lesson={{
              title: "Bài học 1",
              description: "Mô tả bài học 1",
              rating: 4.5,
            }}
          />
          <LessonCard
            lesson={{
              title: "Bài học 2",
              description: "Mô tả bài học 2",
              rating: 4.0,
            }}
          />
          <LessonCard
            lesson={{
              title: "Bài học 3",
              description: "Mô tả bài học 3",
              rating: 5.0,
            }}
          />
        </div>
      </div>
    </div>
  );
}

import { useMemo } from 'react';
import LessonCard from '../components/LessonCard';

export default function SocialPage() {
  const lessons = useMemo(() => [], []); // Hiện tại chưa có bài học

  return (
    <div className="mx-auto flex min-h-screen max-w-[1200px] flex-col items-center bg-gradient-to-b from-[#e6f2ff] to-[#fdfdfd] p-5">
      <div className="mt-0 w-full py-16 pb-10 text-center md:py-[60px] md:pb-10">
        <h1 className="font-roboto mb-8 text-4xl font-bold text-[#1e3a8a] md:text-[2.5rem]">
          Xã hội
        </h1>
        <div className="mx-auto mb-10 flex w-full max-w-[600px] items-center justify-center">
          <input
            type="text"
            placeholder="Tìm kiếm bài học Xã hội..."
            className="w-full max-w-[480px] rounded-[32px] border-2 border-[#53ccec] bg-[#fdfdfd] p-4 px-7 text-lg text-[#1e3a8a] shadow-[0_4px_12px_rgba(83,204,236,0.15)] transition-all duration-300 outline-none placeholder:text-center placeholder:text-[#999] focus:border-[#4AA4FF] focus:shadow-[0_6px_20px_rgba(74,164,255,0.25)] md:p-[18px] md:px-7 md:text-[1.1rem]"
          />
        </div>
      </div>

      {lessons.length === 0 ? (
        <p className="font-roboto mt-40 rounded-2xl border-2 border-dashed border-[#ccc] bg-white/60 p-10 text-center text-xl text-[#888]">
          Hiện tại chưa có bài học
        </p>
      ) : (
        <div className="grid w-full max-w-[1000px] grid-cols-1 gap-8 md:grid-cols-[repeat(auto-fit,minmax(340px,1fr))]">
          {lessons.map((l, idx) => (
            <LessonCard key={idx} lesson={l} />
          ))}
        </div>
      )}
    </div>
  );
}

import { useState } from 'react';
import noPict from '../assets/no_pic.png';
import LessonCardExp from './LessonCardExp';

function LessonCard({ lesson }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        className="flex w-[306px] cursor-pointer flex-col overflow-hidden rounded-[35px] border border-[#e5e5e5] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)] transition-all hover:scale-105 hover:shadow-xl"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="flex h-[133px] w-full items-center justify-center overflow-hidden bg-[#f0f0f0]">
          <img
            className="h-full w-full object-cover"
            src={lesson.image || noPict}
            alt={lesson.image ? lesson.title : 'No Image Available'}
          />
        </div>
        <div className="rounded-b-[35px] border-t border-[#d1fae5] bg-[#ecfdf5] p-3 px-4">
          <h3 className="font-roboto mb-1.5 text-lg font-bold text-black">{lesson.title}</h3>
          <p className="font-roboto mb-2.5 text-base text-black">{lesson.description}</p>
          <p className="text-sm text-[#333]">⭐: {lesson.rating}/5</p>
        </div>
      </div>

      {isModalOpen && <LessonCardExp lesson={lesson} onClose={() => setIsModalOpen(false)} />}
    </>
  );
}

export default LessonCard;

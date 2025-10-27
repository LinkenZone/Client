import noPict from '../assets/no_pic.png';

function LessonCard({ lesson }) {
  return (
    <div className="flex w-[306px] cursor-pointer flex-col overflow-hidden rounded-[35px] border border-[#e5e5e5] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
      <div className="flex h-[133px] w-full items-center justify-center overflow-hidden rounded-t-[35px] bg-[#f0f0f0]">
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
  );
}

export default LessonCard;

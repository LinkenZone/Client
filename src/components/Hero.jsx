import React from "react";
import noPict from "../assets/no_pic.png";

export default function Hero({ infoImg, imageUrl }) {
  const finalImage = infoImg || imageUrl || noPict;

  return (
    <section className="box-border flex w-[90%] items-center justify-center sm:pt-[100px] md:pt-[110px] lg:pt-28">
      <div className="relative h-[clamp(300px,55vh,700px)] w-full max-w-[1600px] overflow-hidden rounded-xl bg-[#f0f0f0] shadow-[0_4px_8px_rgba(0,0,0,0.789)] sm:h-[clamp(220px,45vh,520px)]">
        <img
          src={finalImage}
          alt="Thông báo sự kiện"
          className="block h-full w-full object-cover"
        />
      </div>
    </section>
  );
}

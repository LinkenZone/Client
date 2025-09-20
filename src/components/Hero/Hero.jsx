import React from "react";
import style from "./Hero.module.css";
import noPict from "../../assets/no_pic.png";

export default function Hero({ infoImg, imageUrl }) {
  const finalImage = infoImg || imageUrl || noPict;

  return (
    <section className={style.hero}>
      <div className={style.heroContainer}>
        <img src={finalImage} alt="Thông báo sự kiện" className={style.heroImage} />
      </div>
    </section>
  );
}
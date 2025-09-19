import React from "react";
import styles from "./LessonCard.module.css";
import noPict from "../../assets/no_pic.png";


function LessonCard({ lesson }) {
  return (
    <div className={styles.lessonCard}>
      <div className={styles.lessonImg}>
        <img src={lesson.image || noPict} alt={lesson.image ? lesson.title : "No Image Available"} />
      </div>
      <div className={styles.lessonContent}>
        <h3 className={styles.lessonTitle}>{lesson.title}</h3>
        <p className={styles.lessonDescription}>{lesson.description}</p>
        <p className={styles.lessonRating}>⭐: {lesson.rating}/5</p>
      </div>
    </div>
  );
}


export default LessonCard;
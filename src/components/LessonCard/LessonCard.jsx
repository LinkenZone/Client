import React from "react";
import styles from "./LessonCard.module.css";
import noPict from "../../assets/no_pic.png";
import { useAuth } from "../../context/AuthContext";
import { lessonService } from "../../services/api";


function LessonCard({ lesson }) {
  const { user } = useAuth();

  async function handleClick() {
    try {
      if (user) {
        await lessonService.markRecent(user, lesson);
      }
    } catch (e) {
      // Optional: handle/report error
      // console.error('markRecent failed', e);
    }
  }

  return (
    <div className={styles.lessonCard} onClick={handleClick} style={{ cursor: 'pointer' }}>
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
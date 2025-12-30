"use client";

import { useState } from "react";
import CoursePopupForm from "@/components/CoursePopupForm";
import styles from "./courseDetail.module.css";

export default function CourseEnrollCta({ courseSlug, courseTitle, startDateLabel }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className={styles.ctaButton}
        onClick={() => setOpen(true)}
      >
        Enroll now
        <span className={styles.ctaSub}>{startDateLabel}</span>
      </button>

      <CoursePopupForm
        open={open}
        onClose={() => setOpen(false)}
        defaultCourseSlug={courseSlug}
        contextTitle={courseTitle}
        hideCourseSelect
      />
    </>
  );
}

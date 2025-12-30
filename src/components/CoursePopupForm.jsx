"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import courses from "@/data/courses.json";
import styles from "./coursePopupForm.module.css";

export default function CoursePopupForm({
  open,
  onClose,
  defaultCourseSlug,
  contextTitle,
  hideCourseSelect,
}) {
  const dialogRef = useRef(null);
  const firstFieldRef = useRef(null);
  const courseWrapRef = useRef(null);

  const courseOptions = useMemo(() => {
    return (courses ?? [])
      .map((c) => ({
        value: c.slug,
        label: c.title,
        duration: c.duration,
        level: c.level,
      }))
      .filter((c) => Boolean(c.value) && Boolean(c.label));
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    course: "",
    message: "",
  });

  const resetForm = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      course: "",
      message: "",
    });
  };

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;

    const body = document.body;
    const prevOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    return () => {
      body.style.overflow = prevOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    setSubmitted(false);
    setCourseOpen(false);
    resetForm();

    if (defaultCourseSlug) {
      const exists = courseOptions.some((c) => c.value === defaultCourseSlug);
      if (exists) {
        setFormData((prev) => ({ ...prev, course: defaultCourseSlug }));
      }
    }

    // focus
    const t = window.setTimeout(() => {
      firstFieldRef.current?.focus();
    }, 0);
    return () => window.clearTimeout(t);
  }, [open, courseOptions, defaultCourseSlug]);

  const [courseOpen, setCourseOpen] = useState(false);

  useEffect(() => {
    if (!courseOpen) return;

    const onDocMouseDown = (e) => {
      if (!courseWrapRef.current) return;
      if (courseWrapRef.current.contains(e.target)) return;
      setCourseOpen(false);
    };

    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, [courseOpen]);

  if (!open) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose?.();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = String(formData.email ?? "").trim();
    const phone = String(formData.phone ?? "").trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const phoneOk = /^\d{10}$/.test(phone);

    if (!formData.name.trim()) return;
    if (!emailOk) return;
    if (!phoneOk) return;
    if (!formData.course) return;

    setSubmitted(true);
    // No backend wired in this repo yet — keeping it functional for now.
    // You can connect this to an API route later.
    console.log("Course enquiry submitted:", formData);

    // Clear fields for the next open
    resetForm();

    window.setTimeout(() => {
      onClose?.();
    }, 2000);
  };

  const selectedCourse = courseOptions.find((c) => c.value === formData.course) ?? null;
  const email = String(formData.email ?? "").trim();
  const phone = String(formData.phone ?? "").trim();
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const phoneOk = /^\d{10}$/.test(phone);
  const canSubmit =
    Boolean(formData.name.trim()) &&
    emailOk &&
    phoneOk &&
    Boolean(formData.course);

  const headerTitle = submitted
    ? "Thank you"
    : selectedCourse?.label || contextTitle || "Get Started";

  const headerSubtitle = submitted
    ? "We will connect you soon"
    : "Fill your details and we’ll contact you.";

  const shouldShowCourseField = !hideCourseSelect || !formData.course;

  return (
    <div className={styles.overlay} onMouseDown={handleOverlayClick}>
      <div
        ref={dialogRef}
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-label="Get started form"
      >
        <div className={styles.header}>
          <div>
            <h3 className={styles.title}>{headerTitle}</h3>
            <p className={styles.subtitle}>{headerSubtitle}</p>
          </div>
          <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        {submitted ? (
          <div className={styles.successPopup} role="status" aria-live="polite">
            <div className={styles.tickWrap} aria-hidden="true">
              <svg className={styles.tickSvg} viewBox="0 0 52 52" fill="none">
                <circle className={styles.tickCircle} cx="26" cy="26" r="24" />
                <path className={styles.tickCheck} d="M16 27l7 7 13-15" />
              </svg>
            </div>
            <div className={styles.successMessage}>Thank you! We will connect you soon.</div>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.grid}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="lead-name">
                  Name
                </label>
                <input
                  ref={firstFieldRef}
                  id="lead-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Your name"
                  minLength={2}
                  required
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="lead-phone">
                  Phone
                </label>
                <input
                  id="lead-phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="10-digit number"
                  inputMode="tel"
                  pattern="\\d{10}"
                  minLength={10}
                  maxLength={10}
                  title="Enter a valid 10-digit phone number"
                  required
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="lead-email">
                  Email
                </label>
                <input
                  id="lead-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="you@example.com"
                  type="email"
                  required
                />
              </div>

              {shouldShowCourseField ? (
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="lead-course">
                    Course
                  </label>
                  <div ref={courseWrapRef} className={styles.courseSelect}>
                    <button
                      id="lead-course"
                      type="button"
                      className={styles.courseButton}
                      aria-haspopup="listbox"
                      aria-expanded={courseOpen}
                      onClick={() => setCourseOpen((v) => !v)}
                    >
                      {selectedCourse ? (
                        <span className={styles.courseValue}>{selectedCourse.label}</span>
                      ) : (
                        <span className={styles.coursePlaceholder}>Select your course</span>
                      )}

                      <svg
                        className={styles.courseChevron}
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M6 9l6 6 6-6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    {courseOpen && (
                      <div className={styles.coursePanel} role="listbox" aria-label="Course options">
                        {courseOptions.map((opt) => {
                          const active = opt.value === formData.course;
                          return (
                            <button
                              key={opt.value}
                              type="button"
                              className={`${styles.courseOption} ${active ? styles.courseOptionActive : ""}`}
                              role="option"
                              aria-selected={active}
                              onClick={() => {
                                setFormData((prev) => ({ ...prev, course: opt.value }));
                                setCourseOpen(false);
                              }}
                            >
                              <div className={styles.courseOptionTitle}>{opt.label}</div>
                              <div className={styles.courseOptionMeta}>
                                {opt.level ? <span>{opt.level}</span> : null}
                                {opt.duration ? <span>{opt.duration}</span> : null}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              ) : null}
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="lead-message">
                Message (optional)
              </label>
              <textarea
                id="lead-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={styles.textarea}
                placeholder="What do you want to learn?"
                rows={4}
              />
            </div>

            <div className={styles.actions}>
              <button type="button" className={styles.secondaryBtn} onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className={styles.primaryBtn} disabled={!canSubmit}>
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

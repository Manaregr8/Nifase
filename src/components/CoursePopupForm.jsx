"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
  const [submitting, setSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
    setSubmitting(false);
    setSubmitError("");
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

  if (!open || !mounted) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose?.();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (submitting) return;

    const email = String(formData.email ?? "").trim();
    const phoneRaw = String(formData.phone ?? "").trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const normalizePhone = (value) => {
      const digits = String(value ?? "").replace(/\D/g, "");
      if (digits.length === 10) return digits;
      // Common India formats: +91XXXXXXXXXX, 91XXXXXXXXXX
      if (digits.length === 12 && digits.startsWith("91")) return digits.slice(2);
      // 0XXXXXXXXXX (leading zero)
      if (digits.length === 11 && digits.startsWith("0")) return digits.slice(1);
      return digits;
    };

    const phone = normalizePhone(phoneRaw);
    const phoneOk = /^\d{10}$/.test(phone);

    if (!formData.name.trim()) {
      window.alert("Please enter your name.");
      firstFieldRef.current?.focus();
      return;
    }
    if (!emailOk) {
      window.alert("Please enter a valid email address.");
      document.getElementById("lead-email")?.focus();
      return;
    }
    if (!phoneOk) {
      window.alert("Please enter a valid 10-digit phone number (you can also type +91). ");
      document.getElementById("lead-phone")?.focus();
      return;
    }
    if (!formData.course) {
      window.alert("Please select a course.");
      setCourseOpen(true);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          form: "course-popup",
          name: formData.name,
          phone,
          phoneRaw,
          email: formData.email,
          course: formData.course,
          message: formData.message,
          contextTitle: contextTitle || "",
          defaultCourseSlug: defaultCourseSlug || "",
          pageUrl: typeof window !== "undefined" ? window.location.href : "",
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => null);
        console.error("Lead submission failed", err);
        window.alert(err?.error || "Unable to submit right now. Please try again.");
        return;
      }

      setSubmitted(true);

      // Clear fields for the next open
      resetForm();

      window.setTimeout(() => {
        onClose?.();
      }, 2000);
    } finally {
      setSubmitting(false);
    }
  };

  const selectedCourse = courseOptions.find((c) => c.value === formData.course) ?? null;
  const email = String(formData.email ?? "").trim();
  const phoneRaw = String(formData.phone ?? "").trim();
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const phone = phoneRaw.replace(/\D/g, "");
  const phoneNormalized =
    phone.length === 10
      ? phone
      : phone.length === 12 && phone.startsWith("91")
        ? phone.slice(2)
        : phone.length === 11 && phone.startsWith("0")
          ? phone.slice(1)
          : phone;
  const phoneOk = /^\d{10}$/.test(phoneNormalized);
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

  return createPortal(
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
          <form className={styles.form} onSubmit={handleSubmit} aria-busy={submitting}>
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
                  placeholder="Phone (e.g. 9876543210 or +91 9876543210)"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  maxLength={18}
                  title="Enter a valid phone number"
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
              <button type="submit" className={styles.primaryBtn} disabled={!canSubmit || submitting}>
                Submit
              </button>
            </div>

            {submitError ? (
              <p role="alert" className={styles.errorMessage}>
                {submitError}
              </p>
            ) : null}
          </form>
        )}
      </div>
    </div>,
    document.body
  );
}

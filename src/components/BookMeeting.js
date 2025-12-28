import styles from "./bookmeeting.module.css";

export default function BookMeeting() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* LEFT INFO */}
        <div className={styles.info}>
          <h3 className={styles.brand}>NIFASE</h3>
          <h2 className={styles.title}>30 min Q/A Meeting</h2>

          <ul className={styles.meta}>
            <li>⏱️ 30 minutes</li>
            <li>💻 Online meeting (details after confirmation)</li>
          </ul>

          <p className={styles.note}>
            You’ll get a recommended learning path after the discussion.
            If it feels right, you can enroll — no pressure.
          </p>
        </div>

        {/* RIGHT BOOKING */}
        <div className={styles.booking}>
          <h3 className={styles.bookingTitle}>Select a Date & Time</h3>

          {/* Calendar Header */}
          <div className={styles.calendarHeader}>
            <button>&lt;</button>
            <span>December 2025</span>
            <button>&gt;</button>
          </div>

          {/* Days */}
          <div className={styles.weekdays}>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>

          {/* Dates */}
          <div className={styles.calendarGrid}>
            {[...Array(31)].map((_, i) => (
              <button
                key={i}
                className={i >= 23 && i <= 26 ? styles.activeDate : ""}
              >
                {i + 1}
              </button>
            ))}
          </div>

          {/* Time Slots */}
          <div className={styles.timeSection}>
            <p className={styles.timezone}>
              Time zone: India Standard Time (IST)
            </p>

            <div className={styles.timeSlots}>
              <button>11:30 AM</button>
              <button>12:00 PM</button>
              <button>12:30 PM</button>
              <button>01:00 PM</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

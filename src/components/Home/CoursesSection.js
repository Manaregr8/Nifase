import styles from "./coursessection.module.css";

export default function CoursesSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>
          Our <span>Professional Programs</span>
        </h2>

        <p className={styles.subheading}>
          Industry-aligned certifications and diplomas designed for real-world
          financial market careers.
        </p>

        <div className={styles.grid}>
          {/* COURSE 1 */}
          <div className={styles.card}>
            <div className={styles.badge}>Diploma Program</div>
            <h3>Financial Market Management (DFMM)</h3>

            <ul>
              <li>Capital Market Trading</li>
              <li>Derivatives & F&O</li>
              <li>Commodity & Currency Markets</li>
              <li>Advanced Technical Analysis</li>
            </ul>

            <p className={styles.outcome}>
              In-depth training & certification to become a financial market
              professional.
            </p>
          </div>

          {/* COURSE 2 */}
          <div className={styles.card}>
            <div className={styles.badge}>Diploma Program</div>
            <h3>Research Analyst</h3>

            <ul>
              <li>Fundamental Analysis</li>
              <li>Equity Research & Valuation</li>
              <li>Advanced Technical Analysis</li>
              <li>Capital & Derivatives Markets</li>
            </ul>

            <p className={styles.outcome}>
              Hands-on research training aligned with analyst and equity research
              roles.
            </p>
          </div>

          {/* COURSE 3 */}
          <div className={styles.card}>
            <div className={styles.badge}>Certificate Program</div>
            <h3>Stock Markets</h3>

            <ul>
              <li>Capital Markets</li>
              <li>Derivatives Market</li>
              <li>Technical Analysis</li>
            </ul>

            <p className={styles.outcome}>
              Practical market training for beginners and aspiring traders.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

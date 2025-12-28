import styles from "./whocanlearn.module.css";

export default function WhoCanLearn() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>
          Who <span>Can Learn</span> at NIFASE?
        </h2>

        <p className={styles.subheading}>
          Our programs are designed for individuals from diverse backgrounds who
          want structured, practical, and career-focused financial education.
        </p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>Working Professionals</h3>
            <p>
              Enhance market understanding, decision-making, and financial
              confidence alongside your professional career.
            </p>
          </div>

          <div className={styles.card}>
            <h3>Students</h3>
            <p>
              Build strong foundations in trading, investment concepts, and
              market behavior during college or early education years.
            </p>
          </div>

          <div className={styles.card}>
            <h3>Homemakers</h3>
            <p>
              Learn to understand markets, manage capital wisely, and participate
              confidently in financial decisions.
            </p>
          </div>

          <div className={styles.card}>
            <h3>Business Owners</h3>
            <p>
              Gain clarity on markets, risk, and capital allocation to make
              informed financial and strategic decisions.
            </p>
          </div>

          <div className={styles.card}>
            <h3>Job Seekers</h3>
            <p>
              Prepare for roles in finance, trading, and analytics with
              industry-aligned knowledge and practical exposure.
            </p>
          </div>

          <div className={styles.card}>
            <h3>Freelancers</h3>
            <p>
              Build financial discipline and market awareness while managing
              variable income and global work opportunities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

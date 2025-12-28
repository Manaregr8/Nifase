import styles from "./testimonialsection.module.css";

export default function TestimonialSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>
          What <span>Learners Say</span> About Their Experience
        </h2>

        <p className={styles.subheading}>
          Honest feedback from students learning trading the right way —
          structured, practical, and grounded in real markets.
        </p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <p className={styles.quote}>
              “I used to watch YouTube videos and still felt confused about
              trading. At NIFASE, things finally started making sense because
              concepts were explained step by step with real charts.”
            </p>
            <div className={styles.author}>
              Student <span>• Beginner Trader</span>
            </div>
          </div>

          <div className={styles.card}>
            <p className={styles.quote}>
              “I was expecting quick profits, but instead I learned why patience
              and process matter more. That honesty is what I respect about
              NIFASE.”
            </p>
            <div className={styles.author}>
              New Trader <span>• Learning Discipline</span>
            </div>
          </div>

          <div className={styles.card}>
            <p className={styles.quote}>
              “I used to feel overwhelmed by charts and indicators. The way
              things are explained here made technical analysis feel simple and
              logical.”
            </p>
            <div className={styles.author}>
              Self-Learner <span>• Technical Analysis</span>
            </div>
          </div>

          <div className={styles.card}>
            <p className={styles.quote}>
              “For the first time, I felt that someone understands what
              beginners actually struggle with. The learning pace felt
              comfortable and practical.”
            </p>
            <div className={styles.author}>
              First-Time Market Learner <span>• Foundations</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

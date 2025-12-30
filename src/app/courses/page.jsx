import Link from "next/link";
import Image from "next/image";
import styles from "./courses.module.css";
import courses from "@/data/courses.json";

export const metadata = {
  title: "Courses",
  description: "Explore all NIFASE job-oriented courses and certifications.",
};

export default function CoursesPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>
            All <span>Courses</span>
          </h1>
          <p className={styles.subtitle}>
            Explore job-oriented programs. Click “View Details” to see full
            module-wise syllabus.
          </p>
        </header>

        <section className={styles.grid} aria-label="Course list">
          {courses.map((course) => {
            const highlights = [];
            for (const module of course.modules ?? []) {
              for (const item of module.items ?? []) {
                highlights.push(item);
                if (highlights.length >= 3) break;
              }
              if (highlights.length >= 3) break;
            }

            return (
            <article key={course.id} className={styles.card}>
              <div className={styles.imageWrap}>
                {course.popular && (
                  <span className={styles.popularBadge} aria-label="Popular course">
                    Popular
                  </span>
                )}
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className={styles.image}
                  priority={false}
                />
              </div>
              <div className={styles.cardInner}>
                <div className={styles.badges}>
                  <span className={styles.badge}>{course.level}</span>
                  <span className={styles.badge}>{course.duration}</span>
                </div>

                <div className={styles.meta}>{course.category}</div>

                <h2 className={styles.courseTitle}>{course.title}</h2>
                <p className={styles.desc}>{course.shortDescription}</p>

                {highlights.length > 0 && (
                  <ul className={styles.highlights} aria-label="Key topics">
                    {highlights.map((text) => (
                      <li key={text} className={styles.highlightItem}>
                        {text}
                      </li>
                    ))}
                  </ul>
                )}

                <div className={styles.actions}>
                  <div className={styles.details}>
                    {course.modules?.length || 0} modules
                  </div>
                  <Link className={styles.button} href={`/courses/${course.slug}`}>
                    View Details
                  </Link>
                </div>
              </div>
            </article>
            );
          })}
        </section>
      </div>
    </main>
  );
}

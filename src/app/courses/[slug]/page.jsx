import { notFound } from "next/navigation";
import styles from "./courseDetail.module.css";
import courses from "@/data/courses.json";

export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export function generateMetadata({ params }) {
  const course = courses.find((c) => c.slug === params.slug);
  if (!course) return { title: "Course Not Found" };

  return {
    title: course.title,
    description: course.shortDescription,
  };
}

export default function CourseDetailPage({ params }) {
  const course = courses.find((c) => c.slug === params.slug);
  if (!course) notFound();

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.badges}>
            <span className={styles.badge}>{course.level}</span>
            <span className={styles.badge}>{course.duration}</span>
            <span className={styles.badge}>{course.category}</span>
          </div>

          <h1 className={styles.title}>
            <span>{course.title}</span>
          </h1>

          <p className={styles.desc}>{course.shortDescription}</p>
        </header>

        <section className={styles.modules} aria-label="Course modules">
          {course.modules.map((module, idx) => (
            <article key={`${course.id}-${idx}`} className={styles.module}>
              <h2 className={styles.moduleTitle}>{module.title}</h2>
              <ul className={styles.list}>
                {module.items.map((item, itemIdx) => (
                  <li key={`${course.id}-${idx}-${itemIdx}`}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}

"use client";

import React from "react";
import styles from "./courseComparisonSection.module.css";
import comparison from "@/data/courseComparison.json";

export default function CourseComparisonSection() {
  const rows = (comparison ?? []).flatMap((group) =>
    (group.courses ?? []).map((course, index) => ({
      track: group.track,
      trackRowSpan: index === 0 ? (group.courses ?? []).length : 0,
      name: course.name,
      purpose: course.purpose,
    }))
  );

  return (
    <section className={styles.section} aria-label="Course comparison">
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 className={styles.title}>Course Comparison</h2>
          <p className={styles.subtitle}>
            Compare tracks, course names, and the learning purpose.
          </p>
        </header>

        <div className={styles.tableCard}>
          <div className={styles.tableWrap} role="region" aria-label="Course comparison table">
            <table className={styles.table}>
              <thead>
                <tr>
                  <th scope="col">Track / Category</th>
                  <th scope="col">Course Name</th>
                  <th scope="col">Level / Purpose</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, idx) => (
                  <tr key={`${row.track}-${row.name}-${idx}`}>
                    {row.trackRowSpan ? (
                      <th
                        scope="row"
                        className={styles.trackCell}
                        rowSpan={row.trackRowSpan}
                      >
                        {row.track}
                      </th>
                    ) : null}
                    <td className={styles.nameCell}>{row.name}</td>
                    <td className={styles.purposeCell}>{row.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

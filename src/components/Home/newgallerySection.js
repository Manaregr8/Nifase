import styles from "./gallerysection.module.css";

export default function GallerySection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* LEFT — GALLERY */}
        <div className={styles.gallery}>
          {[
            "6.webp",
            "7.webp",
            "IMG_4066.webp",
            "IMG_4067.webp",
            "IMG_4068.webp",
            "IMG_4071.webp",
          ].map((img, idx) => (
            <div className={styles.imageCard} key={img}>
              <img src={`/center/${img}`} alt={`Gallery Image ${idx + 1}`} />
            </div>
          ))}
        </div>

        {/* RIGHT — CONTENT */}
        <div className={styles.content}>
          <h2 className={styles.heading}>
            Experience Learning in a <span>Professional Campus</span>
          </h2>

          <p className={styles.description}>
            Our campus is designed to reflect a real corporate trading and
            development environment — focused, distraction-free, and
            performance-driven.
          </p>

          <p className={styles.description}>
            From collaborative workspaces to mentor-led discussion zones,
            everything is structured to help students transition seamlessly
            into industry roles.
          </p>

          <div className={styles.highlights}>
            <div>Small Batches • Focused Learning</div>
            <div>Corporate Setup & Discipline</div>
            <div>Mentor-Guided Environment</div>
          </div>
        </div>
      </div>
    </section>
  );
}

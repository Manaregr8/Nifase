"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./homeSection4.module.css";

gsap.registerPlugin(ScrollTrigger);

const HomeSection4 = () => {
  const sectionRef = useRef(null);
  const leftContentRef = useRef(null);
  const rightCardRef = useRef(null);
  const textLinesRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const leftContent = leftContentRef.current;
    const rightCard = rightCardRef.current;

    let mm;
    const ctx = gsap.context(() => {
      mm = gsap.matchMedia();

      mm.add(
        {
          isMobile: "(max-width: 768px)",
          isDesktop: "(min-width: 769px)",
        },
        (context) => {
          const { isMobile } = context.conditions;
          const leftX = isMobile ? -60 : -120;
          const rightX = isMobile ? 70 : 140;
          const linesX = isMobile ? 90 : 220;
          const rightY = isMobile ? 20 : 40;

          // Left content
          gsap.fromTo(
            leftContent,
            { x: leftX, opacity: 0 },
            {
              scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none none",
                once: true,
              },
              x: 0,
              opacity: 1,
              duration: 1.0,
              ease: "power2.out",
            }
          );

          // Right card
          gsap.fromTo(
            rightCard,
            { x: rightX, y: rightY, scale: 0.92, opacity: 0 },
            {
              scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none none",
                once: true,
              },
              x: 0,
              y: 0,
              scale: 1,
              opacity: 1,
              duration: 1.05,
              ease: "power2.out",
            }
          );

          // Text lines
          gsap.fromTo(
            textLinesRef.current,
            { x: linesX, opacity: 0 },
            {
              scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none none",
                once: true,
              },
              x: 0,
              opacity: 1,
              duration: 1.0,
              ease: "power2.out",
              stagger: 0.08,
            }
          );
        }
      );
    }, section);

    return () => {
      mm?.revert();
      ctx.revert();
    };
  }, []);

  return (
    <div ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        {/* Left Section */}
        <div ref={leftContentRef} className={styles.leftSection}>
          <h2 className={styles.heading}>
            Unparalleled Support<br />from Our Associates
          </h2>
          <p className={styles.description}>
            We have a team of associates dedicated 24x7 for providing you with experienced support throughout your journey.
          </p>
          <p className={styles.description}>
            <b>Instant Query Resolution & Expert Assistance:</b> From solving all your queries to answering any questions related to the markets, trading, and investments, we're there with you through thick and thin.
          </p>
          <div className={styles.buttonGroup}>
            <a className={styles.joinButton} href="#lead">
              Book Your 1:1 Consultation Now
            </a>
          </div>
        </div>

        {/* Right Section */}
        <div className={styles.rightSection}>
          <div ref={rightCardRef} className={styles.glassCard}>
            <div className={styles.cardGlow} />
            <div className={styles.cardHeader}>
              <span className={styles.pill}>NIFASE Support</span>
              <span className={styles.badgeDot} />
            </div>
            <p className={styles.cardTitle}>
              From our support team
            </p>
            <p className={styles.cardMeta}>
              Learning markets can feel overwhelming at times — and that's okay.  
              Our team is always available to help you understand things clearly and
              stay on track.
            </p>
          </div>

          {/* ✅ ALTERNATING TEXT STACK */}
          <div className={styles.textStack}>
            {[
              "start earning",
              "start learning",
              "start earning",
              "start learning",
              "start earning",
              "start learning"
            ].map((text, index) => (
              <div
                key={index}
                ref={(el) => (textLinesRef.current[index] = el)}
                className={styles.textLine}
                style={{
                  opacity: 1 - index * 0.12,
                  transform: `translateY(${index * 8}px)`,
                }}
              >
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSection4;

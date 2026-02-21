"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./aboutSection2.module.css";

gsap.registerPlugin(ScrollTrigger);

const AboutSection2 = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;

    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          x: i % 2 === 0 ? -80 : 80,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const items = [
    {
      tag: "The Problem",
      title: "Traders fail structurally, not strategically",
      text: "Most traders lose not because their strategy is wrong — but because of poor risk control, emotional decision-making, and zero performance measurement. Strategy without structure is just speculation.",
    },
    {
      tag: "Our Purpose",
      title: "Institutionalizing trading education in India",
      text: "NIFASE exists to replace speculation with systems, hype with discipline, and randomness with risk-defined execution. We bring institutional-grade standards to every trader, at every level.",
    },
    {
      tag: "Our Method",
      title: "Systems, discipline, and measurable results",
      text: "We don't teach tips or shortcuts. We build traders who operate within defined frameworks — with clear rules, evaluation benchmarks, and capital preservation at the core of every decision.",
    },
  ];

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.bgGlow} />
      <div className={styles.gridOverlay} />

      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.kicker}>Our Mission</p>
          <h2 ref={titleRef} className={styles.title}>
            Built to fix what trading education{" "}
            <span className={styles.titleAccent}>gets wrong.</span>
          </h2>
        </div>

        <div className={styles.cards}>
          {items.map((item, i) => (
            <article
              key={item.title}
              ref={(el) => (cardsRef.current[i] = el)}
              className={styles.card}
            >
              <div className={styles.cardGlow} />
              <div className={styles.cardTopRow}>
                <span className={styles.cardTag}>{item.tag}</span>
                <span className={styles.cardLine} />
              </div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardText}>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection2;
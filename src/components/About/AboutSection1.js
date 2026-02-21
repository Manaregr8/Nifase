"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./aboutSection1.module.css";

gsap.registerPlugin(ScrollTrigger);

const AboutSection1 = () => {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, {
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none none",
        },
        x: -80,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      });

      gsap.from(rightRef.current, {
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none none",
        },
        y: 80,
        scale: 0.92,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      });

      // Idle float
      gsap.to(rightRef.current, {
        y: "+=12",
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.bgGlow} />
      <div className={styles.gridOverlay} />

      <div className={styles.inner}>

        {/* ── LEFT ── */}
        <div ref={leftRef} className={styles.left}>
          <div className={styles.tagRow}>
            <span className={styles.pill}>About NIFASE</span>
            <span className={styles.tagDot} />
          </div>

          <h2 className={styles.heading}>
            Advancing Structured Trading Education with AI.
          </h2>

          <div className={styles.glowBar} />

          <p className={styles.body}>
            NIFASE was established to address a structural gap in modern trading
            education — the absence of institutional-grade risk management and
            measurable capital discipline.
          </p>

          <p className={styles.subBody}>
            We prepare traders to operate within defined frameworks, evaluation
            standards, and capital preservation principles.
          </p>

          <p className={styles.tagline}>
            Structured. Measured. Capital-Disciplined.
          </p>
        </div>

        {/* ── RIGHT – illustration ── */}
        <div ref={rightRef} className={styles.right}>
          <div className={styles.illustrationBox}>
            <p className={styles.illustrationCaption}>
              Capital progression illustration
            </p>

            <div className={styles.chartWrap}>
              <svg
                viewBox="0 0 280 170"
                width="260"
                height="158"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22c55e" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#22c55e" stopOpacity="0.03" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2.5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Area fill under curve */}
                <path
                  d="M28 154 Q75 134 115 114 Q165 88 238 34 L238 154 Z"
                  fill="url(#areaGrad)"
                />

                {/* Trend curve */}
                <path
                  d="M28 154 Q75 134 115 114 Q165 88 238 34"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  filter="url(#glow)"
                />

                {/* Arrowhead */}
                <polygon points="238,34 226,40 231,28" fill="#22c55e" />

                {/* Glowing tip dot */}
                <circle cx="238" cy="34" r="6" fill="#22c55e" opacity="0.3" />
                <circle cx="238" cy="34" r="3.5" fill="#a3e635" />

                {/* Coin stacks */}
                {[
                  { x: 14,  coins: 1 },
                  { x: 54,  coins: 2 },
                  { x: 94,  coins: 3 },
                  { x: 134, coins: 4 },
                  { x: 174, coins: 5 },
                  { x: 210, coins: 7 },
                ].map(({ x, coins }, i) => {
                  const coinH  = 11;
                  const coinW  = 34;
                  const baseY  = 156;

                  return (
                    <g key={i}>
                      {Array.from({ length: coins }).map((_, ci) => {
                        const cy = baseY - ci * coinH;
                        return (
                          <g key={ci}>
                            {/* coin top face */}
                            <ellipse
                              cx={x + coinW / 2}
                              cy={cy}
                              rx={coinW / 2}
                              ry={4.5}
                              fill="#f5c842"
                              stroke="#c8960f"
                              strokeWidth="0.7"
                            />
                            {/* coin side */}
                            <rect
                              x={x}
                              y={cy}
                              width={coinW}
                              height={coinH * 0.5}
                              fill="#e8b320"
                            />
                            {/* coin bottom edge */}
                            <ellipse
                              cx={x + coinW / 2}
                              cy={cy + coinH * 0.5}
                              rx={coinW / 2}
                              ry={4.5}
                              fill="#c8960f"
                            />
                          </g>
                        );
                      })}

                      {/* Green $ badge on tallest stack */}
                      {i === 5 && (
                        <>
                          <circle
                            cx={x + coinW / 2}
                            cy={baseY - (coins - 1) * coinH - 15}
                            r={11}
                            fill="#22c55e"
                            opacity="0.95"
                            filter="url(#glow)"
                          />
                          <text
                            x={x + coinW / 2}
                            y={baseY - (coins - 1) * coinH - 11}
                            textAnchor="middle"
                            fontSize="12"
                            fontWeight="bold"
                            fill="#fff"
                            fontFamily="sans-serif"
                          >
                            $
                          </text>
                        </>
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection1;
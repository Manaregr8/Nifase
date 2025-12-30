"use client";

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './homeSection2.module.css';

gsap.registerPlugin(ScrollTrigger);

const HomeSection2 = () => {
    const sectionRef = useRef(null);
    const statsRef = useRef([]);
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(false);
    const [counts, setCounts] = useState({
        paidout: 0,
        traders: 0,
        countries: 0,
        processing: 0
    });

    useEffect(() => {
        const section = sectionRef.current;
        
        // Pin the section and create scroll animation
        const ctx = gsap.context(() => {
            // Pin section
            ScrollTrigger.create({
                trigger: section,
                start: 'top top',
                end: '+=50%',
                pin: true,
                pinSpacing: true,
                scrub: 1,
            });

            // Animate content on scroll
            gsap.from(`.${styles.heading}`, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top center',
                    end: 'center center',
                    scrub: 1,
                },
                opacity: 0,
                y: 50,
            });

            gsap.from(`.${styles.description}`, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top center',
                    end: 'center center',
                    scrub: 1,
                },
                opacity: 0,
                y: 30,
                delay: 0.2,
            });

            // Animate stats cards
            statsRef.current.forEach((card, index) => {
                if (card) {
                    gsap.from(card, {
                        scrollTrigger: {
                            trigger: section,
                            start: 'top center',
                            end: 'center center',
                            scrub: 1,
                        },
                        opacity: 0,
                        scale: 0.9,
                        y: 50,
                        delay: 0.1 * index,
                    });
                }
            });

            // Animate numbers with counter
            ScrollTrigger.create({
                trigger: section,
                start: 'top center',
                onEnter: () => animateNumbers(),
            });

            // Neon light animation
            const path = `.${styles.neonPath}`;
            gsap.to(path, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top center',
                    end: 'bottom top',
                    scrub: 1,
                },
                strokeDashoffset: 0,
                duration: 2,
                ease: 'none',
            });

        }, section);

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const syncPlaying = () => setIsPlaying(!video.paused);
        const onVolumeChange = () => setIsMuted(video.muted);

        video.addEventListener('play', syncPlaying);
        video.addEventListener('pause', syncPlaying);
        video.addEventListener('volumechange', onVolumeChange);

        // Try to autoplay with sound (may be blocked by browser autoplay policy)
        video.muted = false;
        video.volume = 1;
        const playAttempt = video.play();
        if (playAttempt && typeof playAttempt.catch === 'function') {
            playAttempt.catch(() => {
                video.muted = true;
                setIsMuted(true);
                video.play().catch(() => {});
            });
        }

        // Initialize states
        syncPlaying();
        onVolumeChange();

        return () => {
            video.removeEventListener('play', syncPlaying);
            video.removeEventListener('pause', syncPlaying);
            video.removeEventListener('volumechange', onVolumeChange);
        };
    }, []);

    const handleTogglePlay = async () => {
        const video = videoRef.current;
        if (!video) return;

        if (video.paused) {
            // User interaction: try to turn audio on
            video.muted = false;
            video.volume = 1;
            try {
                await video.play();
            } catch {
                video.muted = true;
                setIsMuted(true);
                try {
                    await video.play();
                } catch {
                    // ignore
                }
            }
        } else {
            video.pause();
        }
    };

    const animateNumbers = () => {
        // Animate paidout
        gsap.to(counts, {
            paidout: 394,
            duration: 2,
            ease: 'power2.out',
            onUpdate: function() {
                setCounts(prev => ({ ...prev, paidout: Math.floor(this.targets()[0].paidout) }));
            }
        });

        // Animate traders
        gsap.to(counts, {
            traders: 14,
            duration: 2,
            ease: 'power2.out',
            onUpdate: function() {
                setCounts(prev => ({ ...prev, traders: Math.floor(this.targets()[0].traders) }));
            }
        });

        // Animate countries
        gsap.to(counts, {
            countries: 144,
            duration: 2,
            ease: 'power2.out',
            onUpdate: function() {
                setCounts(prev => ({ ...prev, countries: Math.floor(this.targets()[0].countries) }));
            }
        });

        // Animate processing
        gsap.to(counts, {
            processing: 13,
            duration: 2,
            ease: 'power2.out',
            onUpdate: function() {
                setCounts(prev => ({ ...prev, processing: Math.floor(this.targets()[0].processing) }));
            }
        });
    };

    return (
        <div ref={sectionRef} className={styles.section}>
            <div className={styles.container}>
                {/* SVG for neon light path */}
                <svg className={styles.neonSvg} viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
                    <path
                        className={styles.neonPath}
                        d="M 100 100 L 550 100 L 550 300 L 850 300 L 850 450 L 550 450 L 550 650 L 100 650 L 100 100"
                        fill="none"
                        stroke="rgba(34, 197, 94, 0.8)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        filter="url(#glow)"
                    />
                    <defs>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                            <feMerge>
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                        </filter>
                    </defs>
                </svg>

                {/* Header */}
                <div className={styles.header}>
                    <h2 className={styles.heading}>
                        Traders from more than<br />
                        150 countries around the world<br />
                        have registered!
                    </h2>
                    <p className={styles.description}>
                        We provide unique trading programs for Forex traders, based upon which<br />
                        we search for the best options to work together with. We provide you with<br />
                        Trading accounts that you can use to trade and earn commission<br />
                        without the risk of losing your own funds!
                    </p>
                </div>

                {/* Stats Grid */}
                <div className={styles.statsGrid}>
                    {/* Stat 1 - Top Left */}
                    <div 
                        ref={el => statsRef.current[0] = el}
                        className={`${styles.statCard} ${styles.statCardTopLeft}`}
                    >
                        <div className={styles.statNumber}>
                            ${counts.paidout}K<span className={styles.plus}>+</span>
                        </div>
                        <div className={styles.statLabel}>Paid out to Fxology Traders</div>
                    </div>

                    {/* Stat 2 - Top Right */}
                    <div 
                        ref={el => statsRef.current[1] = el}
                        className={`${styles.statCard} ${styles.statCardTopRight}`}
                    >
                        <div className={styles.statNumber}>
                            {counts.traders}K<span className={styles.plus}>+</span>
                        </div>
                        <div className={styles.statLabel}>No. of Fxology traders</div>
                    </div>

                    {/* Stat 3 - Bottom Left */}
                    <div 
                        ref={el => statsRef.current[2] = el}
                        className={`${styles.statCard} ${styles.statCardBottomLeft}`}
                    >
                        <div className={styles.statNumber}>
                            {counts.countries}<span className={styles.plus}>+</span>
                        </div>
                        <div className={styles.statLabel}>
                            No. of countries with traders<br />registered at Fxology
                        </div>
                    </div>

                    {/* Stat 4 - Bottom Right */}
                    <div 
                        ref={el => statsRef.current[3] = el}
                        className={`${styles.statCard} ${styles.statCardBottomRight}`}
                    >
                        <div className={styles.statNumber}>
                            {counts.processing}h
                        </div>
                        <div className={styles.statLabel}>Avg payout processing time</div>
                    </div>

                    {/* Center Video/Image */}
                    <div className={styles.centerMedia}>
                        <video
                            ref={videoRef}
                            className={styles.video}
                            autoPlay
                            loop
                            playsInline
                            preload="metadata"
                        >
                            <source
                                src="https://www.pexels.com/download/video/5726502/"
                                type="video/mp4"
                            />
                        </video>

                        <button
                            type="button"
                            className={styles.mediaControl}
                            onClick={handleTogglePlay}
                            aria-label={isPlaying ? 'Pause video' : 'Play video'}
                            aria-pressed={isPlaying}
                            title={isMuted ? 'Audio may be blocked until you tap' : undefined}
                        >
                            {isPlaying ? (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                    <path d="M6 5h4v14H6V5Zm8 0h4v14h-4V5Z" />
                                </svg>
                            ) : (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                    <path d="M8 5v14l11-7L8 5Z" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeSection2;
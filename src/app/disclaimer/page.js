"use client";

import { useEffect, useRef } from "react";
import Head from "next/head";

const sections = [
  {
    num: "01",
    title: "General Information Only",
    highlight: "Any reliance you place on such information is therefore strictly at your own risk.",
    body: [
      `The information provided on nifase.com is for general informational purposes only. While we strive to keep the information up to date and accurate, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the website or the information, products, services, or related graphics contained on the website for any purpose.`,
    ],
  },
  {
    num: "02",
    title: "No Professional Advice",
    body: [
      `Nothing on this website constitutes professional advice — whether legal, financial, medical, or otherwise. The content is not a substitute for professional advice tailored to your specific circumstances. Always seek the guidance of a qualified professional with any questions you may have regarding your individual situation.`,
      `Nifase expressly disclaims all liability for any actions taken or not taken based on any or all of the contents of this website.`,
    ],
  },
  {
    num: "03",
    title: "Limitation of Liability",
    body: [
      `In no event will Nifase, its affiliates, directors, employees, or agents be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising out of or in connection with your access to or use of, or inability to access or use, this website or any content herein.`,
      `This limitation applies regardless of the legal theory on which such claim is based, even if Nifase has been advised of the possibility of such damages.`,
    ],
  },
  {
    num: "04",
    title: "External Links",
    body: [
      `This website may contain links to third-party websites for your convenience and informational purposes. These links do not signify endorsement of those sites or their content. Nifase has no control over the nature, content, or availability of external sites and accepts no responsibility for them or for any loss or damage that may arise from your use of them.`,
    ],
  },
  {
    num: "05",
    title: "Accuracy & Availability",
    body: [
      `Every effort is made to keep the website running smoothly. However, Nifase takes no responsibility for, and will not be liable for, the website being temporarily unavailable due to technical issues beyond our control.`,
      `The information on this site may be out of date at any given time. We are under no obligation to update such information unless required by applicable law.`,
    ],
  },
  {
    num: "06",
    title: "Intellectual Property",
    body: [
      `All content published and made available on nifase.com is the property of Nifase and the website's creators. This includes, but is not limited to, images, text, logos, documents, downloadable files, and anything that contributes to the composition of this website.`,
    ],
  },
  {
    num: "07",
    title: "Changes to This Disclaimer",
    body: [
      `We reserve the right to update or modify this disclaimer at any time without prior notice. Your continued use of the website following any changes constitutes your acceptance of the updated disclaimer. We encourage you to review this page periodically.`,
    ],
    contact: true,
  },
];

export default function DisclaimerPage() {
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.08 }
    );
    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Head>
        <title>Disclaimer — Nifase</title>
        <meta name="description" content="Disclaimer for nifase.com" />
      </Head>

      <style>{`
        :root {
          --bg: #050505;
          --card: #0d0d0d;
          --border: #1a1a1a;
          --border2: #222222;
          --green: #3ddc64;
          --green-dim: rgba(61,220,100,0.07);
          --green-border: rgba(61,220,100,0.18);
          --text: #ffffff;
          --text2: #a0a0a0;
          --muted: #4a4a4a;
        }

        .disclaimer-page {
          background: var(--bg);
          color: var(--text);
          font-family: 'Inter', sans-serif;
          min-height: 100vh;
          overflow-x: hidden;
        }

        /* HERO */
        .hero {
          padding: 6rem 5rem 4.5rem;
          max-width: 1080px;
          animation: fadeUp 0.7s 0.1s ease both;
          position: relative;
          overflow: hidden;
        }

        .hero-glow {
          position: absolute;
          top: -60px; right: -100px;
          width: 600px; height: 500px;
          background: radial-gradient(ellipse, rgba(61,220,100,0.05) 0%, transparent 65%);
          pointer-events: none;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--green-dim);
          border: 1px solid var(--green-border);
          border-radius: 100px;
          padding: 0.3rem 0.9rem;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--green);
          margin-bottom: 1.75rem;
        }

        .badge-dot {
          width: 5px; height: 5px;
          background: var(--green);
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }

        .hero-title {
          font-size: clamp(3.2rem, 7.5vw, 6rem);
          font-weight: 900;
          line-height: 0.92;
          letter-spacing: -0.04em;
          margin-bottom: 1.75rem;
        }

        .hero-title .white { color: var(--text); }
        .hero-title .green { color: var(--green); }

        .hero-desc {
          font-size: 1rem;
          font-weight: 400;
          color: var(--text2);
          line-height: 1.75;
          max-width: 520px;
          margin-bottom: 3rem;
        }

        .hero-meta {
          display: flex;
          align-items: stretch;
          border: 1px solid var(--border2);
          border-radius: 12px;
          overflow: hidden;
          width: fit-content;
          background: var(--card);
        }

        .meta-item {
          padding: 0.9rem 1.75rem;
          border-right: 1px solid var(--border2);
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }
        .meta-item:last-child { border-right: none; }

        .meta-label {
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--muted);
        }

        .meta-value {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text);
        }

        /* DIVIDER */
        .divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--border2) 12%, var(--border2) 88%, transparent);
          margin: 0 5rem;
        }

        /* CONTENT */
        .content {
          max-width: 1080px;
          padding: 4.5rem 5rem 8rem;
        }

        .section {
          display: grid;
          grid-template-columns: 56px 1fr;
          gap: 0 2.5rem;
          padding: 2.75rem 0;
          border-bottom: 1px solid var(--border);
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }

        .section.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .section:last-child { border-bottom: none; }

        .section-left {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding-top: 0.15rem;
        }

        .section-num {
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: var(--green);
          background: var(--green-dim);
          border: 1px solid var(--green-border);
          border-radius: 6px;
          padding: 0.25rem 0.5rem;
          line-height: 1;
        }

        .section-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 0.85rem;
          letter-spacing: -0.02em;
          line-height: 1.3;
        }

        .body-text {
          font-size: 0.91rem;
          line-height: 1.9;
          color: var(--text2);
          font-weight: 400;
          margin-bottom: 0.8rem;
        }
        .body-text:last-child { margin-bottom: 0; }

        .highlight {
          background: var(--green-dim);
          border: 1px solid var(--green-border);
          border-left: 3px solid var(--green);
          padding: 0.9rem 1.2rem;
          margin: 1.1rem 0;
          border-radius: 0 8px 8px 0;
        }

        .highlight p {
          font-size: 0.86rem;
          font-weight: 600;
          color: var(--green);
          line-height: 1.65;
          margin: 0;
        }

        .inline-link {
          color: var(--green);
          text-decoration: none;
          font-weight: 600;
          border-bottom: 1px solid rgba(61,220,100,0.3);
          transition: border-color 0.2s;
        }
        .inline-link:hover { border-color: var(--green); }

        /* ANIMATIONS */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }

        /* RESPONSIVE */
        @media (max-width: 768px) {
          .hero { padding: 3rem 1.5rem 2.5rem; }
          .divider { margin: 0 1.5rem; }
          .content { padding: 3rem 1.5rem 5rem; }
          .section { grid-template-columns: 1fr; gap: 0.6rem; }
          .hero-meta { flex-direction: column; width: 100%; }
          .meta-item { border-right: none; border-bottom: 1px solid var(--border2); }
          .meta-item:last-child { border-bottom: none; }
        }
      `}</style>

      <div className="disclaimer-page">

        {/* Hero */}
        <div className="hero">
          <div className="hero-glow" />
          <div className="badge">
            <div className="badge-dot" />
            Legal Document
          </div>
          <h1 className="hero-title">
            <span className="white">Dis</span>
            <span className="green">claimer</span>
          </h1>
          <p className="hero-desc">
            Please read this disclaimer carefully before using nifase.com. By accessing our platform, you acknowledge and agree to the terms outlined below.
          </p>
          <div className="hero-meta">
            <div className="meta-item">
              <span className="meta-label">Website</span>
              <span className="meta-value">nifase.com</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Effective Date</span>
              <span className="meta-value">February 26, 2026</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Jurisdiction</span>
              <span className="meta-value">As Applicable</span>
            </div>
          </div>
        </div>

        <div className="divider" />

        {/* Sections */}
        <div className="content">
          {sections.map((section, i) => (
            <div
              key={section.num}
              className="section"
              ref={(el) => (sectionRefs.current[i] = el)}
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <div className="section-left">
                <div className="section-num">{section.num}</div>
              </div>
              <div className="section-body">
                <h2 className="section-title">{section.title}</h2>
                {section.body.map((text, j) => (
                  <p key={j} className="body-text">{text}</p>
                ))}
                {section.highlight && (
                  <div className="highlight">
                    <p>{section.highlight}</p>
                  </div>
                )}
                {section.contact && (
                  <p className="body-text">
                    If you have questions about this disclaimer, you may reach us at{" "}
                    <a href="mailto:legal@nifase.com" className="inline-link">
                      legal@nifase.com
                    </a>.
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </>
  );
}
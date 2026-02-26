"use client";

import { useEffect, useRef } from "react";
import Head from "next/head";
import Link from "next/link";

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
      { threshold: 0.1 }
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
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </Head>

      <style>{`
        :root {
          --bg: #080808;
          --surface: #111111;
          --border: #1e1e1e;
          --accent: #c8a96e;
          --accent-dim: rgba(200,169,110,0.12);
          --text: #e8e2d9;
          --muted: #666;
          --faint: #1c1c1c;
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: var(--bg);
          color: var(--text);
          font-family: 'DM Sans', sans-serif;
          font-weight: 300;
          min-height: 100vh;
          overflow-x: hidden;
        }

        .grain {
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 999;
          opacity: 0.4;
        }

        .header {
          border-bottom: 1px solid var(--border);
          padding: 1.5rem 4rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          background: rgba(8,8,8,0.92);
          backdrop-filter: blur(12px);
          z-index: 100;
          animation: fadeDown 0.6s ease both;
        }

        .logo {
          font-family: 'Playfair Display', serif;
          font-size: 1.35rem;
          letter-spacing: 0.12em;
          color: var(--text);
          text-decoration: none;
          text-transform: uppercase;
        }

        .logo-accent { color: var(--accent); }

        .nav-link {
          font-size: 0.8rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--muted);
          text-decoration: none;
          transition: color 0.2s;
        }

        .nav-link:hover { color: var(--accent); }

        .hero {
          padding: 7rem 4rem 4rem;
          max-width: 900px;
          animation: fadeUp 0.8s 0.2s ease both;
        }

        .label {
          font-size: 0.72rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .label::before {
          content: '';
          display: block;
          width: 2rem;
          height: 1px;
          background: var(--accent);
        }

        h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.8rem, 6vw, 5rem);
          font-weight: 400;
          line-height: 1.05;
          color: var(--text);
          margin-bottom: 1.5rem;
        }

        h1 em {
          font-style: italic;
          color: var(--accent);
        }

        .hero-meta {
          font-size: 0.8rem;
          letter-spacing: 0.06em;
          color: var(--muted);
          padding-top: 1.5rem;
          border-top: 1px solid var(--border);
          display: flex;
          gap: 2.5rem;
          flex-wrap: wrap;
        }

        .meta-item {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }

        .meta-label {
          color: var(--text);
          font-weight: 500;
          font-size: 0.85rem;
        }

        .divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--border) 20%, var(--border) 80%, transparent);
          margin: 0 4rem;
        }

        .content {
          max-width: 900px;
          padding: 4rem 4rem 8rem;
          animation: fadeUp 0.8s 0.4s ease both;
        }

        .section {
          margin-bottom: 0;
          display: grid;
          grid-template-columns: 220px 1fr;
          gap: 3rem;
          align-items: start;
          padding-bottom: 3.5rem;
          margin-bottom: 3.5rem;
          border-bottom: 1px solid var(--border);
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .section.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .section:last-of-type { border-bottom: none; }

        .section-num {
          font-family: 'Playfair Display', serif;
          font-size: 3.5rem;
          font-weight: 400;
          color: var(--faint);
          line-height: 1;
          user-select: none;
        }

        h2 {
          font-family: 'Playfair Display', serif;
          font-size: 1.3rem;
          font-weight: 400;
          color: var(--text);
          margin-bottom: 1rem;
          letter-spacing: 0.02em;
        }

        .body-text {
          font-size: 0.95rem;
          line-height: 1.85;
          color: #999;
          margin-bottom: 1rem;
        }

        .body-text:last-child { margin-bottom: 0; }

        .highlight {
          background: var(--accent-dim);
          border-left: 2px solid var(--accent);
          padding: 1.25rem 1.5rem;
          margin: 1.5rem 0;
          border-radius: 0 4px 4px 0;
        }

        .highlight p {
          color: #bba97a;
          font-size: 0.95rem;
          line-height: 1.7;
          margin: 0;
        }

        .inline-link {
          color: var(--accent);
          text-decoration: none;
          border-bottom: 1px solid rgba(200,169,110,0.3);
          transition: border-color 0.2s;
        }

        .inline-link:hover { border-color: var(--accent); }

        .footer {
          border-top: 1px solid var(--border);
          padding: 2rem 4rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.78rem;
          color: var(--muted);
          letter-spacing: 0.05em;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .footer-links {
          display: flex;
          gap: 1.2rem;
          align-items: center;
        }

        .footer-link {
          color: var(--muted);
          text-decoration: none;
          transition: color 0.2s;
        }

        .footer-link:hover { color: var(--accent); }

        .footer-sep { color: var(--border); }

        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 680px) {
          .header { padding: 1.2rem 1.5rem; }
          .hero { padding: 4rem 1.5rem 3rem; }
          .divider { margin: 0 1.5rem; }
          .content { padding: 3rem 1.5rem 5rem; }
          .section { grid-template-columns: 1fr; gap: 0.5rem; }
          .section-num { font-size: 2rem; }
          .footer { padding: 1.5rem; flex-direction: column; text-align: center; }
        }
      `}</style>

      <div className="grain" aria-hidden="true" />

      <header className="header">
        <Link href="/" className="logo">
          Nif<span className="logo-accent">a</span>se
        </Link>
        <Link href="/" className="nav-link">← Back to Home</Link>
      </header>

      <div className="hero">
        <div className="label">Legal</div>
        <h1>Dis<em>claimer</em></h1>
        <div className="hero-meta">
          <div className="meta-item">
            <span className="meta-label">Nifase.com</span>
            <span>Website Disclaimer</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Effective</span>
            <span>February 26, 2026</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Jurisdiction</span>
            <span>As Applicable</span>
          </div>
        </div>
      </div>

      <div className="divider" />

      <div className="content">
        {sections.map((section, i) => (
          <div
            key={section.num}
            className="section"
            ref={(el) => (sectionRefs.current[i] = el)}
          >
            <div className="section-num">{section.num}</div>
            <div>
              <h2>{section.title}</h2>
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
                  </a>
                  .
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <footer className="footer">
        <span>© {new Date().getFullYear()} Nifase.com — All rights reserved.</span>
        <div className="footer-links">
          <Link href="/privacy" className="footer-link">Privacy Policy</Link>
          <span className="footer-sep">·</span>
          <Link href="/terms" className="footer-link">Terms of Use</Link>
          <span className="footer-sep">·</span>
          <Link href="/contact" className="footer-link">Contact</Link>
        </div>
      </footer>
    </>
  );
}
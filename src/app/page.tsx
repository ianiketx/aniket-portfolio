// @ts-nocheck
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useInView } from "framer-motion";

// ─── FONTS & GLOBAL STYLES ────────────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&family=JetBrains+Mono:wght@300;400;500&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; font-size: 16px; }

    :root {
      --ink:     #08080f;
      --ink2:    #0d0d18;
      --amber:   #f0a500;
      --amber2:  #ffc840;
      --slate:   #94a3b8;
      --slate2:  #64748b;
      --white:   #f8fafc;
      --off:     #e2e8f0;
      --line:    rgba(240,165,0,0.12);
      --line2:   rgba(248,250,252,0.06);
      --serif:   'DM Serif Display', Georgia, serif;
      --sans:    'DM Sans', system-ui, sans-serif;
      --mono:    'JetBrains Mono', monospace;
    }

    body { background: var(--ink); color: var(--off); font-family: var(--sans); font-weight: 300; cursor: none; overflow-x: hidden; }

    #ab-cursor { position: fixed; width: 8px; height: 8px; background: var(--amber); border-radius: 50%; pointer-events: none; z-index: 99999; transition: transform 0.15s; transform: translate(-50%, -50%); }
    #ab-cursor-trail { position: fixed; width: 32px; height: 32px; border: 1px solid rgba(240,165,0,0.4); border-radius: 50%; pointer-events: none; z-index: 99998; transition: all 0.25s; transform: translate(-50%, -50%); }

    .grid-bg { position: fixed; inset: 0; z-index: 0; pointer-events: none; background-image: linear-gradient(var(--line2) 1px, transparent 1px), linear-gradient(90deg, var(--line2) 1px, transparent 1px); background-size: 80px 80px; }
    @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }

    .section-label { font-family: var(--mono); font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--amber); opacity: 0.7; }
    .display-heading { font-family: var(--serif); font-weight: 400; color: var(--white); line-height: 1.1; }
    .card-premium { background: rgba(13,13,24,0.7); border: 1px solid var(--line2); backdrop-filter: blur(16px); }
    .tag { font-family: var(--mono); font-size: 10px; padding: 3px 10px; border: 1px solid rgba(240,165,0,0.2); color: var(--slate); background: rgba(240,165,0,0.04); }
    .btn-outline { font-family: var(--mono); font-size: 11px; padding: 10px 24px; color: var(--amber); border: 1px solid rgba(240,165,0,0.4); text-decoration: none; display: inline-block; }
    
    /* Social Icon Styles from Uiverse */
    .social-container { list-style: none; display: flex; gap: 20px; }
    .icon-content { position: relative; }
    .icon-content .tooltip { position: absolute; top: -30px; left: 50%; transform: translateX(-50%); background: #fff; color: #000; padding: 4px 8px; border-radius: 4px; opacity: 0; visibility: hidden; font-size: 11px; transition: 0.3s; }
    .icon-content:hover .tooltip { opacity: 1; visibility: visible; top: -45px; }
    .icon-content .link { width: 45px; height: 45px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: #111; border: 1px solid #333; transition: 0.3s; }
    .icon-content .link svg { width: 20px; height: 20px; fill: #fff; }
    .icon-content .link[data-social="linkedin"]:hover { background: #0077b5; }
    .icon-content .link[data-social="github"]:hover { background: #333; }
  `}</style>
);

// ─── HELPER COMPONENTS ────────────────────────────────────────────────────────

const Cursor = () => {
  const cursorRef = useRef<any>(null);
  const trailRef = useRef<any>(null);
  useEffect(() => {
    const move = (e: any) => {
      if (cursorRef.current) { cursorRef.current.style.left = e.clientX + "px"; cursorRef.current.style.top = e.clientY + "px"; }
      if (trailRef.current) { trailRef.current.style.left = e.clientX + "px"; trailRef.current.style.top = e.clientY + "px"; }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <>
      <div id="ab-cursor" ref={cursorRef} />
      <div id="ab-cursor-trail" ref={trailRef} />
    </>
  );
};

const DataTicker = () => {
  const items = ["SQL ████ 95", "POWER BI ████ 90", "PYTHON ████ 85", "STATISTICAL ANALYSIS ████ 88", "DATABRICKS ████ 80", "GLASGOW, UK 🇬🇧", "AVAILABLE NOW"];
  return (
    <div style={{ overflow: "hidden", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", padding: "10px 0", background: "rgba(240,165,0,0.03)" }}>
      <div style={{ display: "flex", gap: "48px", animation: "ticker 40s linear infinite", whiteSpace: "nowrap", width: "max-content" }}>
        {[...items, ...items].map((item, i) => (
          <span key={i} style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--slate2)", letterSpacing: "0.15em" }}>{item}</span>
        ))}
      </div>
    </div>
  );
};

const SkillBar = ({ name, value, delay = 0 }: any) => {
  const [filled, setFilled] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => { if (inView) setTimeout(() => setFilled(value), delay); }, [inView, value, delay]);
  return (
    <div ref={ref} style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--slate)" }}>{name}</span>
        <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--amber)" }}>{value}%</span>
      </div>
      <div style={{ height: 2, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
        <div style={{ width: `${filled}%`, height: "100%", background: "var(--amber)", transition: "width 1.5s ease" }} />
      </div>
    </div>
  );
};

// ─── MAIN PORTFOLIO ───────────────────────────────────────────────────────────

export default function AniketPortfolio() {
  const [isLaunched, setIsLaunched] = useState(false);
  const [activeProject, setActiveProject] = useState<any>(null);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const projects = [
    {
      id: "p1", title: "Indian Roads Accident Analysis", org: "Databricks · Python · MLflow",
      bullets: ["Three-layer Unity Catalog schema (raw → processed → features).", "Engineered composite danger scores using PySpark.", "Trained XGBoost classifiers with class imbalance handling.", "Tracked 15+ experiments via MLflow."]
    },
    {
      id: "p2", title: "NHS Logistics — Strategic Analysis", org: "NHS · SQL · Power BI",
      summary: "Support for £3.2m strategic investment.",
      bullets: ["Cleansed NHS operational data from 4 disparate sources.", "Identified 72% of delays at a single external logistics stage.", "Executive Power BI reporting for senior stakeholders."]
    }
  ];

  return (
    <div style={{ background: "var(--ink)", minHeight: "100vh" }}>
      <GlobalStyles />
      <Cursor />

      <AnimatePresence>
        {!isLaunched && (
          <motion.div className="launch-overlay" exit={{ opacity: 0, scale: 1.1 }} transition={{ duration: 0.6 }}>
            <button className="box" onClick={() => setIsLaunched(true)}>
              <span>Enter<br/>Portfolio</span>
              <i></i>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {isLaunched && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="grid-bg" />
          <motion.div style={{ position: "fixed", top: 0, left: 0, right: 0, height: "2px", scaleX, background: "var(--amber)", zIndex: 1000, transformOrigin: "0%" }} />

          {/* NAV */}
          <nav style={{ position: "fixed", top: 0, width: "100%", zIndex: 500, padding: "0 40px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", background: scrolled ? "rgba(8,8,15,0.9)" : "transparent", backdropFilter: "blur(10px)" }}>
            <div style={{ fontFamily: "var(--mono)", color: "var(--amber)" }}>AB</div>
            <div style={{ display: "flex", gap: 32 }}>
              <a href="#work" className="nav-link">Work</a>
              <a href="#projects" className="nav-link">Projects</a>
              <a href="#skills" className="nav-link">Skills</a>
            </div>
          </nav>

          <main style={{ position: "relative", zIndex: 10 }}>
            {/* HERO */}
            <section style={{ minHeight: "100vh", padding: "120px 80px", maxWidth: 1200, margin: "0 auto", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <span className="section-label" style={{ marginBottom: 24 }}>Junior Data Analyst</span>
              <h1 className="display-heading" style={{ fontSize: "clamp(48px, 8vw, 100px)", color: "var(--amber)" }}>Aniket Bansal</h1>
              <p style={{ maxWidth: 600, fontSize: 18, color: "var(--slate)", marginTop: 24 }}>MSc Data Analytics graduate (University of Strathclyde). Converting claims data and market trends into actionable commercial strategy.</p>
              <div style={{ marginTop: 48, display: "flex", gap: 20 }}>
                <a href="mailto:ianiketbansalx@gmail.com" className="btn-outline">Email Me</a>
                <a href="#work" className="btn-outline">View Experience</a>
              </div>
            </section>

            <DataTicker />

            {/* EXPERIENCE */}
            <section id="work" style={{ padding: "120px 80px", maxWidth: 1200, margin: "0 auto" }}>
              <span className="section-label">01 — Experience</span>
              <div className="card-premium" style={{ padding: 48, marginTop: 40 }}>
                <h3 style={{ color: "var(--white)", fontSize: 24, marginBottom: 8 }}>Damage Fixer Handler — Existing Claims</h3>
                <div style={{ fontFamily: "var(--mono)", color: "var(--amber)", fontSize: 12, marginBottom: 24 }}>Direct Line Group (AVIVA) · Glasgow, UK · Nov 2025 - Present</div>
                <ul style={{ color: "var(--slate)", fontSize: 14, display: "flex", flexDirection: "column", gap: 12 }}>
                  <li>Handle inquiries in the Existing Claims department, ensuring high-quality customer care and settlement accuracy.</li>
                  <li>Monitor claim data daily to identify and resolve recurring issues.</li>
                  <li>Bridge the gap between frontline customer care and operational reporting using pivot tables and internal databases.</li>
                </ul>
              </div>
            </section>

            {/* FOOTER */}
            <footer style={{ padding: "100px 80px", borderTop: "1px solid var(--line2)", textAlign: "center" }}>
              <h2 className="display-heading" style={{ fontSize: 40, marginBottom: 40 }}>Connect</h2>
              <ul className="social-container" style={{ justifyContent: "center" }}>
                <li className="icon-content">
                  <div className="tooltip">LinkedIn</div>
                  <a href="http://www.linkedin.com/in/ianiketx" target="_blank" className="link" data-social="linkedin">
                    <svg viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </a>
                </li>
                <li className="icon-content">
                  <div className="tooltip">GitHub</div>
                  <a href="https://github.com/ianiketx" target="_blank" className="link" data-social="github">
                    <svg viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  </a>
                </li>
              </ul>
            </footer>
          </main>
        </motion.div>
      )}

      {/* MODALS */}
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </div>
  );
}
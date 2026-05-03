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
      --ink3:    #141420;
      --amber:   #f0a500;
      --amber2:  #ffc840;
      --slate:   #94a3b8;
      --slate2:  #64748b;
      --white:   #f8fafc;
      --off:     #e2e8f0;
      --line:    rgba(240,165,0,0.12);
      --line2:   rgba(248,250,252,0.06);
      --blue:    #38bdf8;
      --green:   #34d399;
      --red:     #f87171;

      --serif:   'DM Serif Display', Georgia, serif;
      --sans:    'DM Sans', system-ui, sans-serif;
      --mono:    'JetBrains Mono', monospace;
    }

    body {
      background: var(--ink);
      color: var(--off);
      font-family: var(--sans);
      font-weight: 300;
      line-height: 1.7;
      overflow-x: hidden;
      cursor: none;
    }

    ::-webkit-scrollbar { width: 2px; }
    ::-webkit-scrollbar-track { background: var(--ink); }
    ::-webkit-scrollbar-thumb { background: var(--amber); }

    /* Custom cursor */
    #ab-cursor {
      position: fixed; width: 8px; height: 8px;
      background: var(--amber); border-radius: 50%;
      pointer-events: none; z-index: 99999;
      transition: transform 0.15s, opacity 0.15s;
      transform: translate(-50%, -50%);
    }
    #ab-cursor-trail {
      position: fixed; width: 32px; height: 32px;
      border: 1px solid rgba(240,165,0,0.4); border-radius: 50%;
      pointer-events: none; z-index: 99998;
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      transform: translate(-50%, -50%);
    }

    .grid-bg {
      position: fixed; inset: 0; z-index: 0; pointer-events: none;
      background-image:
        linear-gradient(var(--line2) 1px, transparent 1px),
        linear-gradient(90deg, var(--line2) 1px, transparent 1px);
      background-size: 80px 80px;
      mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%);
    }

    @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
    @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }

    .live-dot {
      width: 6px; height: 6px; border-radius: 50%;
      background: var(--green); display: inline-block;
      animation: pulse 2s ease-in-out infinite;
    }

    .section-label { font-family: var(--mono); font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--amber); opacity: 0.7; }
    .display-heading { font-family: var(--serif); font-weight: 400; color: var(--white); line-height: 1.1; }
    .card-premium { background: rgba(13,13,24,0.7); border: 1px solid var(--line2); backdrop-filter: blur(16px); transition: border-color 0.3s; }
    .card-premium:hover { border-color: rgba(240,165,0,0.2); }
    .nav-link { font-family: var(--mono); font-size: 11px; text-transform: uppercase; color: var(--slate2); text-decoration: none; transition: color 0.2s; }
    .nav-link:hover { color: var(--amber); }
    .tag { font-family: var(--mono); font-size: 10px; padding: 3px 10px; border: 1px solid rgba(240,165,0,0.2); color: var(--slate); background: rgba(240,165,0,0.04); }
    .btn-outline { font-family: var(--mono); font-size: 11px; padding: 10px 24px; color: var(--amber); border: 1px solid rgba(240,165,0,0.4); text-decoration: none; display: inline-block; transition: 0.2s; }
    .btn-outline:hover { background: rgba(240,165,0,0.08); border-color: var(--amber); }
    
    .skill-bar-track { height: 2px; background: rgba(255,255,255,0.06); position: relative; overflow: hidden; }
    .skill-bar-fill { height: 100%; background: linear-gradient(90deg, var(--amber), var(--amber2)); position: absolute; left: 0; top: 0; transition: width 1.6s ease; box-shadow: 0 0 8px rgba(240,165,0,0.4); }
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
  const doubled = [...items, ...items];
  return (
    <div style={{ overflow: "hidden", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", padding: "8px 0", background: "rgba(240,165,0,0.03)" }}>
      <div style={{ display: "flex", gap: "48px", animation: "ticker 40s linear infinite", whiteSpace: "nowrap", width: "max-content" }}>
        {doubled.map((item, i) => (
          <span key={i} style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--slate2)", letterSpacing: "0.15em" }}>{item}</span>
        ))}
      </div>
    </div>
  );
};

const SkillBar = ({ name, value, delay = 0 }: any) => {
  const [filled, setFilled] = useState(0);
  const ref = useRef<any>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  useEffect(() => { if (inView) setTimeout(() => setFilled(value), delay); }, [inView, value, delay]);
  return (
    <div ref={ref} style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--slate)" }}>{name}</span>
        <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--amber)" }}>{value}</span>
      </div>
      <div className="skill-bar-track"><div className="skill-bar-fill" style={{ width: `${filled}%` }} /></div>
    </div>
  );
};

const FadeSection = ({ children, delay = 0 }: any) => {
  const ref = useRef<any>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay }}>
      {children}
    </motion.div>
  );
};

const ProjectModal = ({ project, onClose }: any) => (
  <AnimatePresence>
    {project && (
      <div style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.9)", backdropFilter: "blur(12px)" }} />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} style={{ position: "relative", width: "100%", maxWidth: 600, background: "var(--ink2)", border: "1px solid var(--line2)", padding: 40, maxHeight: "80vh", overflowY: "auto" }}>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: 24, marginBottom: 20 }}>{project.title}</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {project.bullets.map((b: any, i: any) => (
              <div key={i} style={{ padding: 12, background: "rgba(240,165,0,0.03)", borderLeft: "2px solid var(--amber)", fontSize: 14 }}>{b}</div>
            ))}
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

// ─── MAIN APP ─────────────────────────────────────────────────────────────────

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

  const experience = [
    {
      role: "Damage Fixer Handler — Existing Claims",
      company: "Direct Line Group (AVIVA)",
      period: "Nov 2025 – Present",
      points: [
        "Handle and resolve inquiries within the Existing Claims department, ensuring high-quality customer service while maintaining accurate data records.",
        "Monitor and update claim data daily, acting as a bridge between frontline customer care and operational reporting.",
        "Utilize pivot tables and internal databases to track team performance and claim volumes.",
        "Cleanse and structure customer interaction data to identify recurring claim issues and improve response times.",
        "Collaborate with claims and commercial teams to improve service quality based on data trends."
      ]
    }
  ];

  const projects = [
    { id: "p1", title: "Indian Roads Accident Analysis", bullets: ["Designed 3-layer schema", "Engineered custom danger scores", "Trained XGBoost models", "Tracked with MLflow"] },
    { id: "p2", title: "NHS Logistics — Trend Analysis", bullets: ["Cleansed operational healthcare data", "Identified 72% delay bottleneck", "Impacted £3.2m investment decision"] }
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
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <div className="grid-bg" />
          <motion.div style={{ position: "fixed", top: 0, left: 0, right: 0, height: "2px", scaleX, background: "var(--amber)", zIndex: 1000, transformOrigin: "0%" }} />

          <nav style={{ position: "fixed", top: 0, width: "100%", zIndex: 500, padding: "0 40px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", background: scrolled ? "rgba(8,8,15,0.9)" : "transparent", backdropFilter: scrolled ? "blur(10px)" : "none" }}>
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
              <span className="section-label" style={{ marginBottom: 20 }}>Junior Data Analyst</span>
              <h1 className="display-heading" style={{ fontSize: "clamp(48px, 8vw, 100px)", color: "var(--amber)" }}>Aniket Bansal</h1>
              <p style={{ maxWidth: 600, fontSize: 18, color: "var(--slate)", marginTop: 20 }}>Specializing in claims data and commercial insight. MSc Data Analytics graduate from University of Strathclyde.</p>
              <div style={{ marginTop: 40, display: "flex", gap: 20 }}>
                <a href="mailto:ianiketbansalx@gmail.com" className="btn-outline">Email Me</a>
                <a href="#work" className="btn-outline">View Experience</a>
              </div>
            </section>

            <DataTicker />

            {/* WORK */}
            <section id="work" style={{ padding: "100px 80px", maxWidth: 1200, margin: "0 auto" }}>
              <span className="section-label">01 — Experience</span>
              {experience.map(job => (
                <div key={job.role} className="card-premium" style={{ padding: 40, marginTop: 40 }}>
                  <h3 style={{ color: "var(--white)", fontSize: 24, marginBottom: 8 }}>{job.role}</h3>
                  <div style={{ fontFamily: "var(--mono)", color: "var(--amber)", fontSize: 12, marginBottom: 20 }}>{job.company} · {job.period}</div>
                  <ul style={{ color: "var(--slate)", fontSize: 14 }}>
                    {job.points.map((p, i) => <li key={i} style={{ marginBottom: 10 }}>{p}</li>)}
                  </ul>
                </div>
              ))}
            </section>

            {/* PROJECTS */}
            <section id="projects" style={{ padding: "100px 80px", maxWidth: 1200, margin: "0 auto" }}>
              <span className="section-label">02 — Projects</span>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20, marginTop: 40 }}>
                {projects.map(p => (
                  <div key={p.id} className="card-premium" style={{ padding: 30, cursor: "pointer" }} onClick={() => setActiveProject(p)}>
                    <h4 style={{ color: "var(--white)", marginBottom: 12 }}>{p.title}</h4>
                    <span style={{ color: "var(--amber)", fontSize: 11, fontFamily: "var(--mono)" }}>VIEW CASE STUDY →</span>
                  </div>
                ))}
              </div>
            </section>

            {/* SKILLS */}
            <section id="skills" style={{ padding: "100px 80px", maxWidth: 1200, margin: "0 auto" }}>
              <span className="section-label">03 — Skills</span>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, marginTop: 40 }}>
                <div>
                  <SkillBar name="SQL" value={95} />
                  <SkillBar name="Power BI" value={90} />
                  <SkillBar name="Python" value={85} />
                </div>
                <div className="card-premium" style={{ padding: 30 }}>
                  <p style={{ fontSize: 14, color: "var(--slate)" }}>Currently expanding professional proficiency in French for Canadian PR pathways.</p>
                </div>
              </div>
            </section>

            {/* FOOTER */}
            <footer style={{ padding: "100px 80px", borderTop: "1px solid var(--line2)", textAlign: "center" }}>
              <h2 className="display-heading" style={{ fontSize: 40, marginBottom: 40 }}>Connect</h2>
              <ul className="social-container" style={{ display: "flex", justifyContent: "center", listStyle: "none" }}>
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

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </div>
  );
}
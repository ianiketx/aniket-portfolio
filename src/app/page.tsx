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

    .grid-bg { position: fixed; inset: 0; z-index: 0; pointer-events: none; background-image: linear-gradient(var(--line2) 1px, transparent 1px), linear-gradient(90deg, var(--line2) 1px, transparent 1px); background-size: 80px 80px; mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%); }
    @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }

    .section-label { font-family: var(--mono); font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--amber); opacity: 0.7; }
    .display-heading { font-family: var(--serif); font-weight: 400; color: var(--white); line-height: 1.1; }
    .card-premium { background: rgba(13,13,24,0.7); border: 1px solid var(--line2); backdrop-filter: blur(16px); position: relative; overflow: hidden; }
    .tag { font-family: var(--mono); font-size: 10px; padding: 3px 10px; border: 1px solid rgba(240,165,0,0.2); color: var(--slate); background: rgba(240,165,0,0.04); }
    .btn-outline { font-family: var(--mono); font-size: 11px; padding: 10px 24px; color: var(--amber); border: 1px solid rgba(240,165,0,0.4); text-decoration: none; display: inline-block; transition: 0.2s; }
    
    .social-container { list-style: none; display: flex; gap: 20px; }
    .icon-content { position: relative; }
    .icon-content .tooltip { position: absolute; top: -30px; left: 50%; transform: translateX(-50%); background: #fff; color: #000; padding: 4px 8px; border-radius: 4px; opacity: 0; visibility: hidden; font-size: 11px; transition: 0.3s; z-index: 100; }
    .icon-content:hover .tooltip { opacity: 1; visibility: visible; top: -45px; }
    .icon-content .link { width: 45px; height: 45px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: #111; border: 1px solid #333; transition: 0.3s; }
    .icon-content .link svg { width: 20px; height: 20px; fill: #fff; }
    .icon-content .link[data-social="linkedin"]:hover { background: #0077b5; border-color: #0077b5; }
    .icon-content .link[data-social="github"]:hover { background: #333; border-color: #666; }
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
  const items = ["SQL 95%", "POWER BI 90%", "PYTHON 85%", "DATABRICKS 80%", "ETL PIPELINES 85%", "NCLC 7 FRENCH", "UK GRADUATE VISA 2027"];
  return (
    <div style={{ overflow: "hidden", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", padding: "12px 0", background: "rgba(240,165,0,0.03)" }}>
      <div style={{ display: "flex", gap: "60px", animation: "ticker 45s linear infinite", whiteSpace: "nowrap", width: "max-content" }}>
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
    <div ref={ref} style={{ marginBottom: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--slate)", letterSpacing: "0.05em" }}>{name}</span>
        <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--amber)" }}>{value}%</span>
      </div>
      <div style={{ height: 2, background: "rgba(255,255,255,0.06)", position: "relative" }}>
        <div style={{ width: `${filled}%`, height: "100%", background: "var(--amber)", transition: "width 1.8s cubic-bezier(0.4, 0, 0.2, 1)" }} />
      </div>
    </div>
  );
};

const FadeSection = ({ children, delay = 0 }: any) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay }}>
      {children}
    </motion.div>
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
      id: "p1", title: "Indian Roads Accident Analysis", org: "Databricks · Python · MLflow · Unity Catalog",
      summary: "End-to-end ML pipeline analyzing 20,000 road records with structured data governance.",
      bullets: [
        "Designed a three-layer Unity Catalog schema (raw → processed → features) using PySpark.",
        "Engineered custom danger scores by synthesizing weather, visibility, and traffic density data.",
        "Trained XGBoost and Random Forest classifiers with class imbalance handling (SMOTE).",
        "Tracked parameters, metrics, and model versions via MLflow for reproducible experiments."
      ],
      stack: ["Python", "PySpark", "Databricks", "MLflow", "XGBoost"]
    },
    {
      id: "p2", title: "NHS Logistics Strategic Insight", org: "NHS · SQL · Power BI",
      summary: "Performance analysis supporting a £3.2m strategic infrastructure investment decision.",
      bullets: [
        "Aggregated and cleansed operational logistics data from multiple disparate sources.",
        "Identified that 72% of delivery delays originated from a single external logistics stage.",
        "Developed executive Power BI dashboards that communicated data findings to senior stakeholders.",
        "Analysis directly supported a successful £3.2m modernisation budget bid."
      ],
      stack: ["SQL", "Power BI", "Statistics", "Healthcare Data"]
    },
    {
      id: "p3", title: "EY Market Trend Modeling", org: "Ernst & Young · Python · Power BI",
      summary: "Volatility modeling across commercial sectors to identify risk exposure.",
      bullets: [
        "Developed statistical models in Python to identify volatility trends in market data.",
        "Created dynamic dashboards for technical and non-technical audiences to track performance.",
        "Maintained terminology consistency across outputs through a centralized business glossary.",
        "Delivered insights that shifted the team's understanding of sector risk exposure."
      ],
      stack: ["Python", "Power BI", "Market Analysis"]
    },
    {
      id: "p4", title: "Experian Financial Data QA", org: "Experian · SQL · Python",
      summary: "Automated extraction and QA workflows for sensitive financial datasets.",
      bullets: [
        "Built Python/SQL workflows to extract financial datasets, reducing manual processing time.",
        "Implemented rigorous data quality checks and anomaly resolution for 100% accuracy.",
        "Produced structured reporting outputs for senior stakeholder review in regulated environments."
      ],
      stack: ["SQL", "Python", "QA", "Financial Services"]
    },
    {
      id: "p5", title: "Emerge Lab Workforce Insights", org: "Emerge Lab · Data Visualization",
      summary: "Board-level visualisations for strategic workforce diversity research.",
      bullets: [
        "Developed comprehensive data dictionaries ensuring reporting reliability for long-run projects.",
        "Produced visualisations and data extracts for board-level review beyond minimum requirements.",
        "Delivered structured reporting packs across multiple workstreams to tight deadlines."
      ],
      stack: ["Data Vis", "Excel", "Research", "Strategy"]
    }
  ];

  const experience = [
    {
      role: "Damage Fixer Handler — Existing Claims",
      company: "Direct Line Group (AVIVA)",
      location: "Glasgow, UK",
      period: "Nov 2025 – Present",
      points: [
        "Oversee the accuracy of data records within the Existing Claims department, resolving complex inquiries through data validation.",
        "Monitor and update claim data daily to ensure settlement accuracy between frontline care and operational reporting.",
        "Leverage advanced pivot tables and internal SQL-based databases to track team performance metrics.",
        "Cleanse customer interaction datasets to identify operational bottlenecks and improve response times."
      ]
    },
    {
      role: "Data Scientist (Intern)",
      company: "TwiLearn",
      location: "Remote",
      period: "Jan 2025 – Jul 2025",
      points: [
        "Developed automated Python/SQL pipelines to replace manual data cleaning, reducing processing time by 40%.",
        "Built Power BI dashboards providing commercial stakeholders with real-time performance tracking.",
        "Conducted NLP analysis on unstructured customer feedback to identify sentiment trends."
      ]
    }
  ];

  const education = [
    {
        degree: "MSc Data Analytics",
        institution: "University of Strathclyde",
        location: "Glasgow, UK",
        period: "2023 - 2024",
        details: "Specialized in Big Data, Machine Learning, and Business Analysis. Dissertation: Quantitative research on workplace diversity through statistical modeling.",
        color: "var(--amber)"
    },
    {
        degree: "B.Tech Computer Engineering",
        institution: "MVN University",
        location: "India",
        period: "2019 - 2022",
        details: "Core focus on Algorithms, DBMS, and Software Engineering. Capstone: Real-time object detection vehicle prototype.",
        color: "var(--blue)"
    }
  ];

  return (
    <div style={{ background: "var(--ink)", minHeight: "100vh" }}>
      <GlobalStyles />
      <Cursor />

      <AnimatePresence>
        {!isLaunched && (
          <motion.div className="launch-overlay" exit={{ opacity: 0, scale: 1.05 }} transition={{ duration: 0.7 }}>
            <button className="box" onClick={() => setIsLaunched(true)}>
              <span>Enter<br/>Portfolio</span>
              <i></i>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {isLaunched && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <div className="grid-bg" />
          <motion.div style={{ position: "fixed", top: 0, left: 0, right: 0, height: "2px", scaleX, background: "var(--amber)", zIndex: 1000, transformOrigin: "0%" }} />

          <nav style={{ position: "fixed", top: 0, width: "100%", zIndex: 500, padding: "0 40px", height: 70, display: "flex", alignItems: "center", justifyContent: "space-between", background: scrolled ? "rgba(8,8,15,0.92)" : "transparent", backdropFilter: scrolled ? "blur(12px)" : "none" }}>
            <div style={{ fontFamily: "var(--mono)", color: "var(--amber)", fontWeight: "bold", fontSize: 14 }}>AB.ANALYTICS</div>
            <div style={{ display: "flex", gap: 32 }}>
              <a href="#work" className="nav-link">Work</a>
              <a href="#projects" className="nav-link">Projects</a>
              <a href="#skills" className="nav-link">Skills</a>
              <a href="#education" className="nav-link">Education</a>
            </div>
          </nav>

          <main style={{ position: "relative", zIndex: 10 }}>
            {/* HERO */}
            <section style={{ minHeight: "100vh", padding: "120px 80px", maxWidth: 1300, margin: "0 auto", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <h1 className="display-heading" style={{ fontSize: "clamp(50px, 9vw, 110px)", color: "var(--white)" }}>Aniket <span style={{ color: "var(--amber)" }}>Bansal</span></h1>
              <p style={{ maxWidth: 650, fontSize: 19, color: "var(--slate)", marginTop: 28, lineHeight: 1.7 }}>
                MSc Data Analytics graduate (University of Strathclyde). Transforming complex claims data and healthcare metrics into commercial strategy through automated pipelines and Power BI.
              </p>
              <div style={{ marginTop: 56, display: "flex", gap: 24 }}>
                <a href="mailto:ianiketbansalx@gmail.com" className="btn-outline">Email Me</a>
                <a href="#projects" className="btn-outline">View Case Studies</a>
              </div>
            </section>

            <DataTicker />

            {/* EXPERIENCE */}
            <section id="work" style={{ padding: "120px 80px", maxWidth: 1300, margin: "0 auto" }}>
              <span className="section-label">01 — Experience</span>
              <div style={{ marginTop: 60, display: "flex", flexDirection: "column", gap: 40 }}>
                {experience.map(job => (
                  <FadeSection key={job.role}>
                    <div className="card-premium" style={{ padding: 48 }}>
                      <h3 style={{ color: "var(--white)", fontSize: 26, marginBottom: 6 }}>{job.role}</h3>
                      <div style={{ fontFamily: "var(--mono)", color: "var(--amber)", fontSize: 13, marginBottom: 24 }}>{job.company} · {job.period}</div>
                      <ul style={{ color: "var(--slate)", fontSize: 15, display: "flex", flexDirection: "column", gap: 14 }}>
                        {job.points.map((p, i) => <li key={i}>{p}</li>)}
                      </ul>
                    </div>
                  </FadeSection>
                ))}
              </div>
            </section>

            {/* PROJECTS */}
            <section id="projects" style={{ padding: "120px 80px", maxWidth: 1300, margin: "0 auto" }}>
              <span className="section-label">02 — Projects</span>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))", gap: 30, marginTop: 60 }}>
                {projects.map(p => (
                  <div key={p.id} className="card-premium" style={{ padding: 40, cursor: "pointer" }} onClick={() => setActiveProject(p)}>
                    <h4 style={{ color: "var(--white)", fontSize: 22, marginBottom: 12 }}>{p.title}</h4>
                    <p style={{ color: "var(--slate)", fontSize: 15, marginBottom: 28 }}>{p.summary}</p>
                    <span style={{ color: "var(--amber)", fontSize: 12, fontFamily: "var(--mono)" }}>VIEW CASE STUDY →</span>
                  </div>
                ))}
              </div>
            </section>

            {/* EDUCATION */}
            <section id="education" style={{ padding: "120px 80px", maxWidth: 1300, margin: "0 auto" }}>
              <span className="section-label">03 — Education</span>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 30, marginTop: 60 }}>
                {education.map(edu => (
                  <div key={edu.degree} className="card-premium" style={{ padding: 48 }}>
                    <div style={{ fontFamily: "var(--mono)", color: "var(--amber)", fontSize: 12, marginBottom: 16 }}>{edu.period}</div>
                    <h3 style={{ fontSize: 26, color: "var(--white)", marginBottom: 10 }}>{edu.degree}</h3>
                    <div style={{ color: "var(--slate2)", fontSize: 14, marginBottom: 24 }}>{edu.institution}</div>
                    <p style={{ fontSize: 15, color: "var(--slate)" }}>{edu.details}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* SKILLS */}
            <section id="skills" style={{ padding: "120px 80px", maxWidth: 1300, margin: "0 auto" }}>
              <span className="section-label">04 — Skills</span>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 100, marginTop: 60 }}>
                <div>
                  <SkillBar name="SQL" value={95} />
                  <SkillBar name="Power BI" value={90} />
                  <SkillBar name="Python" value={85} />
                  <SkillBar name="Databricks" value={80} />
                </div>
                <div className="card-premium" style={{ padding: 40 }}>
                   <h4 style={{ color: "var(--white)", marginBottom: 20, fontSize: 12 }}>STATUS & CERTS</h4>
                   <ul style={{ color: "var(--slate)", fontSize: 14, display: "flex", flexDirection: "column", gap: 16 }}>
                      <li>• PL-300: Power BI Analyst (In Progress)</li>
                      <li>• JPMorgan: Quantitative Research</li>
                      <li>• UK Graduate Visa (Valid Jan 2027)</li>
                   </ul>
                </div>
              </div>
            </section>

            {/* FOOTER */}
            <footer style={{ padding: "120px 80px", borderTop: "1px solid var(--line2)", textAlign: "center" }}>
              <div className="social-container" style={{ justifyContent: "center", marginBottom: 40 }}>
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
              </div>
            </footer>
          </main>
        </motion.div>
      )}

      {/* MODALS */}
      <AnimatePresence>
        {activeProject && (
          <div style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveProject(null)} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.9)", backdropFilter: "blur(12px)" }} />
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} style={{ position: "relative", width: "100%", maxWidth: 680, background: "var(--ink2)", border: "1px solid var(--line2)", padding: 48, maxHeight: "85vh", overflowY: "auto" }}>
              <h2 style={{ fontFamily: "var(--serif)", fontSize: 28, color: "var(--white)", marginBottom: 32 }}>{activeProject.title}</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {activeProject.bullets.map((b: any, i: any) => (
                  <div key={i} style={{ padding: "14px 18px", background: "rgba(240,165,0,0.03)", borderLeft: "2px solid var(--amber)", fontSize: 15, lineHeight: 1.7, color: "var(--off)" }}>{b}</div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
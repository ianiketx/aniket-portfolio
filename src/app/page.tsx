// @ts-nocheck
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useInView } from "framer-motion";

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@300;400;500&family=JetBrains+Mono:wght@300;400&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    .grid-bg { position: fixed; inset: 0; pointer-events: none; background-image: linear-gradient(rgba(240, 165, 0, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(240, 165, 0, 0.02) 1px, transparent 1px); background-size: 80px 80px; z-index: 0; }
    @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  `}</style>
);

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
    { id: "p1", title: "Indian Roads ML Pipeline", org: "Databricks · MLflow", summary: "Complete ML pipeline for accident analysis (20k records).", bullets: ["Designed 3-layer schema (Unity Catalog).", "Engineered composite danger scores via PySpark.", "Trained XGBoost/Random Forest classifiers.", "Tracked parameters via MLflow."], stack: ["Python", "PySpark", "Databricks", "MLflow"] },
    { id: "p2", title: "NHS Logistics Strategic Insight", org: "NHS · SQL · Power BI", summary: "Support for £3.2m strategic investment.", bullets: ["Cleansed operational data from disparate sources.", "Identified 72% delay bottleneck.", "Executive Power BI reporting."], stack: ["SQL", "Power BI", "Statistics"] },
    { id: "p3", title: "EY Market Trend Modeling", org: "Ernst & Young · Finance", summary: "Volatility modeling translated into strategic decks.", bullets: ["Modeled trends in Python for statistical analysis.", "Built executive-ready Power BI dashboards.", "Identified high-risk exposure sectors."], stack: ["Python", "Power BI", "Strategy"] },
    { id: "p4", title: "Experian Data QA Automation", org: "Experian · SQL · Python", summary: "Extraction and QA workflows for regulated finance.", bullets: ["Built automated extraction pipelines.", "Implemented rigorous data quality checks.", "Resolve anomalies for 100% accuracy."], stack: ["SQL", "Python", "QA"] },
    { id: "p5", title: "Workforce Insights Research", org: "Emerge Lab · Data Vis", summary: "Board-level visualisations for workforce diversity study.", bullets: ["Developed comprehensive data dictionaries.", "Produced strategic visual extracts for board review.", "Managed tight multi-workstream deadlines."], stack: ["Data Vis", "Excel", "Research"] }
  ];

  const experience = [
    {
      role: "Damage Fixer Handler — Existing Claims",
      company: "Direct Line Group (AVIVA)",
      location: "Glasgow, UK",
      period: "Nov 2025 – Present",
      points: [
        "Handle and resolve inquiries within Existing Claims, ensuring data accuracy.",
        "Monitor claim data daily to bridge frontline care and operational reporting.",
        "Utilize SQL databases and advanced Excel pivot tables to track performance insights."
      ]
    },
    {
      role: "Data Scientist (Intern)",
      company: "TwiLearn",
      location: "Remote",
      period: "Jan 2025 – Jul 2025",
      points: [
        "Developed automated SQL pipelines for manual data cleaning.",
        "Created Power BI dashboards for performance insights.",
        "Applied NLP techniques for customer feedback sentiment analysis."
      ]
    }
  ];

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div>
      <GlobalStyles />
      <div className="grid-bg" />

      <AnimatePresence>
        {!isLaunched && (
          <motion.div exit={{ opacity: 0, scale: 1.1 }} transition={{ duration: 0.6 }} style={{ position: "fixed", inset: 0, zIndex: 1000, background: "#030305", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <button className="box" onClick={() => setIsLaunched(true)}>INITIALIZE</button>
          </motion.div>
        )}
      </AnimatePresence>

      {isLaunched && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <motion.div style={{ position: "fixed", top: 0, left: 0, right: 0, height: "2px", scaleX, background: "var(--accent)", zIndex: 1000, transformOrigin: "0%" }} />

          <nav style={{ position: "fixed", top: 0, width: "100%", zIndex: 500, padding: scrolled ? "15px 40px" : "40px", display: "flex", alignItems: "center", justifyContent: "space-between", background: scrolled ? "rgba(3,3,5,0.92)" : "transparent", backdropFilter: scrolled ? "blur(12px)" : "none", transition: "all 0.4s" }}>
            <span style={{ fontFamily: "var(--serif)", color: "var(--text-main)", fontSize: "16px" }}>AB.ANALYTICS</span>
            <div style={{ display: "flex", gap: "35px" }}>
              <a href="#work" className="nav-link">Work</a>
              <a href="#projects" className="nav-link">Projects</a>
              <a href="#skills" className="nav-link">Skills</a>
              <a href="#edu" className="nav-link">Education</a>
            </div>
          </nav>

          <main style={{ maxWidth: "1300px", margin: "0 auto", padding: "0 40px" }}>
            <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <span className="mono" style={{ fontSize: "11px", color: "var(--accent)", marginBottom: "20px", letterSpacing: "2px" }}>MSc DATA ANALYTICS // JUNIOR DATA ANALYST</span>
              <h1 className="serif" style={{ fontSize: "clamp(60px, 12vw, 160px)", lineHeight: 0.9 }}>Aniket<br/><span style={{ color: "var(--accent)" }}>Bansal.</span></h1>
              <p style={{ marginTop: "40px", color: "var(--text-dim)", maxWidth: "600px", fontSize: "17px", lineHeight: 1.7 }}>Converting complex claims data and healthcare logistics into robust commercial strategy. Specialized in Databricks pipelines and Power BI storytelling.</p>
              <div style={{ marginTop: "50px", display: "flex", gap: "20px" }}>
                <a href="mailto:ianiketbansalx@gmail.com" className="btn-outline">Email Me</a>
                <a href="#work" className="btn-outline">View Experience</a>
              </div>
            </section>

            <div style={{ overflow: "hidden", borderTop: "1px solid var(--line-light)", borderBottom: "1px solid var(--line-light)", padding: "10px 0", background: "rgba(240, 165, 0, 0.03)" }}>
              <div style={{ display: "flex", gap: "48px", animation: "ticker 40s linear infinite", whiteSpace: "nowrap", width: "max-content" }}>
                {["SQL 95%", "POWER BI 90%", "PYTHON 85%", "DATABRICKS 80%", "ETL 85%", "GLASGOW UK"].map((item, i) => (
                  <span key={i} className="mono" style={{ fontSize: 10, color: "var(--text-dim)", letterSpacing: "0.15em" }}>{item}</span>
                ))}
              </div>
            </div>

            <section id="work" style={{ padding: "120px 0" }}>
              <h2 className="mono" style={{ fontSize: "11px", color: "var(--accent)", marginBottom: "70px", letterSpacing: "4px" }}>01. WORK HISTORY</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "60px" }}>
                {experience.map((job, idx) => (
                  <motion.div key={idx} initial="hidden" whileInView="visible" variants={sectionVariants} viewport={{ once: true }} className="card-premium">
                    <h3 className="serif" style={{ fontSize: "32px" }}>{job.company}</h3>
                    <p className="mono" style={{ color: "var(--text-dim)", fontSize: "11px", margin: "10px 0 25px" }}>{job.role} // {job.period}</p>
                    <ul style={{ color: "var(--text-main)", fontSize: "14px", display: "flex", flexDirection: "column", gap: "10px" }}>
                      {job.points.map((pt, i) => <li key={i} style={{ listStyle: "none" }}><span style={{ color: "var(--accent)" }}>→</span> {pt}</li>)}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </section>

            <section id="projects" style={{ padding: "120px 0" }}>
              <h2 className="mono" style={{ fontSize: "11px", color: "var(--accent)", marginBottom: "70px", letterSpacing: "4px" }}>02. SELECTED PROJECTS</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "10px" }}>
                {projects.map((p, i) => (
                  <motion.div key={i} className="card-premium" onClick={() => setActiveProject(p)} style={{ cursor: "pointer" }}>
                    <h4 className="serif" style={{ fontSize: "24px", marginBottom: "15px" }}>{p.title}</h4>
                    <p className="mono" style={{ fontSize: "10px", color: "var(--text-dim)", marginBottom: "20px" }}>{p.org}</p>
                    <div style={{ display: "flex", gap: "5px" }}>
                      {p.stack.map(s => <span key={s} className="tag">{s}</span>)}
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            <section id="edu" style={{ padding: "120px 0" }}>
              <h2 className="mono" style={{ fontSize: "11px", color: "var(--accent)", marginBottom: "70px", letterSpacing: "4px" }}>03. ACADEMIC</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
                <div className="card-premium">
                  <h3 className="serif" style={{ fontSize: "28px" }}>MSc Data Analytics</h3>
                  <p className="mono" style={{ color: "var(--accent)", fontSize: "11px" }}>UNIVERSITY OF STRATHCLYDE, UK / 2024</p>
                </div>
                <div className="card-premium">
                  <h3 className="serif" style={{ fontSize: "28px" }}>B.Tech Computer Engineering</h3>
                  <p className="mono" style={{ color: "var(--accent)", fontSize: "11px" }}>MVN UNIVERSITY, INDIA / 2022</p>
                </div>
              </div>
            </section>

            <section id="skills" style={{ padding: "120px 0 200px" }}>
              <h2 className="mono" style={{ fontSize: "11px", color: "var(--accent)", marginBottom: "70px", letterSpacing: "4px" }}>04. PROFICIENCY</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px" }}>
                <div>
                  {["SQL", "Power BI", "Python", "Databricks"].map(skill => (
                    <div key={skill} style={{ marginBottom: "20px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                        <span className="mono" style={{ fontSize: "11px" }}>{skill}</span>
                      </div>
                      <div style={{ height: "2px", background: "rgba(255,255,255,0.1)" }}>
                        <motion.div initial={{ width: 0 }} whileInView={{ width: "90%" }} transition={{ duration: 1.5 }} style={{ height: "100%", background: "var(--accent)" }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="card-premium">
                   <p className="mono" style={{ color: "var(--accent)", fontSize: "11px", marginBottom: "15px" }}>STATUS</p>
                   <p style={{ fontSize: "14px", color: "var(--text-dim)" }}>UK Graduate Visa (Valid Jan 2027)<br/>Actively seeking Data Analyst roles.</p>
                </div>
              </div>
            </section>
          </main>

          <AnimatePresence>
            {activeProject && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(3,3,5,0.95)", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px", backdropFilter: "blur(10px)" }}>
                <motion.div style={{ maxWidth: "700px", width: "100%", background: "#0d0d18", border: "1px solid rgba(240,165,0,0.2)", padding: "50px" }}>
                  <button className="mono" onClick={() => setActiveProject(null)} style={{ color: "var(--accent)", background: "none", border: "none", cursor: "pointer", marginBottom: "30px" }}>[ CLOSE ]</button>
                  <h2 className="serif" style={{ fontSize: "36px", marginBottom: "30px" }}>{activeProject.title}</h2>
                  <ul className="mono" style={{ color: "var(--text-dim)", fontSize: "13px", listStyle: "none" }}>
                    {activeProject.bullets.map((b: any, i: number) => <li key={i} style={{ marginBottom: "15px" }}>→ {b}</li>)}
                  </ul>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
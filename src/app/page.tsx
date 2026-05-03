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
    { id: "p1", title: "Indian Roads ML Pipeline", org: "Databricks · MLflow", summary: "Complete ML pipeline for accident analysis (20k records).", bullets: ["Designed 3-layer schema (Unity Catalog).", "Engineered composite danger scores via PySpark.", "Trained XGBoost/Random Forest classifiers.", "Tracked parameters via MLflow."] },
    { id: "p2", title: "NHS Logistics Strategic Insight", org: "NHS · SQL · Power BI", summary: "Support for £3.2m strategic investment.", bullets: ["Cleansed operational data from disparate sources.", "Identified 72% delay bottleneck.", "Executive Power BI reporting."] },
    { id: "p3", title: "EY Market Trend Modeling", org: "Ernst & Young · Finance", summary: "Volatility modeling translated into strategic decks.", bullets: ["Modeled trends in Python for statistical analysis.", "Built executive-ready Power BI dashboards.", "Identified high-risk exposure sectors."] },
    { id: "p4", title: "Experian Data QA Automation", org: "Experian · SQL · Python", summary: "Extraction and QA workflows for regulated finance.", bullets: ["Built automated extraction pipelines.", "Implemented rigorous data quality checks.", "Resolve anomalies for 100% accuracy."] },
    { id: "p5", title: "Workforce Insights Research", org: "Emerge Lab · Data Vis", summary: "Board-level visualisations for workforce diversity study.", bullets: ["Developed comprehensive data dictionaries.", "Produced strategic visual extracts for board review.", "Managed tight multi-workstream deadlines."] }
  ];

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -10 },
    visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 1, ease: [0.6, 0.05, 0.01, 0.9] } }
  };

  const staggerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div>
      <GlobalStyles />
      <div className="grid-bg" />

      {/* Initialize Button with Glow Effect */}
      <AnimatePresence>
        {!isLaunched && (
          <motion.div exit={{ opacity: 0, scale: 1.1 }} transition={{ duration: 0.7 }} style={{ position: "fixed", inset: 0, zIndex: 1000, background: "#030305", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <button className="box" onClick={() => setIsLaunched(true)}>INITIALIZE</button>
          </motion.div>
        )}
      </AnimatePresence>

      {isLaunched && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} style={{ position: "relative", zIndex: 10 }}>
          {/* NAV with dynamic background */}
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
            {/* HERO with animated text and reticle */}
            <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative" }}>
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ delay: 0.6 }} className="mono" style={{ fontSize: "11px", color: "var(--accent)", marginBottom: "20px", letterSpacing: "2px" }}>MSc DATA ANALYTICS // JUNIOR DATA ANALYST</motion.span>
              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 1 }} style={{ fontFamily: "var(--serif)", fontSize: "clamp(60px, 12vw, 160px)", lineHeight: 0.9 }}>Aniket<br/><span style={{ color: "var(--accent)" }}>Bansal.</span></motion.h1>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 1 }} style={{ marginTop: "40px", color: "var(--text-dim)", maxWidth: "600px", fontSize: "17px", lineHeight: 1.7 }}>Converting complex claims data and healthcare logistics into robust commercial strategy. Specialized in Databricks pipelines and Power BI storytelling.</motion.p>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 1 }} style={{ marginTop: "50px", display: "flex", gap: "20px" }}>
                <a href="mailto:ianiketbansalx@gmail.com" className="btn-outline">Email Me</a>
                <a href="#work" className="btn-outline">View Experience</a>
              </motion.div>
            </section>

            {/* DATA TICKER */}
            <DataTicker />

            {/* EXPERIENCE with staggered reveal */}
            <section id="work" style={{ padding: "120px 0" }}>
              <motion.h2 initial="hidden" whileInView="visible" variants={sectionVariants} viewport={{ once: true, amount: 0.4 }} style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--accent)", marginBottom: "70px", letterSpacing: "4px" }}>01. WORK HISTORY // EXISTING CLAIMS GATEWAY</motion.h2>
              <motion.div initial="hidden" whileInView="visible" variants={staggerVariants} viewport={{ once: true, amount: 0.3 }} style={{ display: "flex", flexDirection: "column", gap: "60px" }}>
                <motion.div variants={itemVariants} className="card-premium">
                  <h3 style={{ fontFamily: "var(--serif)", fontSize: "32px", color: "var(--text-main)" }}>Direct Line Group (AVIVA)</h3>
                  <p style={{ fontFamily: "var(--mono)", color: "var(--text-dim)", fontSize: "11px", margin: "10px 0 25px" }}>NOV 2025 – PRESENT // GLASGOW, UK</p>
                  <ul style={{ color: "var(--text-main)", maxWidth: "800px", display: "flex", flexDirection: "column", gap: "10px", fontSize: "14px" }}>
                    <li>Resolving inquiries in Existing Claims, ensuring data settlement accuracy.</li>
                    <li>Utilize SQL databases and advanced Excel pivot tables to track team performance.</li>
                    <li>Monitoring claims data daily to improve department response times.</li>
                  </ul>
                </motion.div>
                <motion.div variants={itemVariants} className="card-premium">
                  <h3 style={{ fontFamily: "var(--serif)", fontSize: "32px", color: "var(--text-main)" }}>TwiLearn</h3>
                  <p style={{ fontFamily: "var(--mono)", color: "var(--text-dim)", fontSize: "11px", margin: "10px 0 25px" }}>JAN 2025 – JUL 2025 // REMOTE (INTERNSHIP)</p>
                  <ul style={{ color: "var(--text-main)", maxWidth: "800px", display: "flex", flexDirection: "column", gap: "10px", fontSize: "14px" }}>
                    <li>Developed automated SQL pipelines for manual data cleaning.</li>
                    <li>Created Power BI dashboards for performance insights.</li>
                    <li>Applied NLP techniques for customer feedback sentiment analysis.</li>
                  </ul>
                </motion.div>
              </motion.div>
            </section>

            {/* PROJECTS with 3D hover */}
            <section id="projects" style={{ padding: "120px 0" }}>
              <motion.h2 initial="hidden" whileInView="visible" variants={sectionVariants} viewport={{ once: true, amount: 0.4 }} style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--accent)", marginBottom: "70px", letterSpacing: "4px" }}>02. SELECTED PROJECTS // CASE STUDIES</motion.h2>
              <motion.div initial="hidden" whileInView="visible" variants={staggerVariants} viewport={{ once: true, amount: 0.3 }} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "3px", background: "rgba(240,165,0,0.06)" }}>
                {projects.map(p => (
                  <motion.div key={p.id} variants={itemVariants} className="card-premium" onClick={() => setActiveProject(p)} style={{ cursor: "pointer", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                        <h4 style={{ fontFamily: "var(--serif)", fontSize: "24px", color: "var(--text-main)", marginBottom: "15px" }}>{p.title}</h4>
                        <p style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--text-dim)", marginBottom: "20px" }}>{p.org}</p>
                    </div>
                    <span style={{ color: "var(--accent)", fontSize: "11px", fontFamily: "var(--mono)", letterSpacing: "1px" }}>VIEW CASE STUDY →</span>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* EDUCATION */}
            <section id="edu" style={{ padding: "120px 0" }}>
              <motion.h2 initial="hidden" whileInView="visible" variants={sectionVariants} viewport={{ once: true, amount: 0.4 }} style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--accent)", marginBottom: "70px", letterSpacing: "4px" }}>03. ACADEMIC FOUNDATIONS</motion.h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
                <FadeSection>
                  <div className="card-premium">
                    <h3 style={{ fontFamily: "var(--serif)", fontSize: "28px" }}>MSc Data Analytics</h3>
                    <p style={{ fontFamily: "var(--mono)", color: "var(--accent)", fontSize: "11px", margin: "10px 0" }}>UNIVERSITY OF STRATHCLYDE, UK / 2024</p>
                    <p style={{ fontSize: "14px", color: "var(--text-dim)", lineHeight: 1.6 }}>Specialized in Big Data, Machine Learning, and Business Analysis. Dissertation focused on workplace diversity metrics.</p>
                  </div>
                </FadeSection>
                <FadeSection delay={0.2}>
                  <div className="card-premium">
                    <h3 style={{ fontFamily: "var(--serif)", fontSize: "28px" }}>B.Tech Computer Engineering</h3>
                    <p style={{ fontFamily: "var(--mono)", color: "var(--accent)", fontSize: "11px", margin: "10px 0" }}>MVN UNIVERSITY, INDIA / 2022</p>
                    <p style={{ fontSize: "14px", color: "var(--text-dim)", lineHeight: 1.6 }}>Foundation in Algorithms, DBMS, and Software Engineering. Capstone on Automatic Object Detection Vehicle.</p>
                  </div>
                </FadeSection>
              </div>
            </section>

            {/* SKILLS with animating bars */}
            <section id="skills" style={{ padding: "120px 0 200px" }}>
              <motion.h2 initial="hidden" whileInView="visible" variants={sectionVariants} viewport={{ once: true, amount: 0.4 }} style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--accent)", marginBottom: "70px", letterSpacing: "4px" }}>04. TECHNICAL PROFICIENCY // CAPABILITIES</motion.h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px" }}>
                <div>
                  <SkillBar name="SQL (T-SQL, PostgreSQL)" value={95} />
                  <SkillBar name="Power BI & DAX modeling" value={90} />
                  <SkillBar name="Python (Pandas, Scikit-learn)" value={85} />
                  <SkillBar name="Databricks & PySpark" value={80} />
                </div>
                <div className="card-premium" style={{ height: "min-content" }}>
                   <p style={{ fontFamily: "var(--mono)", color: "var(--accent)", fontSize: "11px", marginBottom: "15px" }}>CERTIFICATIONS // STATUS</p>
                   <p style={{ fontSize: "14px", color: "var(--text-dim)", lineHeight: 1.8 }}>• JPMorgan Quantitative Research Certification<br/>• British Airways Data Science Certification<br/>• UK Graduate Visa (Valid Jan 2027)</p>
                </div>
              </div>
            </section>
          </main>

          {/* PROJECT MODAL with scale animation */}
          <AnimatePresence>
            {activeProject && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(3,3,5,0.95)", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px", backdropFilter: "blur(10px)" }}>
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} style={{ maxWidth: "700px", width: "100%", background: "var(--ink2)", border: "1px solid var(--line-light)", padding: "50px" }}>
                  <button className="mono" onClick={() => setActiveProject(null)} style={{ color: "var(--accent)", background: "none", border: "none", cursor: "pointer", marginBottom: "30px", fontSize: "11px" }}>[ CLOSE ]</button>
                  <h2 style={{ fontFamily: "var(--serif)", fontSize: "36px", marginBottom: "10px", color: "var(--text-main)" }}>{activeProject.title}</h2>
                  <p style={{ fontFamily: "var(--mono)", color: "var(--accent)", fontSize: "11px", marginBottom: "30px" }}>{activeProject.org}</p>
                  <ul className="mono" style={{ color: "var(--text-dim)", fontSize: "13px", listStyle: "none" }}>
                    {activeProject.bullets.map((b: any, i: number) => <li key={i} style={{ marginBottom: "15px", display: "flex", gap: "10px" }}><span style={{ color: "var(--accent)" }}>→</span> {b}</li>)}
                  </ul>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* RETICLE CURSOR */}
          <>
            <div id="ab-cursor" />
            <div id="ab-cursor-trail" />
          </>
        </motion.div>
      )}
    </div>
  );
}
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
    @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }

    .live-dot { width: 6px; height: 6px; border-radius: 50%; background: #34d399; display: inline-block; animation: pulse 2s ease-in-out infinite; }
    .section-label { font-family: var(--mono); font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--amber); opacity: 0.7; }
    .display-heading { font-family: var(--serif); font-weight: 400; color: var(--white); line-height: 1.1; }
    .card-premium { background: rgba(13,13,24,0.7); border: 1px solid var(--line2); backdrop-filter: blur(16px); }
    .tag { font-family: var(--mono); font-size: 10px; padding: 3px 10px; border: 1px solid rgba(240,165,0,0.2); color: var(--slate); background: rgba(240,165,0,0.04); }
    .btn-outline { font-family: var(--mono); font-size: 11px; padding: 10px 24px; color: var(--amber); border: 1px solid rgba(240,165,0,0.4); text-decoration: none; display: inline-block; transition: 0.2s; }
    .btn-outline:hover { background: rgba(240,165,0,0.08); }

    /* Social Icons */
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
  const items = ["SQL ████ 95", "POWER BI ████ 90", "PYTHON ████ 85", "STATISTICAL ANALYSIS ████ 88", "DATABRICKS ████ 80", "ETL PIPELINES ████ 85", "GLASGOW, UK 🇬🇧", "AVAILABLE NOW"];
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
      <div style={{ height: 2, background: "rgba(255,255,255,0.06)", position: "relative" }}>
        <div style={{ width: `${filled}%`, height: "100%", background: "var(--amber)", transition: "width 1.5s ease" }} />
      </div>
    </div>
  );
};

const FadeSection = ({ children, delay = 0 }: any) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay }}>
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
      id: "p1", title: "Indian Roads Accident Analysis", org: "Databricks · Python · MLflow",
      summary: "End-to-end ML pipeline on Databricks analyzing 20k records with Unity Catalog governance.",
      bullets: ["Designed three-layer Unity Catalog schema (raw → processed → features
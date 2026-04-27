"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useTransform, useInView } from "framer-motion";

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
    body:has(a:hover) #ab-cursor,
    body:has(button:hover) #ab-cursor { transform: translate(-50%,-50%) scale(2.5); }
    body:has(a:hover) #ab-cursor-trail,
    body:has(button:hover) #ab-cursor-trail { transform: translate(-50%,-50%) scale(1.5); opacity: 0.3; }

    /* Bloomberg-style grid lines */
    .grid-bg {
      position: fixed; inset: 0; z-index: 0; pointer-events: none;
      background-image:
        linear-gradient(var(--line2) 1px, transparent 1px),
        linear-gradient(90deg, var(--line2) 1px, transparent 1px);
      background-size: 80px 80px;
      mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%);
    }

    /* Data ticker animation */
    @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
    @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
    @keyframes scanline { from { transform: translateY(-100%); } to { transform: translateY(100vh); } }
    @keyframes numberCount { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes barFill { from { width: 0; } to { width: var(--w); } }
    @keyframes borderGlow { 0%,100% { border-color: rgba(240,165,0,0.15); } 50% { border-color: rgba(240,165,0,0.4); } }

    .live-dot {
      width: 6px; height: 6px; border-radius: 50%;
      background: var(--green); display: inline-block;
      animation: pulse 2s ease-in-out infinite;
    }

    .terminal-line {
      font-family: var(--mono); font-size: 11px;
      color: var(--slate2); letter-spacing: 0.08em;
    }

    .section-label {
      font-family: var(--mono); font-size: 10px; font-weight: 400;
      letter-spacing: 0.2em; text-transform: uppercase;
      color: var(--amber); opacity: 0.7;
    }

    .display-heading {
      font-family: var(--serif); font-weight: 400;
      color: var(--white); line-height: 1.1;
    }

    .card-premium {
      background: rgba(13,13,24,0.7);
      border: 1px solid var(--line2);
      backdrop-filter: blur(16px);
      transition: border-color 0.3s, box-shadow 0.3s;
    }
    .card-premium:hover {
      border-color: rgba(240,165,0,0.2);
      box-shadow: 0 0 40px rgba(240,165,0,0.04);
    }

    .metric-value {
      font-family: var(--mono); font-weight: 500;
      color: var(--white); letter-spacing: -0.02em;
    }

    .amber-line {
      height: 1px;
      background: linear-gradient(90deg, var(--amber), transparent);
    }

    .nav-link {
      font-family: var(--mono); font-size: 11px; font-weight: 400;
      letter-spacing: 0.12em; text-transform: uppercase;
      color: var(--slate2); text-decoration: none;
      transition: color 0.2s; cursor: pointer; background: none; border: none;
    }
    .nav-link:hover, .nav-link.active { color: var(--amber); }

    .tag {
      font-family: var(--mono); font-size: 10px; font-weight: 400;
      padding: 3px 10px; border: 1px solid rgba(240,165,0,0.2);
      color: var(--slate); letter-spacing: 0.06em;
      background: rgba(240,165,0,0.04);
    }

    .project-card {
      background: rgba(13,13,24,0.6);
      border: 1px solid rgba(248,250,252,0.06);
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      cursor: pointer; position: relative; overflow: hidden;
    }
    .project-card::before {
      content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
      background: linear-gradient(90deg, transparent, var(--amber), transparent);
      opacity: 0; transition: opacity 0.4s;
    }
    .project-card:hover { border-color: rgba(240,165,0,0.2); transform: translateY(-2px); }
    .project-card:hover::before { opacity: 1; }

    .skill-bar-track {
      height: 2px; background: rgba(255,255,255,0.06);
      position: relative; overflow: hidden;
    }
    .skill-bar-fill {
      height: 100%; background: linear-gradient(90deg, var(--amber), var(--amber2));
      position: absolute; left: 0; top: 0;
      transition: width 1.6s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 0 8px rgba(240,165,0,0.4);
    }

    /* AI Chat */
    .chat-input {
      background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1);
      color: var(--white); font-family: var(--mono); font-size: 12px;
      padding: 10px 14px; outline: none; width: 100%;
      transition: border-color 0.2s;
    }
    .chat-input:focus { border-color: rgba(240,165,0,0.4); }
    .chat-input::placeholder { color: var(--slate2); }

    .btn-amber {
      font-family: var(--mono); font-size: 11px; font-weight: 400;
      letter-spacing: 0.1em; padding: 10px 20px;
      background: var(--amber); color: var(--ink);
      border: none; cursor: pointer; transition: all 0.2s;
    }
    .btn-amber:hover { background: var(--amber2); }
    .btn-amber:disabled { opacity: 0.5; cursor: not-allowed; }

    .btn-outline {
      font-family: var(--mono); font-size: 11px; font-weight: 400;
      letter-spacing: 0.1em; padding: 10px 24px;
      background: transparent; color: var(--amber);
      border: 1px solid rgba(240,165,0,0.4); cursor: pointer; transition: all 0.2s;
      text-decoration: none; display: inline-block;
    }
    .btn-outline:hover { background: rgba(240,165,0,0.08); border-color: var(--amber); }

    .tab-btn {
      font-family: var(--mono); font-size: 11px; letter-spacing: 0.12em;
      text-transform: uppercase; padding: 10px 20px;
      background: transparent; border: none;
      color: var(--slate2); cursor: pointer; transition: all 0.2s;
      border-bottom: 1px solid transparent; white-space: nowrap;
    }
    .tab-btn:hover { color: var(--off); }
    .tab-btn.active { color: var(--amber); border-bottom-color: var(--amber); }
  `}</style>
);

// ─── CUSTOM CURSOR ────────────────────────────────────────────────────────────
const Cursor = () => {
  const cursorRef = useRef(null);
  const trailRef = useRef(null);
  useEffect(() => {
    const move = (e) => {
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

// ─── DATA TICKER ─────────────────────────────────────────────────────────────
const DataTicker = () => {
  const items = [
    "SQL ████ 95", "POWER BI ████ 90", "PYTHON ████ 85",
    "STATISTICAL ANALYSIS ████ 88", "DATABRICKS ████ 80",
    "ETL PIPELINES ████ 85", "DATA STORYTELLING ████ 92",
    "FEATURE ENGINEERING ████ 80", "MLFLOW ████ 75",
    "DASHBOARD DESIGN ████ 88", "GLASGOW, UK 🇬🇧", "AVAILABLE NOW",
  ];
  const doubled = [...items, ...items];
  return (
    <div style={{ overflow: "hidden", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", padding: "8px 0", background: "rgba(240,165,0,0.03)" }}>
      <div style={{ display: "flex", gap: "48px", animation: "ticker 40s linear infinite", whiteSpace: "nowrap", width: "max-content" }}>
        {doubled.map((item, i) => (
          <span key={i} style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--slate2)", letterSpacing: "0.15em" }}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

// ─── ANIMATED NUMBER ─────────────────────────────────────────────────────────
const AnimatedNumber = ({ value, prefix = "", suffix = "", decimals = 0 }) => {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  useEffect(() => {
    if (!inView) return;
    const end = parseFloat(value);
    let start = 0;
    const dur = 1600;
    const step = end / (dur / 16);
    const t = setInterval(() => {
      start += step;
      if (start >= end) { setDisplay(end); clearInterval(t); }
      else setDisplay(parseFloat(start.toFixed(decimals)));
    }, 16);
    return () => clearInterval(t);
  }, [inView, value, decimals]);
  return (
    <span ref={ref}>
      {prefix}{decimals > 0 ? display.toFixed(decimals) : Math.floor(display).toLocaleString()}{suffix}
    </span>
  );
};

// ─── SKILL BAR ───────────────────────────────────────────────────────────────
const SkillBar = ({ name, value, delay = 0 }) => {
  const [filled, setFilled] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  useEffect(() => {
    if (inView) setTimeout(() => setFilled(value), delay);
  }, [inView, value, delay]);
  return (
    <div ref={ref} style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--slate)", letterSpacing: "0.06em" }}>{name}</span>
        <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--amber)", opacity: 0.7 }}>{value}</span>
      </div>
      <div className="skill-bar-track">
        <div className="skill-bar-fill" style={{ width: `${filled}%` }} />
      </div>
    </div>
  );
};

// ─── SECTION WRAPPER ─────────────────────────────────────────────────────────
const FadeSection = ({ children, delay = 0, style = {} }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.4, 0, 0.2, 1] }} style={style}>
      {children}
    </motion.div>
  );
};

// ─── AI ANALYST (Claude API) ──────────────────────────────────────────────────
const AIAnalyst = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi — I'm an AI assistant trained on Aniket's portfolio. Ask me anything about his experience, skills, or projects." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setMessages(p => [...p, { role: "user", content: userMsg }]);
    setLoading(true);
    try {
      const system = `You are a professional AI assistant embedded in the portfolio of Aniket Bansal, a Junior Data Analyst based in Glasgow, UK. Answer questions about his background, skills and projects concisely and professionally. Keep responses under 120 words. Speak in third person about Aniket.

ANIKET'S PROFILE:
Role: Junior Data Analyst
Location: Glasgow, UK
Education: MSc Data Analytics — University of Strathclyde (2023–2024); B.Tech Computer Engineering — MVN University India (2019–2022)
Current role: Damage Fixer Handler – MCR at Direct Line Group (AVIVA), Glasgow, Nov 2025–present — data quality monitoring, pivot tables, dashboards, operational reporting
Previous: Data Scientist Intern at TwiLearn (Jan–Jul 2025) — Python/SQL pipelines, Power BI dashboards, NLP analysis
Core skills: SQL, Power BI, Python, Tableau, Excel (Advanced), Databricks, Git, PySpark, MLflow, XGBoost
Projects: Indian Roads ML Pipeline (Databricks/Unity Catalog/MLflow), NHS Logistics analysis (£3.2m impact), EY market trend dashboards, Experian financial data QA, Emerge Lab workforce visualisations
Certs: PL-300 Power BI (in progress), JPMorgan Quantitative Research (Forage), British Airways Data Science (Forage), Fujitsu Cyber Security
Right to work: Graduate Route Visa until Jan 2027
Available for: Data Analyst, Junior Data Analyst, Analytics roles across the UK`;

      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 200,
          system,
          messages: [
            ...messages.map(m => ({ role: m.role, content: m.content })),
            { role: "user", content: userMsg }
          ]
        })
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || "I couldn't retrieve that information. Please try again.";
      setMessages(p => [...p, { role: "assistant", content: reply }]);
    } catch {
      setMessages(p => [...p, { role: "assistant", content: "Connection issue — please try again in a moment." }]);
    }
    setLoading(false);
  };

  return (
    <>
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
        style={{ position: "fixed", bottom: 32, right: 32, zIndex: 9000, background: "var(--amber)", border: "none", color: "var(--ink)", padding: "12px 20px", cursor: "pointer", display: "flex", alignItems: "center", gap: 10, fontFamily: "var(--mono)", fontSize: 11, fontWeight: 500, letterSpacing: "0.1em", boxShadow: "0 0 40px rgba(240,165,0,0.2)" }}>
        <span className="live-dot" style={{ background: open ? "var(--red)" : "var(--green)" }} />
        {open ? "CLOSE AI" : "ASK AI"}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.97 }}
            style={{ position: "fixed", bottom: 90, right: 32, zIndex: 8999, width: 380, background: "rgba(8,8,15,0.97)", border: "1px solid rgba(240,165,0,0.2)", backdropFilter: "blur(24px)", boxShadow: "0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(240,165,0,0.05)" }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--white)", fontWeight: 500, marginBottom: 2 }}>Portfolio AI</div>
                <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--slate2)" }}>Powered by Claude · Aniket Bansal</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span className="live-dot" />
                <span style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--green)" }}>LIVE</span>
              </div>
            </div>

            <div style={{ height: 300, overflowY: "auto", padding: "16px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
              {messages.map((m, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
                  style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 9, color: m.role === "assistant" ? "var(--amber)" : "var(--slate2)", letterSpacing: "0.12em" }}>
                    {m.role === "assistant" ? "◉ PORTFOLIO AI" : "▶ YOU"}
                  </div>
                  <div style={{ fontFamily: "var(--sans)", fontSize: 13, color: m.role === "assistant" ? "var(--off)" : "var(--slate)", lineHeight: 1.65, padding: "10px 14px", background: m.role === "assistant" ? "rgba(240,165,0,0.05)" : "rgba(255,255,255,0.03)", border: `1px solid ${m.role === "assistant" ? "rgba(240,165,0,0.1)" : "rgba(255,255,255,0.05)"}` }}>
                    {m.content}
                  </div>
                </motion.div>
              ))}
              {loading && (
                <div>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--amber)", marginBottom: 6 }}>◉ PORTFOLIO AI</div>
                  <div style={{ padding: "10px 14px", background: "rgba(240,165,0,0.05)", border: "1px solid rgba(240,165,0,0.1)" }}>
                    <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.2, repeat: Infinity }}
                      style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--amber)" }}>
                      Analysing...
                    </motion.span>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <div style={{ padding: "12px 20px", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", gap: 8 }}>
              <input className="chat-input" value={input} onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && send()}
                placeholder="Ask about experience, skills, projects..." />
              <button className="btn-amber" onClick={send} disabled={loading} style={{ whiteSpace: "nowrap", flexShrink: 0 }}>
                {loading ? "..." : "SEND"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// ─── PROJECT MODAL ────────────────────────────────────────────────────────────
const ProjectModal = ({ project, onClose }) => (
  <AnimatePresence>
    {project && (
      <div style={{ position: "fixed", inset: 0, zIndex: 9990, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.88)", backdropFilter: "blur(12px)" }} />
        <motion.div initial={{ opacity: 0, y: 32, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.98 }} transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          style={{ position: "relative", width: "100%", maxWidth: 680, background: "rgba(8,8,15,0.98)", border: "1px solid rgba(240,165,0,0.2)", padding: 40, maxHeight: "85vh", overflowY: "auto" }}>
          <div className="amber-line" style={{ position: "absolute", top: 0, left: 0, right: 0 }} />

          <button onClick={onClose} style={{ position: "absolute", top: 20, right: 20, background: "transparent", border: "1px solid rgba(255,255,255,0.1)", color: "var(--slate2)", cursor: "pointer", padding: "5px 12px", fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.08em", transition: "all 0.2s" }}>
            ESC
          </button>

          <div style={{ marginBottom: 8 }}>
            <span className="section-label">{project.category}</span>
          </div>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: 28, color: "var(--white)", fontWeight: 400, marginBottom: 8, lineHeight: 1.2 }}>{project.title}</h2>
          <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--slate2)", marginBottom: 28, paddingBottom: 24, borderBottom: "1px solid rgba(255,255,255,0.05)", letterSpacing: "0.06em" }}>{project.org}</div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 28 }}>
            {project.bullets.map((b, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.08 }}
                style={{ display: "flex", gap: 16, padding: "14px 18px", background: "rgba(240,165,0,0.03)", borderLeft: "2px solid rgba(240,165,0,0.3)" }}>
                <span style={{ fontFamily: "var(--sans)", fontSize: 14, color: "var(--off)", lineHeight: 1.7 }}>{b}</span>
              </motion.div>
            ))}
          </div>

          <div style={{ paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--slate2)", letterSpacing: "0.15em", marginBottom: 12 }}>TOOLS & TECHNOLOGIES</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {project.stack.map((s, i) => (
                <motion.span key={s} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 + i * 0.04 }}
                  className="tag">{s}</motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

// ─── MAIN PORTFOLIO ───────────────────────────────────────────────────────────
export default function AniketPortfolio() {
  const [activeTab, setActiveTab] = useState("projects");
  const [activeProject, setActiveProject] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const skills = [
    { name: "SQL", value: 95 },
    { name: "Power BI / DAX", value: 90 },
    { name: "Data Storytelling", value: 92 },
    { name: "Python", value: 85 },
    { name: "Statistical Analysis", value: 88 },
    { name: "Dashboard Design", value: 88 },
    { name: "ETL Pipeline Design", value: 85 },
    { name: "Databricks / PySpark", value: 80 },
    { name: "Feature Engineering", value: 80 },
    { name: "MLflow / XGBoost", value: 75 },
  ];

  const projects = [
    {
      id: "p1", category: "MACHINE LEARNING · DATABRICKS",
      title: "Indian Roads Accident Analysis",
      org: "End-to-End ML Pipeline · Python · Databricks · Unity Catalog · MLflow",
      summary: "Built a complete ML pipeline on Databricks to analyse 20,000 road accident records across India — from raw ingestion to trained classifier with experiment tracking.",
      bullets: [
        "Designed a three-layer Unity Catalog schema (raw → processed → features) using PySpark, ensuring clean data governance throughout the pipeline.",
        "Conducted full exploratory data analysis, then engineered five custom features including a composite danger score combining visibility, weather and traffic density.",
        "Trained and compared Logistic Regression, Random Forest and XGBoost classifiers with class imbalance handling. Identified and removed data leakage in the casualties column before final evaluation.",
        "Tracked all experiments, parameters and model metrics with MLflow. Published the full notebook pipeline to GitHub."
      ],
      stack: ["Python", "PySpark", "Databricks", "Unity Catalog", "MLflow", "XGBoost", "Scikit-learn", "GitHub"],
      impact: "Full pipeline"
    },
    {
      id: "p2", category: "STRATEGIC ANALYSIS · SQL · POWER BI",
      title: "NHS Logistics — Trend Analysis & Strategic Insight",
      org: "NHS · Healthcare Data · SQL · Power BI",
      summary: "Analysed operational logistics data to identify performance bottlenecks. Findings directly supported a £3.2m strategic investment decision.",
      bullets: [
        "Collected and cleansed raw operational data from multiple sources to create a single, reliable dataset for performance analysis.",
        "Analysed trends across the logistics pipeline and identified that 72% of delays were driven by a single external logistics stage — a finding that was previously unquantified.",
        "Built a clear visual reporting deck in Power BI that communicated the findings to senior NHS stakeholders without requiring technical background.",
        "Analysis directly supported a £3.2m strategic investment decision to modernise the supply chain infrastructure."
      ],
      stack: ["SQL", "Power BI", "Statistical Analysis", "Stakeholder Reporting"],
      impact: "£3.2M"
    },
    {
      id: "p3", category: "MARKET ANALYSIS · PYTHON · POWER BI",
      title: "EY — Market Trend Analysis & Commercial Dashboards",
      org: "Ernst & Young · Finance · Python · Power BI · Tableau",
      summary: "Analysed market volatility across commercial sectors and built executive dashboards translating complex statistical findings into clear visual strategy.",
      bullets: [
        "Analysed market volatility and trend data across dynamic commercial sectors using Python for statistical modelling.",
        "Built Power BI and Tableau dashboards to translate complex findings into clear, accessible visuals for diverse senior audiences — technical and non-technical.",
        "Maintained a business glossary ensuring consistent terminology across all analytical outputs and stakeholder presentations.",
        "Delivered commercial insights that shifted how the team understood sector positioning and risk exposure."
      ],
      stack: ["Python", "Power BI", "Tableau", "Statistical Analysis", "Data Visualisation"],
      impact: "Strategic insight"
    },
    {
      id: "p4", category: "DATA ENGINEERING · PYTHON · SQL",
      title: "Experian — Financial Data Reporting & QA",
      org: "Experian · Financial Services · Python · SQL",
      summary: "Built automated workflows to extract and validate financial datasets, implementing quality checks and anomaly resolution in a zero-tolerance accuracy environment.",
      bullets: [
        "Built automated Python and SQL workflows to extract financial datasets, reducing manual processing time and improving consistency.",
        "Implemented data quality checks and anomaly resolution processes to ensure accuracy before any reporting output left the team.",
        "Produced structured, reliable reporting outputs for senior stakeholder review — demonstrating the kind of accuracy and attention to detail required in regulated financial environments."
      ],
      stack: ["Python", "SQL", "Data Quality Assurance", "Financial Reporting"],
      impact: "Automated QA"
    },
    {
      id: "p5", category: "RESEARCH ANALYTICS · VISUALISATION",
      title: "Emerge Lab — Workforce Insight & Visualisation",
      org: "Emerge Lab · Strategic Research",
      summary: "Developed data dictionaries, ran quality checks and produced board-level visualisations for a strategic workforce diversity research project.",
      bullets: [
        "Developed data dictionaries and executed rigorous quality checks to ensure reporting reliability across a sensitive, long-run research project.",
        "Produced visualisations and data extracts for board-level review, consistently delivering work that went beyond the minimum requirements.",
        "Delivered clear, well-structured reporting packs to agreed deadlines across multiple workstreams."
      ],
      stack: ["Data Visualisation", "Research Analytics", "Quality Assurance", "Stakeholder Reporting"],
      impact: "Board-level"
    }
  ];

  const experience = [
    {
      role: "Damage Fixer Handler — MCR",
      company: "Direct Line Group (AVIVA)",
      location: "Glasgow, UK",
      period: "Nov 2025 – Present",
      type: "CURRENT ROLE",
      color: "var(--amber)",
      points: [
        "Monitor the accuracy and integrity of incoming data daily — acting as a quality gateway between operational teams and downstream reporting, catching errors before they reach senior stakeholders.",
        "Create, edit and maintain pivot tables and structured reports from multiple database sources to support quality checking, performance tracking and management reporting.",
        "Build and maintain dashboards and reporting decks designed for non-technical audiences who need to make fast, confident decisions about operational performance.",
        "Collect data from multiple systems, cleanse it and convert it into structured formats ready for analysis — handling both routine reporting and ad-hoc data investigations.",
        "Collaborate with operational and commercial teams to understand what they actually need from data, then deliver it clearly and on time across multiple workstreams."
      ]
    },
    {
      role: "Data Scientist (Intern)",
      company: "TwiLearn",
      location: "Remote",
      period: "Jan 2025 – Jul 2025",
      type: "INTERNSHIP",
      color: "var(--blue)",
      points: [
        "Built data pipelines using Python and SQL to extract, clean and prepare large datasets for analysis — automating processes that previously required significant manual effort.",
        "Created dynamic reports and dashboards in Power BI to communicate performance insights clearly to commercial stakeholders, supporting faster and more informed business decisions.",
        "Analysed unstructured customer feedback data using NLP techniques, converting qualitative responses into structured, visualised insights for team and management review."
      ]
    }
  ];

  return (
    <div style={{ background: "var(--ink)", minHeight: "100vh", position: "relative" }}>
      <GlobalStyles />
      <Cursor />
      <div className="grid-bg" />

      {/* Scroll progress */}
      <motion.div style={{ position: "fixed", top: 0, left: 0, right: 0, height: "2px", scaleX, background: "linear-gradient(90deg, var(--amber), var(--amber2))", transformOrigin: "0%", zIndex: 9996 }} />

      {/* NAV */}
      <motion.nav initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.6 }}
        style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 500, padding: "0 40px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", background: scrolled ? "rgba(8,8,15,0.94)" : "transparent", backdropFilter: scrolled ? "blur(24px)" : "none", borderBottom: scrolled ? "1px solid var(--line)" : "none", transition: "all 0.4s" }}>
        <div style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--amber)", letterSpacing: "0.16em" }}>AB</div>
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {[["Work", "#work"], ["Projects", "#projects"], ["Skills", "#skills"], ["Education", "#education"]].map(([l, h]) => (
            <a key={l} href={h} className="nav-link">{l}</a>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span className="live-dot" />
          <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--slate2)", letterSpacing: "0.1em" }}>Glasgow, UK</span>
        </div>
      </motion.nav>

      <main style={{ position: "relative", zIndex: 10 }}>

        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "120px 80px 80px", maxWidth: 1400, margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
              <span className="live-dot" />
              <span className="terminal-line">AVAILABLE FOR NEW ROLES · GLASGOW, UK 🇬🇧 · GRADUATE VISA JAN 2027</span>
            </div>

            <h1 className="display-heading" style={{ fontSize: "clamp(64px,10vw,128px)", marginBottom: 12, letterSpacing: "-0.02em" }}>
              Aniket
            </h1>
            <h1 className="display-heading" style={{ fontSize: "clamp(64px,10vw,128px)", marginBottom: 40, letterSpacing: "-0.02em", color: "var(--amber)" }}>
              Bansal
            </h1>

            <div style={{ display: "flex", alignItems: "flex-start", gap: 80, marginBottom: 56 }}>
              <div style={{ maxWidth: 540 }}>
                <p style={{ fontSize: 18, color: "var(--slate)", lineHeight: 1.75, fontWeight: 300 }}>
                  Junior Data Analyst with an{" "}
                  <span style={{ color: "var(--white)", fontWeight: 400 }}>MSc in Data Analytics</span>{" "}
                  from the University of Strathclyde. I turn complex datasets into clear, commercially useful insight — building dashboards, pipelines and reports that help businesses make better decisions.
                </p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "var(--line)", border: "1px solid var(--line)", flexShrink: 0 }}>
                {[
                  ["£3.2M", "Business impact"],
                  ["20K+", "Records analysed"],
                  ["5+", "Industries covered"],
                  ["2+", "Years experience"],
                ].map(([v, l]) => (
                  <div key={l} style={{ padding: "24px 28px", background: "var(--ink2)", textAlign: "center" }}>
                    <div className="metric-value" style={{ fontSize: 28, marginBottom: 4 }}>{v}</div>
                    <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--slate2)", letterSpacing: "0.1em" }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <a href="mailto:ianiketbansalx@gmail.com" className="btn-outline">Get in Touch</a>
              <a href="http://www.linkedin.com/in/ianiketx" target="_blank" className="btn-outline">LinkedIn</a>
              <a href="https://github.com/ianiketbansalx" target="_blank" className="btn-outline">GitHub</a>
            </div>
          </motion.div>
        </section>

        {/* TICKER */}
        <DataTicker />

        {/* ── WORK EXPERIENCE ──────────────────────────────────────────── */}
        <section id="work" style={{ padding: "120px 80px", maxWidth: 1400, margin: "0 auto" }}>
          <FadeSection>
            <div style={{ display: "flex", alignItems: "baseline", gap: 24, marginBottom: 64 }}>
              <span className="section-label">01 — Work Experience</span>
              <div style={{ flex: 1, height: 1, background: "var(--line2)" }} />
            </div>
          </FadeSection>

          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {experience.map((job, i) => (
              <FadeSection key={job.role} delay={i * 0.15}>
                <div className="card-premium" style={{ padding: "48px 56px", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 2, background: job.color, opacity: 0.6 }} />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28, flexWrap: "wrap", gap: 16 }}>
                    <div>
                      <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: job.color, letterSpacing: "0.16em", marginBottom: 12, opacity: 0.8 }}>{job.type}</div>
                      <h3 style={{ fontFamily: "var(--serif)", fontSize: 26, color: "var(--white)", fontWeight: 400, marginBottom: 6 }}>{job.role}</h3>
                      <div style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--slate2)", letterSpacing: "0.06em" }}>
                        {job.company} &nbsp;·&nbsp; {job.location}
                      </div>
                    </div>
                    <div style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--slate2)", textAlign: "right" }}>{job.period}</div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: job.points.length > 3 ? "1fr 1fr" : "1fr", gap: 12 }}>
                    {job.points.map((pt, j) => (
                      <div key={j} style={{ display: "flex", gap: 14, padding: "12px 0", borderTop: j < 2 || (j === 0) ? "none" : "none" }}>
                        <div style={{ width: 4, height: 4, background: job.color, borderRadius: "50%", flexShrink: 0, marginTop: 8, opacity: 0.7 }} />
                        <span style={{ fontSize: 14, color: "var(--slate)", lineHeight: 1.75 }}>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeSection>
            ))}
          </div>
        </section>

        {/* ── PROJECTS ─────────────────────────────────────────────────── */}
        <section id="projects" style={{ padding: "120px 80px", maxWidth: 1400, margin: "0 auto" }}>
          <FadeSection>
            <div style={{ display: "flex", alignItems: "baseline", gap: 24, marginBottom: 64 }}>
              <span className="section-label">02 — Selected Projects</span>
              <div style={{ flex: 1, height: 1, background: "var(--line2)" }} />
            </div>
          </FadeSection>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(400px,1fr))", gap: 2 }}>
            {projects.map((p, i) => (
              <FadeSection key={p.id} delay={i * 0.1}>
                <div className="project-card" style={{ padding: "36px 40px", minHeight: 280 }} onClick={() => setActiveProject(p)}>
                  <div style={{ marginBottom: 14 }}>
                    <span className="section-label" style={{ fontSize: 9 }}>{p.category}</span>
                  </div>
                  <h3 style={{ fontFamily: "var(--serif)", fontSize: 22, color: "var(--white)", fontWeight: 400, marginBottom: 10, lineHeight: 1.2 }}>{p.title}</h3>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--slate2)", marginBottom: 20, letterSpacing: "0.05em" }}>{p.org}</div>
                  <p style={{ fontSize: 14, color: "var(--slate)", lineHeight: 1.7, marginBottom: 24 }}>{p.summary}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: 20 }}>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {p.stack.slice(0, 3).map(s => <span key={s} className="tag">{s}</span>)}
                      {p.stack.length > 3 && <span className="tag">+{p.stack.length - 3}</span>}
                    </div>
                    <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--amber)", opacity: 0.7, display: "flex", alignItems: "center", gap: 6 }}>
                      <span>View</span> <span>→</span>
                    </div>
                  </div>
                </div>
              </FadeSection>
            ))}
          </div>
        </section>

        {/* ── SKILLS ───────────────────────────────────────────────────── */}
        <section id="skills" style={{ padding: "120px 80px", background: "rgba(13,13,24,0.4)", borderTop: "1px solid var(--line2)", borderBottom: "1px solid var(--line2)" }}>
          <div style={{ maxWidth: 1400, margin: "0 auto" }}>
            <FadeSection>
              <div style={{ display: "flex", alignItems: "baseline", gap: 24, marginBottom: 64 }}>
                <span className="section-label">03 — Skills & Proficiency</span>
                <div style={{ flex: 1, height: 1, background: "var(--line2)" }} />
              </div>
            </FadeSection>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80 }}>
              <FadeSection>
                <div>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--slate2)", letterSpacing: "0.16em", marginBottom: 32 }}>PROFICIENCY INDEX</div>
                  {skills.map(({ name, value }, i) => (
                    <SkillBar key={name} name={name} value={value} delay={i * 80} />
                  ))}
                </div>
              </FadeSection>

              <FadeSection delay={0.15}>
                <div>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--slate2)", letterSpacing: "0.16em", marginBottom: 32 }}>TOOLS & PLATFORMS</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
                    {[
                      ["Reporting", ["Power BI", "Tableau", "Pivot Tables", "Reporting Decks"]],
                      ["Analysis", ["SQL", "Python", "Excel (Advanced)", "Google Sheets"]],
                      ["Engineering", ["Databricks", "PySpark", "MLflow", "Git / GitHub"]],
                      ["Methods", ["ETL Design", "Feature Engineering", "NLP", "Statistical Modelling"]],
                    ].map(([group, items]) => (
                      <div key={group} style={{ padding: "24px 28px", background: "rgba(8,8,15,0.6)", border: "1px solid var(--line2)" }}>
                        <div style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--amber)", opacity: 0.6, letterSpacing: "0.14em", marginBottom: 14 }}>{group.toUpperCase()}</div>
                        {items.map(item => (
                          <div key={item} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 0", borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                            <div style={{ width: 3, height: 3, background: "var(--amber)", borderRadius: "50%", opacity: 0.5 }} />
                            <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--slate)" }}>{item}</span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </FadeSection>
            </div>
          </div>
        </section>

        {/* ── EDUCATION ────────────────────────────────────────────────── */}
        <section id="education" style={{ padding: "120px 80px", maxWidth: 1400, margin: "0 auto" }}>
          <FadeSection>
            <div style={{ display: "flex", alignItems: "baseline", gap: 24, marginBottom: 64 }}>
              <span className="section-label">04 — Education</span>
              <div style={{ flex: 1, height: 1, background: "var(--line2)" }} />
            </div>
          </FadeSection>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
            {[
              {
                degree: "MSc Data Analytics",
                institution: "University of Strathclyde",
                location: "Glasgow, UK",
                period: "2023 – 2024",
                modules: ["Big Data Fundamentals", "Machine Learning", "Business Analysis", "Data Analytics in Practice"],
                dissertation: "6-month research project analysing the commercial impact of workplace diversity — applied quantitative analysis, statistical modelling and data visualisation to generate evidence-based business recommendations.",
                color: "var(--amber)"
              },
              {
                degree: "B.Tech Computer Engineering",
                institution: "MVN University",
                location: "India",
                period: "2019 – 2022",
                modules: ["Data Structures & Algorithms", "Database Management Systems", "Software Engineering", "Computer Architecture"],
                dissertation: "Designed a prototype Automatic Object Detection Vehicle, engineering real-time collision-avoidance algorithms using sensor fusion logic.",
                color: "var(--blue)"
              }
            ].map((edu, i) => (
              <FadeSection key={edu.degree} delay={i * 0.15}>
                <div className="card-premium" style={{ padding: "48px 48px", height: "100%" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: edu.color, opacity: 0.5 }} />
                  <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: edu.color, opacity: 0.7, letterSpacing: "0.12em", marginBottom: 16 }}>{edu.period}</div>
                  <h3 style={{ fontFamily: "var(--serif)", fontSize: 24, color: "var(--white)", fontWeight: 400, marginBottom: 6 }}>{edu.degree}</h3>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--slate2)", marginBottom: 32, letterSpacing: "0.06em" }}>
                    {edu.institution} &nbsp;·&nbsp; {edu.location}
                  </div>
                  <div style={{ marginBottom: 24 }}>
                    <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--slate2)", letterSpacing: "0.14em", marginBottom: 12 }}>MODULES</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {edu.modules.map(m => <span key={m} className="tag">{m}</span>)}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--slate2)", letterSpacing: "0.14em", marginBottom: 10 }}>DISSERTATION</div>
                    <p style={{ fontSize: 13, color: "var(--slate)", lineHeight: 1.75 }}>{edu.dissertation}</p>
                  </div>
                </div>
              </FadeSection>
            ))}
          </div>

          {/* Certifications */}
          <FadeSection delay={0.2} style={{ marginTop: 2 }}>
            <div className="card-premium" style={{ padding: "40px 48px" }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--slate2)", letterSpacing: "0.16em", marginBottom: 28 }}>CERTIFICATIONS</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px,1fr))", gap: 20 }}>
                {[
                  { title: "PL-300: Power BI Data Analyst", org: "Microsoft", status: "In Progress", color: "var(--amber)" },
                  { title: "Quantitative Research Virtual Experience", org: "JPMorgan Chase & Co — Forage", status: "Completed", color: "var(--green)" },
                  { title: "Data Science Job Simulation", org: "British Airways — Forage", status: "Completed", color: "var(--green)" },
                  { title: "Cyber Security Fundamentals", org: "Fujitsu", status: "Completed", color: "var(--green)" },
                ].map((cert) => (
                  <div key={cert.title} style={{ padding: "16px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                      <span style={{ fontFamily: "var(--sans)", fontSize: 14, color: "var(--off)", fontWeight: 400 }}>{cert.title}</span>
                      <span style={{ fontFamily: "var(--mono)", fontSize: 9, color: cert.color, letterSpacing: "0.1em", flexShrink: 0, marginLeft: 12 }}>{cert.status.toUpperCase()}</span>
                    </div>
                    <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--slate2)" }}>{cert.org}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeSection>
        </section>

        {/* ── FOOTER / CONTACT ─────────────────────────────────────────── */}
        <section style={{ padding: "120px 80px 80px", borderTop: "1px solid var(--line2)", maxWidth: 1400, margin: "0 auto" }}>
          <FadeSection>
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 80, alignItems: "end" }}>
              <div>
                <span className="section-label" style={{ display: "block", marginBottom: 24 }}>Available for opportunities</span>
                <h2 className="display-heading" style={{ fontSize: "clamp(48px,7vw,90px)", marginBottom: 24, lineHeight: 1 }}>
                  Let's work<br /><span style={{ color: "var(--amber)" }}>together.</span>
                </h2>
                <p style={{ fontSize: 16, color: "var(--slate)", lineHeight: 1.75, maxWidth: 480, marginBottom: 40 }}>
                  Open to Data Analyst, Junior Data Analyst and Analytics roles across the UK. Right to work on Graduate Route Visa until January 2027. Full manual UK driving licence.
                </p>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <a href="mailto:ianiketbansalx@gmail.com" className="btn-outline">ianiketbansalx@gmail.com</a>
                  <a href="tel:+447765340939" className="btn-outline">+44 7765 340939</a>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16, minWidth: 200 }}>
                {[
                  ["LinkedIn", "http://www.linkedin.com/in/ianiketx"],
                  ["GitHub", "https://github.com/ianiketbansalx"],
                  ["Portfolio", "https://aniket-portfolio-9hfs.vercel.app/"],
                ].map(([l, h]) => (
                  <a key={l} href={h} target="_blank" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "var(--mono)", fontSize: 12, color: "var(--slate2)", textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,0.04)", paddingBottom: 12, transition: "color 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.color = "var(--amber)"}
                    onMouseLeave={e => e.currentTarget.style.color = "var(--slate2)"}>
                    <span>{l}</span><span>→</span>
                  </a>
                ))}
              </div>
            </div>

            <div style={{ marginTop: 80, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.04)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
              <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--slate2)", letterSpacing: "0.1em" }}>
                ANIKET BANSAL · JUNIOR DATA ANALYST · GLASGOW UK 🇬🇧 · {new Date().getFullYear()}
              </span>
              <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--slate2)", letterSpacing: "0.1em" }}>
                MSc DATA ANALYTICS · UNIVERSITY OF STRATHCLYDE
              </span>
            </div>
          </FadeSection>
        </section>
      </main>

      {/* STATUS BAR */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 400, background: "rgba(8,8,15,0.96)", borderTop: "1px solid var(--line)", padding: "6px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", backdropFilter: "blur(24px)" }}>
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          <span className="terminal-line">aniket@portfolio:~$</span>
          <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--slate2)", letterSpacing: "0.08em" }}>STATUS: AVAILABLE FOR HIRE</span>
        </div>
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          <span className="terminal-line">SQL 95 · POWER BI 90 · PYTHON 85</span>
          <span className="live-dot" />
        </div>
      </div>

      {/* MODALS */}
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
      <AIAnalyst />
    </div>
  );
}
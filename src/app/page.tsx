<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Aniket Bansal — Data Analyst</title>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;1,9..144,300;1,9..144,400&family=Inter:wght@300;400;500&display=swap" rel="stylesheet"/>
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth;-webkit-font-smoothing:antialiased}
:root{
  --white:#ffffff;
  --off:#F8F8F6;
  --ink:#111110;
  --mid:#6E6E6A;
  --faint:#E4E4E0;
  --blue:#1A56DB;
  --serif:'Fraunces',Georgia,serif;
  --sans:'Inter',system-ui,sans-serif;
}
body{background:var(--white);color:var(--ink);font-family:var(--sans);font-weight:300;overflow-x:hidden}

/* SCROLL INDICATOR */
#bar{position:fixed;top:0;left:0;height:1px;background:var(--ink);z-index:999;width:0}

/* NAV */
nav{position:fixed;top:0;width:100%;z-index:500;display:flex;align-items:center;justify-content:space-between;padding:28px 64px;transition:all 0.4s ease}
nav.scrolled{background:rgba(255,255,255,0.94);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);padding:20px 64px;border-bottom:1px solid var(--faint)}
.logo{font-family:var(--serif);font-size:17px;font-weight:400;letter-spacing:-0.02em;color:var(--ink);text-decoration:none}
.nav-links{display:flex;gap:40px;align-items:center}
.nav-links a{font-size:13px;font-weight:400;color:var(--mid);text-decoration:none;letter-spacing:0.01em;transition:color 0.2s}
.nav-links a:hover{color:var(--ink)}
.nav-cta{background:var(--ink)!important;color:var(--white)!important;padding:9px 20px!important;border-radius:100px;font-size:13px!important;transition:opacity 0.2s!important}
.nav-cta:hover{opacity:0.75!important}

/* HERO */
.hero{min-height:100vh;display:flex;flex-direction:column;justify-content:flex-end;padding:0 64px 96px;border-bottom:1px solid var(--faint)}
.hero-tag{font-size:12px;font-weight:400;letter-spacing:0.12em;text-transform:uppercase;color:var(--mid);margin-bottom:32px}
.hero-h1{font-family:var(--serif);font-size:clamp(80px,12vw,172px);font-weight:300;line-height:0.9;letter-spacing:-0.04em;color:var(--ink);max-width:1100px}
.hero-h1 em{font-style:italic}
.hero-bottom{display:flex;align-items:flex-end;justify-content:space-between;margin-top:64px;gap:40px}
.hero-bio{font-size:16px;font-weight:300;line-height:1.7;color:var(--mid);max-width:420px}
.hero-actions{display:flex;gap:12px;flex-shrink:0}
.btn-dark{display:inline-flex;align-items:center;gap:8px;padding:14px 28px;background:var(--ink);color:var(--white);font-family:var(--sans);font-size:13px;font-weight:400;border-radius:100px;text-decoration:none;transition:opacity 0.2s;letter-spacing:0.01em}
.btn-dark:hover{opacity:0.75}
.btn-light{display:inline-flex;align-items:center;gap:8px;padding:14px 28px;background:transparent;color:var(--ink);font-family:var(--sans);font-size:13px;font-weight:400;border-radius:100px;border:1px solid var(--faint);text-decoration:none;transition:all 0.2s;letter-spacing:0.01em}
.btn-light:hover{border-color:var(--ink)}

/* STATS STRIP */
.stats{display:grid;grid-template-columns:repeat(4,1fr);border-bottom:1px solid var(--faint)}
.stat{padding:48px 64px;border-right:1px solid var(--faint)}
.stat:last-child{border-right:none}
.stat-n{font-family:var(--serif);font-size:48px;font-weight:300;letter-spacing:-0.03em;line-height:1;margin-bottom:10px;color:var(--ink)}
.stat-l{font-size:12px;font-weight:400;color:var(--mid);letter-spacing:0.02em;line-height:1.5}

/* SECTIONS */
.section{padding:96px 64px;border-bottom:1px solid var(--faint)}
.section-header{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:72px}
.section-title{font-family:var(--serif);font-size:clamp(36px,4vw,52px);font-weight:300;letter-spacing:-0.02em;font-style:italic;color:var(--ink)}
.section-num{font-size:12px;font-weight:400;color:var(--mid);letter-spacing:0.1em}

/* WORK */
.work-list{display:flex;flex-direction:column}
.work-item{display:grid;grid-template-columns:1fr 2fr;gap:64px;padding:48px 0;border-top:1px solid var(--faint);transition:opacity 0.2s}
.work-item:last-child{border-bottom:1px solid var(--faint)}
.work-item:hover{opacity:0.75}
.work-meta{}
.work-co{font-family:var(--serif);font-size:22px;font-weight:400;letter-spacing:-0.01em;margin-bottom:8px}
.work-period{font-size:12px;font-weight:400;color:var(--mid);letter-spacing:0.04em}
.work-loc{font-size:12px;font-weight:400;color:var(--mid);margin-top:4px}
.work-detail{}
.work-role{font-size:13px;font-weight:500;letter-spacing:0.04em;text-transform:uppercase;color:var(--mid);margin-bottom:20px}
.work-pts{list-style:none;display:flex;flex-direction:column;gap:12px}
.work-pts li{font-size:15px;font-weight:300;line-height:1.6;color:var(--ink);padding-left:16px;position:relative}
.work-pts li::before{content:'';position:absolute;left:0;top:11px;width:4px;height:1px;background:var(--mid)}

/* PROJECTS */
.proj-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1px;background:var(--faint);border:1px solid var(--faint)}
.proj-card{background:var(--white);padding:48px;cursor:pointer;transition:background 0.25s;position:relative}
.proj-card:hover{background:var(--off)}
.proj-index{font-size:11px;font-weight:400;color:var(--mid);letter-spacing:0.1em;margin-bottom:32px}
.proj-name{font-family:var(--serif);font-size:26px;font-weight:400;letter-spacing:-0.02em;line-height:1.15;margin-bottom:12px;font-style:italic}
.proj-org{font-size:12px;font-weight:400;color:var(--mid);letter-spacing:0.05em;margin-bottom:24px}
.proj-desc{font-size:14px;font-weight:300;line-height:1.65;color:var(--mid);margin-bottom:28px}
.proj-stack{display:flex;flex-wrap:wrap;gap:6px}
.proj-tag{font-size:11px;font-weight:400;padding:5px 12px;border:1px solid var(--faint);border-radius:100px;color:var(--mid);letter-spacing:0.03em}
.proj-arrow{position:absolute;top:48px;right:48px;font-size:18px;color:var(--faint);transition:color 0.25s}
.proj-card:hover .proj-arrow{color:var(--ink)}

/* SKILLS */
.skills-wrap{display:grid;grid-template-columns:1fr 1fr;gap:96px;align-items:start}
.skill-list{display:flex;flex-direction:column;gap:0}
.skill-row{display:flex;align-items:center;justify-content:space-between;padding:18px 0;border-bottom:1px solid var(--faint)}
.skill-row:first-child{border-top:1px solid var(--faint)}
.skill-name{font-size:14px;font-weight:400;color:var(--ink)}
.skill-bar-wrap{flex:1;margin:0 32px;height:1px;background:var(--faint);position:relative}
.skill-bar{height:100%;background:var(--ink);transform:scaleX(0);transform-origin:left;transition:transform 1.4s cubic-bezier(0.16,1,0.3,1)}
.skill-bar.on{transform:scaleX(1)}
.skill-pct{font-size:12px;font-weight:400;color:var(--mid);min-width:32px;text-align:right}
.skills-aside{display:flex;flex-direction:column;gap:40px}
.aside-block{padding:36px;background:var(--off);border-radius:16px}
.aside-label{font-size:11px;font-weight:500;letter-spacing:0.1em;text-transform:uppercase;color:var(--mid);margin-bottom:16px}
.aside-text{font-size:14px;font-weight:300;line-height:1.7;color:var(--ink)}
.chips{display:flex;flex-wrap:wrap;gap:8px;margin-top:4px}
.chip{font-size:12px;font-weight:400;padding:6px 14px;border:1px solid var(--faint);border-radius:100px;color:var(--mid)}

/* EDU */
.edu-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1px;background:var(--faint);border:1px solid var(--faint)}
.edu-card{background:var(--white);padding:48px}
.edu-deg{font-family:var(--serif);font-size:28px;font-weight:400;letter-spacing:-0.02em;line-height:1.2;margin-bottom:20px;font-style:italic}
.edu-uni{font-size:12px;font-weight:500;letter-spacing:0.08em;text-transform:uppercase;color:var(--mid);margin-bottom:6px}
.edu-yr{font-size:12px;font-weight:300;color:var(--mid)}

/* FOOTER */
footer{padding:64px;display:flex;align-items:center;justify-content:space-between}
.footer-left{}
.footer-name{font-family:var(--serif);font-size:22px;font-weight:400;letter-spacing:-0.01em;font-style:italic;margin-bottom:6px}
.footer-sub{font-size:12px;font-weight:300;color:var(--mid)}
.footer-right{display:flex;gap:32px;align-items:center}
.footer-right a{font-size:13px;font-weight:300;color:var(--mid);text-decoration:none;transition:color 0.2s}
.footer-right a:hover{color:var(--ink)}

/* MODAL */
.modal-bg{position:fixed;inset:0;background:rgba(17,17,16,0.5);z-index:2000;display:flex;align-items:center;justify-content:center;padding:40px;opacity:0;pointer-events:none;transition:opacity 0.3s;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}
.modal-bg.open{opacity:1;pointer-events:all}
.modal-panel{background:var(--white);max-width:600px;width:100%;border-radius:20px;padding:52px;position:relative;transform:translateY(16px) scale(0.98);transition:all 0.3s cubic-bezier(0.16,1,0.3,1)}
.modal-bg.open .modal-panel{transform:translateY(0) scale(1)}
.modal-x{position:absolute;top:20px;right:20px;width:32px;height:32px;border-radius:50%;background:var(--off);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:16px;color:var(--mid);transition:background 0.2s}
.modal-x:hover{background:var(--faint)}
.modal-tag{font-size:11px;font-weight:500;letter-spacing:0.1em;text-transform:uppercase;color:var(--mid);margin-bottom:16px}
.modal-title{font-family:var(--serif);font-size:32px;font-weight:400;letter-spacing:-0.02em;font-style:italic;line-height:1.1;margin-bottom:32px}
.modal-pts{list-style:none;display:flex;flex-direction:column;gap:14px}
.modal-pts li{font-size:14px;font-weight:300;line-height:1.65;color:var(--ink);padding-left:20px;position:relative}
.modal-pts li::before{content:'';position:absolute;left:0;top:10px;width:6px;height:1px;background:var(--mid)}

/* INTRO */
.intro-screen{position:fixed;inset:0;background:var(--ink);z-index:9000;display:flex;align-items:center;justify-content:center;flex-direction:column;transition:opacity 0.7s ease}
.intro-screen.gone{opacity:0;pointer-events:none}
.intro-wordmark{font-family:var(--serif);font-size:clamp(52px,8vw,96px);font-weight:300;font-style:italic;color:var(--white);letter-spacing:-0.03em;opacity:0;transform:translateY(20px);transition:all 0.9s cubic-bezier(0.16,1,0.3,1)}
.intro-wordmark.in{opacity:1;transform:none}
.intro-sub{font-size:12px;font-weight:400;letter-spacing:0.14em;text-transform:uppercase;color:rgba(255,255,255,0.35);margin-top:20px;opacity:0;transition:opacity 0.6s 0.35s}
.intro-sub.in{opacity:1}
.intro-enter{margin-top:48px;padding:12px 32px;border:1px solid rgba(255,255,255,0.2);background:transparent;color:rgba(255,255,255,0.7);font-family:var(--sans);font-size:13px;font-weight:400;letter-spacing:0.06em;border-radius:100px;cursor:pointer;opacity:0;transition:all 0.25s 0.65s;text-transform:uppercase}
.intro-enter.in{opacity:1}
.intro-enter:hover{background:rgba(255,255,255,0.08);color:var(--white);border-color:rgba(255,255,255,0.4)}

/* REVEAL */
.reveal{opacity:0;transform:translateY(24px);transition:opacity 0.8s cubic-bezier(0.16,1,0.3,1),transform 0.8s cubic-bezier(0.16,1,0.3,1)}
.reveal.in{opacity:1;transform:none}
</style>
</head>
<body>

<div id="bar"></div>

<!-- INTRO -->
<div class="intro-screen" id="intro">
  <div class="intro-wordmark" id="iw">Aniket Bansal</div>
  <div class="intro-sub" id="is">Data Analyst · Glasgow, UK</div>
  <button class="intro-enter" id="ie" onclick="enter()">Enter</button>
</div>

<!-- SITE -->
<div id="site" style="visibility:hidden">

<nav id="nav">
  <a class="logo" href="#">Aniket Bansal</a>
  <div class="nav-links">
    <a href="#work">Work</a>
    <a href="#projects">Projects</a>
    <a href="#skills">Skills</a>
    <a href="#edu">Education</a>
    <a href="http://www.linkedin.com/in/ianiketx" target="_blank">LinkedIn</a>
    <a href="https://github.com/ianiketx" target="_blank">GitHub</a>
    <a href="mailto:ianiketbansalx@gmail.com" class="nav-cta">Get in touch</a>
  </div>
</nav>

<!-- HERO -->
<section class="hero">
  <div class="hero-tag">MSc Data Analytics &nbsp;·&nbsp; Junior Analyst &nbsp;·&nbsp; Glasgow, UK</div>
  <h1 class="hero-h1">Aniket<br/><em>Bansal.</em></h1>
  <p style="font-family:var(--serif);font-size:clamp(18px,2vw,26px);font-weight:300;color:var(--mid);margin-top:28px;letter-spacing:-0.01em;font-style:italic">Data analyst turning complex pipelines into clear decisions.</p>
  <div class="hero-bottom">
    <p class="hero-bio">Converting complex claims data and healthcare logistics into robust commercial strategy. Specialized in Databricks pipelines, Power BI, and end-to-end ML workflows.</p>
    <div class="hero-actions">
      <a href="mailto:ianiketbansalx@gmail.com" class="btn-dark">Get in touch &nbsp;→</a>
      <a href="http://www.linkedin.com/in/ianiketx" target="_blank" class="btn-light">LinkedIn</a>
      <a href="https://github.com/ianiketx" target="_blank" class="btn-light">GitHub</a>
    </div>
  </div>
</section>

<!-- STATS -->
<div class="stats reveal">
  <div class="stat">
    <div class="stat-n">95%</div>
    <div class="stat-l">SQL proficiency</div>
  </div>
  <div class="stat">
    <div class="stat-n">£3.2m</div>
    <div class="stat-l">Strategic investment<br/>supported</div>
  </div>
  <div class="stat">
    <div class="stat-n">20k</div>
    <div class="stat-l">Records processed<br/>in ML pipeline</div>
  </div>
  <div class="stat">
    <div class="stat-n">Jan '27</div>
    <div class="stat-l">UK Graduate Visa<br/>valid until</div>
  </div>
</div>

<!-- WORK -->
<section class="section" id="work">
  <div class="section-header">
    <h2 class="section-title">Work history</h2>
    <span class="section-num">01</span>
  </div>
  <div class="work-list">
    <div class="work-item reveal">
      <div class="work-meta">
        <div class="work-co">Direct Line Group<br/>(AVIVA)</div>
        <div class="work-period" style="margin-top:16px">Nov 2025 – Present</div>
        <div class="work-loc">Glasgow, UK</div>
      </div>
      <div class="work-detail">
        <div class="work-role">Damage Fixer Handler — Existing Claims</div>
        <ul class="work-pts">
          <li>Handle and resolve inquiries within Existing Claims, ensuring data accuracy across all touchpoints.</li>
          <li>Monitor claim data daily to bridge frontline care and operational reporting.</li>
          <li>Utilize SQL databases and advanced Excel pivot tables to surface performance insights.</li>
        </ul>
      </div>
    </div>
    <div class="work-item reveal">
      <div class="work-meta">
        <div class="work-co">TwiLearn</div>
        <div class="work-period" style="margin-top:16px">Jan 2025 – Jul 2025</div>
        <div class="work-loc">Remote</div>
      </div>
      <div class="work-detail">
        <div class="work-role">Data Scientist — Intern</div>
        <ul class="work-pts">
          <li>Developed automated SQL pipelines replacing manual data cleaning workflows.</li>
          <li>Created Power BI dashboards surfacing performance insights for stakeholder review.</li>
          <li>Applied NLP techniques for customer feedback sentiment analysis.</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<!-- PROJECTS -->
<section class="section" id="projects">
  <div class="section-header">
    <h2 class="section-title">Selected projects</h2>
    <span class="section-num">02</span>
  </div>
  <div class="proj-grid">
    <div class="proj-card reveal" onclick="openModal(0)">
      <div class="proj-index">01</div>
      <div class="proj-arrow">↗</div>
      <div class="proj-name">Indian Roads ML Pipeline</div>
      <div class="proj-org">Databricks · MLflow</div>
      <div class="proj-desc">End-to-end ML pipeline for accident analysis across 20k records, with XGBoost and Random Forest classifiers.</div>
      <div class="proj-stack">
        <span class="proj-tag">Python</span><span class="proj-tag">PySpark</span><span class="proj-tag">MLflow</span><span class="proj-tag">Databricks</span>
      </div>
    </div>
    <div class="proj-card reveal" onclick="openModal(1)">
      <div class="proj-index">02</div>
      <div class="proj-arrow">↗</div>
      <div class="proj-name">NHS Logistics Strategic Insight</div>
      <div class="proj-org">NHS · SQL · Power BI</div>
      <div class="proj-desc">Analytical support for a £3.2m strategic investment decision, identifying a critical 72% delay bottleneck.</div>
      <div class="proj-stack">
        <span class="proj-tag">SQL</span><span class="proj-tag">Power BI</span><span class="proj-tag">Statistics</span>
      </div>
    </div>
    <div class="proj-card reveal" onclick="openModal(2)">
      <div class="proj-index">03</div>
      <div class="proj-arrow">↗</div>
      <div class="proj-name">EY Market Trend Modeling</div>
      <div class="proj-org">Ernst & Young · Finance</div>
      <div class="proj-desc">Volatility modeling and high-risk exposure sector analysis translated into executive-ready strategic decks.</div>
      <div class="proj-stack">
        <span class="proj-tag">Python</span><span class="proj-tag">Power BI</span><span class="proj-tag">Strategy</span>
      </div>
    </div>
    <div class="proj-card reveal" onclick="openModal(3)">
      <div class="proj-index">04</div>
      <div class="proj-arrow">↗</div>
      <div class="proj-name">Experian Data QA Automation</div>
      <div class="proj-org">Experian · SQL · Python</div>
      <div class="proj-desc">Automated extraction and QA pipelines for regulated finance environments, achieving 100% accuracy.</div>
      <div class="proj-stack">
        <span class="proj-tag">SQL</span><span class="proj-tag">Python</span><span class="proj-tag">QA</span>
      </div>
    </div>
    <div class="proj-card reveal" onclick="openModal(4)" style="border-right:none">
      <div class="proj-index">05</div>
      <div class="proj-arrow">↗</div>
      <div class="proj-name">Workforce Insights Research</div>
      <div class="proj-org">Emerge Lab · Data Vis</div>
      <div class="proj-desc">Board-level visualisations for a workforce diversity study, managing tight multi-workstream deadlines.</div>
      <div class="proj-stack">
        <span class="proj-tag">Data Vis</span><span class="proj-tag">Excel</span><span class="proj-tag">Research</span>
      </div>
    </div>
  </div>
</section>

<!-- SKILLS -->
<section class="section" id="skills">
  <div class="section-header">
    <h2 class="section-title">Proficiency</h2>
    <span class="section-num">03</span>
  </div>
  <div class="skills-wrap">
    <div class="skill-list" id="skillList">
      <div class="skill-row"><span class="skill-name">SQL</span><div class="skill-bar-wrap"><div class="skill-bar" style="width:95%"></div></div><span class="skill-pct">95%</span></div>
      <div class="skill-row"><span class="skill-name">Power BI</span><div class="skill-bar-wrap"><div class="skill-bar" style="width:90%"></div></div><span class="skill-pct">90%</span></div>
      <div class="skill-row"><span class="skill-name">Python</span><div class="skill-bar-wrap"><div class="skill-bar" style="width:85%"></div></div><span class="skill-pct">85%</span></div>
      <div class="skill-row"><span class="skill-name">Databricks</span><div class="skill-bar-wrap"><div class="skill-bar" style="width:80%"></div></div><span class="skill-pct">80%</span></div>
      <div class="skill-row"><span class="skill-name">ETL / PySpark</span><div class="skill-bar-wrap"><div class="skill-bar" style="width:85%"></div></div><span class="skill-pct">85%</span></div>
      <div class="skill-row"><span class="skill-name">Excel</span><div class="skill-bar-wrap"><div class="skill-bar" style="width:90%"></div></div><span class="skill-pct">90%</span></div>
    </div>
    <div class="skills-aside">
      <div class="aside-block reveal">
        <div class="aside-label">Current status</div>
        <div class="aside-text">UK Graduate Visa valid until January 2027. Actively seeking Data Analyst roles across the UK.</div>
      </div>
      <div class="aside-block reveal">
        <div class="aside-label">Tools & technologies</div>
        <div class="chips">
          <span class="chip">XGBoost</span>
          <span class="chip">MLflow</span>
          <span class="chip">NLP</span>
          <span class="chip">Scikit-learn</span>
          <span class="chip">Unity Catalog</span>
          <span class="chip">Pandas</span>
          <span class="chip">Git</span>
          <span class="chip">Random Forest</span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- EDUCATION -->
<section class="section" id="edu">
  <div class="section-header">
    <h2 class="section-title">Education</h2>
    <span class="section-num">04</span>
  </div>
  <div class="edu-grid">
    <div class="edu-card reveal">
      <div class="edu-deg">MSc Data Analytics</div>
      <div class="edu-uni">University of Strathclyde</div>
      <div class="edu-yr">Glasgow, UK &nbsp;·&nbsp; 2024</div>
    </div>
    <div class="edu-card reveal">
      <div class="edu-deg">B.Tech Computer Engineering</div>
      <div class="edu-uni">MVN University</div>
      <div class="edu-yr">India &nbsp;·&nbsp; 2022</div>
    </div>
  </div>
</section>

<!-- FOOTER -->
<footer>
  <div class="footer-left">
    <div class="footer-name">Aniket Bansal</div>
    <div class="footer-sub">Data Analyst &nbsp;·&nbsp; Glasgow, UK</div>
  </div>
  <div class="footer-right">
    <a href="mailto:ianiketbansalx@gmail.com">ianiketbansalx@gmail.com</a>
    <a href="http://www.linkedin.com/in/ianiketx" target="_blank">LinkedIn</a>
    <a href="https://github.com/ianiketx" target="_blank">GitHub</a>
    <a href="#work">Work</a>
    <a href="#projects">Projects</a>
    <a href="#skills">Skills</a>
  </div>
</footer>

</div>

<!-- MODAL -->
<div class="modal-bg" id="modal" onclick="closeModal(event)">
  <div class="modal-panel">
    <button class="modal-x" onclick="closeModal()">✕</button>
    <div class="modal-tag" id="mTag"></div>
    <div class="modal-title" id="mTitle"></div>
    <ul class="modal-pts" id="mPts"></ul>
  </div>
</div>

<script>
const projects=[
  {org:"Databricks · MLflow",title:"Indian Roads ML Pipeline",pts:["Designed a 3-layer schema using Unity Catalog for clean data governance across 20k records.","Engineered composite danger scores via PySpark with robust feature engineering.","Trained XGBoost and Random Forest classifiers with full hyperparameter tuning.","Tracked all experiments, parameters, and model artifacts via MLflow."]},
  {org:"NHS · SQL · Power BI",title:"NHS Logistics Strategic Insight",pts:["Cleansed operational data from disparate NHS sources into a unified schema.","Identified a 72% delay bottleneck through statistical root-cause analysis.","Delivered executive Power BI reporting that directly supported a £3.2m investment decision."]},
  {org:"Ernst & Young · Finance",title:"EY Market Trend Modeling",pts:["Modelled market volatility trends in Python using time-series statistical analysis.","Built executive-ready Power BI dashboards for senior EY stakeholders.","Identified high-risk exposure sectors, informing strategic portfolio decisions."]},
  {org:"Experian · SQL · Python",title:"Experian Data QA Automation",pts:["Built automated extraction pipelines replacing slow manual processes across regulated finance data.","Implemented rigorous multi-layer data quality checks to ensure compliance.","Resolved anomalies systematically to achieve 100% data accuracy targets."]},
  {org:"Emerge Lab · Data Vis",title:"Workforce Insights Research",pts:["Developed comprehensive data dictionaries for a board-level workforce diversity study.","Produced strategic visual extracts reviewed directly by senior leadership.","Managed tight multi-workstream deadlines across a distributed research team."]}
];

function enter(){
  document.getElementById('intro').classList.add('gone');
  setTimeout(()=>{
    document.getElementById('intro').style.display='none';
    const s=document.getElementById('site');
    s.style.visibility='visible';
    s.style.opacity='0';
    s.style.transition='opacity 0.5s';
    requestAnimationFrame(()=>s.style.opacity='1');
  },600);
}

function openModal(i){
  const p=projects[i];
  document.getElementById('mTag').textContent=p.org;
  document.getElementById('mTitle').textContent=p.title;
  document.getElementById('mPts').innerHTML=p.pts.map(b=>`<li>${b}</li>`).join('');
  document.getElementById('modal').classList.add('open');
  document.body.style.overflow='hidden';
}

function closeModal(e){
  if(!e||e.target===document.getElementById('modal')){
    document.getElementById('modal').classList.remove('open');
    document.body.style.overflow='';
  }
}

let skillsDone=false;
window.addEventListener('scroll',()=>{
  const prog=window.scrollY/(document.body.scrollHeight-window.innerHeight);
  document.getElementById('bar').style.width=(prog*100)+'%';
  document.getElementById('nav').classList.toggle('scrolled',window.scrollY>60);
  document.querySelectorAll('.reveal').forEach(el=>{
    if(el.getBoundingClientRect().top<window.innerHeight-60) el.classList.add('in');
  });
  if(!skillsDone){
    const sl=document.getElementById('skillList');
    if(sl&&sl.getBoundingClientRect().top<window.innerHeight-60){
      sl.querySelectorAll('.skill-bar').forEach(b=>b.classList.add('on'));
      skillsDone=true;
    }
  }
});

setTimeout(()=>{
  document.getElementById('iw').classList.add('in');
  setTimeout(()=>document.getElementById('is').classList.add('in'),300);
  setTimeout(()=>document.getElementById('ie').classList.add('in'),580);
},150);

document.addEventListener('keydown',e=>{
  if(e.key==='Escape') closeModal();
});
</script>
</body>
</html>
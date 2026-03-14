"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { 
  ResponsiveContainer, XAxis, YAxis, RadarChart, PolarGrid, PolarAngleAxis, Radar, 
  BarChart, Bar, Tooltip, Cell, AreaChart, Area, CartesianGrid
} from 'recharts';
import { 
  Database, Briefcase, X, ChevronRight, CheckCircle2,
  Cpu, Mail, Linkedin, FileText, ExternalLink, Terminal, Layers, Activity,
  ShieldCheck, GraduationCap, Globe, Network, 
  PieChart, MapPin, Phone, Code2, ShieldAlert, Award, LineChart as LineChartIcon, Command
} from "lucide-react";

// --- 1. AI TERMINAL BOOT SEQUENCE ---
const AIBootSequence = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [log, setLog] = useState("INITIALISING NEURAL NETWORK...");

  useEffect(() => {
    const logs = [
      "ESTABLISHING SECURE CONNECTION...",
      "LOADING MDM PROTOCOLS...",
      "PARSING RESUME DATA [ANIKET_BANSAL]...",
      "RENDERING VISUALISATIONS...",
      "SYSTEM ONLINE."
    ];
    let currentProgress = 0;
    let logIndex = 0;

    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 15) + 5;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setTimeout(onComplete, 800);
      }
      setProgress(currentProgress);
      
      if (currentProgress > (logIndex + 1) * 20 && logIndex < logs.length) {
        setLog(logs[logIndex]);
        logIndex++;
      }
    }, 150);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div exit={{ opacity: 0, scale: 1.1 }} transition={{ duration: 0.8 }} className="fixed inset-0 z-[9999] bg-[#020617] flex flex-col items-center justify-center p-8 font-mono text-cyan-500">
      <Network size={64} className="animate-spin-slow mb-8 opacity-80" />
      <div className="w-full max-w-md">
        <div className="flex justify-between text-xs mb-2 tracking-widest">
          <span>{log}</span>
          <span>{progress}%</span>
        </div>
        <div className="h-1 w-full bg-cyan-950 rounded-full overflow-hidden">
          <motion.div className="h-full bg-cyan-400 shadow-[0_0_15px_#22d3ee]" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </motion.div>
  );
};

// --- 2. INTERACTIVE NEURAL BACKGROUND ---
const NeuralBackground = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 2000], [0, -200]);
  const y2 = useTransform(scrollY, [0, 2000], [0, -400]);

  return (
    <div className="fixed inset-0 z-0 bg-[#020617] overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#22d3ee 1px, transparent 1px), linear-gradient(90deg, #22d3ee 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <motion.div style={{ y: y1 }} className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[150px]" />
      <motion.div style={{ y: y2 }} className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-blue-700/10 rounded-full blur-[150px]" />
    </div>
  );
};

// --- 3. ANIMATED DATA CARD ---
const InteractiveCard = ({ children, className = "", delay = 0, onClick, onHover }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
      onClick={onClick}
      onMouseEnter={onHover}
      className={`relative bg-[#0f172a]/60 backdrop-blur-md border border-cyan-500/20 rounded-2xl p-8 hover:border-cyan-400/50 hover:bg-[#0f172a]/80 hover:shadow-[0_0_30px_rgba(34,211,238,0.1)] transition-all cursor-pointer group ${className}`}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/0 to-transparent group-hover:via-cyan-500/50 transition-all duration-700" />
      {children}
    </motion.div>
  );
};

// --- MAIN PORTFOLIO COMPONENT ---
export default function AniketAIAnalyticsPortfolio() {
  const [booting, setBooting] = useState(true);
  const [activeModal, setActiveModal] = useState<any>(null);
  const [filter, setFilter] = useState("ALL");
  const [terminalLogs, setTerminalLogs] = useState<string[]>(["SYSTEM READY. WAITING FOR USER INPUT..."]);

  const addLog = (msg: string) => {
    setTerminalLogs(prev => {
      const newLogs = [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`];
      return newLogs.slice(-4); // Keep only last 4 logs
    });
  };

  // Resume Data
  const projects = [
    {
      id: "experian",
      category: "FINANCE",
      title: "Financial Modelling & Income Verification Algorithm",
      subtitle: "Experian Project",
      image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=2000",
      details: [
        "Demonstrated deep technical proficiency by developing a Python-based logic engine to process massive datasets and maintain master data integrity.",
        "Built automated workflows to reverse-engineer financial metrics, overseeing the resolution of data anomalies and ensuring strict compliance with operational standards.",
        "This project highlights the advanced data analysis skills required to manage customer master data business processes securely."
      ],
      stack: ["Python", "Master Data Management", "Financial Modelling"]
    },
    {
      id: "nhs",
      category: "HEALTHCARE",
      title: "Strategic Recommendations for Healthcare Sector",
      subtitle: "NHS",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2000",
      details: [
        "Conducted robust statistical analysis on 10 years of massive, complex healthcare datasets to investigate operational bottlenecks and supply chain inefficiencies.",
        "Acted as a central data lead to translate raw data into actionable business insights, identifying that 72 percent of delays were driven by external logistics and social care bottlenecks.",
        "Proposed a 3.2m strategic investment to modernise infrastructure and optimise the delivery of healthcare services."
      ],
      stack: ["Statistical Analysis", "Healthcare Logistics", "Business Insights"]
    },
    {
      id: "ey",
      category: "FINANCE",
      title: "Market Volatility & Predictive Forecasting",
      subtitle: "Crypto-Economics – EY",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2000",
      details: [
        "Applied advanced statistical analysis and prediction modelling to forecast future events and trends in highly dynamic markets.",
        "Utilised data visualisation tools to translate complex statistical findings into clear supply controls and high-level strategies.",
        "Demonstrated exceptional logical reasoning by showing that external indicators strongly impacted market stability."
      ],
      stack: ["Predictive Modelling", "Data Visualisation", "Statistics"]
    },
    {
      id: "emerge",
      category: "COMPLIANCE",
      title: "Strategic Workforce Analysis: Inclusivity in the Workplace",
      subtitle: "Emerge Lab",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000",
      details: [
        "Supported delivery teams by preparing datasets and consultancy outputs for a 6-month research project evaluating the commercial impact of workplace diversity.",
        "Produced data extracts and initial outputs for senior review, working to agreed timelines to deliver actionable insights that influence strategic business decisions."
      ],
      stack: ["Data Extraction", "Consultancy", "Actionable Insights"]
    }
  ];

  const filteredProjects = filter === "ALL" ? projects : projects.filter(p => p.category === filter);

  const academics = [
    {
      id: "msc",
      title: "MSc Data Analytics",
      subtitle: "University of Strathclyde, Glasgow, UK | 2023 – 2024",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2000",
      details: [
        "Key Modules: Big Data Fundamentals, Machine Learning, Business Analysis, Data Analytics in Practice.",
        "Dissertation: Conducted a 6-month research project on Inclusivity in the Workplace, analysing the commercial impact of diverse teams."
      ],
      stack: ["Big Data", "Machine Learning", "Business Analysis"]
    },
    {
      id: "btech",
      title: "B.Tech Computer Engineering",
      subtitle: "MVN University, India | 2019 – 2022",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2000",
      details: [
        "Core Focus: Data Structures, Algorithms, Database Management Systems (DBMS), Software Engineering.",
        "Dissertation: Designed a prototype for an Automatic Object Detection Vehicle, engineering real-time collision-avoidance algorithms using sensor fusion logic."
      ],
      stack: ["DBMS", "Data Structures", "Algorithms"]
    }
  ];

  const radarData = [
    { subject: 'MDM & SQL', A: 95 },
    { subject: 'Python', A: 85 },
    { subject: 'Power BI', A: 90 },
    { subject: 'Statistics', A: 95 },
    { subject: 'Compliance', A: 100 },
    { subject: 'Logistics', A: 88 },
  ];

  return (
    <div className="bg-[#020617] min-h-screen text-slate-300 font-sans selection:bg-cyan-500/30">
      <AnimatePresence>{booting && <AIBootSequence onComplete={() => setBooting(false)} />}</AnimatePresence>
      {!booting && <NeuralBackground />}

      <main className={`relative z-10 max-w-[1400px] mx-auto px-6 py-12 space-y-16 transition-opacity duration-1000 ${booting ? 'opacity-0' : 'opacity-100'}`}>
        
        {/* --- HEADER: RESUME SYNCED --- */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-12">
          <InteractiveCard className="col-span-1 lg:col-span-2 flex flex-col justify-center" delay={0.1} onHover={() => addLog("USER INSPECTING CORE PROFILE")}>
            <div className="flex items-center gap-6 mb-6">
              <div className="relative w-20 h-20 bg-[#0f172a] rounded-2xl border border-cyan-500/50 flex items-center justify-center overflow-hidden">
                <Database className="text-cyan-400 z-10" size={36}/>
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} className="absolute inset-[-50%] bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_50%,#06b6d4_100%)] opacity-20" />
              </div>
              <div>
                <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="text-4xl md:text-6xl font-black text-white tracking-tight mb-2">Aniket Bansal</motion.h1>
                <motion.h2 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="text-xl md:text-2xl text-cyan-400 font-medium font-mono tracking-wide">Data Analyst</motion.h2>
              </div>
            </div>
            
            <p className="text-lg text-slate-300 leading-relaxed mb-8 border-l-2 border-cyan-500/50 pl-4">
             Data Analyst with an <span className="text-cyan-400 font-semibold">MSc in Data Analytics</span> and hands-on operational experience within the <span className="text-white font-semibold">UK insurance sector</span>. Proficient in extracting, manipulating, and reconciling complex structured and unstructured datasets to drive actionable commercial insights. Adept at utilising <span className="text-cyan-400 font-semibold">Python, PySpark, and Power BI</span> to build robust data pipelines, dynamic reports, and maintain data dictionaries. Combines strong technical capabilities with a deep understanding of insurance workflows and information security principles to empower pricing teams and support strategic, data-driven decision-making.
            </p>
            
            <div className="flex flex-wrap gap-4 text-sm font-mono">
              <span className="flex items-center gap-2 bg-slate-800/80 border border-slate-700 px-4 py-2 rounded-lg text-cyan-100"><MapPin size={16} className="text-cyan-500"/> Glasgow, G75 0LJ</span>
              <span className="flex items-center gap-2 bg-slate-800/80 border border-slate-700 px-4 py-2 rounded-lg text-cyan-100"><Mail size={16} className="text-cyan-500"/> ianiketbansalx@gmail.com</span>
              <a href="http://www.linkedin.com/in/ianiketx" target="_blank" onClick={() => addLog("EXTERNAL LINK: LINKEDIN OPENED")} className="flex items-center gap-2 bg-cyan-950 border border-cyan-500/50 text-cyan-400 px-4 py-2 rounded-lg hover:bg-cyan-900 transition-colors cursor-pointer"><Linkedin size={16}/> LinkedIn Profile</a>
            </div>
          </InteractiveCard>

          <InteractiveCard className="col-span-1 flex flex-col justify-between" delay={0.2} onHover={() => addLog("USER VIEWING SKILL MATRIX")}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-400 font-mono tracking-widest"><Activity size={16} className="inline mr-2 text-cyan-500"/>AI SKILL MATRIX</h3>
              <span className="flex h-3 w-3"><span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-cyan-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span></span>
            </div>
            <div className="w-full h-[250px] -ml-4">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                  <PolarGrid stroke="#1e293b" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#cbd5e1', fontSize: 10, fontFamily: 'monospace' }} />
                  <Radar name="Proficiency" dataKey="A" stroke="#22d3ee" strokeWidth={2} fill="#22d3ee" fillOpacity={0.2} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }} itemStyle={{ color: '#22d3ee' }}/>
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </InteractiveCard>
        </section>

        {/* --- PROFESSIONAL EXPERIENCE --- */}
        <section>
          <div className="flex items-center gap-4 mb-6">
            <Briefcase className="text-cyan-500" size={28}/>
            <h2 className="text-3xl font-bold text-white tracking-tight">Professional Experience</h2>
          </div>
          
          {/* DIRECT LINE GROUP */}
          <InteractiveCard delay={0.3} onClick={() => addLog("EXPANDED DLG EXPERIENCE")}>
            <div className="flex flex-col md:flex-row justify-between md:items-end mb-6 pb-6 border-b border-slate-800/80">
              <div>
                <h3 className="text-3xl font-bold text-white mb-2">Direct Line Group</h3>
                <div className="flex items-center gap-3 text-cyan-400 font-mono text-sm bg-cyan-950/30 w-fit px-3 py-1 rounded border border-cyan-500/20">
                  <ShieldAlert size={14}/> Damage Fixer Handler – MCR
                </div>
              </div>
              <div className="mt-4 md:mt-0 text-left md:text-right font-mono text-sm text-slate-400">
                <p className="text-white">Glasgow, UK</p>
                <p className="text-cyan-500 mt-1">Nov 2025 – Present</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-900/40 border border-slate-800">
                <CheckCircle2 className="text-cyan-500 shrink-0 mt-1" size={20}/>
                <p className="text-slate-300 leading-relaxed">Act as a functional SME within a highly regulated FCA environment, managing the damage fulfilment supply chain and interacting directly with external Logistics Service Providers.</p>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-900/40 border border-slate-800">
                <CheckCircle2 className="text-cyan-500 shrink-0 mt-1" size={20}/>
                <p className="text-slate-300 leading-relaxed">Manage, validate, and maintain customer accounts and master data within enterprise systems, ensuring 100 percent compliance with strict industry regulations.</p>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-900/40 border border-slate-800">
                <CheckCircle2 className="text-cyan-500 shrink-0 mt-1" size={20}/>
                <p className="text-slate-300 leading-relaxed">Deliver second-line resolution for escalated customer queries within tight KPIs, addressing complex system failures and logistical bottlenecks.</p>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-900/40 border border-slate-800">
                <CheckCircle2 className="text-cyan-500 shrink-0 mt-1" size={20}/>
                <p className="text-slate-300 leading-relaxed">Collaborate with cross-functional teams to ensure high-speed delivery of services, applying logical reasoning to make high-stakes decisions that improve overall supply chain effectiveness.</p>
              </div>
            </div>
          </InteractiveCard>

          <div className="h-8"></div> {/* Spacer between cards */}

          {/* TWILEARN INTERNSHIP */}
          <InteractiveCard delay={0.4} onClick={() => addLog("EXPANDED TWILEARN EXPERIENCE")}>
            <div className="flex flex-col md:flex-row justify-between md:items-end mb-6 pb-6 border-b border-slate-800/80">
              <div>
                <h3 className="text-3xl font-bold text-white mb-2">TwiLearn</h3>
                <div className="flex items-center gap-3 text-cyan-400 font-mono text-sm bg-cyan-950/30 w-fit px-3 py-1 rounded border border-cyan-500/20">
                  {/* Note: Ensure 'Database' or 'Code' icon is imported from lucide-react at the top of your file */}
                  <Briefcase size={14}/> Data Scientist (Intern)
                </div>
              </div>
              <div className="mt-4 md:mt-0 text-left md:text-right font-mono text-sm text-slate-400">
                <p className="text-white">Remote</p>
                <p className="text-cyan-500 mt-1">Jan 2025 – Jul 2025</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-900/40 border border-slate-800">
                <CheckCircle2 className="text-cyan-500 shrink-0 mt-1" size={20}/>
                <p className="text-slate-300 leading-relaxed"><strong className="text-white">Data Solutions & DevOps:</strong> Developed and deployed Python and PySpark-based data solutions to predict outcomes, utilising DevOps practices to manage and update workflows efficiently.</p>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-900/40 border border-slate-800">
                <CheckCircle2 className="text-cyan-500 shrink-0 mt-1" size={20}/>
                <p className="text-slate-300 leading-relaxed"><strong className="text-white">Data Cleansing & Structuring:</strong> Engineered robust data pipelines using SQL and Databricks to cleanse raw data, converting semi-structured and unstructured data into structured formats.</p>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-900/40 border border-slate-800">
                <CheckCircle2 className="text-cyan-500 shrink-0 mt-1" size={20}/>
                <p className="text-slate-300 leading-relaxed"><strong className="text-white">Self-Service & Manipulation:</strong> Utilised Python to extract, manipulate, and reconcile data from the data lake, building capacity for self-service access to data.</p>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-900/40 border border-slate-800">
                <CheckCircle2 className="text-cyan-500 shrink-0 mt-1" size={20}/>
                <p className="text-slate-300 leading-relaxed"><strong className="text-white">Dynamic Reporting:</strong> Prototyped NLP solutions to analyse unstructured customer feedback, creating dynamic reports within Power BI and Unity Catalog environments.</p>
              </div>
            </div>
          </InteractiveCard>
        </section>

        {/* --- DYNAMIC PROJECT FILTERING SYSTEM --- */}
        <section>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div className="flex items-center gap-4">
              <Layers className="text-cyan-500" size={28}/>
              <h2 className="text-3xl font-bold text-white tracking-tight">Data Intelligence Theses</h2>
            </div>
            
            {/* Interactive AI Filter */}
            <div className="flex flex-wrap gap-2 p-1 bg-slate-900/80 rounded-lg border border-slate-800">
              {["ALL", "HEALTHCARE", "FINANCE", "COMPLIANCE"].map((cat) => (
                <button 
                  key={cat}
                  onClick={() => { setFilter(cat); addLog(`EXECUTED QUERY: FILTER_PROJECTS WHERE CATEGORY = '${cat}'`); }}
                  className={`px-4 py-2 rounded-md text-xs font-mono font-bold transition-all ${filter === cat ? 'bg-cyan-500 text-slate-900 shadow-[0_0_10px_#22d3ee]' : 'text-slate-400 hover:text-cyan-300 hover:bg-slate-800'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence>
              {filteredProjects.map((p, index) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={p.id}
                >
                  <InteractiveCard 
                    className="h-full flex flex-col group overflow-hidden p-0" 
                    onClick={() => { setActiveModal(p); addLog(`OPENED DATASHEET: ${p.title}`); }}
                  >
                    <div className="h-48 overflow-hidden relative">
                      <div className="absolute inset-0 bg-cyan-900/40 mix-blend-multiply z-10 group-hover:bg-transparent transition-all duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] to-transparent z-20" />
                      <motion.img whileHover={{ scale: 1.05 }} transition={{ duration: 0.5 }} src={p.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt={p.title} />
                      <div className="absolute top-4 right-4 z-30 bg-[#0f172a]/80 backdrop-blur border border-cyan-500/50 px-3 py-1 rounded text-[10px] font-mono text-cyan-400 font-bold">
                        {p.category}
                      </div>
                    </div>
                    
                    <div className="p-8 flex-grow flex flex-col">
                      <h3 className="text-2xl font-bold text-white mb-2 leading-tight group-hover:text-cyan-400 transition-colors">{p.title}</h3>
                      <p className="text-sm font-mono text-slate-400 mb-6">{p.subtitle}</p>
                      
                      <div className="mt-auto flex flex-wrap gap-2 pt-6 border-t border-slate-800">
                        {p.stack.map(s => <span key={s} className="px-2 py-1 bg-slate-800 rounded text-[10px] font-mono text-slate-300">{s}</span>)}
                      </div>
                    </div>
                  </InteractiveCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* --- EDUCATION WITH AI LANDING PROTOCOL --- */}
        <section>
          <div className="flex items-center gap-4 mb-6">
            <GraduationCap className="text-cyan-500" size={28}/>
            <h2 className="text-3xl font-bold text-white tracking-tight">Academic Credentials</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {academics.map((edu, idx) => (
              <InteractiveCard key={edu.id} delay={0.1 * idx} className="flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white">{edu.title}</h3>
                    <p className="text-cyan-500 text-sm font-mono mt-1">{edu.subtitle}</p>
                  </div>
                  {idx === 0 ? <Globe className="text-slate-600" size={32}/> : <Cpu className="text-slate-600" size={32}/>}
                </div>
                
                <div className="space-y-4 text-sm text-slate-300 mb-8 border-l-2 border-slate-700 pl-4 mt-4 flex-grow">
                  <p><span className="text-cyan-400 font-bold">Focus:</span> {edu.details[0].split(': ')[1] || edu.details[0]}</p>
                  <p><span className="text-cyan-400 font-bold">Dissertation:</span> {edu.details[1].split(': ')[1] || edu.details[1]}</p>
                </div>

                <button 
                  onClick={() => { setActiveModal(edu); addLog(`FETCHING CREDENTIALS: ${edu.title}`); }}
                  className="w-full py-4 bg-gradient-to-r from-cyan-600/10 to-blue-600/10 hover:from-cyan-600/20 hover:to-blue-600/20 border border-cyan-500/30 text-cyan-400 rounded-xl text-xs font-mono font-bold tracking-widest uppercase transition-all flex justify-center items-center gap-3 group"
                >
                  <FileText size={16} className="group-hover:scale-110 transition-transform"/> Access Degree Protocol
                </button>
              </InteractiveCard>
            ))}
          </div>
        </section>

        {/* --- SKILLS & MISC (EXACT MATCH TO RESUME) --- */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <InteractiveCard delay={0.3}>
             <h3 className="text-xl font-bold text-white flex items-center gap-3 mb-6"><Award className="text-cyan-500"/> Certifications & Virtual Experience</h3>
             <ul className="space-y-4 text-sm text-slate-300 font-mono">
               <li className="flex flex-col border-b border-slate-800 pb-3 group hover:pl-2 transition-all">
                 <span className="text-cyan-400 font-bold text-xs mb-1">JPMorgan Chase & Co</span>
                 <span>Quantitative Research Virtual Experience Program on Forage</span>
               </li>
               <li className="flex flex-col border-b border-slate-800 pb-3 group hover:pl-2 transition-all">
                 <span className="text-cyan-400 font-bold text-xs mb-1">British Airways</span>
                 <span>Data Science Job Simulation</span>
               </li>
               <li className="flex flex-col border-b border-slate-800 pb-3 group hover:pl-2 transition-all">
                 <span className="text-cyan-400 font-bold text-xs mb-1">Fujitsu</span>
                 <span>Cyber Security</span>
               </li>
               <li className="flex flex-col group hover:pl-2 transition-all">
                 <span className="text-cyan-400 font-bold text-xs mb-1 flex items-center gap-2">Microsoft <span className="bg-yellow-500/20 text-yellow-500 px-2 py-0.5 rounded text-[10px]">In Progress</span></span>
                 <span>PL300: Power BI Data Analyst</span>
               </li>
             </ul>
           </InteractiveCard>

           <InteractiveCard delay={0.4}>
             <h3 className="text-xl font-bold text-white flex items-center gap-3 mb-6"><Terminal className="text-cyan-500"/> Core Data Proficiencies</h3>
             <div className="space-y-6 text-sm text-slate-300">
                <div>
                  <span className="text-cyan-400 font-bold block mb-2 font-mono border-b border-slate-800 pb-1">Data Analysis and Systems</span> 
                  <p className="leading-relaxed">Master Data Management (MDM), Enterprise Database Systems, SQL, Python, Advanced Excel, Data Validation.</p>
                </div>
                <div>
                  <span className="text-cyan-400 font-bold block mb-2 font-mono border-b border-slate-800 pb-1">Visualisation and Statistics</span> 
                  <p className="leading-relaxed">Power BI, Tableau, Advanced Statistical Analysis, Predictive Modelling, Massive Datasets.</p>
                </div>
                <div>
                  <span className="text-cyan-400 font-bold block mb-2 font-mono border-b border-slate-800 pb-1">Supply Chain and Compliance</span> 
                  <p className="leading-relaxed">Logistics Optimisation, Fulfilment Processes, Strict Regulatory Compliance (FCA/Healthcare), Interface Failure Resolution, Logical Reasoning.</p>
                </div>
             </div>
           </InteractiveCard>
        </section>

      </main>

      {/* --- LIVE AI TERMINAL LOGGER --- */}
      <div className="fixed bottom-0 left-0 w-full bg-[#020617]/90 backdrop-blur-xl border-t border-cyan-900/50 p-2 z-[100] hidden md:block font-mono text-[10px] text-cyan-500 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        <div className="max-w-[1400px] mx-auto flex items-start gap-4 px-6 h-12 overflow-hidden relative">
          <Command size={14} className="mt-0.5 shrink-0 opacity-50"/>
          <div className="flex flex-col w-full justify-end h-full">
            <AnimatePresence>
              {terminalLogs.map((log, i) => (
                <motion.div key={log + i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: Math.max(0.2, 1 - (terminalLogs.length - 1 - i) * 0.3), y: 0 }} className="truncate">
                  {log}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* --- DEEP DIVE MODAL (ANIMATED & DETAILED) --- */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 md:p-8">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveModal(null)} className="absolute inset-0 bg-[#020617]/90 backdrop-blur-sm" />
            <motion.div 
              layoutId={`card-${activeModal.id}`} 
              className="relative w-full max-w-5xl bg-[#0f172a] border border-cyan-500/30 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(34,211,238,0.1)] flex flex-col md:flex-row max-h-[85vh]"
            >
                <div className="w-full md:w-2/5 bg-slate-950 relative min-h-[250px] md:min-h-full">
                   <div className="absolute inset-0 opacity-40 mix-blend-luminosity" style={{ backgroundImage: `url('${activeModal.image}')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/50 to-transparent" />
                   <div className="absolute bottom-8 left-8 right-8 text-white z-10">
                      <p className="text-[10px] font-mono text-cyan-400 mb-3 flex items-center gap-2"><Activity size={12}/> DATA_EXTRACT_COMPLETE</p>
                      <h3 className="text-3xl font-bold leading-tight">{activeModal.title}</h3>
                   </div>
                </div>

                <div className="w-full md:w-3/5 p-8 md:p-12 relative text-left overflow-y-auto">
                   <button onClick={() => setActiveModal(null)} className="absolute top-6 right-6 p-2 bg-slate-800/50 rounded-lg hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-400 transition-all border border-transparent hover:border-cyan-500/50"><X size={20}/></button>
                   
                   <p className="text-sm font-mono text-cyan-400 mb-6 pb-4 border-b border-slate-800">{activeModal.subtitle}</p>
                   
                   <div className="space-y-6 text-slate-300 mb-10">
                      {activeModal.details.map((d: string, i: number) => (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + (i * 0.1) }} key={i} className="flex gap-4 items-start bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                           <CheckCircle2 className="text-cyan-500 shrink-0 mt-0.5" size={18}/>
                           <span className="leading-relaxed text-sm">{d}</span>
                        </motion.div>
                      ))}
                   </div>

                   <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-800">
                      <span className="text-[10px] font-mono text-slate-500 w-full mb-2">APPLIED TECHNOLOGIES:</span>
                      {activeModal.stack.map((s: string, i: number) => (
                        <motion.span initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 + (i * 0.1) }} key={s} className="px-3 py-1.5 rounded-lg bg-cyan-950/30 border border-cyan-500/20 text-xs font-mono text-cyan-300">
                          {s}
                        </motion.span>
                      ))}
                   </div>
                </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
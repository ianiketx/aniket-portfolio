"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid,
  RadarChart, PolarGrid, PolarAngleAxis, Radar
} from 'recharts';
import { 
  MapPin, Mail, Linkedin, Database, Layout, ShieldCheck, 
  TrendingUp, GraduationCap, Award, BarChart3, Globe, 
  Briefcase, Microscope, Search, X, ChevronRight, CheckCircle2,
  Cpu
} from "lucide-react";

// --- APPLE HEALTH STYLE DATA ---
const performanceData = [
  { phase: 'Discovery', efficiency: 40, accuracy: 75 },
  { phase: 'Modelling', efficiency: 65, accuracy: 88 },
  { phase: 'Testing', efficiency: 85, accuracy: 95 },
  { phase: 'Deployment', efficiency: 100, accuracy: 100 },
];

const skillsData = [
  { subject: 'SQL', A: 95, fullMark: 100 },
  { subject: 'Data Modelling', A: 100, fullMark: 100 },
  { subject: 'Risk Analysis', A: 85, fullMark: 100 },
  { subject: 'Agile/Jira', A: 80, fullMark: 100 },
  { subject: 'Architecture', A: 90, fullMark: 100 },
  { subject: 'Power BI', A: 75, fullMark: 100 },
];

// --- APPLE SCROLL ANIMATIONS ---
const scrollReveal = {
  hidden: { opacity: 0, y: 60, scale: 0.98 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } 
  }
};

// --- TAILWIND CONSTANTS (LIGHT MODE) ---
// Note: Changed from dark glass to light glass
const appleGlass = "bg-white/80 backdrop-blur-[50px] border border-black/[0.04] rounded-[32px] shadow-lg shadow-black/[0.03]";
const appleLink = "text-[#0071e3] cursor-pointer inline-flex items-center gap-1 font-normal text-lg hover:underline";

export default function AppleLightPortfolio() {
  const [loading, setLoading] = useState(true);
  const [bootProgress, setBootProgress] = useState(0);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  // --- BULLETPROOF MAC BOOT SEQUENCE (LIGHT MODE) ---
  useEffect(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 5) + 2; 
      if (currentProgress > 100) currentProgress = 100;
      
      setBootProgress(currentProgress);
      
      if (currentProgress === 100) {
        clearInterval(interval);
        setTimeout(() => setLoading(false), 700);
      }
    }, 30);
    
    return () => clearInterval(interval);
  }, []);

  // --- PROJECTS WITH VERIFIED IMAGES ---
  const projects = [
    {
      id: "experian",
      title: "Experian.",
      subtitle: "Financial Modelling Redefined.",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1600",
      tag: "Data Architecture",
      // Accents stay blue/indigo, but standard text flips
      textGradient: "from-blue-600 to-indigo-600",
      icon: <TrendingUp size={24} className="text-white" />,
      details: [
        "Acted in a Data Modeller capacity to support the design, implementation, and maintenance of conceptual, Logical and Physical data models.",
        "Translated business requirements into logical data models to reverse-engineer financial metrics.",
        "Utilised SQL to work with database tables and supported database changes.",
        "Developed data dictionaries and glossaries to define data elements and their usage."
      ]
    },
    {
      id: "nhs",
      title: "NHS.",
      subtitle: "Strategic Healthcare Investment.",
      image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1600",
      tag: "Infrastructure",
      textGradient: "from-cyan-600 to-blue-700",
      icon: <Microscope size={24} className="text-white" />,
      details: [
        "Partnered with other functions and business areas to implement architectures and identify, own, and resolve design-related issues.",
        "Displayed a willingness to support different activities, contribute where needed, and work effectively as part of a team to propose a £3.2m strategic investment.",
        "Used clear communication skills to drive continuous improvement using agile tracking concepts similar to Jira and Confluence."
      ]
    },
    {
      id: "emerge",
      title: "Emerge Lab.",
      subtitle: "Workforce Analytics.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600",
      tag: "Compliance & Risk",
      textGradient: "from-emerald-600 to-teal-700",
      icon: <Search size={24} className="text-white" />,
      details: [
        "Led a 6-month customer-facing evaluation of the business case for Diversity & Inclusion.",
        "Mapped recruitment processes against the Equality Act 2010 to identify compliance risks and update internal best practices.",
        "Recommended shifting from tick-box compliance to culture-based strategies."
      ]
    },
    {
      id: "ey",
      title: "EY Crypto.",
      subtitle: "Predictive Forecasting.",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1600",
      tag: "Market Volatility",
      textGradient: "from-amber-600 to-orange-700",
      icon: <BarChart3 size={24} className="text-white" />,
      details: [
        "Analysed and monitored data usage patterns to identify opportunities for data optimisation and improvement.",
        "Produced logical designs in relevant subject areas, showing data flows, inputs, stored data, and outputs to predict market trends.",
        "Identified common components to support strategic decision making."
      ]
    }
  ];

  return (
    // Note: Changed from bg-black to Apple's Light Off-White
    <div className="bg-[#f5f5f7] min-h-screen text-[#1d1d1f] antialiased selection:bg-[#0071e3]/20">
      {/* Global styling injected safely */}
      <style dangerouslySetInnerHTML={{ __html: `
        ::-webkit-scrollbar { display: none; }
        body { 
          background-color: #f5f5f7; 
          overflow-x: hidden; 
          font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          letter-spacing: -0.015em;
        }
      `}} />

      {/* --- MAC BOOT LOADER (LIGHT MODE) --- */}
      <AnimatePresence>
        {loading && (
          <motion.div 
            exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }} 
            // Changed from bg-black to bg-white
            className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center"
          >
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.1 }}
              className="mb-10"
            >
              {/* Icon is now dark */}
              <Database size={60} className="text-black" />
            </motion.div>
            <div className="w-56 h-1 bg-[#e8e8ed] rounded-full overflow-hidden">
              {/* Bar progress is now dark/black */}
              <motion.div 
                className="h-full bg-black rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${bootProgress}%` }}
                transition={{ ease: "linear", duration: 0.1 }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && (
        <div className="relative min-h-screen pb-40">
          
          {/* SOFTER LIGHT AURA BACKGROUND */}
          <div className="fixed inset-0 z-0 pointer-events-none">
            <div className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] rounded-full bg-indigo-100/50 blur-[150px]" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[80vw] h-[80vw] rounded-full bg-blue-100/50 blur-[150px]" />
          </div>

          <main className="relative z-10 w-full max-w-[1200px] mx-auto px-6 pt-32 space-y-48">
            
            {/* 1. APPLE LIGHT HERO */}
            <motion.section 
              initial="hidden" animate="visible" variants={scrollReveal}
              className="flex flex-col items-center text-center space-y-6 pt-20"
            >
              <h2 className="text-xl md:text-3xl font-semibold text-[#6e6e73] tracking-tight">Aniket Bansal</h2>
              <h1 className="text-6xl md:text-[8rem] font-bold tracking-tighter leading-[1.05] text-[#1d1d1f]">
                Data.<br />Modelled to<br />perfection.
              </h1>
              <p className="text-2xl text-[#6e6e73] max-w-2xl font-medium tracking-tight mt-6 leading-relaxed">
                Translating complex business requirements into Conceptual, Logical and Physical data architectures.
              </p>
              <div className="flex gap-8 pt-10 items-center">
                {/* Contact button is dark on light */}
                <a href="mailto:ianiketbansalx@gmail.com" className="bg-[#1d1d1f] text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-black transition-colors shadow-lg shadow-black/10">
                  Connect
                </a>
                <a href="http://www.linkedin.com/in/ianiketx" target="_blank" className={appleLink}>
                  LinkedIn Profile <ChevronRight size={18} className="mt-0.5"/>
                </a>
              </div>
            </motion.section>

            {/* 2. THE CHIP: SKILLS RADAR (flipped colors) */}
            <motion.section 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={scrollReveal}
              className={`${appleGlass} p-12 md:p-20 flex flex-col items-center text-center`}
            >
              {/* Cpu is dark */}
              <Cpu size={56} className="text-[#1d1d1f] mb-10" />
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-[#1d1d1f] mb-5 leading-tight">Mind-blowing capabilities.</h2>
              <p className="text-xl text-[#6e6e73] max-w-2xl mb-20 leading-relaxed">
                Adept at using SQL to work with database tables, developing data dictionaries, and mapping data flows.
              </p>
              
              <div className="w-full max-w-2xl h-[450px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="75%" data={skillsData}>
                    {/* Darker grid on light background */}
                    <PolarGrid stroke="rgba(0,0,0,0.06)" />
                    {/* Ticks are dark */}
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#1d1d1f', fontSize: 14, fontWeight: 500 }} />
                    <Radar name="Skills" dataKey="A" stroke="#0071e3" strokeWidth={3} fill="#0071e3" fillOpacity={0.15} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </motion.section>

            {/* 3. EDGE-TO-EDGE PROJECT CARDS (flipped card text) */}
            <section className="space-y-32">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scrollReveal} className="text-center">
                <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-[#1d1d1f]">Strategic Impact.</h2>
                <p className="text-2xl text-[#6e6e73] mt-5">High-stakes architecture for high-stakes environments.</p>
              </motion.div>

              <div className="space-y-12">
                {projects.map((project) => (
                  <motion.div
                    initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={scrollReveal}
                    key={project.id}
                    // border style update for light mode
                    className={`${appleGlass} overflow-hidden relative group cursor-pointer border-0 ring-1 ring-black/[0.04] shadow-xl`}
                    onClick={() => setActiveModal(project.id)}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2">
                      {/* Text content background adjusted for light mode glass */}
                      <div className="p-12 md:p-20 flex flex-col justify-center order-2 md:order-1 relative z-10 bg-white/70">
                        <p className="text-[#6e6e73] font-semibold tracking-widest uppercase text-sm mb-4">{project.tag}</p>
                        <h3 className="text-5xl md:text-6xl font-bold tracking-tighter text-[#1d1d1f] mb-5 leading-tight">{project.title}</h3>
                        <p className={`text-2xl text-transparent bg-clip-text bg-gradient-to-r ${project.textGradient} font-semibold mb-10`}>{project.subtitle}</p>
                        <span className={appleLink}>Learn more <ChevronRight size={20} className="mt-0.5"/></span>
                      </div>
                      
                      <div className="h-[400px] md:h-auto overflow-hidden relative order-1 md:order-2 bg-[#fafafa]">
                        <div 
                          // Mix blend changed from screen (dark) to standard/multiply for light
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] ease-out group-hover:scale-105 opacity-80"
                          style={{ backgroundImage: `url('${project.image}')` }}
                        />
                        {/* Gradient overlays adjusted for light content */}
                        <div className="absolute inset-0 bg-gradient-to-r from-white/90 to-transparent md:block hidden" />
                        <div className="absolute inset-0 bg-gradient-to-t from-white/90 to-transparent block md:hidden" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* 4. PERFORMANCE & EXPERIENCE (flipped chart/text colors) */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scrollReveal} className={`${appleGlass} p-10 md:p-14 flex flex-col`}>
                <h3 className="text-3xl font-bold text-[#1d1d1f] tracking-tight mb-2">System Performance.</h3>
                <p className="text-[#6e6e73] text-lg mb-12 leading-relaxed">Evaluative judgements based on factual information.</p>
                
                <div className="flex-1 w-full min-h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={performanceData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorAcc" x1="0" y1="0" x2="0" y2="1">
                          {/* Changed blue for light mode clarity */}
                          <stop offset="5%" stopColor="#0071e3" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#0071e3" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      {/* Grid is dark */}
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" vertical={false} />
                      {/* Ticks are dark */}
                      <XAxis dataKey="phase" stroke="#6e6e73" tick={{fill: '#6e6e73', fontSize: 14}} axisLine={false} tickLine={false} />
                      <YAxis stroke="#6e6e73" tick={{fill: '#6e6e73', fontSize: 14}} axisLine={false} tickLine={false} />
                      {/* Tooltip bg is now light/white */}
                      <Tooltip contentStyle={{ backgroundColor: 'rgba(255,255,255,0.9)', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '16px', backdropFilter: 'blur(10px)' }} itemStyle={{ color: '#1d1d1f' }} labelStyle={{color: '#6e6e73'}} />
                      <Area type="monotone" dataKey="efficiency" stroke="#6e6e73" strokeWidth={2} fill="transparent" />
                      <Area type="monotone" dataKey="accuracy" stroke="#0071e3" strokeWidth={4} fill="url(#colorAcc)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scrollReveal} className={`${appleGlass} p-10 md:p-14`}>
                <Briefcase size={32} className="text-[#1d1d1f] mb-6" />
                <h3 className="text-3xl font-bold text-[#1d1d1f] tracking-tight mb-2 leading-tight">Direct Line Group.</h3>
                <p className="text-[#0071e3] text-lg mb-10 font-medium">Glasgow, UK | Nov 2025 – Present</p>
                <ul className="space-y-6 text-[#6e6e73] text-lg leading-relaxed">
                  {/* Icons now use dark contrasting color */}
                  <li className="flex gap-4"><CheckCircle2 size={24} className="text-[#1d1d1f] shrink-0 mt-0.5"/> Take ownership for managing risk and strengthening controls.</li>
                  <li className="flex gap-4"><CheckCircle2 size={24} className="text-[#1d1d1f] shrink-0 mt-0.5"/> Resolve problems by identifying and selecting solutions.</li>
                  <li className="flex gap-4"><CheckCircle2 size={24} className="text-[#1d1d1f] shrink-0 mt-0.5"/> Escalate breaches of policies while maintaining clear communication.</li>
                </ul>
              </motion.div>
            </section>

            {/* 5. ACADEMICS (flipped text/link/border colors) */}
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scrollReveal} className="text-center space-y-16">
              <h2 className="text-5xl md:text-6xl font-bold tracking-tighter text-[#1d1d1f]">Academic Pedigree.</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left max-w-4xl mx-auto">
                <div className="space-y-4">
                  <GraduationCap size={40} className="text-[#1d1d1f] mb-6" />
                  <h3 className="text-3xl font-bold text-[#1d1d1f]">MSc Data Analytics.</h3>
                  <p className="text-[#6e6e73] text-xl">University of Strathclyde | 2023 – 2024</p>
                  <p className="text-[#6e6e73] text-lg pt-4 leading-relaxed">Dissertation: Conducted a 6-month research project on Inclusivity in the Workplace, analysing the commercial impact of diverse teams.</p>
                  <a href="/my-msc-degree.pdf" target="_blank" className={`${appleLink} pt-5`}>View Degree <ChevronRight size={18} className="mt-0.5"/></a>
                </div>

                <div className="space-y-4">
                  <Layout size={40} className="text-[#1d1d1f] mb-6" />
                  <h3 className="text-3xl font-bold text-[#1d1d1f]">B.Tech Mechanical.</h3>
                  <p className="text-[#6e6e73] text-xl">MVN University | 2019 – 2022</p>
                  <p className="text-[#6e6e73] text-lg pt-4 leading-relaxed">Dissertation: Designed a prototype for an Automatic Object Detection Vehicle utilizing sensor fusion logic.</p>
                  <a href="/my-btech-degree.pdf" target="_blank" className={`${appleLink} pt-5`}>View Degree <ChevronRight size={18} className="mt-0.5"/></a>
                </div>
              </div>

              {/* Certs section updated for light mode */}
              <div className="pt-12 border-t border-black/10 flex flex-wrap justify-center gap-x-12 gap-y-6 text-[#6e6e73] text-lg font-medium">
                <span className="flex items-center gap-2"><Award size={20}/> JP Morgan Chase</span>
                <span className="flex items-center gap-2"><Award size={20}/> British Airways</span>
                <span className="flex items-center gap-2"><ShieldCheck size={20}/> Fujitsu Cyber Security</span>
                <span className="flex items-center gap-2 text-[#1d1d1f] font-semibold"><Database size={20} className="text-[#0071e3]"/> PL300: Power BI</span>
              </div>
            </motion.section>

          </main>
        </div>
      )}

      {/* --- APPLE LIGHT FULL SCREEN MODAL --- */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0, filter: "blur(10px)" }} 
              animate={{ opacity: 1, filter: "blur(0px)" }} 
              exit={{ opacity: 0, filter: "blur(10px)" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              // Changed from bg-black/90 to bg-white/90
              className="absolute inset-0 bg-[#f5f5f7]/90 backdrop-blur-3xl"
              onClick={() => setActiveModal(null)}
            />
            <motion.div 
              layoutId={`card-${activeModal}`}
              // Changed from bg-[#1c1c1e] to bg-white
              className="relative w-full max-w-4xl bg-white rounded-[2rem] overflow-hidden flex flex-col shadow-2xl max-h-[90vh] border border-black/[0.04]"
            >
              <div className="relative w-full h-[300px] shrink-0 bg-[#fafafa]">
                <div 
                  // Blend logic removed for light mode modal
                  className="absolute inset-0 bg-cover bg-center opacity-80"
                  style={{ backgroundImage: `url('${projects.find(p => p.id === activeModal)?.image}')` }}
                />
                {/* Gradient modified for dark text readability on light image */}
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent" />
                
                {/* Close button flipped to dark on light */}
                <button onClick={() => setActiveModal(null)} className="absolute top-6 right-6 p-2 bg-white/50 rounded-full hover:bg-white/80 transition-colors text-black z-20 backdrop-blur-sm"><X size={20}/></button>
                
                <div className="absolute bottom-0 left-0 p-10 md:p-14 w-full z-10">
                  <p className="text-lg font-semibold text-[#6e6e73] mb-2">{projects.find(p => p.id === activeModal)?.tag}</p>
                  <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-[#1d1d1f]">{projects.find(p => p.id === activeModal)?.title}</h2>
                </div>
              </div>
              
              <div className="p-10 md:p-14 overflow-y-auto">
                <div className="space-y-6">
                  <h4 className="text-2xl font-bold text-[#1d1d1f] mb-10 border-b border-black/10 pb-5">Architecture & Outcomes.</h4>
                  <ul className="space-y-8 text-[#6e6e73] text-xl leading-relaxed">
                    {projects.find(p => p.id === activeModal)?.details.map((detail, idx) => (
                      <li key={idx} className="flex gap-6 items-start">
                        {/* Checkmark uses accent blue for contrast */}
                        <CheckCircle2 size={28} className="shrink-0 text-[#0071e3] mt-0.5" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
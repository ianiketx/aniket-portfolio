"use client";

import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

const projects = [
  {
    title: "Experian Financial Pricing Modelling",
    description: "Built automated Python workflows to extract, model, and validate complex financial datasets. Applied data quality assurance and anomaly detection for pricing accuracy.",
    tags: ["Python", "SQL", "Financial Modelling", "Data Quality"],
    gradient: "from-blue-500/10 to-blue-500/5",
    metrics: {
      accuracy: "99.8%",
      efficiency: "75% faster",
      datasets: "2.5M+ records",
    },
  },
  {
    title: "EY Market Trend & Competitive Pricing Analysis",
    description: "Analysed market volatility, competitor pricing movements, and commodity trends. Built Power BI dashboards delivering strategic pricing recommendations to senior leadership.",
    tags: ["Power BI", "Market Analysis", "Pricing Strategy", "Python"],
    gradient: "from-gray-500/10 to-gray-500/5",
    metrics: {
      competitors: "50+ tracked",
      insights: "150+ trends",
      dashboards: "12 custom",
    },
  },
  {
    title: "NHS Commercial Impact & Optimization",
    description: "Independently identified critical bottlenecks in logistics operations. Quantified 72% delay concentration and delivered actionable improvement recommendations supporting £3.2M investment.",
    tags: ["SQL", "Python", "Power BI", "Business Impact"],
    gradient: "from-green-500/10 to-green-500/5",
    metrics: {
      impact: "£3.2M decision",
      efficiency: "72% identified",
      adoption: "100%",
    },
  },
];

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="gradient-text">Featured Projects</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Pricing optimization, financial modelling, and data-driven insights that moved business outcomes
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
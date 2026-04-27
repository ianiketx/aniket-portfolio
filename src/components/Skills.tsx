"use client";

import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";

const skillsData = [
  { category: "Pricing", proficiency: 95 },
  { category: "SQL", proficiency: 92 },
  { category: "Python", proficiency: 90 },
  { category: "Power BI", proficiency: 88 },
  { category: "Analytics", proficiency: 94 },
  { category: "Financial Modelling", proficiency: 91 },
];

const projectData = [
  { month: "Jan", analysis: 40, modelling: 30, dashboards: 20 },
  { month: "Feb", analysis: 50, modelling: 40, dashboards: 30 },
  { month: "Mar", analysis: 60, modelling: 50, dashboards: 40 },
  { month: "Apr", analysis: 70, modelling: 65, dashboards: 55 },
  { month: "May", analysis: 80, modelling: 75, dashboards: 70 },
];

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 px-6 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="gradient-text">Technical Arsenal</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Proficiency across pricing analysis, data engineering, and commercial insights
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Skills Chart */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold mb-6 text-blue-400">Core Competencies</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={skillsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="category" stroke="rgba(156,163,175,0.5)" fontSize={12} />
                <YAxis stroke="rgba(156,163,175,0.5)" />
                <Tooltip
                  contentStyle={{
                    background: "rgba(10, 10, 10, 0.9)",
                    border: "1px solid rgba(0, 113, 227, 0.3)",
                    borderRadius: "8px",
                  }}
                  cursor={{ fill: "rgba(0, 113, 227, 0.1)" }}
                />
                <Bar dataKey="proficiency" fill="#0071e3" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Project Growth */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold mb-6 text-blue-400">Project Portfolio Growth</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={projectData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="rgba(156,163,175,0.5)" />
                <YAxis stroke="rgba(156,163,175,0.5)" />
                <Tooltip
                  contentStyle={{
                    background: "rgba(10, 10, 10, 0.9)",
                    border: "1px solid rgba(0, 113, 227, 0.3)",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="analysis" stroke="#0071e3" strokeWidth={2} dot={{ fill: "#0071e3" }} />
                <Line type="monotone" dataKey="modelling" stroke="#f5f5f7" strokeWidth={2} dot={{ fill: "#f5f5f7" }} />
                <Line type="monotone" dataKey="dashboards" stroke="#86efac" strokeWidth={2} dot={{ fill: "#86efac" }} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Skill Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Pricing & Strategy", skills: ["Pricing Optimization", "Margin Analysis", "Competitive Analysis", "Financial Modelling"] },
            { title: "Data Engineering", skills: ["SQL", "Python", "PySpark", "ETL Pipelines"] },
            { title: "Reporting & BI", skills: ["Power BI", "Tableau", "Dashboards", "Data Visualization"] },
          ].map((category, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6 hover:border-blue-400 transition-all"
            >
              <h4 className="text-xl font-bold text-blue-400 mb-4">{category.title}</h4>
              <div className="space-y-2">
                {category.skills.map((skill, j) => (
                  <motion.div
                    key={j}
                    whileHover={{ x: 5 }}
                    className="flex items-center text-gray-300 hover:text-blue-400 transition-colors"
                  >
                    <div className="w-2 h-2 rounded-full bg-blue-400 mr-3" />
                    {skill}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
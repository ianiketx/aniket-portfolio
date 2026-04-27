"use client";

import { motion } from "framer-motion";

interface ProjectCardProps {
  project: {
    title: string;
    description: string;
    tags: string[];
    gradient: string;
    metrics: Record<string, string>;
  };
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      whileHover={{ y: -10 }}
      className={`group relative overflow-hidden rounded-2xl ${project.gradient} p-8 glass cursor-pointer transition-all`}
    >
      {/* Background glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-blue-500/10 to-transparent transition-opacity duration-300" />

      <div className="relative z-10">
        <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">
          {project.title}
        </h3>

        <p className="text-gray-400 mb-6 leading-relaxed">
          {project.description}
        </p>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-gray-700/30">
          {Object.entries(project.metrics).map(([key, value], i) => (
            <div key={i} className="text-center">
              <div className="text-blue-400 font-bold text-lg">{value}</div>
              <div className="text-xs text-gray-500 capitalize">{key}</div>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, i) => (
            <motion.span
              key={i}
              whileHover={{ scale: 1.05 }}
              className="px-3 py-1 text-sm rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:border-blue-400 transition-all"
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
}
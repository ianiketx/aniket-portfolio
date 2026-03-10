"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

export default function GlasgowMap() {
  // Data points representing your experience locations across the Glasgow area
  const locations = [
    { name: "Direct Line Group (City Centre)", x: "50%", y: "45%", color: "bg-indigo-400", delay: 0 },
    { name: "Amazon (Glasgow Hub)", x: "30%", y: "60%", color: "bg-cyan-400", delay: 0.5 },
    { name: "Morrisons (Bishopbriggs)", x: "65%", y: "25%", color: "bg-blue-400", delay: 1 },
    { name: "Strathclyde Uni", x: "48%", y: "42%", color: "bg-purple-400", delay: 1.5 },
    { name: "Base: East Kilbride", x: "70%", y: "80%", color: "bg-indigo-500", delay: 2 },
  ];

  return (
    <div className="w-full p-6 mt-8 border border-white/10 bg-white/5 rounded-2xl backdrop-blur-lg hover:border-indigo-500/30 transition-colors overflow-hidden relative">
      <div className="relative z-10 mb-6 flex items-center gap-3">
        <MapPin className="text-cyan-400" />
        <div>
          <h3 className="text-xl font-bold text-white">Geospatial Mapping: Glasgow Metro</h3>
          <p className="text-sm text-indigo-300">Tracking professional footprint and data nodes across the region</p>
        </div>
      </div>
      
      {/* The futuristic map grid background */}
      <div className="relative w-full h-80 bg-[#09090b] rounded-xl border border-white/5 overflow-hidden flex items-center justify-center">
        {/* Radar circles */}
        <div className="absolute w-full h-full border border-indigo-500/10 rounded-full scale-[1.5]"></div>
        <div className="absolute w-[60%] h-[60%] border border-indigo-500/20 rounded-full"></div>
        <div className="absolute w-[30%] h-[30%] border border-cyan-500/20 rounded-full"></div>
        
        {/* Grid lines */}
        <div className="absolute w-full h-px bg-indigo-500/10"></div>
        <div className="absolute h-full w-px bg-indigo-500/10"></div>

        {/* Data points mapping your locations */}
        {locations.map((loc, index) => (
          <motion.div
            key={index}
            className="absolute flex flex-col items-center group cursor-crosshair"
            style={{ left: loc.x, top: loc.y }}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: loc.delay, duration: 0.5, type: "spring" }}
          >
            {/* The pulsing dot */}
            <div className="relative flex items-center justify-center">
              <span className={`absolute inline-flex w-4 h-4 rounded-full opacity-75 animate-ping ${loc.color}`}></span>
              <span className={`relative inline-flex w-2 h-2 rounded-full ${loc.color}`}></span>
            </div>
            
            {/* The label that shows on hover */}
            <div className="absolute top-4 opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-900 border border-white/10 px-3 py-1 rounded-md text-xs whitespace-nowrap text-slate-300 z-20 shadow-xl">
              {loc.name}
            </div>
          </motion.div>
        ))}

        {/* Scanning line animation */}
        <motion.div 
          className="absolute left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </div>
  );
}
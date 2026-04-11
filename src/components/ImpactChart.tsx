"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// This data visually represents the impact of automating ELT pipelines
const data = [
  { quarter: 'Q1', manualReportingHours: 45, dataAccuracy: 82 },
  { quarter: 'Q2', manualReportingHours: 35, dataAccuracy: 88 },
  { quarter: 'Q3', manualReportingHours: 15, dataAccuracy: 95 },
  { quarter: 'Q4', manualReportingHours: 4, dataAccuracy: 99 },
];

export default function ImpactChart() {
  return (
    <div className="w-full h-96 p-6 mt-8 border border-white/10 bg-white/5 rounded-2xl backdrop-blur-lg hover:border-indigo-500/30 transition-colors">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-white">Impact: Automated ELT Pipelines</h3>
        <p className="text-sm text-indigo-300">Tracking the reduction of manual reporting hours over a 12-month transformation</p>
      </div>
      
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#818cf8" stopOpacity={0.6}/>
                <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
            <XAxis dataKey="quarter" stroke="#94a3b8" tick={{ fill: '#94a3b8' }} tickLine={false} axisLine={false} />
            <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8' }} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{ backgroundColor: '#09090b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#f8fafc' }}
              itemStyle={{ color: '#818cf8', fontWeight: 'bold' }}
            />
            <Area 
              type="monotone" 
              dataKey="manualReportingHours" 
              name="Manual Hours / Week" 
              stroke="#818cf8" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorHours)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
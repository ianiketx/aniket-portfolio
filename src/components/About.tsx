"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="relative py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="gradient-text">About Me</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-lg text-gray-300 leading-relaxed">
              I'm a commercially-minded data analyst and pricing specialist with an MSc in Data Analytics from the University of Strathclyde. Currently working at Direct Line Group (AVIVA), where I combine operational insight with advanced analytical capability to drive pricing optimization and business improvement.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              My background spans financial modelling at Experian, competitive pricing analysis at EY, and independent commercial impact analysis that supported multi-million pound investment decisions. I specialize in turning complex data into actionable business insight.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              I'm passionate about using data to balance business goals with customer fairness, building scalable analytical solutions, and influencing strategic decisions through evidence-based recommendations.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="glass rounded-2xl p-6">
              <h4 className="text-blue-400 font-bold mb-4">Education</h4>
              <div className="space-y-4">
                <div>
                  <div className="font-semibold text-white">MSc Data Analytics</div>
                  <div className="text-gray-400 text-sm">University of Strathclyde, 2023-2024</div>
                </div>
                <div>
                  <div className="font-semibold text-white">B.Tech Computer Engineering</div>
                  <div className="text-gray-400 text-sm">MVN University, India, 2019-2022</div>
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-6">
              <h4 className="text-blue-400 font-bold mb-4">Key Metrics</h4>
              <div className="space-y-2 text-gray-300">
                <div>✓ 6 months at Direct Line Group (FCA-regulated environment)</div>
                <div>✓ £3.2M+ investment impact through data analysis</div>
                <div>✓ 50+ competitive pricing streams analysed</div>
                <div>✓ 2.5M+ financial records modelled & validated</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
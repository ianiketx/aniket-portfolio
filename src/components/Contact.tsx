"use client";

import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 px-6 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Let's Work Together</span>
          </h2>
          <p className="text-gray-400 text-lg mb-12">
            Open to pricing analyst roles, data science opportunities, and strategic consulting projects.
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center mb-12">
            <motion.a
              href="mailto:ianiketbansalx@gmail.com"
              whileHover={{ scale: 1.05 }}
              className="px-8 py-4 gradient-accent rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-blue-500/50 transition-all"
            >
              Email Me
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/ianiketx"
              target="_blank"
              whileHover={{ scale: 1.05 }}
              className="px-8 py-4 glass rounded-lg font-semibold hover:border-blue-400 transition-all"
            >
              LinkedIn
            </motion.a>
            <motion.a
              href="https://github.com/ianiketx"
              target="_blank"
              whileHover={{ scale: 1.05 }}
              className="px-8 py-4 glass rounded-lg font-semibold hover:border-blue-400 transition-all"
            >
              GitHub
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8 text-left space-y-4"
        >
          <h3 className="font-bold text-blue-400">Quick Facts</h3>
          <ul className="text-gray-400 space-y-2">
            <li>📍 Based in Glasgow, UK (open to relocation)</li>
            <li>💼 Direct Line Group | Data & Pricing Focus</li>
            <li>🎓 MSc Data Analytics | B.Tech Computer Engineering</li>
            <li>✅ Right to work UK (Graduate Route Visa until Jan 2027)</li>
            <li>📊 Specializing in pricing optimization & financial modelling</li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
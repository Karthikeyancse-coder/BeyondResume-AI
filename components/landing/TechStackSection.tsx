"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";

export default function TechStackSection() {
  const stack = [
    { name: "Next.js 14", color: "text-white", border: "border-white/20" },
    { name: "Gemini AI", color: "text-brand-cyan", border: "border-brand-cyan/30" },
    { name: "TypeScript", color: "text-blue-400", border: "border-blue-400/30" },
    { name: "Tailwind CSS", color: "text-teal-400", border: "border-teal-400/30" },
    { name: "Framer Motion", color: "text-pink-400", border: "border-pink-400/30" },
    { name: "Zustand", color: "text-orange-400", border: "border-orange-400/30" }
  ];

  return (
    <section className="py-24 bg-[#0A0A0F] border-t border-white/5 flex flex-col items-center">
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-xs font-bold tracking-[0.2em] text-white/30 mb-8 uppercase"
      >
        Built With
      </motion.p>
      
      <motion.div 
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto px-6"
      >
        {stack.map((tech, i) => (
          <motion.div 
            key={i} 
            variants={fadeUp}
            className={`px-6 py-2 rounded-full border ${tech.border} bg-[#111116] shadow-lg`}
          >
            <span className={`text-sm font-bold tracking-wide ${tech.color}`}>{tech.name}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

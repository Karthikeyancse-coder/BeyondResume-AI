"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";

export default function StatsSection() {
  const stats = [
    { value: "2", label: "Distinct Roles" },
    { value: "Zero", label: "Trust Verification" },
    { value: "100%", label: "Skill Proven" },
    { value: "AI", label: "Driven Roadmaps" },
  ];

  return (
    <section className="py-20 bg-[#05050A] border-y border-white/5 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="flex flex-col md:flex-row justify-center md:justify-around items-center gap-12 md:gap-0"
        >
          {stats.map((stat, i) => (
            <motion.div key={i} variants={fadeUp} className="text-center">
              <h3 className="font-display font-bold text-5xl md:text-6xl text-white mb-2 tracking-tighter">{stat.value}</h3>
              <p className="text-sm font-bold tracking-widest text-white/40 uppercase">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

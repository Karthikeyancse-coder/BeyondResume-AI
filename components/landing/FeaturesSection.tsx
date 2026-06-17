"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { Bot, GitBranch, Target, Compass, ShieldCheck, UserCheck } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: <Bot className="w-6 h-6 text-brand-indigo" />,
      title: "Adaptive AI Interview",
      desc: "Simulates architectural discussions to test deep understanding.",
    },
    {
      icon: <GitBranch className="w-6 h-6 text-brand-indigo" />,
      title: "GitHub Intelligence",
      desc: "Analyzes commit consistency, project evolution, and debugging maturity.",
    },
    {
      icon: <Target className="w-6 h-6 text-brand-indigo" />,
      title: "Role Alignment Engine",
      desc: "Finds the precise match between capability and job requirements.",
    },
    {
      icon: <Compass className="w-6 h-6 text-brand-indigo" />,
      title: "Growth Roadmap",
      desc: "Provides rejected candidates with actionable learning paths.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-brand-indigo" />,
      title: "Zero-Trust Verification",
      desc: "Validates all claims through code analysis and reasoning checks.",
    },
    {
      icon: <UserCheck className="w-6 h-6 text-brand-indigo" />,
      title: "Introvert-Friendly",
      desc: "Evaluates pure engineering talent, removing communication bias.",
    },
  ];

  return (
    <section id="features" className="py-24 bg-[#0A0A0F] border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <div className="text-center mb-16 relative z-10">
            <motion.p variants={fadeUp} className="text-xs font-bold tracking-[0.2em] text-brand-indigo mb-4 uppercase">Platform Features</motion.p>
            <motion.h2 variants={fadeUp} className="font-display font-bold text-4xl md:text-5xl text-white mb-6 tracking-tight">
              What It Can Do?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/60 max-w-2xl mx-auto text-lg">
              Everything you need to prove your capability, powered by advanced AI reasoning.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {features.map((feat, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ scale: 1.02, y: -4 }}
                className="flex flex-col p-8 rounded-2xl bg-[#111116] border border-white/5 shadow-xl hover:shadow-2xl hover:border-brand-indigo/30 transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-indigo/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-12 h-12 rounded-xl bg-brand-indigo/10 flex items-center justify-center mb-6 border border-brand-indigo/20 group-hover:scale-110 transition-transform">
                  {feat.icon}
                </div>
                <h3 className="font-bold text-lg text-white mb-3">{feat.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

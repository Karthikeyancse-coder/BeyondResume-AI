"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { XCircle, CheckCircle2 } from "lucide-react";

export default function ProblemSection() {
  const withoutPoints = [
    "Resumes are easily faked or exaggerated using AI.",
    "Keyword-stuffed resumes bypass ATS but fail interviews.",
    "Recruiters waste 80% of time filtering unqualified noise.",
    "Candidates send applications into a black hole with zero feedback.",
    "Introverts and diverse talent are filtered out by rigid formats."
  ];

  const withPoints = [
    "AI rigorously tests deep architectural reasoning and logic.",
    "Zero-Trust verification ensures every skill claim is proven.",
    "Recruiters instantly filter by verified, objective Trust Scores.",
    "Candidates receive actionable feedback and AI growth roadmaps.",
    "Pure engineering capability is evaluated, removing bias."
  ];

  return (
    <section id="why" className="py-24 bg-[#0A0A0F] border-t border-white/5 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-indigo/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <div className="text-center mb-16">
            <motion.p variants={fadeUp} className="text-xs font-bold tracking-[0.2em] text-brand-indigo mb-4 uppercase">The Problem</motion.p>
            <motion.h2 variants={fadeUp} className="font-display font-bold text-4xl md:text-5xl text-white mb-6 tracking-tight">
              Modern Hiring is <span className="text-red-500">Broken</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/60 max-w-2xl mx-auto text-lg">
              Most companies rely on static, easily faked PDF resumes. It's chaotic, unverified, and deeply biased.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
            {/* Without BeyondResume */}
            <motion.div variants={fadeUp} className="bg-[#140E12] border border-red-500/20 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500/50 to-transparent" />
              <div className="flex items-center gap-3 mb-8 pb-6 border-b border-red-500/10">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center border border-red-500/20">
                  <XCircle className="w-5 h-5 text-red-500" />
                </div>
                <h3 className="font-bold text-xl text-red-500">Without BeyondResume</h3>
              </div>
              <ul className="space-y-6">
                {withoutPoints.map((point, i) => (
                  <li key={i} className="flex gap-4">
                    <XCircle className="w-5 h-5 text-red-500/70 shrink-0 mt-0.5" />
                    <span className="text-white/70 leading-relaxed text-sm">{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* With BeyondResume */}
            <motion.div variants={fadeUp} className="bg-[#0E1412] border border-green-500/20 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500/50 to-transparent" />
              <div className="flex items-center gap-3 mb-8 pb-6 border-b border-green-500/10">
                <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center border border-green-500/20">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                </div>
                <h3 className="font-bold text-xl text-green-500">With BeyondResume</h3>
              </div>
              <ul className="space-y-6">
                {withPoints.map((point, i) => (
                  <li key={i} className="flex gap-4">
                    <CheckCircle2 className="w-5 h-5 text-green-500/70 shrink-0 mt-0.5" />
                    <span className="text-white/70 leading-relaxed text-sm">{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

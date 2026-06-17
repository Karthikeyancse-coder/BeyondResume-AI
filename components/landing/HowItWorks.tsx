"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { User, Bot, Briefcase, Handshake, ArrowRight } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      icon: <User className="w-5 h-5 text-white" />,
      color: "bg-brand-indigo",
      title: "Candidate",
      sub: "CND-2024",
      desc: "Builds profile & proves skills"
    },
    {
      step: "02",
      icon: <Bot className="w-5 h-5 text-white" />,
      color: "bg-green-500",
      title: "AI Verifier",
      sub: "SYS-AUTO",
      desc: "Validates claims & scores"
    },
    {
      step: "03",
      icon: <Briefcase className="w-5 h-5 text-white" />,
      color: "bg-brand-violet",
      title: "Recruiter",
      sub: "REC-2024",
      desc: "Filters by verified scores"
    },
    {
      step: "04",
      icon: <Handshake className="w-5 h-5 text-white" />,
      color: "bg-brand-cyan",
      title: "Secure Match",
      sub: "SUCCESS",
      desc: "Instant zero-bias connection"
    }
  ];

  return (
    <section className="py-24 bg-[#0A0A0F] border-t border-white/5 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-brand-cyan/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <div className="text-center mb-24">
            <motion.p variants={fadeUp} className="text-xs font-bold tracking-[0.2em] text-brand-indigo mb-4 uppercase">Verification Pipeline</motion.p>
            <motion.h2 variants={fadeUp} className="font-display font-bold text-4xl md:text-5xl text-white mb-6 tracking-tight">
              The Zero-Trust Approval Chain
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/60 max-w-2xl mx-auto text-lg">
              When a candidate builds a profile, their capabilities travel through our rigorous AI verification chain—ensuring recruiters only see truth.
            </motion.p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            {steps.map((step, i) => (
              <motion.div key={i} variants={fadeUp} className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                {/* Step Card */}
                <div className="bg-[#111116] border border-white/10 rounded-3xl p-8 w-64 h-80 flex flex-col items-center text-center justify-center relative shadow-2xl">
                  <span className="absolute top-6 text-white/20 font-mono text-sm">{step.step}</span>
                  
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-lg ${step.color}`}>
                    {step.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-1">{step.title}</h3>
                  <p className="text-xs font-mono text-white/30 mb-4">{step.sub}</p>
                  
                  <p className="text-sm text-white/50 italic">{step.desc}</p>
                </div>
                
                {/* Arrow */}
                {i < steps.length - 1 && (
                  <div className="hidden md:flex text-white/20">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                )}
                {/* Mobile Arrow */}
                {i < steps.length - 1 && (
                  <div className="flex md:hidden text-white/20 my-2">
                    <ArrowRight className="w-6 h-6 rotate-90" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUp} className="mt-16 bg-[#111116] border border-white/5 rounded-2xl p-6 max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <span className="text-xs font-bold tracking-widest text-white/40 uppercase">Live Pipeline Status</span>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <span className="px-3 py-1 rounded-full bg-brand-indigo/20 text-brand-indigo text-xs font-bold border border-brand-indigo/30">Profile Built</span>
              <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-500 text-xs font-bold border border-green-500/30">AI Verified</span>
              <span className="px-3 py-1 rounded-full bg-brand-violet/20 text-brand-violet text-xs font-bold border border-brand-violet/30">Recruiter Found</span>
              <span className="px-3 py-1 rounded-full bg-brand-cyan/20 text-brand-cyan text-xs font-bold border border-brand-cyan/30">Interview</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

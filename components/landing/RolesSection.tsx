"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { UserCircle, Building2, CheckSquare } from "lucide-react";

export default function RolesSection() {
  const candidateFeatures = [
    "AI-Powered Resume Builder",
    "Real-time Roadmap Generation",
    "Verified Trust Score",
    "Zero-Trust Privacy Locking",
    "1-Click Secure Applications"
  ];

  const recruiterFeatures = [
    "Strict Domain Verification",
    "Filter by Verified Capability",
    "Pre-assessed Talent Pools",
    "No Keyword-Stuffed Noise",
    "Direct Secure Connections"
  ];

  return (
    <section className="py-24 bg-[#05050A] border-t border-white/5 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <div className="text-center mb-16">
            <motion.p variants={fadeUp} className="text-xs font-bold tracking-[0.2em] text-brand-indigo mb-4 uppercase">User Roles</motion.p>
            <motion.h2 variants={fadeUp} className="font-display font-bold text-4xl md:text-5xl text-white mb-6 tracking-tight">
              Built for Every Stakeholder
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/60 max-w-2xl mx-auto text-lg">
              Two distinct roles — each with their own secure dashboard, permissions, and workflow.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Candidate Card */}
            <motion.div variants={fadeUp} className="bg-[#0F0F15] border border-white/10 rounded-3xl p-10 relative group hover:border-brand-indigo/30 transition-colors">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-indigo to-transparent opacity-50" />
              <div className="flex items-center justify-between mb-8">
                <div className="w-14 h-14 bg-brand-indigo/20 rounded-2xl flex items-center justify-center">
                  <UserCircle className="w-8 h-8 text-brand-indigo" />
                </div>
                <div className="px-3 py-1 bg-white/5 rounded-full border border-white/10 text-xs font-mono text-white/40">
                  ID: CND-2024
                </div>
              </div>
              
              <h3 className="text-3xl font-bold text-white mb-4">Candidate</h3>
              <p className="text-white/60 mb-8 leading-relaxed">
                Build your secure profile, receive actionable AI feedback, and apply to roles with verified capability scores instead of easily faked PDFs.
              </p>

              <ul className="space-y-4 mb-10">
                {candidateFeatures.map((feat, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckSquare className="w-5 h-5 text-brand-indigo shrink-0" />
                    <span className="text-white/80">{feat}</span>
                  </li>
                ))}
              </ul>
              
              <div className="flex items-center gap-2 text-brand-indigo font-bold text-sm cursor-pointer hover:text-brand-indigo/80 transition-colors">
                Explore Candidate Experience <span>→</span>
              </div>
            </motion.div>

            {/* Recruiter Card */}
            <motion.div variants={fadeUp} className="bg-[#0F0F15] border border-white/10 rounded-3xl p-10 relative group hover:border-brand-violet/30 transition-colors">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-violet to-transparent opacity-50" />
              <div className="flex items-center justify-between mb-8">
                <div className="w-14 h-14 bg-brand-violet/20 rounded-2xl flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-brand-violet" />
                </div>
                <div className="px-3 py-1 bg-white/5 rounded-full border border-white/10 text-xs font-mono text-white/40">
                  ID: REC-2024
                </div>
              </div>
              
              <h3 className="text-3xl font-bold text-white mb-4">Recruiter</h3>
              <p className="text-white/60 mb-8 leading-relaxed">
                Company-level authority. Filter strictly through verified capability scores, bypassing keyword noise and fake applications completely.
              </p>

              <ul className="space-y-4 mb-10">
                {recruiterFeatures.map((feat, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckSquare className="w-5 h-5 text-brand-violet shrink-0" />
                    <span className="text-white/80">{feat}</span>
                  </li>
                ))}
              </ul>
              
              <div className="flex items-center gap-2 text-brand-violet font-bold text-sm cursor-pointer hover:text-brand-violet/80 transition-colors">
                Explore Recruiter Experience <span>→</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

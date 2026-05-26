"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { UserX, FileX, VolumeX } from "lucide-react";

export default function ProblemSection() {
  const problems = [
    {
      icon: <UserX className="w-12 h-12 text-brand-indigo" />,
      title: "Fake Resumes",
      desc: "AI makes fabrication trivial. Resumes no longer prove capability.",
    },
    {
      icon: <FileX className="w-12 h-12 text-brand-cyan" />,
      title: "Resume ≠ Skill",
      desc: "Documents can't show real depth or architectural reasoning.",
    },
    {
      icon: <VolumeX className="w-12 h-12 text-brand-violet" />,
      title: "Hidden Talent",
      desc: "Introverts and diverse thinkers are filtered before being seen.",
    },
  ];

  return (
    <section className="py-24 bg-bg-secondary border-t border-border-subtle">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeUp} className="font-display font-bold text-3xl md:text-4xl text-text-primary mb-12">
            Modern Hiring Is Broken
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {problems.map((prob, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="flex flex-col items-center p-8 rounded-2xl bg-bg-primary border border-border-default hover:shadow-lg transition-shadow"
              >
                <div className="mb-6">{prob.icon}</div>
                <h3 className="font-bold text-xl text-text-primary mb-3">{prob.title}</h3>
                <p className="text-text-secondary">{prob.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

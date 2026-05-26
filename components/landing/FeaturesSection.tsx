"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { Bot, Github, Target, Compass, ShieldCheck, UserCheck } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: <Bot className="w-6 h-6 text-brand-indigo" />,
      title: "Adaptive AI Interview",
      desc: "Simulates architectural discussions to test deep understanding.",
    },
    {
      icon: <Github className="w-6 h-6 text-brand-indigo" />,
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
    <section id="features" className="py-24 bg-bg-primary">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <div className="text-center mb-16">
            <motion.h2 variants={fadeUp} className="font-display font-bold text-3xl md:text-4xl text-text-primary mb-4">
              Intelligence Features
            </motion.h2>
            <motion.p variants={fadeUp} className="text-text-secondary max-w-2xl mx-auto">
              Everything you need to prove your capability, powered by advanced AI reasoning.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ scale: 1.02, y: -4 }}
                className="flex flex-col p-6 rounded-2xl bg-bg-secondary border border-border-subtle shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-brand-indigo/10 flex items-center justify-center mb-4">
                  {feat.icon}
                </div>
                <h3 className="font-bold text-lg text-text-primary mb-2">{feat.title}</h3>
                <p className="text-sm text-text-secondary">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

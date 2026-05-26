"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { UploadCloud, BrainCircuit, LineChart } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: <UploadCloud className="w-8 h-8 text-white" />,
      title: "Step 1: Upload Data",
      desc: "Connect your GitHub and upload your PDF resume. Our system extracts your tech stack immediately.",
    },
    {
      icon: <BrainCircuit className="w-8 h-8 text-white" />,
      title: "Step 2: AI Verifies",
      desc: "Take an adaptive AI interview customized to your background while we analyze your code authenticity.",
    },
    {
      icon: <LineChart className="w-8 h-8 text-white" />,
      title: "Step 3: Get Ranked",
      desc: "Receive comprehensive trust scores and a growth roadmap, making you instantly visible to recruiters.",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-bg-secondary border-t border-border-subtle">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <div className="text-center mb-16">
            <motion.h2 variants={fadeUp} className="font-display font-bold text-3xl md:text-4xl text-text-primary mb-4">
              How It Works
            </motion.h2>
          </div>

          <div className="relative">
            {/* Desktop connecting line */}
            <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-brand-indigo via-brand-violet to-brand-cyan opacity-30" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
              {steps.map((step, i) => (
                <motion.div key={i} variants={fadeUp} className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-brand-gradient flex items-center justify-center shadow-lg mb-6 hover:shadow-glow transition-shadow">
                    {step.icon}
                  </div>
                  <h3 className="font-bold text-xl text-text-primary mb-3">{step.title}</h3>
                  <p className="text-text-secondary">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

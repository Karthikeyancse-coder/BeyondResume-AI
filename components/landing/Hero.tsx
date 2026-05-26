"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { fadeUp, slideInLeft, slideInRight, staggerContainer, staggerItem } from "@/lib/animations";
import AnimatedCounter from "../shared/AnimatedCounter";
import { Rocket } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center pt-16 pb-20 overflow-hidden bg-bg-primary">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-indigo/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-brand-cyan/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* Left Content */}
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="flex flex-col space-y-8"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center space-x-2 bg-bg-tertiary px-4 py-2 rounded-full w-max border border-border-default shadow-sm">
            <Rocket className="w-5 h-5 text-brand-cyan" />
            <span className="text-sm font-bold text-brand-indigo tracking-wide">AI-Powered Hiring Intelligence</span>
          </motion.div>
          
          <motion.h1 variants={slideInLeft} className="font-display font-bold text-5xl md:text-6xl text-text-primary leading-[1.1]">
            Hiring That Sees <br />
            <span className="text-gradient">Your Real Capability</span>
          </motion.h1>

          <motion.p variants={slideInLeft} className="text-lg md:text-xl text-text-secondary max-w-lg leading-relaxed">
            Beyond resumes. Beyond keywords. BeyondResume AI verifies what you truly understand — not just what you claim.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 pt-4">
            <Link 
              href="/register" 
              className="px-8 py-4 bg-brand-gradient text-white rounded-xl font-bold text-lg shadow-md hover:shadow-glow hover:-translate-y-1 transition-all"
            >
              Start Free &rarr;
            </Link>
            <button className="px-8 py-4 bg-transparent border-2 border-border-strong text-text-primary rounded-xl font-bold text-lg hover:bg-bg-tertiary transition-all">
              Watch Demo &#9654;
            </button>
          </motion.div>

          <motion.p variants={fadeUp} className="text-sm text-text-muted pt-4 font-medium">
            Trusted by 500+ developers and 50+ companies
          </motion.p>
        </motion.div>

        {/* Right Dashboard Preview */}
        <motion.div 
          variants={slideInRight}
          initial="initial"
          animate="animate"
          className="relative lg:h-[600px] flex items-center justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-md bg-bg-secondary rounded-2xl border border-border-default shadow-2xl p-6 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-brand-gradient" />
            
            <div className="flex items-center justify-between mb-8 pt-2">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-brand-indigo/10 flex items-center justify-center font-bold text-brand-indigo">
                  A
                </div>
                <div>
                  <h4 className="font-bold text-text-primary text-sm">Arjun Mehta</h4>
                  <p className="text-xs text-text-muted">Backend Engineer</p>
                </div>
              </div>
              <span className="bg-success/10 text-success text-xs font-bold px-2 py-1 rounded-md">VERIFIED</span>
            </div>

            <div className="space-y-4">
              {/* Mock Score Cards inside the preview */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-bg-tertiary/50 border border-border-subtle">
                <div>
                  <p className="text-xs font-bold text-text-secondary">Capability</p>
                  <AnimatedCounter from={0} to={78} className="text-2xl font-bold text-text-primary" />
                </div>
                <div className="w-10 h-10 rounded-full border-4 border-success flex items-center justify-center">
                  <span className="text-[10px] font-bold text-success">HIGH</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-bg-tertiary/50 border border-border-subtle">
                <div>
                  <p className="text-xs font-bold text-text-secondary">Authenticity</p>
                  <AnimatedCounter from={0} to={91} className="text-2xl font-bold text-text-primary" />
                </div>
                <div className="w-10 h-10 rounded-full border-4 border-success flex items-center justify-center">
                  <span className="text-[10px] font-bold text-success">HIGH</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-bg-tertiary/50 border border-border-subtle">
                <div>
                  <p className="text-xs font-bold text-text-secondary">Growth Potential</p>
                  <AnimatedCounter from={0} to={85} className="text-2xl font-bold text-text-primary" />
                </div>
                <div className="w-10 h-10 rounded-full border-4 border-brand-indigo flex items-center justify-center">
                  <span className="text-[10px] font-bold text-brand-indigo">FAST</span>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}

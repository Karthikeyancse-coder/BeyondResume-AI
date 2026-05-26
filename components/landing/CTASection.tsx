"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { fadeUp } from "@/lib/animations";

export default function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-brand-gradient opacity-10 pointer-events-none" />
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="bg-bg-secondary p-12 rounded-3xl shadow-xl border border-border-default"
        >
          <motion.h2 variants={fadeUp} className="font-display font-bold text-3xl md:text-4xl text-text-primary mb-6">
            Ready to get recognized for your real skill?
          </motion.h2>
          <motion.p variants={fadeUp} className="text-text-secondary text-lg mb-10">
            Join the platform where proof of thinking beats proof of resume.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/register" 
              className="w-full sm:w-auto px-8 py-4 bg-brand-gradient text-white rounded-xl font-bold text-lg shadow-md hover:shadow-glow hover:-translate-y-1 transition-all"
            >
              Start as Candidate
            </Link>
            <Link 
              href="/register?role=recruiter" 
              className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-brand-indigo text-brand-indigo rounded-xl font-bold text-lg hover:bg-bg-tertiary transition-all"
            >
              I&apos;m a Recruiter &rarr;
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

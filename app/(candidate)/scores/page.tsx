"use client";

import { motion } from "framer-motion";
import PageWrapper from "@/components/layout/PageWrapper";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { useAuthStore } from "@/store/useAuthStore";
import { mockScoreBreakdown, mockGitHubAnalysis } from "@/lib/mock-data";
import ScoreCard from "@/components/shared/ScoreCard";
import CapabilityRadar from "@/components/shared/CapabilityRadar";
import TrustMeter from "@/components/shared/TrustMeter";
import { CheckCircle2, Download, Share2, Sparkles } from "lucide-react";
import Link from "next/link";

export default function ScoresPage() {
  const { user } = useAuthStore();
  
  const radarData = Object.entries(mockScoreBreakdown.capability.breakdown).map(([key, value]) => ({
    subject: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim(),
    value: value,
    fullMark: 100
  }));

  return (
    <PageWrapper className="min-h-screen p-6 md:p-10 max-w-7xl mx-auto pb-24">
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="space-y-8"
      >
        {/* Header */}
        <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-display font-bold text-3xl text-text-primary">
              Your Capability Intelligence Report
            </h1>
            <p className="text-text-secondary mt-1">Generated: {new Date().toLocaleDateString()} • Ref: INT-8472-A</p>
          </div>
          <div className="flex space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 border-2 border-border-default rounded-lg font-bold text-sm text-text-primary hover:bg-bg-tertiary transition-colors">
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-text-primary text-bg-primary rounded-lg font-bold text-sm hover:opacity-90 transition-opacity">
              <Download className="w-4 h-4" />
              <span>PDF Report</span>
            </button>
          </div>
        </motion.div>

        {/* Section A: Score Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ScoreCard 
            label={mockScoreBreakdown.capability.label} 
            score={mockScoreBreakdown.capability.score} 
            weight={mockScoreBreakdown.capability.weight} 
            trend="up" 
            delay={0.1}
          />
          <ScoreCard 
            label={mockScoreBreakdown.authenticity.label} 
            score={mockScoreBreakdown.authenticity.score} 
            weight={mockScoreBreakdown.authenticity.weight} 
            trend="flat" 
            delay={0.2} 
          />
          <ScoreCard 
            label={mockScoreBreakdown.growth.label} 
            score={mockScoreBreakdown.growth.score} 
            weight={mockScoreBreakdown.growth.weight} 
            trend="up" 
            delay={0.3} 
          />
          <ScoreCard 
            label={mockScoreBreakdown.alignment.label} 
            score={mockScoreBreakdown.alignment.score} 
            weight={mockScoreBreakdown.alignment.weight} 
            trend="flat" 
            delay={0.4} 
          />
        </div>

        {/* Main Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Section B: Radar */}
          <motion.div variants={fadeUp} className="bg-bg-secondary border border-border-default rounded-3xl p-8 shadow-sm flex flex-col">
            <h3 className="font-bold text-xl text-text-primary mb-6">Capability Radar</h3>
            <div className="flex-grow flex items-center justify-center">
              <CapabilityRadar data={radarData} />
            </div>
            <div className="mt-6 flex justify-between text-sm">
              <p className="font-bold text-success">Strongest: Problem Solving (84)</p>
              <p className="font-bold text-danger">Improve: AI/ML (60)</p>
            </div>
          </motion.div>

          <div className="space-y-8">
            {/* Section C: Authenticity Breakdown */}
            <motion.div variants={fadeUp} className="bg-bg-secondary border border-border-default rounded-3xl p-8 shadow-sm">
              <h3 className="font-bold text-xl text-text-primary mb-6">Authenticity Breakdown</h3>
              <TrustMeter score={mockScoreBreakdown.authenticity.score} label="Overall Authenticity Trust" />
              
              <div className="mt-8 space-y-3">
                {mockScoreBreakdown.authenticity.signals.map((signal, idx) => (
                  <div key={idx} className="flex items-center space-x-3 bg-success/5 p-3 rounded-xl border border-success/20">
                    <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
                    <span className="text-sm font-semibold text-text-primary">{signal}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Section D: GitHub Intelligence */}
            <motion.div variants={fadeUp} className="bg-bg-secondary border border-border-default rounded-3xl p-8 shadow-sm">
              <h3 className="font-bold text-xl text-text-primary mb-6">GitHub Intelligence</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-bg-tertiary rounded-xl border border-border-subtle">
                  <p className="text-xs text-text-muted font-bold mb-1">Commit Consistency</p>
                  <p className="text-xl font-display font-bold text-text-primary">{mockGitHubAnalysis.commitConsistency}%</p>
                </div>
                <div className="p-4 bg-bg-tertiary rounded-xl border border-border-subtle">
                  <p className="text-xs text-text-muted font-bold mb-1">Project Evolution</p>
                  <p className="text-xl font-display font-bold text-text-primary">{mockGitHubAnalysis.projectEvolution}%</p>
                </div>
                <div className="p-4 bg-bg-tertiary rounded-xl border border-border-subtle">
                  <p className="text-xs text-text-muted font-bold mb-1">Debugging Maturity</p>
                  <p className="text-xl font-display font-bold text-text-primary">{mockGitHubAnalysis.debuggingMaturity}%</p>
                </div>
                <div className="p-4 bg-bg-tertiary rounded-xl border border-border-subtle">
                  <p className="text-xs text-text-muted font-bold mb-1">Architecture Growth</p>
                  <p className="text-xl font-display font-bold text-text-primary">{mockGitHubAnalysis.architectureGrowth}%</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Section E: AI Insight */}
        <motion.div variants={fadeUp} className="bg-brand-indigo text-white rounded-3xl p-8 shadow-lg relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-white opacity-5 rounded-full blur-[40px] pointer-events-none" />
          <div className="flex items-start space-x-4 relative z-10">
            <Sparkles className="w-8 h-8 text-brand-cyan shrink-0" />
            <div>
              <h3 className="font-bold text-xl mb-3">AI Capability Insight</h3>
              <p className="text-brand-indigo-100 text-lg leading-relaxed">
                Based on your evaluation, you demonstrate strong backend problem-solving skills with genuine implementation experience. Your GitHub evolution shows authentic learning progression. Primary gap identified: DevOps and cloud architecture.
              </p>
              <div className="mt-6">
                <Link 
                  href="/roadmap" 
                  className="inline-block px-6 py-3 bg-white text-brand-indigo rounded-xl font-bold hover:bg-brand-cyan hover:text-white transition-colors"
                >
                  View Learning Roadmap &rarr;
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </PageWrapper>
  );
}

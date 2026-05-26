"use client";

import { motion } from "framer-motion";
import PageWrapper from "@/components/layout/PageWrapper";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { useAuthStore } from "@/store/useAuthStore";
import { mockCandidateProfile, mockScoreBreakdown } from "@/lib/mock-data";
import ScoreCard from "@/components/shared/ScoreCard";
import CapabilityRadar from "@/components/shared/CapabilityRadar";
import TrustMeter from "@/components/shared/TrustMeter";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, Github, Map } from "lucide-react";

export default function CandidateDashboard() {
  const { user } = useAuthStore();
  
  // Transform mock data for radar
  const radarData = Object.entries(mockScoreBreakdown.capability.breakdown).map(([key, value]) => ({
    subject: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim(),
    value: value,
    fullMark: 100
  }));

  return (
    <PageWrapper className="min-h-screen p-6 md:p-10 max-w-7xl mx-auto">
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
              Welcome back, {user?.name.split(" ")[0]} 👋
            </h1>
            <p className="text-text-secondary mt-1">Here is your capability intelligence overview</p>
          </div>
          <Link
            href="/interview"
            className="inline-flex items-center space-x-2 bg-brand-gradient text-white px-6 py-3 rounded-xl font-bold shadow-md hover:shadow-glow hover:-translate-y-0.5 transition-all"
          >
            <span>Complete Interview</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>

        {/* Row 1: Score Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ScoreCard 
            label="Capability" 
            score={mockCandidateProfile.capabilityScore || 0} 
            weight="30%" 
            trend="up" 
            delay={0.1}
          />
          <ScoreCard 
            label="Authenticity" 
            score={mockCandidateProfile.authenticityScore || 0} 
            weight="25%" 
            trend="flat" 
            delay={0.2} 
          />
          <ScoreCard 
            label="Growth Potential" 
            score={mockCandidateProfile.growthScore || 0} 
            weight="10%" 
            trend="up" 
            delay={0.3} 
          />
          <ScoreCard 
            label="Alignment" 
            score={mockCandidateProfile.alignmentScore || 0} 
            weight="20%" 
            trend="flat" 
            delay={0.4} 
          />
        </div>

        {/* Row 2: Radar & Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Radar Chart */}
          <motion.div variants={fadeUp} className="lg:col-span-7 bg-bg-secondary border border-border-default rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-lg text-text-primary mb-6">Capability Spectrum</h3>
            <CapabilityRadar data={radarData} />
          </motion.div>

          {/* Right Insights */}
          <motion.div variants={fadeUp} className="lg:col-span-5 flex flex-col space-y-6">
            
            <div className="bg-bg-secondary border border-border-default rounded-2xl p-6 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <Github className="w-5 h-5 text-text-primary" />
                <h3 className="font-bold text-lg text-text-primary">GitHub Authenticity</h3>
              </div>
              <TrustMeter score={91} showRisk={true} />
              <p className="text-xs text-text-secondary mt-3">
                Analyzed from 47 repositories. Consistent commit history detected.
              </p>
            </div>

            <div className="bg-bg-secondary border border-border-default rounded-2xl p-6 shadow-sm flex-grow flex flex-col justify-center">
              <h3 className="font-bold text-lg text-text-primary mb-4">Current Status</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 text-sm font-medium text-text-secondary">
                    <CheckCircle2 className="w-5 h-5 text-success" />
                    <span>Resume Uploaded</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 text-sm font-medium text-text-secondary">
                    <CheckCircle2 className="w-5 h-5 text-success" />
                    <span>GitHub Analyzed</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 text-sm font-medium text-text-secondary">
                    <Clock className="w-5 h-5 text-warning" />
                    <span>Interview Pending</span>
                  </div>
                  <Link href="/interview" className="text-xs font-bold text-brand-indigo hover:underline">
                    Start &rarr;
                  </Link>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 text-sm font-medium text-text-secondary">
                    <Map className="w-5 h-5 text-brand-cyan" />
                    <span>Roadmap Progress</span>
                  </div>
                  <span className="text-xs font-bold text-text-primary">3 / 8 Skills</span>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </motion.div>
    </PageWrapper>
  );
}

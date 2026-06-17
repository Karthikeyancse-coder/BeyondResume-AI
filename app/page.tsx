import PageWrapper from "@/components/layout/PageWrapper";
import Hero from "@/components/landing/Hero";
import ProblemSection from "@/components/landing/ProblemSection";
import StatsSection from "@/components/landing/StatsSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import RolesSection from "@/components/landing/RolesSection";
import HowItWorks from "@/components/landing/HowItWorks";
import TechStackSection from "@/components/landing/TechStackSection";
import CTASection from "@/components/landing/CTASection";
import Link from "next/link";
import { BrainCircuit } from "lucide-react";

export default function Home() {
  return (
    <PageWrapper>
      <Hero />
      <ProblemSection />
      <StatsSection />
      <FeaturesSection />
      <RolesSection />
      <HowItWorks />
      <TechStackSection />
      <CTASection />
      
      {/* Footer / Created By */}
      <footer className="w-full bg-[#05050A] text-white flex flex-col items-center pt-24 pb-12 relative overflow-hidden">
        <p className="text-sm font-bold tracking-[0.2em] text-white/50 mb-6 uppercase z-10">Created By</p>
        
        <Link href="https://github.com/Karthikeyancse-coder" target="_blank" rel="noopener noreferrer" className="relative group cursor-pointer hover:scale-105 transition-transform duration-300 z-10 mb-24">
          {/* Glowing background blur */}
          <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-pink-500 to-cyan-500 rounded-full blur-md opacity-75 group-hover:opacity-100 transition duration-500"></div>
          
          {/* Content container */}
          <div className="relative flex items-center gap-5 bg-[#0A0A0F] border border-white/10 rounded-full p-2 pr-8 shadow-2xl">
            <img src="https://github.com/Karthikeyancse-coder.png" alt="SK" className="w-14 h-14 rounded-full object-cover border border-white/10" />
            <span className="text-white font-bold text-3xl tracking-wider font-display">SK</span>
          </div>
        </Link>
        
        {/* Bottom Footer bar */}
        <div className="w-full max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-white/10 pt-8 z-10 text-xs text-white/50">
          <div className="flex items-center gap-2 font-display font-bold text-white text-base">
            <BrainCircuit className="w-5 h-5 text-brand-indigo" />
            <span>BeyondResume <span className="text-brand-cyan">AI</span></span>
          </div>
          
          <div className="text-center md:text-left text-white/40">
            Built for candidates and recruiters • Next.js + AI • Role-based access control
          </div>
          
          <div className="flex items-center gap-6 font-medium">
            <Link href="/login" className="hover:text-white transition-colors">Sign In</Link>
            <Link href="https://github.com/Karthikeyancse-coder/BeyondResume-AI" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</Link>
          </div>
        </div>
      </footer>
    </PageWrapper>
  );
}

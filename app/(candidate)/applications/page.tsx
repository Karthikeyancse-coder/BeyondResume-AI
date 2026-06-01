"use client";

import { useState } from "react";
import PageWrapper from "@/components/layout/PageWrapper";
import HiredCelebration from "@/components/candidate/HiredCelebration";
import { mockApplications } from "@/lib/mock-data";
import { Briefcase, Building2, MessageCircle, ExternalLink, ShieldCheck } from "lucide-react";
import Link from "next/link";
import StageTracker from "@/components/messages/StageTracker";
import { cn } from "@/lib/utils";

export default function ApplicationsPage() {
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationData, setCelebrationData] = useState({ company: "", role: "" });

  const handleSimulateHired = (app: any) => {
    setCelebrationData({ company: app.company, role: app.jobTitle });
    setShowCelebration(true);
  };

  return (
    <PageWrapper>
      <div className="max-w-[1200px] mx-auto px-4 py-8 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-text-primary mb-2 flex items-center gap-3">
            <Briefcase className="w-8 h-8 text-brand-indigo" />
            My Applications
          </h1>
          <p className="text-text-secondary">Track the progress of roles you've been selected for.</p>
        </div>

        {/* List */}
        <div className="space-y-6">
          {mockApplications.map((app) => (
            <div key={app.id} className="bg-bg-secondary border border-white/5 rounded-2xl p-6 relative overflow-hidden flex flex-col md:flex-row gap-8 items-center shadow-lg">
              
              {app.stage === 'hired' && (
                <div className="absolute top-0 right-0 w-32 h-32 bg-success-green/10 rounded-bl-full -z-0 blur-2xl pointer-events-none" />
              )}
              
              {/* Left Info */}
              <div className="w-full md:w-1/3 z-10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-brand-gradient flex items-center justify-center text-white font-bold text-xl shadow-md">
                    {app.company.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-text-primary">{app.company}</h3>
                    {app.companyVerified && (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-success-green uppercase">
                        <ShieldCheck className="w-3 h-3" /> Verified Company
                      </span>
                    )}
                  </div>
                </div>
                
                <h4 className="text-brand-cyan font-medium mb-1">{app.jobTitle}</h4>
                <p className="text-xs text-text-secondary mb-4">Selected on {app.selectedAt}</p>
                
                <div className="flex items-center gap-2">
                  <Link 
                    href={`/messages/${app.threadId}`}
                    className="px-4 py-2 bg-white/5 hover:bg-brand-indigo/20 border border-white/10 rounded-lg text-sm font-medium text-text-primary transition-colors flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" /> Go to Chat
                  </Link>
                  
                  {/* Simulation Button for Testing */}
                  {app.stage !== 'hired' && (
                    <button 
                      onClick={() => handleSimulateHired(app)}
                      className="px-3 py-2 bg-success-green/10 hover:bg-success-green/20 text-success-green rounded-lg text-xs font-bold transition-colors ml-auto border border-success-green/20"
                      title="Test the hired celebration animation"
                    >
                      Simulate Hired
                    </button>
                  )}
                </div>
              </div>

              {/* Middle Tracker */}
              <div className="w-full md:w-1/3 flex flex-col items-center justify-center z-10 py-4 md:py-0 border-y md:border-y-0 md:border-x border-white/5 md:px-8">
                <h4 className="text-xs uppercase tracking-wider font-semibold text-text-tertiary mb-6">Current Stage</h4>
                <StageTracker currentStage={app.stage} className="w-full max-w-[200px]" />
              </div>

              {/* Right Context */}
              <div className="w-full md:w-1/3 z-10">
                <h4 className="text-xs uppercase tracking-wider font-semibold text-text-tertiary mb-3">Recent Activity</h4>
                <div className="bg-bg-primary/50 border border-white/5 p-4 rounded-xl">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-brand-violet/20 flex items-center justify-center text-brand-violet shrink-0 mt-0.5">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-primary mb-0.5">{app.recruiter}</p>
                      <p className="text-sm text-text-secondary line-clamp-2 italic">"{app.lastMessage}"</p>
                      <p className="text-[10px] text-text-tertiary mt-2">{app.lastMessageTime}</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

        {showCelebration && (
          <HiredCelebration 
            company={celebrationData.company} 
            role={celebrationData.role} 
            onClose={() => setShowCelebration(false)} 
          />
        )}
      </div>
    </PageWrapper>
  );
}

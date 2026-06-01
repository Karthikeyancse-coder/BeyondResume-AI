"use client";

import { Building2, MapPin, DollarSign, Calendar, CheckCircle2 } from "lucide-react";
import StageTracker from "./StageTracker";

interface JobContextPanelProps {
  jobTitle: string;
  company: string;
  isVerified?: boolean;
  stage: string;
  sinceDate?: string;
  // Mock data for the panel
  location?: string;
  salary?: string;
  postedDate?: string;
  requiredSkills?: string[];
}

export default function JobContextPanel({ 
  jobTitle, company, isVerified, stage, sinceDate,
  location = "San Francisco (Remote)",
  salary = "$120K - $150K",
  postedDate = "3 days ago",
  requiredSkills = ["Node.js", "PostgreSQL", "Docker", "AWS"]
}: JobContextPanelProps) {

  return (
    <div className="bg-bg-secondary border border-white/5 rounded-xl overflow-hidden h-full flex flex-col">
      <div className="p-4 border-b border-white/5 bg-bg-secondary/80 flex items-center gap-2">
        <span className="text-xl">📋</span>
        <h3 className="font-semibold text-text-primary">Job Details</h3>
      </div>

      <div className="p-5 flex-1 overflow-y-auto custom-scrollbar space-y-6">
        
        {/* Basic Info */}
        <div>
          <h2 className="text-lg font-bold text-text-primary mb-1">{jobTitle}</h2>
          <div className="flex items-center gap-1.5 text-text-secondary mb-4">
            <Building2 className="w-4 h-4" />
            <span className="font-medium">{company}</span>
            {isVerified && <CheckCircle2 className="w-3.5 h-3.5 text-brand-cyan" />}
          </div>

          <div className="space-y-2 text-sm text-text-secondary">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-text-tertiary" /> {location}
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-text-tertiary" /> {salary}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-text-tertiary" /> Posted: {postedDate}
            </div>
          </div>
        </div>

        {/* Skills */}
        <div>
          <h4 className="text-xs uppercase tracking-wider font-semibold text-text-tertiary mb-3">Required Skills</h4>
          <div className="flex flex-wrap gap-2">
            {requiredSkills.map(skill => (
              <span key={skill} className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-xs font-medium text-text-secondary">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="h-px bg-white/5 w-full" />

        {/* Stage Tracker */}
        <div>
          <h4 className="text-xs uppercase tracking-wider font-semibold text-text-tertiary mb-4 flex items-center gap-2">
            🔄 Your Application Stage
          </h4>
          
          <StageTracker currentStage={stage} className="px-2 mb-6" />

          <div className="bg-bg-primary/50 border border-white/5 rounded-lg p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-text-tertiary">Current Status</span>
              <span className="text-xs font-semibold text-brand-indigo capitalize flex items-center gap-1">
                {stage === 'selected' ? '⭐ Selected' : stage === 'offer' ? '🎁 Offer' : stage === 'hired' ? '🎉 Hired' : stage}
              </span>
            </div>
            {sinceDate && (
              <div className="flex items-center justify-between">
                <span className="text-xs text-text-tertiary">Since</span>
                <span className="text-xs text-text-secondary font-medium">{sinceDate}</span>
              </div>
            )}
          </div>
        </div>

        <div className="h-px bg-white/5 w-full" />

        {/* Company Info */}
        <div>
          <h4 className="text-xs uppercase tracking-wider font-semibold text-text-tertiary mb-3 flex items-center gap-2">
            🏢 About {company}
          </h4>
          {isVerified && (
            <div className="flex items-center gap-2 text-sm text-success-green font-medium mb-2">
              <CheckCircle2 className="w-4 h-4" /> Verified Company
            </div>
          )}
          <a href="#" className="text-sm text-brand-indigo hover:underline block mb-1">Visit Website</a>
          <p className="text-sm text-text-secondary">500-1000 employees</p>
        </div>

      </div>
    </div>
  );
}

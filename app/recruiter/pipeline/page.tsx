"use client";

import { useState } from "react";
import PageWrapper from "@/components/layout/PageWrapper";
import PipelineBoard from "@/components/recruiter/PipelineBoard";
import { mockPipeline } from "@/lib/mock-data";
import { Briefcase } from "lucide-react";

export default function PipelinePage() {
  const [selectedJob, setSelectedJob] = useState("Backend Engineer");

  return (
    <PageWrapper>
      <div className="max-w-[1400px] mx-auto px-4 py-8 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-text-primary mb-2 flex items-center gap-3">
              <Briefcase className="w-8 h-8 text-brand-indigo" />
              Hiring Pipeline
            </h1>
            <p className="text-text-secondary">Track candidates through the selection and hiring process.</p>
          </div>
          
          <div>
            <select 
              value={selectedJob}
              onChange={(e) => setSelectedJob(e.target.value)}
              className="bg-bg-secondary border border-white/10 rounded-xl px-4 py-2.5 text-text-primary font-medium focus:outline-none focus:border-brand-indigo transition-colors appearance-none cursor-pointer min-w-[250px]"
            >
              <option value="Backend Engineer">Backend Engineer</option>
              <option value="Full Stack Developer">Full Stack Developer</option>
            </select>
          </div>
        </div>

        {/* Board */}
        <PipelineBoard pipeline={mockPipeline} />
        
      </div>
    </PageWrapper>
  );
}

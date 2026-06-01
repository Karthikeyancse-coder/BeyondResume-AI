"use client";

import { MessageCircle, ExternalLink } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface PipelineCandidate {
  id: string;
  name: string;
  score: number;
  daysInStage: number;
}

interface PipelineBoardProps {
  pipeline: {
    jobTitle: string;
    selected: PipelineCandidate[];
    offer: PipelineCandidate[];
    hired: PipelineCandidate[];
  };
}

export default function PipelineBoard({ pipeline }: PipelineBoardProps) {
  
  const columns = [
    {
      id: 'selected',
      title: '⭐ Selected',
      color: 'border-brand-indigo text-brand-indigo bg-brand-indigo/5',
      candidates: pipeline.selected
    },
    {
      id: 'offer',
      title: '🎁 Offer Extended',
      color: 'border-brand-cyan text-brand-cyan bg-brand-cyan/5',
      candidates: pipeline.offer
    },
    {
      id: 'hired',
      title: '🎉 Hired',
      color: 'border-success-green text-success-green bg-success-green/5',
      candidates: pipeline.hired
    }
  ];

  return (
    <div className="w-full overflow-x-auto custom-scrollbar pb-4">
      <div className="flex gap-6 min-w-[900px]">
        {columns.map((col) => (
          <div key={col.id} className="flex-1 flex flex-col bg-bg-secondary border border-white/5 rounded-2xl overflow-hidden h-[calc(100vh-200px)] min-h-[500px]">
            
            {/* Column Header */}
            <div className={cn("p-4 border-b-2 bg-bg-secondary/80 backdrop-blur sticky top-0 z-10 flex items-center justify-between", col.color.split(' ')[0])}>
              <h3 className={cn("font-bold text-sm tracking-wide uppercase", col.color.split(' ')[1])}>
                {col.title}
              </h3>
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-medium text-text-primary">
                {col.candidates.length}
              </div>
            </div>

            {/* Column Body */}
            <div className="p-4 flex-1 overflow-y-auto custom-scrollbar space-y-3 bg-bg-primary/20">
              {col.candidates.length === 0 ? (
                <div className="h-full flex items-center justify-center text-text-tertiary text-sm font-medium border-2 border-dashed border-white/5 rounded-xl">
                  Drop candidates here
                </div>
              ) : (
                col.candidates.map((candidate) => (
                  <div 
                    key={candidate.id}
                    className="bg-bg-primary border border-white/10 rounded-xl p-4 hover:border-white/20 transition-all cursor-pointer group shadow-sm hover:shadow-md"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-text-primary">{candidate.name}</h4>
                        <p className="text-xs text-text-tertiary mt-0.5">In stage: {candidate.daysInStage} days</p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-brand-gradient flex items-center justify-center text-white font-bold text-xs shrink-0">
                        {candidate.score}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 pt-3 border-t border-white/5">
                      <Link 
                        href={`/recruiter/messages/thread_${candidate.id}`}
                        className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded bg-white/5 hover:bg-brand-indigo/20 text-xs font-medium text-text-secondary hover:text-brand-indigo transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5" /> Message
                      </Link>
                      <button className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded bg-white/5 hover:bg-brand-cyan/20 text-xs font-medium text-text-secondary hover:text-brand-cyan transition-colors">
                        <ExternalLink className="w-3.5 h-3.5" /> Move Next
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

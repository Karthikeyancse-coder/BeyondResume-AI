"use client";

import { cn } from "@/lib/utils";

interface StageTrackerProps {
  currentStage: string;
  className?: string;
}

export default function StageTracker({ currentStage, className }: StageTrackerProps) {
  const stages = ['selected', 'offer', 'hired'];
  const currentIndex = stages.indexOf(currentStage.toLowerCase());

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-center justify-between relative">
        {/* Track Line */}
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white/10 -translate-y-1/2 z-0" />
        <div 
          className="absolute top-1/2 left-0 h-[2px] bg-brand-indigo -translate-y-1/2 z-0 transition-all duration-500" 
          style={{ width: `${currentIndex > 0 ? (currentIndex / (stages.length - 1)) * 100 : 0}%` }}
        />

        {stages.map((stage, idx) => {
          const isCompleted = idx <= currentIndex;
          const isActive = idx === currentIndex;
          
          return (
            <div key={stage} className="relative z-10 flex flex-col items-center gap-2">
              <div 
                className={cn(
                  "w-4 h-4 rounded-full flex items-center justify-center border-[2px] transition-colors",
                  isCompleted ? "border-brand-indigo bg-brand-indigo" : "border-white/20 bg-bg-secondary",
                  isActive && "ring-4 ring-brand-indigo/20"
                )}
              >
                {isCompleted && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
              </div>
              <span className={cn(
                "text-[10px] uppercase font-bold tracking-wider absolute top-6",
                isActive ? "text-brand-indigo" : isCompleted ? "text-text-primary" : "text-text-tertiary"
              )}>
                {stage}
              </span>
            </div>
          );
        })}
      </div>
      <div className="h-4" /> {/* Spacing for the absolute labels */}
    </div>
  );
}

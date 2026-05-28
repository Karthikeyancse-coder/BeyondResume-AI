"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  label: string;
  description?: string;
}

interface VerificationStepProps {
  steps: Step[];
  currentStep: number; // 0-indexed
  className?: string;
}

export default function VerificationStep({ steps, currentStep, className }: VerificationStepProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between">
        {steps.map((step, idx) => {
          const isCompleted = idx < currentStep;
          const isCurrent = idx === currentStep;
          const isLast = idx === steps.length - 1;

          return (
            <div key={idx} className="flex items-center flex-1 last:flex-none">
              {/* Step Circle + Label */}
              <div className="flex flex-col items-center relative">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className={cn(
                    "w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 border-2 shadow-sm",
                    isCompleted
                      ? "bg-success border-success text-white shadow-success/25"
                      : isCurrent
                        ? "bg-brand-indigo border-brand-indigo text-white shadow-brand-indigo/25 ring-4 ring-brand-indigo/15"
                        : "bg-gray-100 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-400 dark:text-white/30"
                  )}
                >
                  {isCompleted ? (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
                      <Check className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <span>{idx + 1}</span>
                  )}
                </motion.div>
                <span className={cn(
                  "text-[10px] sm:text-xs font-bold mt-2 text-center whitespace-nowrap",
                  isCompleted
                    ? "text-success"
                    : isCurrent
                      ? "text-brand-indigo dark:text-[#00C6FF]"
                      : "text-gray-400 dark:text-white/30"
                )}>
                  {step.label}
                </span>
              </div>

              {/* Connector Line */}
              {!isLast && (
                <div className="flex-1 mx-2 sm:mx-3 mt-[-20px]">
                  <div className="h-0.5 w-full bg-gray-200 dark:bg-white/10 rounded-full relative overflow-hidden">
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ width: isCompleted ? "100%" : isCurrent ? "50%" : "0%" }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="h-full bg-brand-gradient rounded-full"
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

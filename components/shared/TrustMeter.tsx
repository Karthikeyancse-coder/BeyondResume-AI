"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import AnimatedCounter from "./AnimatedCounter";

interface TrustMeterProps {
  score: number;
  label?: string;
  showRisk?: boolean;
}

export default function TrustMeter({ score, label = "Trust Score", showRisk = true }: TrustMeterProps) {
  let riskLevel = "HIGH RISK";
  let riskColor = "bg-danger text-white";
  let barGradient = "from-danger to-warning";

  if (score >= 80) {
    riskLevel = "LOW RISK";
    riskColor = "bg-success text-white";
    barGradient = "from-success to-success";
  } else if (score >= 60) {
    riskLevel = "MEDIUM RISK";
    riskColor = "bg-warning text-white";
    barGradient = "from-warning to-success";
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-text-secondary">{label}</span>
        {showRisk && (
          <span className={cn("text-xs font-bold px-2 py-1 rounded-md", riskColor)}>
            {riskLevel}
          </span>
        )}
      </div>
      <div className="h-3 w-full bg-border-subtle rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className={cn("h-full bg-gradient-to-r rounded-full", barGradient)}
        />
      </div>
      <div className="mt-2 text-right">
        <AnimatedCounter to={score} suffix="%" className="text-xs font-bold text-text-muted" />
      </div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import AnimatedCounter from "./AnimatedCounter";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScoreCardProps {
  label: string;
  score: number;
  weight?: string;
  trend?: "up" | "down" | "flat";
  delay?: number;
}

export default function ScoreCard({ label, score, weight, trend, delay = 0 }: ScoreCardProps) {
  // Determine color based on score
  let colorClass = "text-danger";
  let ringClass = "stroke-danger";
  if (score >= 80) {
    colorClass = "text-success";
    ringClass = "stroke-success";
  } else if (score >= 60) {
    colorClass = "text-warning";
    ringClass = "stroke-warning";
  }

  // Calculate SVG circle stroke dasharray (circumference = 2 * pi * r)
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="bg-bg-secondary border border-border-default rounded-2xl p-6 shadow-sm hover:shadow-md transition-all relative overflow-hidden"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-text-secondary text-sm font-medium">{label}</h3>
          {weight && (
            <span className="inline-block mt-1 text-xs font-semibold px-2 py-0.5 bg-bg-tertiary text-brand-indigo rounded-md">
              Weight: {weight}
            </span>
          )}
        </div>
        {trend === "up" && <TrendingUp className="w-5 h-5 text-success" />}
        {trend === "down" && <TrendingDown className="w-5 h-5 text-danger" />}
        {trend === "flat" && <Minus className="w-5 h-5 text-text-muted" />}
      </div>

      <div className="mt-6 flex items-center justify-center">
        <div className="relative w-24 h-24 flex items-center justify-center">
          {/* Background Ring */}
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 80 80">
            <circle
              cx="40"
              cy="40"
              r={radius}
              fill="transparent"
              stroke="currentColor"
              strokeWidth="6"
              className="text-border-subtle"
            />
            {/* Progress Ring */}
            <motion.circle
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.5, ease: "easeOut", delay: delay + 0.2 }}
              cx="40"
              cy="40"
              r={radius}
              fill="transparent"
              stroke="currentColor"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={circumference}
              className={cn("transition-colors", ringClass)}
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center">
            <AnimatedCounter
              to={score}
              className={cn("text-3xl font-display font-bold", colorClass)}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

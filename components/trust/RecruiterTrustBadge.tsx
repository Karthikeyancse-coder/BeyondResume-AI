"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Clock, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

type BadgeStatus = "verified" | "pending" | "rejected" | "unverified";
type BadgeSize = "sm" | "md" | "lg";

interface RecruiterTrustBadgeProps {
  status: BadgeStatus;
  companyDomain?: string;
  size?: BadgeSize;
  className?: string;
}

const config = {
  verified: {
    icon: ShieldCheck,
    label: "Verified Company",
    bg: "bg-success/10 dark:bg-success/15",
    border: "border-success/20",
    text: "text-success",
    glow: "shadow-success/10",
  },
  pending: {
    icon: Clock,
    label: "Verification Pending",
    bg: "bg-warning/10 dark:bg-warning/15",
    border: "border-warning/20",
    text: "text-warning",
    glow: "shadow-warning/10",
  },
  rejected: {
    icon: AlertTriangle,
    label: "Unverified Recruiter",
    bg: "bg-danger/10 dark:bg-danger/15",
    border: "border-danger/20",
    text: "text-danger",
    glow: "shadow-danger/10",
  },
  unverified: {
    icon: AlertTriangle,
    label: "Unverified Recruiter",
    bg: "bg-danger/10 dark:bg-danger/15",
    border: "border-danger/20",
    text: "text-danger",
    glow: "shadow-danger/10",
  },
};

const sizeConfig = {
  sm: {
    wrapper: "px-2 py-1 gap-1 rounded-lg",
    icon: "w-3 h-3",
    text: "text-[10px]",
  },
  md: {
    wrapper: "px-3 py-1.5 gap-1.5 rounded-xl",
    icon: "w-4 h-4",
    text: "text-xs",
  },
  lg: {
    wrapper: "px-4 py-2.5 gap-2 rounded-2xl",
    icon: "w-5 h-5",
    text: "text-sm",
  },
};

export default function RecruiterTrustBadge({ status, companyDomain, size = "md", className }: RecruiterTrustBadgeProps) {
  const c = config[status];
  const s = sizeConfig[size];
  const Icon = c.icon;

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={cn(
        "inline-flex items-center font-bold uppercase tracking-wider border shadow-sm",
        c.bg, c.border, c.text, c.glow,
        s.wrapper, s.text,
        className
      )}
    >
      <Icon className={s.icon} />
      <span>{c.label}</span>
      {status === "verified" && companyDomain && (
        <span className="opacity-70 font-medium normal-case tracking-normal">· {companyDomain}</span>
      )}
    </motion.span>
  );
}

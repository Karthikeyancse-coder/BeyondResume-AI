"use client";

import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface LockedFieldOverlayProps {
  children: React.ReactNode;
  isLocked: boolean;
  message?: string;
  className?: string;
}

export default function LockedFieldOverlay({
  children,
  isLocked,
  message = "Verify your account to see contact details",
  className,
}: LockedFieldOverlayProps) {
  const router = useRouter();

  if (!isLocked) return <>{children}</>;

  return (
    <div className={cn("relative", className)}>
      {/* Blurred content */}
      <div className="blur-[6px] select-none pointer-events-none opacity-50">
        {children}
      </div>

      {/* Lock overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 flex items-center justify-center bg-bg-secondary/60 dark:bg-bg-primary/60 backdrop-blur-[2px] rounded-xl cursor-pointer group"
        onClick={() => router.push("/recruiter/verify-company")}
      >
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-bg-secondary dark:bg-bg-tertiary border border-border-default shadow-md group-hover:shadow-lg group-hover:border-brand-indigo/30 transition-all">
          <Lock className="w-4 h-4 text-brand-indigo" />
          <span className="text-xs font-bold text-text-secondary group-hover:text-brand-indigo transition-colors">
            🔒 {message}
          </span>
        </div>
      </motion.div>
    </div>
  );
}

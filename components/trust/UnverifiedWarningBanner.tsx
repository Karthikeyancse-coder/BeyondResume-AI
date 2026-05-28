"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X, ExternalLink } from "lucide-react";

interface UnverifiedWarningBannerProps {
  onProceed?: () => void;
  onLearnMore?: () => void;
  className?: string;
}

export default function UnverifiedWarningBanner({ onProceed, onLearnMore, className }: UnverifiedWarningBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className={`bg-danger/5 dark:bg-danger/10 border border-danger/20 rounded-2xl p-4 sm:p-5 ${className || ""}`}
      >
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-danger/10 flex items-center justify-center shrink-0 mt-0.5">
            <AlertTriangle className="w-5 h-5 text-danger" />
          </div>
          
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-bold text-danger mb-1">
              ⚠️ Unverified Recruiter
            </h4>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-white/60 leading-relaxed">
              This recruiter has not completed company verification.
              Protect your personal data — do not share contact details
              or documents outside this platform.
            </p>
            
            <div className="flex items-center gap-2 mt-3">
              {onLearnMore && (
                <button
                  onClick={onLearnMore}
                  className="inline-flex items-center gap-1 text-xs font-bold text-danger hover:text-danger/80 transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  Learn More
                </button>
              )}
              {onProceed && (
                <button
                  onClick={() => {
                    setDismissed(true);
                    onProceed();
                  }}
                  className="inline-flex items-center gap-1 text-xs font-bold text-gray-500 dark:text-white/40 hover:text-gray-700 dark:hover:text-white/60 transition-colors"
                >
                  Proceed Anyway
                </button>
              )}
            </div>
          </div>

          <button
            onClick={() => setDismissed(true)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-danger hover:bg-danger/10 transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

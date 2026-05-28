"use client";

import { cn } from "@/lib/utils";

interface SectionToggleProps {
  label: string;
  enabled: boolean;
  onToggle: () => void;
}

export default function SectionToggle({ label, enabled, onToggle }: SectionToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="w-full flex items-center justify-between py-2.5 px-1 group"
    >
      <span className={cn(
        "text-sm font-medium transition-colors",
        enabled ? "text-text-primary" : "text-text-muted"
      )}>
        {label}
      </span>

      {/* Custom toggle switch */}
      <div
        className={cn(
          "relative w-10 h-[22px] rounded-full transition-colors duration-200 shrink-0",
          enabled ? "bg-brand-indigo" : "bg-bg-tertiary border border-border-default"
        )}
      >
        <div
          className={cn(
            "absolute top-0.5 w-[18px] h-[18px] rounded-full bg-white shadow-sm transition-transform duration-200",
            enabled ? "translate-x-[22px]" : "translate-x-0.5"
          )}
        />
      </div>
    </button>
  );
}

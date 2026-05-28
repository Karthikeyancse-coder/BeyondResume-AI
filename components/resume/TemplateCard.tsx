"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type TemplateName = "classic" | "modern" | "minimal";

interface TemplateCardProps {
  name: TemplateName;
  label: string;
  description: string;
  isSelected: boolean;
  onClick: () => void;
}

/* Simple CSS thumbnails that show the layout structure */
function ClassicThumbnail() {
  return (
    <div className="w-full h-full bg-white rounded flex overflow-hidden">
      <div className="w-[35%] bg-[#1e293b] p-1.5 flex flex-col gap-1">
        <div className="w-full h-1.5 bg-indigo-400 rounded-sm" />
        <div className="w-3/4 h-1 bg-slate-500 rounded-sm" />
        <div className="mt-1 space-y-0.5">
          {[1,2,3,4].map(i => <div key={i} className="w-full h-0.5 bg-slate-600 rounded-sm" />)}
        </div>
        <div className="mt-auto space-y-0.5">
          {[1,2,3].map(i => <div key={i} className="w-full h-0.5 bg-slate-600 rounded-sm" />)}
        </div>
      </div>
      <div className="flex-1 p-1.5 flex flex-col gap-1">
        <div className="w-2/3 h-1 bg-gray-300 rounded-sm" />
        <div className="w-full h-0.5 bg-gray-200 rounded-sm" />
        <div className="w-full h-0.5 bg-gray-200 rounded-sm" />
        <div className="mt-1 w-1/2 h-1 bg-indigo-200 rounded-sm" />
        <div className="space-y-0.5 mt-0.5">
          {[1,2,3].map(i => <div key={i} className="w-full h-0.5 bg-gray-200 rounded-sm" />)}
        </div>
      </div>
    </div>
  );
}

function ModernThumbnail() {
  return (
    <div className="w-full h-full bg-white rounded p-1.5 flex flex-col gap-1">
      <div className="w-2/3 h-2 bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-sm" />
      <div className="w-1/2 h-0.5 bg-gray-300 rounded-sm" />
      <div className="w-full h-px bg-gradient-to-r from-indigo-300 to-transparent mt-1" />
      <div className="space-y-0.5">
        {[1,2,3].map(i => <div key={i} className="w-full h-0.5 bg-gray-200 rounded-sm" />)}
      </div>
      <div className="w-full h-px bg-gradient-to-r from-indigo-300 to-transparent mt-0.5" />
      <div className="space-y-0.5">
        {[1,2].map(i => <div key={i} className="w-full h-0.5 bg-gray-200 rounded-sm" />)}
      </div>
      <div className="w-full h-px bg-gradient-to-r from-indigo-300 to-transparent mt-0.5" />
      <div className="flex gap-1 mt-0.5">
        {[1,2,3,4].map(i => <div key={i} className="h-1 flex-1 bg-indigo-100 rounded-sm" />)}
      </div>
    </div>
  );
}

function MinimalThumbnail() {
  return (
    <div className="w-full h-full bg-white rounded p-1.5 flex flex-col gap-1">
      <div className="w-1/2 h-1.5 bg-gray-800 rounded-sm" />
      <div className="w-1/3 h-0.5 bg-gray-400 rounded-sm" />
      <div className="w-8 h-px bg-gray-800 mt-1" />
      <div className="space-y-0.5">
        {[1,2,3].map(i => <div key={i} className="w-full h-0.5 bg-gray-200 rounded-sm" />)}
      </div>
      <div className="w-8 h-px bg-gray-800 mt-0.5" />
      <div className="space-y-0.5">
        {[1,2,3].map(i => <div key={i} className="w-full h-0.5 bg-gray-200 rounded-sm" />)}
      </div>
      <div className="w-8 h-px bg-gray-800 mt-0.5" />
      <div className="space-y-0.5">
        {[1,2].map(i => <div key={i} className="w-full h-0.5 bg-gray-200 rounded-sm" />)}
      </div>
    </div>
  );
}

const thumbnails: Record<TemplateName, React.ReactNode> = {
  classic: <ClassicThumbnail />,
  modern: <ModernThumbnail />,
  minimal: <MinimalThumbnail />,
};

export default function TemplateCard({ name, label, description, isSelected, onClick }: TemplateCardProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative flex flex-col items-start gap-2 p-3 rounded-2xl border-2 transition-colors text-left w-full",
        isSelected
          ? "border-brand-indigo bg-brand-indigo/5 shadow-md"
          : "border-border-default hover:border-brand-indigo/50 bg-bg-secondary"
      )}
    >
      {/* Checkmark badge */}
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-brand-indigo flex items-center justify-center shadow-md z-10"
        >
          <Check className="w-3.5 h-3.5 text-white" />
        </motion.div>
      )}

      {/* Thumbnail */}
      <div className="w-full aspect-[3/4] rounded-lg overflow-hidden border border-border-subtle bg-bg-tertiary">
        {thumbnails[name]}
      </div>

      {/* Label */}
      <div>
        <p className="font-bold text-sm text-text-primary">{label}</p>
        <p className="text-[11px] text-text-muted leading-snug mt-0.5">{description}</p>
      </div>
    </motion.button>
  );
}

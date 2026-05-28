"use client";

import { useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import type { ResumeData, EnabledSections } from "@/lib/resume-data-mapper";
import type { TemplateName } from "./TemplateCard";
import ClassicTemplate from "./templates/ClassicTemplate";
import ModernTemplate from "./templates/ModernTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";

interface Props {
  template: TemplateName;
  data: ResumeData;
  sections: EnabledSections;
}

const templates = {
  classic: ClassicTemplate,
  modern: ModernTemplate,
  minimal: MinimalTemplate,
};

export default function PreviewPanel({ template, data, sections }: Props) {
  const Template = templates[template];
  const [scale, setScale] = useState(0.65);

  const handleZoomIn = () => setScale(s => Math.min(s + 0.1, 1.5));
  const handleZoomOut = () => setScale(s => Math.max(s - 0.1, 0.3));
  const handleResetZoom = () => setScale(0.65);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-baseline justify-between mb-3">
        <h3 className="font-display font-bold text-lg text-text-primary">Live Preview</h3>
        <span className="text-[11px] text-text-muted">Updates as you change settings</span>
      </div>

      {/* Zoom Controls */}
      <div className="flex items-center justify-end gap-2 mb-2">
        <button onClick={handleZoomOut} className="p-1.5 rounded bg-bg-tertiary border border-border-default hover:bg-bg-primary transition-colors text-text-secondary"><ZoomOut className="w-4 h-4" /></button>
        <span className="text-xs font-bold text-text-muted w-10 text-center">{Math.round(scale * 100)}%</span>
        <button onClick={handleZoomIn} className="p-1.5 rounded bg-bg-tertiary border border-border-default hover:bg-bg-primary transition-colors text-text-secondary"><ZoomIn className="w-4 h-4" /></button>
        <button onClick={handleResetZoom} className="p-1.5 rounded bg-bg-tertiary border border-border-default hover:bg-bg-primary transition-colors text-text-secondary ml-2"><RotateCcw className="w-4 h-4" /></button>
      </div>

      {/* Preview frame */}
      <div className="flex-1 bg-bg-tertiary rounded-2xl border border-border-default p-4 overflow-auto flex justify-center items-start">
        <div 
          className="relative transition-all duration-200"
          style={{ width: 794 * scale, height: 1123 * scale }}
        >
          <div
            className="shadow-xl rounded-sm absolute top-0 left-0"
            style={{ 
              transform: `scale(${scale})`, 
              transformOrigin: "top left",
              width: 794,
              height: 1123
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={template}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Template data={data} sections={sections} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

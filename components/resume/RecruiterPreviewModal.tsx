"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, ShieldCheck } from "lucide-react";
import TemplateCard, { type TemplateName } from "./TemplateCard";
import PreviewPanel from "./PreviewPanel";
import SectionToggle from "./SectionToggle";
import { generateResumePDF } from "@/lib/pdf-generator";
import { getResumeData, defaultEnabledSections, type EnabledSections } from "@/lib/resume-data-mapper";
import { useProfileStore } from "@/store/useProfileStore";

interface RecruiterPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RecruiterPreviewModal({ isOpen, onClose }: RecruiterPreviewModalProps) {
  const profileState = useProfileStore();
  const resumeData = getResumeData(profileState);

  const [selectedTemplate, setSelectedTemplate] = useState<TemplateName>(
    (profileState.resumeConfig?.template as TemplateName) || "modern"
  );
  
  // Recruiters see the candidate's custom uploaded sections if they exist, but always see aiScores
  const [enabledSections, setEnabledSections] = useState<EnabledSections>(
    profileState.resumeConfig?.enabledSections 
      ? { ...defaultEnabledSections, ...profileState.resumeConfig.enabledSections, aiScores: true } 
      : { ...defaultEnabledSections, aiScores: true }
  );

  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    setDownloadSuccess(false);

    try {
      const { blob, filename } = await generateResumePDF(selectedTemplate, resumeData, enabledSections);
      
      // Simulate slight generation delay for UX
      await new Promise(resolve => setTimeout(resolve, 1500));

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const toggleSection = (key: keyof EnabledSections) => {
    setEnabledSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-[1200px] max-h-[90vh] bg-bg-primary rounded-3xl shadow-2xl overflow-hidden flex flex-col pointer-events-auto border border-border-default"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-border-default bg-bg-secondary shrink-0">
                <h2 className="font-display font-bold text-xl text-text-primary">
                  Resume Preview — {resumeData.name}
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 text-text-muted hover:text-text-primary bg-bg-tertiary hover:bg-bg-primary rounded-lg transition-colors border border-border-default"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-hidden flex flex-col md:flex-row min-h-0 bg-bg-primary">
                
                {/* Left Controls */}
                <div className="w-full md:w-[380px] shrink-0 p-6 overflow-y-auto border-r border-border-default bg-bg-secondary flex flex-col gap-6">
                  
                  <div className="bg-brand-indigo/5 border border-brand-indigo/20 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-white rounded-lg p-2 shadow-sm border border-brand-indigo/10 shrink-0">
                        <ShieldCheck className="w-5 h-5 text-brand-indigo" />
                      </div>
                      <div>
                        <h4 className="font-bold text-text-primary text-sm leading-tight">Verified Candidate Data</h4>
                        <p className="text-xs text-text-muted mt-1 leading-relaxed">
                          This resume is generated dynamically from verified profile data and deep technical interview scores.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-text-muted uppercase tracking-widest mb-3">Choose Template</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <TemplateCard
                        name="modern"
                        label="Modern"
                        description="Clean & bold"
                        isSelected={selectedTemplate === "modern"}
                        onClick={() => setSelectedTemplate("modern")}
                      />
                      <TemplateCard
                        name="classic"
                        label="Classic"
                        description="Traditional 2-col"
                        isSelected={selectedTemplate === "classic"}
                        onClick={() => setSelectedTemplate("classic")}
                      />
                      <TemplateCard
                        name="minimal"
                        label="Minimal"
                        description="B&W text focused"
                        isSelected={selectedTemplate === "minimal"}
                        onClick={() => setSelectedTemplate("minimal")}
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-text-muted uppercase tracking-widest mb-2">Options</h3>
                    <SectionToggle
                      label="Include AI Verified Scores"
                      enabled={enabledSections.aiScores}
                      onToggle={() => toggleSection("aiScores")}
                    />
                    <p className="text-xs text-text-muted px-1 mt-1">
                      Shows BeyondResume AI capability scores on the generated resume.
                    </p>
                  </div>
                </div>

                {/* Right Preview */}
                <div className="flex-1 bg-bg-tertiary p-6 overflow-hidden flex flex-col relative">
                  <PreviewPanel
                    template={selectedTemplate}
                    data={resumeData}
                    sections={enabledSections}
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-between px-6 py-4 border-t border-border-default bg-bg-secondary shrink-0">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 font-bold text-text-secondary hover:text-text-primary transition-colors"
                >
                  Cancel
                </button>
                <div className="flex items-center gap-4">
                  {downloadSuccess && (
                    <span className="text-sm font-bold text-success flex items-center gap-1.5 animate-in fade-in">
                      <Check className="w-4 h-4" /> Downloaded successfully
                    </span>
                  )}
                  <button
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="flex items-center gap-2 px-6 py-2.5 bg-brand-gradient text-white rounded-xl font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:hover:translate-y-0"
                  >
                    {isDownloading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Generating PDF...
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        Download PDF
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

// Needed to avoid Check icon error above since it wasn't imported.
import { Check } from "lucide-react";

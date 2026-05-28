"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Download, FileText, Settings, Eye, ShieldCheck } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import PageWrapper from "@/components/layout/PageWrapper";
import TemplateCard, { type TemplateName } from "@/components/resume/TemplateCard";
import PreviewPanel from "@/components/resume/PreviewPanel";
import SectionToggle from "@/components/resume/SectionToggle";
import { generateResumePDF } from "@/lib/pdf-generator";
import { getResumeData, defaultEnabledSections, type EnabledSections } from "@/lib/resume-data-mapper";
import { cn } from "@/lib/utils";

export default function ResumeBuilderPage() {
  const { user, isAuthenticated } = useAuthStore();
  const router = useRouter();

  const [selectedTemplate, setSelectedTemplate] = useState<TemplateName>("classic");
  const [enabledSections, setEnabledSections] = useState<EnabledSections>(defaultEnabledSections);
  const [isDownloading, setIsDownloading] = useState(false);
  const [activeTab, setActiveTab] = useState<"settings" | "preview">("settings");

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    // Redirect recruiter away from builder page
    if (user?.role === "RECRUITER") {
      router.push("/recruiter/dashboard");
    }
  }, [isAuthenticated, user, router]);

  if (!user || user.role === "RECRUITER") return null;

  const resumeData = getResumeData();

  const toggleSection = (key: keyof EnabledSections) => {
    setEnabledSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const { blob, filename } = await generateResumePDF(selectedTemplate, resumeData, enabledSections);
      
      // Simulate delay for generation UX
      await new Promise(resolve => setTimeout(resolve, 1500));

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <PageWrapper className="min-h-screen bg-bg-primary pb-20 lg:pb-0">
      
      {/* Mobile Tab Switcher */}
      <div className="lg:hidden sticky top-14 z-30 bg-bg-secondary border-b border-border-default px-3 py-2 flex items-center gap-1 shadow-sm">
        <button
          onClick={() => router.push("/profile")}
          className="p-2.5 shrink-0 rounded-xl border border-border-default text-text-muted hover:text-text-primary bg-bg-primary transition-colors"
          aria-label="Back to Profile"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => setActiveTab("settings")}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-colors border",
            activeTab === "settings"
              ? "bg-brand-indigo/10 text-brand-indigo border-brand-indigo/20"
              : "bg-bg-primary text-text-muted border-border-default hover:text-text-primary"
          )}
        >
          <Settings className="w-4 h-4" /> Controls
        </button>
        <button
          onClick={() => setActiveTab("preview")}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-colors border",
            activeTab === "preview"
              ? "bg-brand-indigo/10 text-brand-indigo border-brand-indigo/20"
              : "bg-bg-primary text-text-muted border-border-default hover:text-text-primary"
          )}
        >
          <Eye className="w-4 h-4" /> Live Preview
        </button>
      </div>

      <div className="flex flex-col lg:flex-row h-full min-h-[calc(100vh-72px)]">
        
        {/* LEFT PANEL — CONTROLS */}
        <div className={cn(
          "w-full lg:w-[38%] border-r border-border-default bg-bg-secondary flex-col h-full lg:h-[calc(100vh-72px)] overflow-y-auto shrink-0",
          activeTab === "settings" ? "flex" : "hidden lg:flex"
        )}>
          
          <div className="p-6 md:p-8 space-y-8">
            {/* Header */}
            <div>
              <button 
                onClick={() => router.push("/profile")}
                className="flex items-center gap-2 text-sm font-bold text-text-muted hover:text-brand-indigo transition-colors mb-6"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Profile
              </button>
              <h1 className="font-display text-2xl font-bold text-text-primary">Build Your Resume</h1>
              <p className="text-sm text-text-muted mt-1">Data auto-filled from your profile</p>
            </div>

            {/* Template Selector */}
            <div>
              <h2 className="text-xs font-bold text-text-muted uppercase tracking-widest mb-4">Choose Template</h2>
              <div className="flex overflow-x-auto lg:grid lg:grid-cols-3 gap-4 pb-4 lg:pb-0 snap-x">
                <div className="min-w-[140px] snap-start">
                  <TemplateCard
                    name="classic"
                    label="Classic"
                    description="Traditional 2-column layout"
                    isSelected={selectedTemplate === "classic"}
                    onClick={() => setSelectedTemplate("classic")}
                  />
                </div>
                <div className="min-w-[140px] snap-start">
                  <TemplateCard
                    name="modern"
                    label="Modern"
                    description="Clean & bold single column"
                    isSelected={selectedTemplate === "modern"}
                    onClick={() => setSelectedTemplate("modern")}
                  />
                </div>
                <div className="min-w-[140px] snap-start">
                  <TemplateCard
                    name="minimal"
                    label="Minimal"
                    description="Ultra clean, text focused"
                    isSelected={selectedTemplate === "minimal"}
                    onClick={() => setSelectedTemplate("minimal")}
                  />
                </div>
              </div>
            </div>

            <div className="w-full h-px bg-border-default" />

            {/* Sections Toggle */}
            <div>
              <h2 className="text-xs font-bold text-text-muted uppercase tracking-widest mb-4">Include Sections</h2>
              <div className="bg-bg-primary rounded-2xl border border-border-default p-2 space-y-1">
                <SectionToggle label="Professional Summary" enabled={enabledSections.summary} onToggle={() => toggleSection("summary")} />
                <SectionToggle label="Career History" enabled={enabledSections.experience} onToggle={() => toggleSection("experience")} />
                <SectionToggle label="Skills" enabled={enabledSections.skills} onToggle={() => toggleSection("skills")} />
                <SectionToggle label="Education" enabled={enabledSections.education} onToggle={() => toggleSection("education")} />
                <SectionToggle label="Projects" enabled={enabledSections.projects} onToggle={() => toggleSection("projects")} />
                <SectionToggle label="Certifications" enabled={enabledSections.certifications} onToggle={() => toggleSection("certifications")} />
                <SectionToggle label="Languages" enabled={enabledSections.languages} onToggle={() => toggleSection("languages")} />
              </div>

              {/* AI Scores Toggle (Special) */}
              <div className="mt-6 bg-brand-indigo/5 border border-brand-indigo/20 rounded-2xl p-4 transition-colors">
                <SectionToggle label="AI Capability Scores" enabled={enabledSections.aiScores} onToggle={() => toggleSection("aiScores")} />
                
                <AnimatePresence>
                  {enabledSections.aiScores && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: "auto", marginTop: 12 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="bg-white dark:bg-black/20 p-3 rounded-xl border border-brand-indigo/10">
                        <p className="text-[11px] font-bold text-brand-indigo mb-1 flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5" /> BeyondResume AI Verified
                        </p>
                        <p className="text-[11px] text-text-secondary leading-relaxed">
                          Your resume will include a verified badge showing your Capability and Authenticity scores. This strongly signals genuine ability to recruiters.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Download Actions */}
            <div className="pt-4 space-y-3 pb-8">
              <button
                onClick={() => setActiveTab("preview")}
                className="w-full lg:hidden flex items-center justify-center gap-2 py-3.5 px-4 bg-bg-primary border-2 border-border-default text-text-primary rounded-xl font-bold hover:bg-bg-tertiary transition-colors"
              >
                <Eye className="w-5 h-5" /> View Full Screen Preview
              </button>
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="w-full flex items-center justify-center gap-2 py-4 bg-brand-gradient text-white rounded-xl font-bold shadow-lg shadow-brand-indigo/20 hover:shadow-glow hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:hover:translate-y-0"
              >
                {isDownloading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Generating PDF...
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" /> Download PDF
                  </>
                )}
              </button>
              <div className="flex items-center justify-center gap-2 text-[11px] text-text-muted font-medium">
                <FileText className="w-3.5 h-3.5" /> PDF Format <span className="w-1 h-1 bg-border-default rounded-full mx-1" /> A4 Size <span className="w-1 h-1 bg-border-default rounded-full mx-1" /> ATS-Friendly
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT PANEL — PREVIEW */}
        <div className={cn(
          "w-full lg:flex-1 bg-bg-tertiary p-4 sm:p-6 md:p-8 h-full lg:h-[calc(100vh-72px)] overflow-hidden flex-col",
          activeTab === "preview" ? "flex" : "hidden lg:flex"
        )}>
          <PreviewPanel
            template={selectedTemplate}
            data={resumeData}
            sections={enabledSections}
          />
        </div>

      </div>
    </PageWrapper>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageWrapper from "@/components/layout/PageWrapper";
import { fadeUp } from "@/lib/animations";
import { UploadCloud, FileText, CheckCircle2, Github, Globe, ArrowRight } from "lucide-react";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function UploadPage() {
  const [step, setStep] = useState(1);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true);
      setTimeout(() => {
        setIsUploading(false);
        setStep(2);
      }, 2000);
    }
  };

  const handleGitHubSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setStep(3);
    }, 2000);
  };

  const handlePortfolioSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(4);
  };

  return (
    <PageWrapper className="min-h-[90vh] flex items-center justify-center p-6 bg-bg-primary">
      <div className="w-full max-w-2xl">
        
        {/* Step Indicators */}
        <div className="flex items-center justify-between mb-8 relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border-subtle -z-10 -translate-y-1/2" />
          <div className="absolute top-1/2 left-0 h-0.5 bg-brand-indigo -z-10 -translate-y-1/2 transition-all duration-500" 
            style={{ width: `${((step - 1) / 2) * 100}%` }} 
          />
          
          {[1, 2, 3].map((num) => (
            <div key={num} className="flex flex-col items-center space-y-2">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 shadow-sm",
                step > num ? "bg-success text-white" : step === num ? "bg-brand-indigo text-white ring-4 ring-brand-indigo/20" : "bg-bg-secondary text-text-muted border border-border-default"
              )}>
                {step > num ? <CheckCircle2 className="w-6 h-6" /> : num}
              </div>
              <span className={cn(
                "text-xs font-semibold",
                step >= num ? "text-text-primary" : "text-text-muted"
              )}>
                {num === 1 ? "Resume" : num === 2 ? "GitHub" : "Portfolio"}
              </span>
            </div>
          ))}
        </div>

        {/* Content Area */}
        <motion.div
          variants={fadeUp}
          initial="initial"
          animate="animate"
          className="bg-bg-secondary rounded-3xl p-8 md:p-12 shadow-xl border border-border-default min-h-[400px] flex flex-col justify-center"
        >
          <AnimatePresence mode="wait">
            
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col items-center text-center space-y-6"
              >
                <div className="w-16 h-16 rounded-2xl bg-brand-indigo/10 flex items-center justify-center">
                  <FileText className="w-8 h-8 text-brand-indigo" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-2xl text-text-primary mb-2">Upload Your Resume</h2>
                  <p className="text-text-secondary">We&apos;ll parse your PDF to extract your skills and background.</p>
                </div>

                {!isUploading ? (
                  <label className="w-full relative group cursor-pointer">
                    <div className="border-2 border-dashed border-border-strong rounded-2xl p-10 hover:bg-bg-tertiary hover:border-brand-indigo transition-all flex flex-col items-center justify-center space-y-3">
                      <UploadCloud className="w-10 h-10 text-text-muted group-hover:text-brand-indigo transition-colors" />
                      <p className="font-bold text-text-secondary group-hover:text-brand-indigo">Drop your PDF resume here or click to browse</p>
                      <p className="text-xs text-text-muted">File size limit: 5MB</p>
                    </div>
                    <input type="file" accept=".pdf" className="hidden" onChange={handleFileUpload} />
                  </label>
                ) : (
                  <div className="py-12">
                    <LoadingSpinner size="lg" text="Parsing resume..." />
                  </div>
                )}
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col space-y-6 w-full max-w-md mx-auto text-center"
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-brand-violet/10 flex items-center justify-center">
                  <Github className="w-8 h-8 text-brand-violet" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-2xl text-text-primary mb-2">Connect GitHub</h2>
                  <p className="text-text-secondary">We analyze your project evolution and code authenticity.</p>
                </div>

                {!isUploading ? (
                  <form onSubmit={handleGitHubSubmit} className="space-y-4 text-left">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-text-secondary pl-1">GitHub URL</label>
                      <input
                        type="url"
                        required
                        placeholder="https://github.com/yourusername"
                        className="w-full px-4 py-3 rounded-xl border border-border-default bg-bg-primary focus:border-brand-violet focus:ring-1 focus:ring-brand-violet outline-none transition-all text-sm"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center space-x-2 py-3.5 bg-brand-violet hover:bg-[#6D28D9] text-white rounded-xl font-bold shadow-md transition-all"
                    >
                      <span>Analyze GitHub &rarr;</span>
                    </button>
                    <button type="button" onClick={() => setStep(3)} className="w-full py-2 text-sm font-semibold text-text-muted hover:text-text-primary transition-colors">
                      Skip for now
                    </button>
                  </form>
                ) : (
                  <div className="py-12">
                    <LoadingSpinner size="lg" text="Analyzing repositories..." />
                  </div>
                )}
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col space-y-6 w-full max-w-md mx-auto text-center"
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-brand-cyan/10 flex items-center justify-center">
                  <Globe className="w-8 h-8 text-brand-cyan" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-2xl text-text-primary mb-2">Portfolio Links</h2>
                  <p className="text-text-secondary">Optional: Link your live projects or personal website.</p>
                </div>

                <form onSubmit={handlePortfolioSubmit} className="space-y-4 text-left">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-text-secondary pl-1">Portfolio URL</label>
                    <input
                      type="url"
                      placeholder="https://yourwebsite.dev"
                      className="w-full px-4 py-3 rounded-xl border border-border-default bg-bg-primary focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan outline-none transition-all text-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center space-x-2 py-3.5 bg-brand-cyan hover:bg-[#0891B2] text-white rounded-xl font-bold shadow-md transition-all"
                  >
                    <span>Complete Upload &rarr;</span>
                  </button>
                </form>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center space-y-8 py-4"
              >
                <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center border-4 border-success/20">
                  <CheckCircle2 className="w-10 h-10 text-success" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-3xl text-text-primary mb-3">Upload Complete!</h2>
                  <p className="text-text-secondary max-w-sm mx-auto">
                    Your profile has been parsed. You are now ready for the AI Capability Interview.
                  </p>
                </div>
                
                <button
                  onClick={() => router.push("/interview")}
                  className="px-8 py-4 bg-brand-gradient text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-glow hover:-translate-y-1 transition-all flex items-center space-x-2"
                >
                  <span>Start AI Interview</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </motion.div>
      </div>
    </PageWrapper>
  );
}

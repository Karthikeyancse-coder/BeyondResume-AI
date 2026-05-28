"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link2, FileUp, Upload, CheckCircle2, X, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface CompanyVerifyFormProps {
  onSubmit: (method: "linkedin" | "document", value: string) => void;
  isLoading?: boolean;
  canSubmit?: boolean;
}

export default function CompanyVerifyForm({ onSubmit, isLoading, canSubmit = true }: CompanyVerifyFormProps) {
  const [method, setMethod] = useState<"linkedin" | "document" | null>(null);
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (file: File | null) => {
    if (!file) return;
    if (file.type !== "application/pdf") {
      alert("Only PDF files are accepted.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("File must be under 5MB.");
      return;
    }
    setFileName(file.name);
  };

  const handleSubmit = () => {
    if (method === "linkedin" && linkedinUrl.trim()) {
      onSubmit("linkedin", linkedinUrl.trim());
    } else if (method === "document" && fileName) {
      // 🔴 TODO: Upload file to storage and pass URL
      onSubmit("document", fileName);
    }
  };

  const isSubmitEnabled = canSubmit && (method === "linkedin" ? linkedinUrl.trim().length > 0 : method === "document" ? !!fileName : false);

  return (
    <div className="space-y-6">

      <p className="text-sm text-gray-600 dark:text-white/60 font-medium">
        To verify your company, choose <span className="text-brand-indigo dark:text-[#00C6FF] font-bold">ONE</span> method:
      </p>

      {/* Option A — LinkedIn */}
      <motion.div
        onClick={() => setMethod("linkedin")}
        className={cn(
          "p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200",
          method === "linkedin"
            ? "border-brand-indigo bg-brand-indigo/5 dark:bg-brand-indigo/10 shadow-md"
            : "border-gray-200 dark:border-white/10 hover:border-brand-indigo/30 hover:bg-gray-50 dark:hover:bg-white/5"
        )}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className={cn(
            "w-8 h-8 rounded-lg flex items-center justify-center",
            method === "linkedin" ? "bg-brand-indigo text-white" : "bg-gray-100 dark:bg-white/10 text-gray-400"
          )}>
            <Link2 className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-gray-900 dark:text-white text-sm">Option A — LinkedIn Company Page</p>
            <p className="text-xs text-gray-500 dark:text-white/50">We verify the company exists on LinkedIn and is active.</p>
          </div>
          {method === "linkedin" && <CheckCircle2 className="w-5 h-5 text-brand-indigo" />}
        </div>

        <AnimatePresence>
          {method === "linkedin" && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="relative mt-2">
                <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="url"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  placeholder="linkedin.com/company/techcorp"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-sm font-medium text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-brand-indigo focus:ring-4 focus:ring-brand-indigo/20 outline-none transition-all"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Option B — Document Upload */}
      <motion.div
        onClick={() => setMethod("document")}
        className={cn(
          "p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200",
          method === "document"
            ? "border-brand-indigo bg-brand-indigo/5 dark:bg-brand-indigo/10 shadow-md"
            : "border-gray-200 dark:border-white/10 hover:border-brand-indigo/30 hover:bg-gray-50 dark:hover:bg-white/5"
        )}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className={cn(
            "w-8 h-8 rounded-lg flex items-center justify-center",
            method === "document" ? "bg-brand-indigo text-white" : "bg-gray-100 dark:bg-white/10 text-gray-400"
          )}>
            <FileUp className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-gray-900 dark:text-white text-sm">Option B — Upload Business Document</p>
            <p className="text-xs text-gray-500 dark:text-white/50">Business registration, GST certificate, or company letterhead.</p>
          </div>
          {method === "document" && <CheckCircle2 className="w-5 h-5 text-brand-indigo" />}
        </div>

        <AnimatePresence>
          {method === "document" && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <input
                ref={fileRef}
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
              />

              {fileName ? (
                <div className="mt-2 flex items-center gap-3 p-3 rounded-xl bg-success/10 border border-success/20">
                  <FileText className="w-5 h-5 text-success" />
                  <span className="text-sm font-medium text-success flex-1 truncate">{fileName}</span>
                  <button
                    onClick={(e) => { e.stopPropagation(); setFileName(null); }}
                    className="p-1 rounded-lg hover:bg-success/20 text-success transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setDragOver(false);
                    handleFileChange(e.dataTransfer.files?.[0] || null);
                  }}
                  onClick={(e) => { e.stopPropagation(); fileRef.current?.click(); }}
                  className={cn(
                    "mt-2 p-6 rounded-xl border-2 border-dashed text-center cursor-pointer transition-all",
                    dragOver
                      ? "border-brand-indigo bg-brand-indigo/5"
                      : "border-gray-300 dark:border-white/15 hover:border-brand-indigo/50"
                  )}
                >
                  <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm font-medium text-gray-600 dark:text-white/60">
                    Drop PDF here or <span className="text-brand-indigo dark:text-[#00C6FF]">click to browse</span>
                  </p>
                  <p className="text-xs text-gray-400 dark:text-white/30 mt-1">PDF only, max 5MB</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={!isSubmitEnabled || isLoading}
        className={cn(
          "w-full py-4 rounded-2xl font-bold text-white transition-all flex items-center justify-center gap-2",
          isSubmitEnabled && !isLoading
            ? "bg-brand-gradient shadow-lg shadow-brand-indigo/25 hover:shadow-glow hover:-translate-y-0.5"
            : "bg-gray-300 dark:bg-white/10 cursor-not-allowed"
        )}
      >
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            <span>Submit for Verification</span>
            <span>→</span>
          </>
        )}
      </button>

      <p className="text-xs text-center text-gray-400 dark:text-white/30">
        Document reviews are completed within 24 hours.
      </p>
    </div>
  );
}

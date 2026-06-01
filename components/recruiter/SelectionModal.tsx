"use client";

import { useState } from "react";
import { X, Send, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface SelectionModalProps {
  candidateName: string;
  candidateId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function SelectionModal({ candidateName, candidateId, isOpen, onClose }: SelectionModalProps) {
  const router = useRouter();
  const [selectedJob, setSelectedJob] = useState("");
  const [message, setMessage] = useState(`Hi ${candidateName.split(' ')[0]},\n\nWe reviewed your profile and were extremely impressed by your technical skills and project portfolio. We would love to move forward with you for this role.\n\nAre you available for a brief introductory call this week?`);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const mockJobs = [
    { id: "job_1", title: "Senior Backend Engineer" },
    { id: "job_2", title: "Full Stack Developer" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) {
      toast.error("Please select a job role first.");
      return;
    }
    
    setIsSubmitting(true);
    
    // 🔴 TODO: REPLACE WITH API CALL → POST /api/recruiter/select-candidate
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success(`${candidateName} has been selected! They will receive a notification.`);
      onClose();
      // Redirect to pipeline or messages? The prompt says it could go to Pipeline Board.
      router.push("/recruiter/pipeline");
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-bg-secondary border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/5 bg-bg-secondary/50">
          <h2 className="text-xl font-semibold text-text-primary flex items-center gap-2">
            <span className="text-2xl">⭐</span> Select Candidate
          </h2>
          <button 
            onClick={onClose}
            className="p-1 text-text-tertiary hover:text-text-primary transition-colors rounded-lg hover:bg-white/5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">
                Select Job Role
              </label>
              <select 
                value={selectedJob}
                onChange={(e) => setSelectedJob(e.target.value)}
                className="w-full bg-bg-primary border border-white/10 rounded-xl p-3 text-text-primary focus:outline-none focus:border-brand-indigo transition-colors appearance-none cursor-pointer"
              >
                <option value="" disabled>Select a job...</option>
                {mockJobs.map(job => (
                  <option key={job.id} value={job.id}>{job.title}</option>
                ))}
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-text-secondary">
                  Initial Message to Candidate
                </label>
                <button type="button" className="text-[10px] text-brand-cyan flex items-center gap-1 hover:underline">
                  <Sparkles className="w-3 h-3" /> AI Generate
                </button>
              </div>
              <textarea 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                className="w-full bg-bg-primary border border-white/10 rounded-xl p-3 text-text-primary focus:outline-none focus:border-brand-indigo transition-colors resize-none text-sm leading-relaxed"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="p-5 border-t border-white/5 bg-bg-secondary/50 flex justify-end gap-3">
            <button 
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 text-sm font-medium bg-brand-indigo hover:bg-brand-violet text-white rounded-xl transition-colors shadow-lg shadow-brand-indigo/20 flex items-center gap-2 disabled:opacity-70"
            >
              {isSubmitting ? (
                <>Sending...</>
              ) : (
                <>
                  <Send className="w-4 h-4" /> Send Selection Notice
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

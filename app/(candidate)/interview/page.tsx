"use client";

import { motion } from "framer-motion";
import { mockCompanyInterviews } from "@/lib/mock-data";
import { Building2 } from "lucide-react";
import InterviewCard from "@/components/interview/InterviewCard";
import PageWrapper from "@/components/layout/PageWrapper";

export default function InterviewDashboard() {
  const approvedInterviews = mockCompanyInterviews.filter(i => i.status === "Approved");

  return (
    <PageWrapper className="p-6 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4"
      >
        <div>
          <h1 className="font-display font-bold text-3xl text-text-primary mb-2">My Interviews</h1>
          <p className="text-text-secondary text-lg">
            Manage and attend your scheduled company interviews.
          </p>
        </div>
        
        {/* We can add filters or tabs here if needed */}
        <div className="flex space-x-2 bg-bg-secondary p-1 rounded-lg border border-border-subtle">
          <button className="px-4 py-2 bg-brand-indigo/10 text-brand-indigo rounded-md text-sm font-semibold">
            Upcoming
          </button>
          <button className="px-4 py-2 text-text-muted hover:text-text-primary rounded-md text-sm font-medium transition-colors">
            Completed
          </button>
        </div>
      </motion.div>

      {/* Main Content */}
      {approvedInterviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {approvedInterviews.map((interview, idx) => (
            <InterviewCard key={interview.id} interview={interview} index={idx} />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center p-12 bg-bg-secondary rounded-2xl border border-border-default border-dashed text-center min-h-[40vh]"
        >
          <div className="w-16 h-16 bg-bg-tertiary rounded-full flex items-center justify-center mb-4">
            <Building2 className="w-8 h-8 text-text-muted" />
          </div>
          <h3 className="text-xl font-bold text-text-primary mb-2">No Upcoming Interviews</h3>
          <p className="text-text-secondary max-w-md">
            You don&apos;t have any pending interviews right now. Keep applying to jobs or check back later!
          </p>
        </motion.div>
      )}
    </PageWrapper>
  );
}

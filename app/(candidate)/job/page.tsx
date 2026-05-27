"use client";

import { motion } from "framer-motion";
import { mockRecommendedJobs } from "@/lib/mock-data";
import { Building2, MapPin, DollarSign, Clock, CheckCircle2, AlertCircle, ArrowRight, Sparkles } from "lucide-react";

export default function RecommendedJobsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-brand-gradient p-8 text-white"
      >
        <div className="relative z-10">
          <div className="flex items-center space-x-2 mb-2">
            <Sparkles className="w-5 h-5 text-brand-cyan" />
            <h1 className="text-3xl font-display font-bold">Recommended Jobs</h1>
          </div>
          <p className="text-white/80 max-w-2xl text-lg">
            Based on your AI Capability Interview and profile analysis, we&apos;ve found these roles that perfectly align with your skills and growth potential.
          </p>
        </div>
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-brand-cyan/20 rounded-full blur-2xl" />
      </motion.div>

      {/* Jobs List */}
      <div className="space-y-6">
        {mockRecommendedJobs.map((job, index) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-bg-secondary rounded-2xl border border-border-subtle p-6 hover:shadow-md transition-shadow relative overflow-hidden group"
          >
            {/* Match Score Badge */}
            <div className="absolute top-6 right-6 flex items-center space-x-3">
              <div className="text-right">
                <div className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-0.5">Match Score</div>
                <div className={`text-2xl font-bold ${
                  job.matchScore >= 90 ? "text-success" :
                  job.matchScore >= 75 ? "text-brand-indigo" :
                  "text-warning"
                }`}>
                  {job.matchScore}%
                </div>
              </div>
            </div>

            <div className="flex items-start gap-6">
              {/* Company Logo */}
              <div className="w-16 h-16 rounded-xl bg-bg-tertiary flex items-center justify-center text-2xl font-bold text-text-secondary border border-border-default shrink-0">
                {job.logo}
              </div>

              <div className="flex-1 space-y-4 pr-32">
                {/* Job Title & Company */}
                <div>
                  <h2 className="text-xl font-bold text-text-primary group-hover:text-brand-indigo transition-colors">{job.title}</h2>
                  <div className="flex items-center text-text-secondary mt-1 space-x-2">
                    <Building2 className="w-4 h-4" />
                    <span>{job.company}</span>
                    <span className="text-border-default">•</span>
                    <span className="text-xs">{job.postedAt}</span>
                  </div>
                </div>

                {/* Job Details Row */}
                <div className="flex flex-wrap gap-4 text-sm text-text-muted">
                  <div className="flex items-center space-x-1.5 bg-bg-tertiary px-3 py-1 rounded-full border border-border-subtle">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center space-x-1.5 bg-bg-tertiary px-3 py-1 rounded-full border border-border-subtle">
                    <DollarSign className="w-3.5 h-3.5" />
                    <span>{job.salary}</span>
                  </div>
                  <div className="flex items-center space-x-1.5 bg-bg-tertiary px-3 py-1 rounded-full border border-border-subtle">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{job.type}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border-subtle/50">
                  {/* Why it's a match */}
                  <div>
                    <h4 className="text-sm font-semibold text-text-primary mb-2 flex items-center">
                      <CheckCircle2 className="w-4 h-4 text-success mr-1.5" />
                      Why it&apos;s a match
                    </h4>
                    <ul className="space-y-1">
                      {job.matchReasons.map((reason, i) => (
                        <li key={i} className="text-sm text-text-secondary flex items-start">
                          <span className="w-1.5 h-1.5 rounded-full bg-success/60 mt-1.5 mr-2 shrink-0" />
                          {reason}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Skills to grow */}
                  {job.missingSkills.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-text-primary mb-2 flex items-center">
                        <AlertCircle className="w-4 h-4 text-warning mr-1.5" />
                        Skills to grow
                      </h4>
                      <ul className="space-y-1">
                        {job.missingSkills.map((skill, i) => (
                          <li key={i} className="text-sm text-text-secondary flex items-start">
                            <span className="w-1.5 h-1.5 rounded-full bg-warning/60 mt-1.5 mr-2 shrink-0" />
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="pt-4 flex items-center justify-end">
                  <button className="flex items-center space-x-2 bg-brand-indigo hover:bg-brand-violet text-white px-5 py-2 rounded-lg font-medium transition-colors shadow-sm">
                    <span>Apply with BeyondResume</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

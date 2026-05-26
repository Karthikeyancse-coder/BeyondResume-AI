"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageWrapper from "@/components/layout/PageWrapper";
import { fadeUp, staggerContainer, slideInRight } from "@/lib/animations";
import { mockCandidatesForRecruiter, mockScoreBreakdown } from "@/lib/mock-data";
import { Search, Plus, Filter, AlertTriangle, CheckCircle2, ChevronRight, X, Download } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function RecruiterDashboard() {
  const [search, setSearch] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState<any | null>(null);

  const filteredCandidates = mockCandidatesForRecruiter.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PageWrapper className="min-h-screen p-6 md:p-10 max-w-[1400px] mx-auto flex flex-col">
      <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-8 flex-1">
        
        {/* Header */}
        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display font-bold text-3xl text-text-primary">Recruiter Intelligence</h1>
            <p className="text-text-secondary mt-1">Confidently evaluate candidates based on authentic capability.</p>
          </div>
          <Link
            href="/recruiter/post-job"
            className="inline-flex items-center space-x-2 bg-brand-indigo text-white px-5 py-2.5 rounded-xl font-bold shadow-sm hover:bg-brand-violet transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Post New Job</span>
          </Link>
        </motion.div>

        {/* Stats Row */}
        <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Candidates", value: "12", color: "text-text-primary" },
            { label: "High Trust Match", value: "8", color: "text-success" },
            { label: "Risk Flags", value: "2", color: "text-danger" },
            { label: "Shortlisted", value: "3", color: "text-brand-indigo" },
          ].map((stat, i) => (
            <div key={i} className="bg-bg-secondary p-5 rounded-2xl border border-border-default shadow-sm">
              <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">{stat.label}</p>
              <p className={cn("text-3xl font-display font-bold mt-2", stat.color)}>{stat.value}</p>
            </div>
          ))}
        </motion.div>

        {/* Filter/Search */}
        <motion.div variants={fadeUp} className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="text"
              placeholder="Search candidates by name or role..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border-default bg-bg-secondary focus:border-brand-indigo focus:ring-1 focus:ring-brand-indigo outline-none transition-all text-sm"
            />
          </div>
          <button className="w-full md:w-auto flex items-center justify-center space-x-2 px-4 py-2.5 bg-bg-secondary border border-border-default rounded-xl text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-colors text-sm font-semibold">
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </motion.div>

        {/* Layout with Side Panel */}
        <div className="flex gap-6 relative flex-1">
          {/* Table Area */}
          <motion.div variants={fadeUp} className="flex-1 bg-bg-secondary border border-border-default rounded-2xl shadow-sm overflow-hidden h-fit">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-bg-tertiary border-b border-border-default">
                  <tr>
                    <th className="px-6 py-4 font-bold text-text-secondary">Candidate</th>
                    <th className="px-6 py-4 font-bold text-text-secondary">Capability</th>
                    <th className="px-6 py-4 font-bold text-text-secondary">Authenticity</th>
                    <th className="px-6 py-4 font-bold text-text-secondary">Alignment</th>
                    <th className="px-6 py-4 font-bold text-text-secondary">Final Match</th>
                    <th className="px-6 py-4 font-bold text-text-secondary">Risk Level</th>
                    <th className="px-6 py-4 font-bold text-text-secondary">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle">
                  {filteredCandidates.map((c) => (
                    <tr 
                      key={c.id} 
                      onClick={() => setSelectedCandidate(c)}
                      className={cn(
                        "hover:bg-bg-tertiary/50 transition-colors cursor-pointer group",
                        selectedCandidate?.id === c.id && "bg-brand-indigo/5"
                      )}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-brand-gradient flex items-center justify-center text-white font-bold text-xs shrink-0">
                            {c.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-text-primary group-hover:text-brand-indigo transition-colors">{c.name}</p>
                            <p className="text-xs text-text-muted">{c.role}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4"><span className="font-semibold text-text-secondary">{c.capabilityScore}</span></td>
                      <td className="px-6 py-4"><span className="font-semibold text-text-secondary">{c.authenticityScore}</span></td>
                      <td className="px-6 py-4"><span className="font-semibold text-text-secondary">{c.alignmentScore}</span></td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "inline-flex items-center justify-center w-10 h-10 rounded-full font-bold",
                          c.finalScore >= 80 ? "bg-success/20 text-success" :
                          c.finalScore >= 70 ? "bg-warning/20 text-warning" : "bg-danger/20 text-danger"
                        )}>
                          {c.finalScore}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {c.riskLevel === "low" ? (
                          <span className="inline-flex items-center space-x-1 text-success text-xs font-bold px-2.5 py-1 bg-success/10 rounded-md">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>LOW</span>
                          </span>
                        ) : c.riskLevel === "medium" ? (
                          <span className="inline-flex items-center space-x-1 text-warning text-xs font-bold px-2.5 py-1 bg-warning/10 rounded-md">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            <span>MED</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center space-x-1 text-danger text-xs font-bold px-2.5 py-1 bg-danger/10 rounded-md border border-danger/20">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            <span>HIGH</span>
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <ChevronRight className="w-5 h-5 text-text-muted group-hover:text-brand-indigo transition-colors" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredCandidates.length === 0 && (
              <div className="p-8 text-center text-text-secondary">No candidates found matching your criteria.</div>
            )}
          </motion.div>

          {/* Side Panel (Desktop only for MVP simplicity, hides if none selected) */}
          <AnimatePresence>
            {selectedCandidate && (
              <motion.div
                initial={{ opacity: 0, x: 50, width: 0 }}
                animate={{ opacity: 1, x: 0, width: 380 }}
                exit={{ opacity: 0, x: 50, width: 0 }}
                className="hidden xl:block bg-bg-secondary border border-border-default rounded-2xl shadow-lg shrink-0 h-fit sticky top-24 overflow-hidden"
              >
                <div className="w-[380px] flex flex-col">
                  {/* Header */}
                  <div className="p-6 border-b border-border-default relative">
                    <button 
                      onClick={() => setSelectedCandidate(null)}
                      className="absolute top-4 right-4 p-1 rounded-md text-text-muted hover:bg-bg-tertiary hover:text-text-primary transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    <div className="flex items-center space-x-4">
                      <div className="w-14 h-14 rounded-full bg-brand-gradient flex items-center justify-center text-white font-bold text-xl shadow-md">
                        {selectedCandidate.name.charAt(0)}
                      </div>
                      <div>
                        <h2 className="font-bold text-xl text-text-primary">{selectedCandidate.name}</h2>
                        <p className="text-sm text-text-secondary">{selectedCandidate.role}</p>
                      </div>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6 space-y-6">
                    <div className="flex items-center justify-between p-4 bg-bg-tertiary rounded-xl border border-border-subtle">
                      <span className="font-semibold text-text-secondary">Final Match Score</span>
                      <span className="text-2xl font-display font-bold text-text-primary">{selectedCandidate.finalScore}/100</span>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-text-primary mb-3">AI Intelligence Summary</h4>
                      <div className="space-y-3">
                        <div className="flex items-start space-x-2">
                          <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                          <p className="text-sm text-text-secondary leading-snug">Strong architectural reasoning matches Senior level expectations.</p>
                        </div>
                        <div className="flex items-start space-x-2">
                          <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                          <p className="text-sm text-text-secondary leading-snug">GitHub activity is highly authentic with progressive complexity.</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border-default space-y-3">
                      <button className="w-full py-2.5 bg-brand-indigo text-white font-bold rounded-xl hover:bg-brand-violet transition-colors">
                        Shortlist Candidate
                      </button>
                      <button className="w-full py-2.5 flex items-center justify-center space-x-2 border border-border-strong text-text-secondary font-bold rounded-xl hover:bg-bg-tertiary transition-colors">
                        <Download className="w-4 h-4" />
                        <span>Download Full Report</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </motion.div>
    </PageWrapper>
  );
}

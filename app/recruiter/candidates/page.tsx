"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageWrapper from "@/components/layout/PageWrapper";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { mockCandidatesForRecruiter } from "@/lib/mock-data";
import {
  Search, Star, Download, X, AlertTriangle, CheckCircle2,
  ShieldCheck, FileText, Save, CheckCircle
} from "lucide-react";
import SelectionModal from "@/components/recruiter/SelectionModal";
import { cn } from "@/lib/utils";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer
} from "recharts";

type FilterType = "all" | "highTrust" | "flagged" | "shortlisted";
type SortType = "finalScore" | "capabilityScore" | "authenticityScore" | "newest";

export default function CandidatesPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const [sort, setSort] = useState<SortType>("finalScore");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [shortlisted, setShortlisted] = useState<Set<string>>(new Set(["c1"]));
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [currentNote, setCurrentNote] = useState("");
  const [isSelectionModalOpen, setIsSelectionModalOpen] = useState(false);

  const candidates = mockCandidatesForRecruiter
    .filter(c => {
      const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.role.toLowerCase().includes(search.toLowerCase());
      if (!matchSearch) return false;
      if (filter === "highTrust") return c.authenticityScore >= 80;
      if (filter === "flagged") return c.riskLevel === "high";
      if (filter === "shortlisted") return shortlisted.has(c.id);
      return true;
    })
    .sort((a, b) => {
      if (sort === "finalScore") return b.finalScore - a.finalScore;
      if (sort === "capabilityScore") return b.capabilityScore - a.capabilityScore;
      if (sort === "authenticityScore") return b.authenticityScore - a.authenticityScore;
      return 0;
    });

  const selected = mockCandidatesForRecruiter.find(c => c.id === selectedId) || null;

  const handleSelect = (id: string) => {
    setSelectedId(id);
    setCurrentNote(notes[id] || "");
  };

  const toggleShortlist = (id: string) => {
    setShortlisted(prev => {
      const n = new Set(prev);
      if (n.has(id)) {
        n.delete(id);
      } else {
        n.add(id);
      }
      return n;
    });
  };

  const saveNote = () => {
    if (selectedId) setNotes({ ...notes, [selectedId]: currentNote });
  };

  const radarData = selected ? [
    { axis: "Backend", value: selected.radar.backend },
    { axis: "Frontend", value: selected.radar.frontend },
    { axis: "System Design", value: selected.radar.systemDesign },
    { axis: "Problem Solving", value: selected.radar.problemSolving },
    { axis: "DevOps", value: selected.radar.devOps },
    { axis: "AI/ML", value: selected.radar.aiMl },
  ] : [];

  const filters: { key: FilterType; label: string; count?: number }[] = [
    { key: "all", label: "All", count: mockCandidatesForRecruiter.length },
    { key: "highTrust", label: "High Trust", count: mockCandidatesForRecruiter.filter(c => c.authenticityScore >= 80).length },
    { key: "flagged", label: "Flagged", count: mockCandidatesForRecruiter.filter(c => c.riskLevel === "high").length },
    { key: "shortlisted", label: "Shortlisted", count: shortlisted.size },
  ];

  return (
    <PageWrapper className="min-h-screen p-4 md:p-6 max-w-[1600px] mx-auto flex flex-col">
      <motion.div variants={staggerContainer} initial="initial" animate="animate" className="flex-1 flex flex-col gap-6">

        {/* Header */}
        <motion.div variants={fadeUp}>
          <h1 className="font-display font-bold text-3xl text-text-primary">Candidate Management</h1>
          <p className="text-text-secondary mt-1">Deep-dive into candidate profiles, scores, and AI insights.</p>
        </motion.div>

        {/* Two Panel Layout */}
        <div className="flex gap-6 flex-1 min-h-0">

          {/* ── LEFT PANEL ── */}
          <motion.div variants={fadeUp} className="w-full lg:w-[420px] xl:w-[460px] shrink-0 flex flex-col gap-4">

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
              <input
                type="text" placeholder="Search candidates..."
                value={search} onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border-default bg-bg-secondary focus:border-brand-indigo outline-none text-sm"
              />
            </div>

            {/* Filter Chips */}
            <div className="flex gap-2 flex-wrap">
              {filters.map(f => (
                <button key={f.key} onClick={() => setFilter(f.key)}
                  className={cn("px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors",
                    filter === f.key ? "bg-brand-indigo text-white border-brand-indigo" : "bg-bg-secondary text-text-secondary border-border-default hover:border-brand-indigo")}>
                  {f.label} <span className="ml-1 opacity-70">({f.count})</span>
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-text-muted font-bold">Sort by:</span>
              <select value={sort} onChange={(e) => setSort(e.target.value as SortType)}
                className="text-xs bg-bg-secondary border border-border-default rounded-lg px-2 py-1.5 text-text-primary outline-none focus:border-brand-indigo">
                <option value="finalScore">Final Score</option>
                <option value="capabilityScore">Capability</option>
                <option value="authenticityScore">Authenticity</option>
              </select>
            </div>

            {/* Candidate List */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {candidates.map(c => (
                <button key={c.id} onClick={() => handleSelect(c.id)}
                  className={cn("w-full text-left p-4 rounded-2xl border transition-all group",
                    selectedId === c.id ? "bg-brand-indigo/5 border-brand-indigo shadow-sm border-l-4" : "bg-bg-secondary border-border-default hover:border-brand-indigo/50")}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-gradient flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {c.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-text-primary text-sm truncate">{c.name}</p>
                        {shortlisted.has(c.id) && <Star className="w-3.5 h-3.5 text-brand-indigo fill-brand-indigo shrink-0" />}
                      </div>
                      <p className="text-xs text-text-muted truncate">{c.role}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={cn("text-xs font-bold px-2 py-1 rounded-md",
                        c.finalScore >= 80 ? "bg-success/10 text-success" :
                        c.finalScore >= 70 ? "bg-warning/10 text-warning" : "bg-danger/10 text-danger")}>
                        {c.finalScore}
                      </span>
                      <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded uppercase",
                        c.riskLevel === "low" ? "bg-success/10 text-success" :
                        c.riskLevel === "medium" ? "bg-warning/10 text-warning" : "bg-danger/10 text-danger border border-danger/20")}>
                        {c.riskLevel}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
              {candidates.length === 0 && <div className="text-center text-text-muted py-8 text-sm">No candidates found.</div>}
            </div>
          </motion.div>

          {/* ── RIGHT PANEL ── */}
          <AnimatePresence mode="wait">
            {selected ? (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ duration: 0.3 }}
                className="hidden lg:flex flex-1 flex-col bg-bg-secondary rounded-2xl border border-border-default shadow-sm overflow-y-auto"
              >
                {/* Section A — Header */}
                <div className="p-6 border-b border-border-default">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-brand-gradient flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                        {selected.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="font-display font-bold text-2xl text-text-primary">{selected.name}</h2>
                          {selected.isVerified && <span className="flex items-center gap-1 bg-success/10 text-success text-[10px] font-bold px-2 py-0.5 rounded-md"><ShieldCheck className="w-3 h-3" />Verified</span>}
                        </div>
                        <p className="text-text-secondary">{selected.role}</p>
                      </div>
                    </div>
                    <button onClick={() => setSelectedId(null)} className="p-2 rounded-lg text-text-muted hover:bg-bg-tertiary"><X className="w-5 h-5" /></button>
                  </div>

                  {/* Score Badges */}
                  <div className="grid grid-cols-4 gap-3">
                    {[
                      { label: "Capability", score: selected.capabilityScore, color: "text-brand-indigo" },
                      { label: "Authenticity", score: selected.authenticityScore, color: "text-brand-cyan" },
                      { label: "Alignment", score: selected.alignmentScore, color: "text-brand-violet" },
                      { label: "Growth", score: selected.growthScore, color: "text-success" },
                    ].map((s, i) => (
                      <div key={i} className="bg-bg-tertiary p-3 rounded-xl border border-border-subtle text-center">
                        <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider">{s.label}</p>
                        <p className={cn("text-2xl font-bold mt-1", s.color)}>{s.score}</p>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-4">
                    <button onClick={() => toggleShortlist(selected.id)}
                      className={cn("flex-1 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all",
                        shortlisted.has(selected.id) ? "bg-brand-indigo text-white" : "bg-bg-tertiary text-text-primary border border-border-default hover:border-brand-indigo")}>
                      <Star className={cn("w-4 h-4", shortlisted.has(selected.id) && "fill-white")} />
                      {shortlisted.has(selected.id) ? "Shortlisted" : "Shortlist"}
                    </button>
                    <button className="flex-1 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 bg-bg-tertiary text-text-primary border border-border-default hover:border-brand-indigo transition-all">
                      <Download className="w-4 h-4" />Resume
                    </button>
                    <button onClick={() => setIsSelectionModalOpen(true)} className="flex-1 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 bg-brand-gradient text-white shadow-sm hover:shadow-glow transition-all">
                      <CheckCircle className="w-4 h-4" />Select for Role
                    </button>
                  </div>
                </div>

                <div className="p-6 space-y-8 flex-1">

                  {/* Section B — Radar Chart */}
                  <div>
                    <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">Capability Radar</h3>
                    <div className="bg-bg-primary rounded-2xl border border-border-subtle p-4" style={{ height: 280 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="75%">
                          <PolarGrid stroke="var(--border-default)" />
                          <PolarAngleAxis dataKey="axis" tick={{ fill: "var(--text-muted)", fontSize: 11, fontWeight: 600 }} />
                          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                          <Radar name="Score" dataKey="value" stroke="var(--brand-indigo)" fill="var(--brand-indigo)" fillOpacity={0.25} strokeWidth={2} />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Section C — GitHub Intelligence */}
                  <div>
                    <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">GitHub Intelligence</h3>
                    <div className="space-y-3">
                      {[
                        { label: "Commit Consistency", value: selected.github.commitConsistency },
                        { label: "Project Evolution", value: selected.github.projectEvolution },
                        { label: "Debugging Maturity", value: selected.github.debuggingMaturity },
                        { label: "Architecture Growth", value: selected.github.architectureGrowth },
                      ].map((m, i) => (
                        <div key={i}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-bold text-text-secondary">{m.label}</span>
                            <span className="font-bold text-text-primary">{m.value}%</span>
                          </div>
                          <div className="w-full h-2 bg-bg-tertiary rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: `${m.value}%` }} transition={{ duration: 1, delay: i * 0.15 }}
                              className="h-full bg-brand-indigo rounded-full" />
                          </div>
                        </div>
                      ))}
                      <div className="mt-3">
                        <span className={cn("inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg",
                          selected.github.authenticityRisk <= 20 ? "bg-success/10 text-success" :
                          selected.github.authenticityRisk <= 50 ? "bg-warning/10 text-warning" : "bg-danger/10 text-danger")}>
                          <ShieldCheck className="w-3.5 h-3.5" />
                          {selected.github.authenticityRisk}% Risk — {selected.github.authenticityRisk <= 20 ? "ORIGINAL" : selected.github.authenticityRisk <= 50 ? "MODERATE" : "SUSPICIOUS"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Section D — AI Interview Summary */}
                  <div>
                    <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">AI Interview Summary</h3>
                    <div className="space-y-2">
                      {selected.interviewInsights.map((insight, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 bg-bg-primary rounded-xl border border-border-subtle">
                          <CheckCircle2 className={cn("w-4 h-4 shrink-0 mt-0.5", i < 2 ? "text-success" : "text-warning")} />
                          <p className="text-sm text-text-secondary leading-relaxed">{insight}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Section E — Risk Analysis */}
                  {selected.riskLevel !== "low" && selected.riskSignals.length > 0 && (
                    <div>
                      <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                        <AlertTriangle className="w-4 h-4 text-danger" />Risk Analysis
                      </h3>
                      {/* Trust Meter */}
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-bold text-text-secondary">Authenticity</span>
                          <span className="font-bold text-text-primary">{selected.authenticityScore}%</span>
                        </div>
                        <div className="w-full h-3 bg-bg-tertiary rounded-full overflow-hidden">
                          <div className={cn("h-full rounded-full transition-all", selected.authenticityScore >= 70 ? "bg-success" : selected.authenticityScore >= 40 ? "bg-warning" : "bg-danger")}
                            style={{ width: `${selected.authenticityScore}%` }} />
                        </div>
                      </div>
                      {/* Risk Signals */}
                      <div className="space-y-2">
                        {selected.riskSignals.map((signal: string, i: number) => (
                          <div key={i} className="flex items-start gap-3 p-3 bg-danger/5 border border-danger/20 rounded-xl">
                            <AlertTriangle className="w-4 h-4 text-danger shrink-0 mt-0.5" />
                            <p className="text-sm text-danger font-medium leading-relaxed">{signal}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Section F — Recruiter Notes */}
                  <div>
                    <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                      <FileText className="w-4 h-4" />Recruiter Notes
                    </h3>
                    <textarea
                      value={currentNote} onChange={(e) => setCurrentNote(e.target.value)}
                      placeholder="Add private notes about this candidate..."
                      rows={3}
                      className="w-full bg-bg-primary px-4 py-3 rounded-xl border border-border-default focus:border-brand-indigo outline-none text-sm text-text-primary resize-none leading-relaxed"
                    />
                    <button onClick={saveNote}
                      className="mt-2 px-4 py-2 bg-brand-indigo text-white font-bold text-sm rounded-xl hover:bg-brand-violet transition-colors flex items-center gap-2">
                      <Save className="w-4 h-4" />Save Note
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hidden lg:flex flex-1 items-center justify-center bg-bg-secondary rounded-2xl border border-border-default">
                <div className="text-center text-text-muted">
                  <Search className="w-12 h-12 mx-auto mb-4 opacity-30" />
                  <p className="font-bold text-lg">Select a Candidate</p>
                  <p className="text-sm mt-1">Click on any candidate from the list to view their detailed profile.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {selected && (
          <SelectionModal 
            isOpen={isSelectionModalOpen}
            onClose={() => setIsSelectionModalOpen(false)}
            candidateId={selected.id}
            candidateName={selected.name}
          />
        )}
      </motion.div>
    </PageWrapper>
  );
}

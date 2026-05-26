"use client";

import { motion } from "framer-motion";
import PageWrapper from "@/components/layout/PageWrapper";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { mockAnalytics } from "@/lib/mock-data";
import { TrendingUp, TrendingDown, ArrowRight, BrainCircuit } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ScatterChart, Scatter, ZAxis,
  PieChart, Pie, Cell, Legend,
  AreaChart, Area,
} from "recharts";

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ payload: { name: string; capability: number; authenticity: number } }>;
}

// Custom tooltip for scatter
const ScatterTooltip = ({ active, payload }: TooltipProps) => {
  if (active && payload?.length) {
    const d = payload[0].payload;
    return (
      <div className="bg-bg-secondary px-3 py-2 rounded-lg border border-border-default shadow-lg text-xs">
        <p className="font-bold text-text-primary">{d.name}</p>
        <p className="text-text-muted">Capability: {d.capability}</p>
        <p className="text-text-muted">Authenticity: {d.authenticity}</p>
      </div>
    );
  }
  return null;
};

const getScatterColor = (c: number, a: number) => {
  if (c > 70 && a > 70) return "#10B981";
  if (a < 40) return "#EF4444";
  return "#F59E0B";
};

const barColors: Record<string, string> = {
  "80-100": "var(--brand-indigo)",
  "60-80":  "var(--brand-cyan)",
  "40-60":  "#F59E0B",
  "20-40":  "#EF4444",
  "0-20":   "#EF4444",
};

const heatColor = (val: number) => {
  if (val >= 5) return "bg-danger/80 text-white";
  if (val >= 3) return "bg-warning/60 text-white";
  if (val >= 1) return "bg-brand-indigo/30 text-text-primary";
  return "bg-bg-tertiary text-text-muted";
};

export default function AnalyticsPage() {
  const { scoreDistribution, scatterData, riskBreakdown, weeklyTrend, skillGaps } = mockAnalytics;
  const totalCandidates = riskBreakdown.reduce((sum, r) => sum + r.value, 0);

  return (
    <PageWrapper className="min-h-screen p-6 md:p-10 max-w-[1400px] mx-auto">
      <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-8">

        {/* Header */}
        <motion.div variants={fadeUp}>
          <h1 className="font-display font-bold text-3xl text-text-primary">Recruiter Analytics</h1>
          <p className="text-text-secondary mt-1">Data-driven insights across all candidate evaluations.</p>
        </motion.div>

        {/* Section A — KPI Cards */}
        <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Evaluations", value: "24", trend: "up", trendVal: "+6 this week", color: "text-brand-indigo" },
            { label: "Verified Authentic", value: "18", trend: "up", trendVal: "+4 this week", color: "text-success" },
            { label: "High Risk Flagged", value: "3", trend: "down", trendVal: "-1 from last", color: "text-danger" },
            { label: "Avg Trust Score", value: "67%", trend: "neutral", trendVal: "Steady", color: "text-brand-cyan" },
          ].map((kpi, i) => (
            <div key={i} className="bg-bg-secondary p-5 rounded-2xl border border-border-default shadow-sm">
              <p className="text-xs font-bold text-text-muted uppercase tracking-wider">{kpi.label}</p>
              <p className={cn("text-3xl font-display font-bold mt-2", kpi.color)}>{kpi.value}</p>
              <div className="flex items-center gap-1 mt-2 text-xs">
                {kpi.trend === "up" && <TrendingUp className="w-3.5 h-3.5 text-success" />}
                {kpi.trend === "down" && <TrendingDown className="w-3.5 h-3.5 text-danger" />}
                {kpi.trend === "neutral" && <ArrowRight className="w-3.5 h-3.5 text-text-muted" />}
                <span className="text-text-muted font-medium">{kpi.trendVal}</span>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Section B — Row 1: Bar + Scatter */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Chart 1 — Score Distribution */}
          <motion.div variants={fadeUp} className="bg-bg-secondary p-6 rounded-2xl border border-border-default shadow-sm">
            <h3 className="font-display font-bold text-lg text-text-primary mb-6">Candidate Score Distribution</h3>
            <div style={{ height: 280 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={scoreDistribution} barCategoryGap="20%">
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" vertical={false} />
                  <XAxis dataKey="range" tick={{ fill: "var(--text-muted)", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "var(--text-muted)", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: "var(--bg-secondary)", border: "1px solid var(--border-default)", borderRadius: 8, fontSize: 12 }} />
                  <Bar dataKey="count" radius={[6, 6, 0, 0]} animationDuration={1200}>
                    {scoreDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={barColors[entry.range] || "var(--brand-indigo)"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Chart 2 — Scatter */}
          <motion.div variants={fadeUp} className="bg-bg-secondary p-6 rounded-2xl border border-border-default shadow-sm relative">
            <h3 className="font-display font-bold text-lg text-text-primary mb-6">Authenticity vs Capability Map</h3>
            {/* Quadrant Labels */}
            <div className="absolute top-16 left-10 text-[10px] font-bold text-text-muted opacity-50">Authentic but Developing</div>
            <div className="absolute top-16 right-10 text-[10px] font-bold text-success opacity-70">Genuine Talent ✓</div>
            <div className="absolute bottom-20 left-10 text-[10px] font-bold text-text-muted opacity-50">Needs Development</div>
            <div className="absolute bottom-20 right-10 text-[10px] font-bold text-danger opacity-70">Capable but Suspicious ⚠</div>
            <div style={{ height: 280 }}>
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" />
                  <XAxis type="number" dataKey="capability" name="Capability" domain={[0, 100]} tick={{ fill: "var(--text-muted)", fontSize: 11 }} axisLine={false} tickLine={false} label={{ value: "Capability →", position: "bottom", fill: "var(--text-muted)", fontSize: 11 }} />
                  <YAxis type="number" dataKey="authenticity" name="Authenticity" domain={[0, 100]} tick={{ fill: "var(--text-muted)", fontSize: 11 }} axisLine={false} tickLine={false} label={{ value: "Authenticity →", angle: -90, position: "left", fill: "var(--text-muted)", fontSize: 11 }} />
                  <ZAxis range={[120, 120]} />
                  <Tooltip content={<ScatterTooltip />} />
                  <Scatter data={scatterData} animationDuration={1500}>
                    {scatterData.map((entry, i) => (
                      <Cell key={`scatter-${i}`} fill={getScatterColor(entry.capability, entry.authenticity)} />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Section C — Row 2: Pie + Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Chart 3 — Pie */}
          <motion.div variants={fadeUp} className="bg-bg-secondary p-6 rounded-2xl border border-border-default shadow-sm">
            <h3 className="font-display font-bold text-lg text-text-primary mb-6">Candidate Trust Distribution</h3>
            <div style={{ height: 280 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={riskBreakdown} cx="50%" cy="45%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value" animationDuration={1200} label={({ name, value }) => `${name}: ${value}`} labelLine={false}>
                    {riskBreakdown.map((entry, i) => (
                      <Cell key={`pie-${i}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: "var(--bg-secondary)", border: "1px solid var(--border-default)", borderRadius: 8, fontSize: 12 }} />
                  <Legend verticalAlign="bottom" iconType="circle" formatter={(value: string) => <span className="text-xs font-bold text-text-secondary">{value}</span>} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center mt-2">
              <span className="text-sm font-bold text-text-muted">{totalCandidates} Total Candidates</span>
            </div>
          </motion.div>

          {/* Chart 4 — Area */}
          <motion.div variants={fadeUp} className="bg-bg-secondary p-6 rounded-2xl border border-border-default shadow-sm">
            <h3 className="font-display font-bold text-lg text-text-primary mb-6">Evaluations This Month</h3>
            <div style={{ height: 280 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyTrend}>
                  <defs>
                    <linearGradient id="totalGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--brand-indigo)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="var(--brand-indigo)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="trustGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--brand-cyan)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="var(--brand-cyan)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" vertical={false} />
                  <XAxis dataKey="week" tick={{ fill: "var(--text-muted)", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "var(--text-muted)", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: "var(--bg-secondary)", border: "1px solid var(--border-default)", borderRadius: 8, fontSize: 12 }} />
                  <Area type="monotone" dataKey="total" stroke="var(--brand-indigo)" fill="url(#totalGrad)" strokeWidth={2.5} animationDuration={1500} name="Total" />
                  <Area type="monotone" dataKey="highTrust" stroke="var(--brand-cyan)" fill="url(#trustGrad)" strokeWidth={2.5} animationDuration={1500} name="High Trust" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Section D — Skill Gap Heatmap */}
        <motion.div variants={fadeUp} className="bg-bg-secondary p-6 rounded-2xl border border-border-default shadow-sm">
          <h3 className="font-display font-bold text-lg text-text-primary mb-6">Most Common Skill Gaps Across Candidates</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left px-4 py-3 font-bold text-text-secondary border-b border-border-default">Skill</th>
                  <th className="text-center px-4 py-3 font-bold text-text-secondary border-b border-border-default">Low</th>
                  <th className="text-center px-4 py-3 font-bold text-text-secondary border-b border-border-default">Medium</th>
                  <th className="text-center px-4 py-3 font-bold text-text-secondary border-b border-border-default">High</th>
                  <th className="text-center px-4 py-3 font-bold text-text-secondary border-b border-border-default">Critical</th>
                </tr>
              </thead>
              <tbody>
                {skillGaps.map((row, i) => (
                  <tr key={i} className="border-b border-border-subtle">
                    <td className="px-4 py-3 font-bold text-text-primary">{row.skill}</td>
                    {["low", "medium", "high", "critical"].map((severity) => {
                      const val = row[severity as keyof typeof row] as number;
                      return (
                        <td key={severity} className="text-center px-4 py-3">
                          <span className={cn("inline-block w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm", heatColor(val))}>
                            {val}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Section E — AI Insight Summary */}
        <motion.div variants={fadeUp} className="bg-bg-secondary p-6 rounded-2xl border border-border-default shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-brand-gradient" />
          <h3 className="font-display font-bold text-lg text-text-primary mb-4 flex items-center gap-3">
            <BrainCircuit className="w-6 h-6 text-brand-indigo" />
            AI Insight Summary
          </h3>
          <div className="bg-bg-primary p-6 rounded-xl border border-border-subtle leading-relaxed text-text-secondary space-y-2">
            <p>This month, <strong className="text-text-primary">72%</strong> of candidates show authentic GitHub behavior.</p>
            <p>The most common skill gap is <strong className="text-text-primary">System Design at Scale</strong> (61% of candidates).</p>
            <p><strong className="text-danger">3 candidates</strong> flagged as high-risk were rejected before reaching interview.</p>
            <p>Average Final Match Score: <strong className="text-brand-indigo">74/100</strong>.</p>
          </div>
        </motion.div>

      </motion.div>
    </PageWrapper>
  );
}

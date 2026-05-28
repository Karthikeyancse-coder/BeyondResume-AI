"use client";

import { motion } from "framer-motion";
import PageWrapper from "@/components/layout/PageWrapper";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { mockRoadmap } from "@/lib/mock-data";
import { Map, AlertCircle, PlayCircle, Calendar, CheckSquare, Square } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import RoadmapChatbot from "@/components/roadmap/RoadmapChatbot";

export default function RoadmapPage() {
  const [completedSkills, setCompletedSkills] = useState<string[]>([]);

  const toggleSkill = (skill: string) => {
    setCompletedSkills((prev) => 
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  return (
    <PageWrapper className="min-h-screen p-6 md:p-10 max-w-7xl mx-auto pb-24">
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="space-y-10"
      >
        {/* Header */}
        <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border-default pb-8">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <Map className="w-8 h-8 text-brand-indigo" />
              <h1 className="font-display font-bold text-3xl text-text-primary">
                Your Personal Growth Roadmap
              </h1>
            </div>
            <p className="text-text-secondary text-lg">
              Estimated to close critical skill gaps: <span className="font-bold text-text-primary">{mockRoadmap.estimatedGrowthTime}</span>
            </p>
          </div>
          <div className="bg-bg-secondary border border-border-default px-6 py-3 rounded-2xl shadow-sm text-center">
            <p className="text-xs font-bold text-text-muted mb-1 uppercase tracking-widest">Progress</p>
            <p className="text-2xl font-display font-bold text-brand-indigo">
              {completedSkills.length} <span className="text-base text-text-secondary">/ {mockRoadmap.missingSkills.length}</span>
            </p>
          </div>
        </motion.div>

        {/* Section A: Missing Skills */}
        <motion.div variants={fadeUp} className="space-y-6">
          <h2 className="font-display font-bold text-2xl text-text-primary flex items-center space-x-2">
            <AlertCircle className="w-6 h-6 text-warning" />
            <span>Target Skills to Improve</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockRoadmap.missingSkills.map((item, idx) => {
              const isCompleted = completedSkills.includes(item.skill);
              return (
                <div 
                  key={idx} 
                  className={cn(
                    "p-6 rounded-2xl border transition-all cursor-pointer hover:shadow-md",
                    isCompleted ? "bg-bg-tertiary/50 border-border-subtle opacity-75" : "bg-bg-secondary border-border-default shadow-sm"
                  )}
                  onClick={() => toggleSkill(item.skill)}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className={cn(
                        "inline-block px-2 py-1 rounded text-[10px] font-bold mb-3 uppercase tracking-wider",
                        item.priority === "high" ? "bg-danger/10 text-danger" :
                        item.priority === "medium" ? "bg-warning/10 text-warning" :
                        "bg-success/10 text-success"
                      )}>
                        {item.priority} Priority
                      </span>
                      <h3 className={cn("font-bold text-lg mb-1", isCompleted ? "line-through text-text-muted" : "text-text-primary")}>
                        {item.skill}
                      </h3>
                      <p className="text-sm text-text-secondary">{item.reason}</p>
                    </div>
                    <button className="text-brand-indigo shrink-0">
                      {isCompleted ? <CheckSquare className="w-6 h-6 text-success" /> : <Square className="w-6 h-6 text-border-strong" />}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Section B: Recommended Projects */}
        <motion.div variants={fadeUp} className="space-y-6 pt-6">
          <h2 className="font-display font-bold text-2xl text-text-primary">
            Recommended Projects
          </h2>
          <p className="text-text-secondary">Build these specific projects to close your gaps and prove capability.</p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {mockRoadmap.recommendedProjects.map((project, idx) => (
              <div key={idx} className="flex flex-col bg-bg-secondary rounded-3xl border border-border-default overflow-hidden shadow-sm hover:-translate-y-1 transition-transform">
                <div className="p-6 flex-grow">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-brand-violet bg-brand-violet/10 px-2 py-1 rounded-md">
                      {project.duration}
                    </span>
                    <span className={cn(
                      "text-xs font-bold px-2 py-1 rounded-md",
                      project.difficulty === "hard" ? "text-danger bg-danger/10" : "text-warning bg-warning/10"
                    )}>
                      {project.difficulty.toUpperCase()}
                    </span>
                  </div>
                  <h3 className="font-bold text-xl text-text-primary mb-4 leading-tight">{project.name}</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span key={tech} className="text-xs font-semibold px-2.5 py-1 bg-bg-tertiary text-text-secondary rounded-full border border-border-subtle">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-4 border-t border-border-default bg-bg-primary">
                  <button className="w-full flex items-center justify-center space-x-2 py-2.5 bg-brand-indigo hover:bg-brand-violet text-white rounded-xl font-bold transition-colors">
                    <PlayCircle className="w-5 h-5" />
                    <span>Start Project</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Section C: Learning Sequence */}
        <motion.div variants={fadeUp} className="space-y-6 pt-6">
          <h2 className="font-display font-bold text-2xl text-text-primary">
            Learning Timeline
          </h2>
          
          <div className="relative pl-8 space-y-8 before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-brand-indigo before:via-brand-cyan before:to-border-subtle">
            
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-8 h-8 rounded-full border-4 border-bg-primary bg-brand-indigo text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative left-[-2rem] md:left-0">
                <Calendar className="w-3 h-3" />
              </div>
              <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] bg-bg-secondary p-5 rounded-2xl border border-border-default shadow-sm relative">
                <h3 className="font-bold text-brand-indigo mb-1">Week 1-2</h3>
                <p className="text-text-primary font-semibold">Redis Basics & Caching Layer</p>
              </div>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-8 h-8 rounded-full border-4 border-bg-primary bg-brand-cyan text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative left-[-2rem] md:left-0">
                <Calendar className="w-3 h-3" />
              </div>
              <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] bg-bg-secondary p-5 rounded-2xl border border-border-default shadow-sm relative">
                <h3 className="font-bold text-brand-cyan mb-1">Week 3-4</h3>
                <p className="text-text-primary font-semibold">Kubernetes Fundamentals</p>
              </div>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-8 h-8 rounded-full border-4 border-bg-primary bg-border-strong text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative left-[-2rem] md:left-0">
                <Calendar className="w-3 h-3" />
              </div>
              <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] bg-bg-secondary p-5 rounded-2xl border border-border-default shadow-sm relative">
                <h3 className="font-bold text-text-muted mb-1">Week 5-8</h3>
                <p className="text-text-primary font-semibold">System Design Practice & Mock Interviews</p>
              </div>
            </div>

          </div>
        </motion.div>

      </motion.div>
      <RoadmapChatbot />
    </PageWrapper>
  );
}

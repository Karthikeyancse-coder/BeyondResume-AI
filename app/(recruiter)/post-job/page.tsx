"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import PageWrapper from "@/components/layout/PageWrapper";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { CheckCircle2, ChevronRight, Tags } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PostJobPage() {
  const router = useRouter();
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState<string[]>(["Node.js", "PostgreSQL"]);
  const [isPublished, setIsPublished] = useState(false);

  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && skillInput.trim() !== "") {
      e.preventDefault();
      if (!skills.includes(skillInput.trim())) {
        setSkills([...skills, skillInput.trim()]);
      }
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPublished(true);
    setTimeout(() => {
      router.push("/recruiter/dashboard");
    }, 2000);
  };

  if (isPublished) {
    return (
      <PageWrapper className="min-h-[80vh] flex items-center justify-center p-6 bg-bg-primary">
        <motion.div variants={fadeUp} initial="initial" animate="animate" className="text-center">
          <div className="w-24 h-24 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-success" />
          </div>
          <h1 className="font-display font-bold text-3xl text-text-primary mb-2">Job Posted Successfully!</h1>
          <p className="text-text-secondary">Candidates are now being evaluated against your requirements.</p>
        </motion.div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper className="min-h-screen p-6 md:p-10 max-w-4xl mx-auto pb-24">
      <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-8">
        
        {/* Header */}
        <motion.div variants={fadeUp}>
          <div className="flex items-center space-x-2 text-sm font-semibold text-text-muted mb-4">
            <span>Dashboard</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-brand-indigo">Post a Job</span>
          </div>
          <h1 className="font-display font-bold text-3xl text-text-primary">Post a New Job</h1>
          <p className="text-text-secondary mt-1 max-w-2xl">
            The more detail you provide, the better our alignment engine works to find your perfect candidate.
          </p>
        </motion.div>

        <form onSubmit={handlePublish} className="space-y-8">
          {/* Section 1: Basic Info */}
          <motion.div variants={fadeUp} className="bg-bg-secondary p-8 rounded-3xl border border-border-default shadow-sm space-y-6">
            <h2 className="font-bold text-xl text-text-primary border-b border-border-subtle pb-4">Basic Information</h2>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-text-secondary">Job Title</label>
              <input required type="text" placeholder="e.g. Senior Backend Engineer" className="w-full px-4 py-3 rounded-xl border border-border-default bg-bg-primary focus:border-brand-indigo focus:ring-1 focus:ring-brand-indigo outline-none transition-all" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-text-secondary">Job Description</label>
              <textarea required rows={5} placeholder="Describe the role and responsibilities..." className="w-full px-4 py-3 rounded-xl border border-border-default bg-bg-primary focus:border-brand-indigo focus:ring-1 focus:ring-brand-indigo outline-none transition-all resize-none" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-text-secondary">Experience Level</label>
                <select className="w-full px-4 py-3 rounded-xl border border-border-default bg-bg-primary focus:border-brand-indigo outline-none transition-all appearance-none cursor-pointer">
                  <option value="any">Any Experience</option>
                  <option value="fresher">Fresher (0-1 yrs)</option>
                  <option value="mid">Mid-Level (2-4 yrs)</option>
                  <option value="senior">Senior (5+ yrs)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-text-secondary">Location</label>
                <div className="flex items-center space-x-4">
                  <input type="text" placeholder="e.g. San Francisco" className="flex-1 px-4 py-3 rounded-xl border border-border-default bg-bg-primary focus:border-brand-indigo outline-none transition-all" />
                  <label className="flex items-center space-x-2 cursor-pointer whitespace-nowrap">
                    <input type="checkbox" className="w-5 h-5 rounded text-brand-indigo focus:ring-brand-indigo" defaultChecked />
                    <span className="text-sm font-semibold text-text-secondary">Remote</span>
                  </label>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Section 2: Skills */}
          <motion.div variants={fadeUp} className="bg-bg-secondary p-8 rounded-3xl border border-border-default shadow-sm space-y-6">
            <h2 className="font-bold text-xl text-text-primary border-b border-border-subtle pb-4">Required Skills</h2>
            
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2 mb-2">
                {skills.map(skill => (
                  <span key={skill} className="flex items-center space-x-1 px-3 py-1.5 bg-brand-indigo/10 text-brand-indigo rounded-lg text-sm font-semibold">
                    <span>{skill}</span>
                    <button type="button" onClick={() => handleRemoveSkill(skill)} className="hover:text-danger ml-1">&times;</button>
                  </span>
                ))}
              </div>
              <div className="relative">
                <Tags className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input 
                  type="text" 
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={handleAddSkill}
                  placeholder="Type a skill and press Enter (e.g. Docker, GraphQL)" 
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-border-default bg-bg-primary focus:border-brand-indigo focus:ring-1 focus:ring-brand-indigo outline-none transition-all" 
                />
              </div>
            </div>
          </motion.div>

          {/* Section 3: Alignment Weights */}
          <motion.div variants={fadeUp} className="bg-bg-secondary p-8 rounded-3xl border border-border-default shadow-sm space-y-6">
            <div>
              <h2 className="font-bold text-xl text-text-primary">Role Alignment Weights</h2>
              <p className="text-sm text-text-secondary mt-1">How important is each dimension for this role?</p>
            </div>
            
            <div className="space-y-6 pt-4">
              {[
                { label: "Technical Capability", val: 80 },
                { label: "Project Authenticity", val: 60 },
                { label: "Role Alignment", val: 80 },
                { label: "Growth Potential", val: 50 },
                { label: "Communication", val: 30 },
              ].map((slider, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <span className="w-48 text-sm font-semibold text-text-secondary">{slider.label}</span>
                  <input type="range" min="0" max="100" defaultValue={slider.val} className="flex-1 h-2 bg-border-subtle rounded-lg appearance-none cursor-pointer accent-brand-indigo" />
                  <span className="w-12 text-right text-sm font-bold text-text-primary">{slider.val}%</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-text-muted italic pt-4">Note: Communication weight is intentionally reduced by default to minimize bias against introverted talent.</p>
          </motion.div>

          {/* Actions */}
          <motion.div variants={fadeUp} className="flex items-center justify-end space-x-4">
            <button type="button" className="px-6 py-3 border-2 border-border-strong text-text-secondary font-bold rounded-xl hover:bg-bg-tertiary transition-colors">
              Save as Draft
            </button>
            <button type="submit" className="px-8 py-3.5 bg-brand-gradient text-white font-bold rounded-xl shadow-md hover:shadow-glow hover:-translate-y-0.5 transition-all">
              Publish Job &rarr;
            </button>
          </motion.div>
        </form>

      </motion.div>
    </PageWrapper>
  );
}

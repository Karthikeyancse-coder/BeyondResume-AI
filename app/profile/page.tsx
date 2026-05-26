"use client";

import { useAuthStore } from "@/store/useAuthStore";
import PageWrapper from "@/components/layout/PageWrapper";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, slideInRight } from "@/lib/animations";
import { LogOut, MapPin, Briefcase, GraduationCap, Link as LinkIcon, CheckCircle2, Award, Calendar, Edit3, Code2, Sparkles, BrainCircuit, ShieldCheck, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  const handleSignOut = () => {
    logout();
    router.push("/");
  };

  if (!user) return null;

  const isCandidate = user.role === "CANDIDATE";
  const headline = isCandidate ? "Senior Backend Engineer | Node.js & PostgreSQL Expert" : "Technical Recruiter at TechCorp Inc.";
  const location = "San Francisco, CA (Remote)";

  const about = isCandidate 
    ? "Passionate backend engineer with 4+ years of experience building scalable microservices and resilient APIs. I thrive in high-performance environments and love solving complex architectural challenges. Always learning, currently diving deep into Kubernetes and distributed systems."
    : "Dedicated technical recruiter focused on finding and nurturing top engineering talent. I believe in skills over resumes and use data-driven insights to make fair, equitable hiring decisions.";

  const experience = isCandidate ? [
    { role: "Backend Engineer", company: "TechCorp", duration: "2022 - Present", desc: "Lead the migration from a monolithic architecture to microservices using Node.js and Docker. Reduced API latency by 40%." },
    { role: "Software Developer", company: "StartupX", duration: "2020 - 2022", desc: "Developed core features for a fintech platform. Integrated third-party payment gateways and maintained PostgreSQL databases." }
  ] : [
    { role: "Senior Technical Recruiter", company: "TechCorp", duration: "2021 - Present", desc: "Managing end-to-end engineering hiring. Implemented skills-first assessment platforms." },
    { role: "Talent Acquisition Specialist", company: "Global HR", duration: "2018 - 2021", desc: "Sourced candidates for Fortune 500 tech companies." }
  ];

  const skills = isCandidate 
    ? ["Node.js", "TypeScript", "PostgreSQL", "Docker", "AWS", "GraphQL", "System Design"] 
    : ["Technical Sourcing", "Interviewing", "Negotiation", "DEI", "Workday"];

  return (
    <PageWrapper className="min-h-screen bg-bg-primary pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12">
        
        {/* Futuristic Talent Passport Header */}
        <motion.div 
          variants={fadeUp}
          initial="initial"
          animate="animate"
          className="relative rounded-3xl p-[2px] bg-brand-gradient shadow-xl mb-12"
        >
          <div className="bg-bg-secondary rounded-[22px] p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
            
            {/* Background glowing orb */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-cyan/20 blur-[80px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-brand-violet/20 blur-[80px] rounded-full pointer-events-none" />

            {/* Avatar Section */}
            <div className="relative shrink-0">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-brand-gradient p-1 shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="w-full h-full bg-bg-secondary rounded-[20px] flex items-center justify-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-brand-gradient opacity-10 group-hover:opacity-20 transition-opacity" />
                  <span className="text-5xl font-bold text-transparent bg-clip-text bg-brand-gradient">
                    {user.name.charAt(0)}
                  </span>
                </div>
              </div>
              {isCandidate && (
                <div className="absolute -bottom-4 -right-4 bg-bg-secondary p-1.5 rounded-xl shadow-md border border-border-default transform -rotate-6">
                  <div className="bg-success/10 text-success flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Verified</span>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left z-10 w-full">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-2">
                    {user.name}
                  </h1>
                  <p className="text-lg md:text-xl text-text-secondary font-medium">{headline}</p>
                </div>
                
                <div className="flex items-center justify-center md:justify-end gap-3 shrink-0">
                  <button className="px-5 py-2.5 bg-bg-tertiary text-text-primary hover:text-brand-indigo font-bold rounded-xl border border-border-default hover:border-brand-indigo transition-all flex items-center gap-2">
                    <Edit3 className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                  <button 
                    onClick={handleSignOut}
                    className="px-5 py-2.5 bg-danger/10 text-danger font-bold rounded-xl hover:bg-danger hover:text-white transition-all flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden sm:inline">Sign Out</span>
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 text-sm text-text-muted mt-6">
                <span className="flex items-center gap-2 bg-bg-tertiary px-3 py-1.5 rounded-lg border border-border-subtle">
                  <MapPin className="w-4 h-4 text-brand-cyan" />
                  <span>{location}</span>
                </span>
                <span className="flex items-center gap-2 bg-bg-tertiary px-3 py-1.5 rounded-lg border border-border-subtle">
                  <Mail className="w-4 h-4 text-brand-violet" />
                  <span>{user.email}</span>
                </span>
                <span className="flex items-center gap-2 bg-bg-tertiary px-3 py-1.5 rounded-lg border border-border-subtle">
                  <Sparkles className="w-4 h-4 text-brand-indigo" />
                  <span>ID: <span className="font-mono">{user.id}</span></span>
                </span>
              </div>
            </div>

          </div>
        </motion.div>

        {/* Dashboard Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Intelligence & Skills (30%) */}
          <motion.div variants={staggerContainer} initial="initial" animate="animate" className="lg:col-span-4 space-y-8">
            
            {/* BeyondResume AI Assessment */}
            {isCandidate && (
              <motion.div variants={fadeUp} className="bg-bg-secondary p-8 rounded-3xl shadow-sm border border-border-default relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-brand-gradient" />
                <h2 className="text-xl font-display font-bold text-text-primary mb-6 flex items-center gap-3">
                  <BrainCircuit className="w-6 h-6 text-brand-indigo" />
                  <span>AI Assessment</span>
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-sm font-bold text-text-secondary uppercase tracking-wider">Capability</span>
                      <span className="text-2xl font-bold text-text-primary">87<span className="text-sm text-text-muted">/100</span></span>
                    </div>
                    <div className="w-full h-2 bg-bg-tertiary rounded-full overflow-hidden">
                      <div className="h-full bg-brand-indigo w-[87%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-sm font-bold text-text-secondary uppercase tracking-wider">Authenticity</span>
                      <span className="text-2xl font-bold text-text-primary">91<span className="text-sm text-text-muted">/100</span></span>
                    </div>
                    <div className="w-full h-2 bg-bg-tertiary rounded-full overflow-hidden">
                      <div className="h-full bg-brand-cyan w-[91%]" />
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-border-subtle">
                    <p className="text-xs text-text-muted leading-relaxed flex items-start gap-2">
                      <Award className="w-4 h-4 text-success shrink-0 mt-0.5" />
                      <span>Profile verified via deep technical interviews and semantic code analysis. Top 15% in backend systems.</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Verified Skills Passport */}
            <motion.div variants={fadeUp} className="bg-bg-secondary p-8 rounded-3xl shadow-sm border border-border-default">
              <h2 className="text-xl font-display font-bold text-text-primary mb-6 flex items-center gap-3">
                <Code2 className="w-6 h-6 text-brand-violet" />
                <span>Verified Skills</span>
              </h2>
              <div className="flex flex-wrap gap-2.5">
                {skills.map((skill, i) => (
                  <span key={i} className="px-4 py-2 bg-bg-primary text-text-primary border border-border-default rounded-xl text-sm font-bold hover:border-brand-cyan transition-colors cursor-default shadow-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>

          </motion.div>

          {/* Right Column: About & Experience (70%) */}
          <motion.div variants={staggerContainer} initial="initial" animate="animate" className="lg:col-span-8 space-y-8">
            
            {/* Executive Summary */}
            <motion.div variants={fadeUp} className="bg-bg-secondary p-8 rounded-3xl shadow-sm border border-border-default relative">
              <div className="absolute -top-4 -left-4 text-brand-indigo/10">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
              </div>
              <h2 className="text-xl font-display font-bold text-text-primary mb-4 ml-6">Professional Summary</h2>
              <p className="text-text-secondary leading-relaxed text-lg ml-6">{about}</p>
            </motion.div>

            {/* Experience Timeline */}
            <motion.div variants={fadeUp} className="bg-bg-secondary p-8 rounded-3xl shadow-sm border border-border-default">
              <h2 className="text-xl font-display font-bold text-text-primary mb-8 flex items-center gap-3">
                <Briefcase className="w-6 h-6 text-text-primary" />
                <span>Career History</span>
              </h2>
              
              <div className="space-y-10 relative before:absolute before:inset-0 before:ml-[1.125rem] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border-default before:to-transparent">
                {experience.map((exp, i) => (
                  <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-bg-secondary bg-bg-tertiary group-hover:bg-brand-indigo group-hover:text-white transition-colors text-text-muted shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl border border-border-default bg-bg-primary group-hover:border-brand-indigo/30 transition-colors shadow-sm">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <h3 className="font-bold text-text-primary text-lg">{exp.role}</h3>
                        <span className="text-xs font-bold text-brand-indigo bg-brand-indigo/10 px-3 py-1 rounded-full whitespace-nowrap">
                          {exp.duration}
                        </span>
                      </div>
                      <p className="text-text-primary font-bold mb-3">{exp.company}</p>
                      <p className="text-text-secondary text-sm leading-relaxed">{exp.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </PageWrapper>
  );
}

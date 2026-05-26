"use client";

import { useAuthStore } from "@/store/useAuthStore";
import PageWrapper from "@/components/layout/PageWrapper";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, slideInRight } from "@/lib/animations";
import { LogOut, MapPin, Briefcase, GraduationCap, Link as LinkIcon, CheckCircle2, Award, Calendar, Edit3 } from "lucide-react";
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

  // Mock data for the LinkedIn-style profile
  const isCandidate = user.role === "CANDIDATE";
  const headline = isCandidate ? "Senior Backend Engineer | Node.js & PostgreSQL Expert" : "Technical Recruiter at TechCorp Inc.";
  const location = "San Francisco, CA (Remote)";
  const connections = "500+ connections";

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

  const education = [
    { degree: "B.S. Computer Science", school: "University of Technology", year: "2016 - 2020" }
  ];

  const skills = isCandidate 
    ? ["Node.js", "TypeScript", "PostgreSQL", "Docker", "AWS", "GraphQL", "System Design"] 
    : ["Technical Sourcing", "Interviewing", "Negotiation", "DEI", "Workday"];

  return (
    <PageWrapper className="min-h-screen bg-bg-primary pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8">
        
        {/* Profile Header Card */}
        <motion.div 
          variants={fadeUp}
          initial="initial"
          animate="animate"
          className="bg-bg-secondary rounded-2xl shadow-sm border border-border-default overflow-hidden mb-6"
        >
          {/* Banner */}
          <div className="h-32 md:h-48 bg-brand-gradient relative">
            <button className="absolute top-4 right-4 bg-bg-secondary/20 hover:bg-bg-secondary/40 backdrop-blur-md p-2 rounded-full text-white transition-colors">
              <Edit3 className="w-4 h-4" />
            </button>
          </div>

          <div className="px-6 md:px-10 pb-8 relative">
            {/* Avatar & Actions Row */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end -mt-16 md:-mt-20 mb-6 gap-4">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-bg-secondary bg-bg-tertiary flex items-center justify-center text-5xl font-bold text-text-primary shadow-md overflow-hidden relative z-10">
                <div className="w-full h-full bg-brand-gradient flex items-center justify-center text-white">
                  {user.name.charAt(0)}
                </div>
              </div>
              
              <div className="flex items-center space-x-3 w-full md:w-auto">
                <button className="flex-1 md:flex-none px-6 py-2 bg-brand-indigo text-white font-bold rounded-xl hover:bg-brand-violet transition-colors">
                  Edit Profile
                </button>
                <button 
                  onClick={handleSignOut}
                  className="flex-1 md:flex-none px-6 py-2 border border-danger text-danger font-bold rounded-xl hover:bg-danger/10 transition-colors flex items-center justify-center space-x-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>

            {/* User Info */}
            <div className="max-w-3xl">
              <h1 className="text-2xl md:text-3xl font-bold text-text-primary flex items-center space-x-3">
                <span>{user.name}</span>
                {isCandidate && (
                  <span className="flex items-center space-x-1 bg-success/10 text-success text-xs font-bold px-2 py-1 rounded-md">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>AI VERIFIED</span>
                  </span>
                )}
              </h1>
              <p className="text-lg text-text-primary mt-1">{headline}</p>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted mt-3">
                <span className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{location}</span>
                </span>
                <span className="hidden sm:inline">•</span>
                <span className="font-semibold text-brand-indigo hover:underline cursor-pointer">{connections}</span>
                <span className="hidden sm:inline">•</span>
                <span className="flex items-center space-x-1 hover:text-brand-indigo cursor-pointer transition-colors">
                  <LinkIcon className="w-4 h-4" />
                  <span>Contact Info</span>
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Column */}
          <motion.div variants={staggerContainer} initial="initial" animate="animate" className="lg:col-span-2 space-y-6">
            
            {/* About */}
            <motion.div variants={fadeUp} className="bg-bg-secondary p-6 md:p-8 rounded-2xl shadow-sm border border-border-default">
              <h2 className="text-xl font-bold text-text-primary mb-4">About</h2>
              <p className="text-text-secondary leading-relaxed">{about}</p>
            </motion.div>

            {/* Experience */}
            <motion.div variants={fadeUp} className="bg-bg-secondary p-6 md:p-8 rounded-2xl shadow-sm border border-border-default">
              <h2 className="text-xl font-bold text-text-primary mb-6">Experience</h2>
              <div className="space-y-8">
                {experience.map((exp, i) => (
                  <div key={i} className="flex space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-bg-tertiary flex items-center justify-center shrink-0 border border-border-subtle">
                      <Briefcase className="w-6 h-6 text-text-muted" />
                    </div>
                    <div>
                      <h3 className="font-bold text-text-primary text-lg">{exp.role}</h3>
                      <p className="text-text-primary font-medium">{exp.company}</p>
                      <p className="text-sm text-text-muted mb-2 flex items-center space-x-1 mt-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{exp.duration}</span>
                      </p>
                      <p className="text-text-secondary text-sm leading-relaxed">{exp.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Education */}
            <motion.div variants={fadeUp} className="bg-bg-secondary p-6 md:p-8 rounded-2xl shadow-sm border border-border-default">
              <h2 className="text-xl font-bold text-text-primary mb-6">Education</h2>
              <div className="space-y-6">
                {education.map((edu, i) => (
                  <div key={i} className="flex space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-bg-tertiary flex items-center justify-center shrink-0 border border-border-subtle">
                      <GraduationCap className="w-6 h-6 text-text-muted" />
                    </div>
                    <div>
                      <h3 className="font-bold text-text-primary text-lg">{edu.school}</h3>
                      <p className="text-text-secondary">{edu.degree}</p>
                      <p className="text-sm text-text-muted mt-1">{edu.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

          </motion.div>

          {/* Side Column */}
          <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-6">
            
            {/* BeyondResume Intelligence (Only for Candidates) */}
            {isCandidate && (
              <motion.div variants={fadeUp} className="bg-bg-secondary p-6 rounded-2xl shadow-sm border border-brand-indigo/30 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-brand-gradient" />
                <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center space-x-2">
                  <Award className="w-5 h-5 text-brand-indigo" />
                  <span>AI Intelligence</span>
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-bg-tertiary rounded-lg border border-border-subtle">
                    <span className="text-sm font-semibold text-text-secondary">Capability Score</span>
                    <span className="text-lg font-bold text-brand-indigo">87/100</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-bg-tertiary rounded-lg border border-border-subtle">
                    <span className="text-sm font-semibold text-text-secondary">Authenticity</span>
                    <span className="text-lg font-bold text-success">91/100</span>
                  </div>
                  <p className="text-xs text-text-muted leading-relaxed pt-2">
                    Profile has been verified through technical interviews and GitHub activity analysis.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Skills */}
            <motion.div variants={fadeUp} className="bg-bg-secondary p-6 rounded-2xl shadow-sm border border-border-default">
              <h2 className="text-lg font-bold text-text-primary mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <span key={i} className="px-3 py-1.5 bg-bg-tertiary text-text-secondary border border-border-default rounded-lg text-sm font-semibold hover:border-brand-indigo transition-colors cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Profile Details */}
            <motion.div variants={fadeUp} className="bg-bg-secondary p-6 rounded-2xl shadow-sm border border-border-default">
              <h2 className="text-lg font-bold text-text-primary mb-4">Profile Details</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-bold text-text-muted uppercase mb-1">Email</p>
                  <p className="text-sm font-semibold text-text-primary">{user.email}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-text-muted uppercase mb-1">Account ID</p>
                  <p className="text-xs font-mono text-text-secondary bg-bg-tertiary p-2 rounded-md border border-border-subtle break-all">
                    {user.id}
                  </p>
                </div>
              </div>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </PageWrapper>
  );
}

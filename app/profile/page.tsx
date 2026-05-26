"use client";

import { useAuthStore } from "@/store/useAuthStore";
import PageWrapper from "@/components/layout/PageWrapper";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import {
  LogOut, MapPin, Briefcase, Award, Edit3, Code2, Sparkles,
  BrainCircuit, ShieldCheck, Mail, Camera, ImagePlus, X, Save, User
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
  const { user, isAuthenticated, logout, updateUser } = useAuthStore();
  const router = useRouter();

  const avatarInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editHeadline, setEditHeadline] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [editAbout, setEditAbout] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  const handleSignOut = () => {
    logout();
    router.push("/");
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      updateUser({ avatar: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      updateUser({ banner: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const openEditModal = () => {
    if (!user) return;
    setEditName(user.name);
    setEditHeadline(isCandidate ? "Senior Backend Engineer | Node.js & PostgreSQL Expert" : "Technical Recruiter at TechCorp Inc.");
    setEditLocation("San Francisco, CA (Remote)");
    setEditAbout(isCandidate
      ? "Passionate backend engineer with 4+ years of experience building scalable microservices and resilient APIs. I thrive in high-performance environments and love solving complex architectural challenges."
      : "Dedicated technical recruiter focused on finding and nurturing top engineering talent. I believe in skills over resumes and use data-driven insights.");
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    updateUser({ name: editName });
    setIsEditing(false);
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
      {/* Hidden file inputs */}
      <input ref={avatarInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
      <input ref={bannerInputRef} type="file" accept="image/*" className="hidden" onChange={handleBannerUpload} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8">

        {/* ── Banner + Avatar Header ── */}
        <motion.div
          variants={fadeUp}
          initial="initial"
          animate="animate"
          className="bg-bg-secondary rounded-3xl shadow-sm border border-border-default overflow-hidden mb-10"
        >
          {/* Banner */}
          <div
            className="h-40 md:h-56 relative group cursor-pointer"
            onClick={() => bannerInputRef.current?.click()}
          >
            {user.banner ? (
              <img src={user.banner} alt="Banner" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[var(--brand-indigo)] via-[var(--brand-violet)] to-[var(--brand-cyan)]" />
            )}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 bg-bg-secondary/90 backdrop-blur-sm text-text-primary px-4 py-2 rounded-xl font-bold text-sm shadow-lg">
                <ImagePlus className="w-5 h-5" />
                <span>Change Banner</span>
              </div>
            </div>
          </div>

          {/* Profile Info Section */}
          <div className="px-6 md:px-10 pb-8 relative">
            {/* Avatar */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end -mt-16 md:-mt-20 mb-6 gap-4">
              <div
                className="relative group cursor-pointer"
                onClick={() => avatarInputRef.current?.click()}
              >
                <div className="w-32 h-32 md:w-36 md:h-36 rounded-2xl border-4 border-bg-secondary shadow-xl overflow-hidden bg-bg-tertiary">
                  {user.avatar ? (
                    <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-brand-gradient flex items-center justify-center">
                      <span className="text-5xl font-bold text-white">{user.name.charAt(0)}</span>
                    </div>
                  )}
                  {/* Hover overlay */}
                  <div className="absolute inset-0 rounded-2xl bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <Camera className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                {isCandidate && (
                  <div className="absolute -bottom-2 -right-2 bg-bg-secondary p-1 rounded-lg shadow-md border border-border-default z-10">
                    <div className="bg-success/10 text-success flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Verified</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <button
                  onClick={openEditModal}
                  className="flex-1 md:flex-none px-5 py-2.5 bg-bg-tertiary text-text-primary hover:text-brand-indigo font-bold rounded-xl border border-border-default hover:border-brand-indigo transition-all flex items-center justify-center gap-2"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
                <button
                  onClick={handleSignOut}
                  className="flex-1 md:flex-none px-5 py-2.5 bg-danger/10 text-danger font-bold rounded-xl hover:bg-danger hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>

            {/* Name & Headline */}
            <div className="max-w-3xl">
              <h1 className="text-2xl md:text-3xl font-display font-bold text-text-primary flex items-center gap-3 flex-wrap">
                <span>{user.name}</span>
                <span className="text-xs font-bold uppercase tracking-wider bg-brand-indigo/10 text-brand-indigo px-3 py-1 rounded-full">
                  {user.role}
                </span>
              </h1>
              <p className="text-lg text-text-secondary mt-1 font-medium">{headline}</p>

              <div className="flex flex-wrap items-center gap-3 text-sm text-text-muted mt-4">
                <span className="flex items-center gap-1.5 bg-bg-tertiary px-3 py-1.5 rounded-lg border border-border-subtle">
                  <MapPin className="w-3.5 h-3.5 text-brand-cyan" />
                  <span>{location}</span>
                </span>
                <span className="flex items-center gap-1.5 bg-bg-tertiary px-3 py-1.5 rounded-lg border border-border-subtle">
                  <Mail className="w-3.5 h-3.5 text-brand-violet" />
                  <span>{user.email}</span>
                </span>
                <span className="flex items-center gap-1.5 bg-bg-tertiary px-3 py-1.5 rounded-lg border border-border-subtle">
                  <Sparkles className="w-3.5 h-3.5 text-brand-indigo" />
                  <span>ID: <span className="font-mono">{user.id}</span></span>
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Content Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left Column */}
          <motion.div variants={staggerContainer} initial="initial" animate="animate" className="lg:col-span-4 space-y-8">

            {/* AI Assessment */}
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
                    <div className="w-full h-2.5 bg-bg-tertiary rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: "87%" }} transition={{ duration: 1.5, delay: 0.3 }} className="h-full bg-brand-indigo rounded-full" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-sm font-bold text-text-secondary uppercase tracking-wider">Authenticity</span>
                      <span className="text-2xl font-bold text-text-primary">91<span className="text-sm text-text-muted">/100</span></span>
                    </div>
                    <div className="w-full h-2.5 bg-bg-tertiary rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: "91%" }} transition={{ duration: 1.5, delay: 0.5 }} className="h-full bg-brand-cyan rounded-full" />
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

            {/* Skills */}
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

          {/* Right Column */}
          <motion.div variants={staggerContainer} initial="initial" animate="animate" className="lg:col-span-8 space-y-8">

            {/* About */}
            <motion.div variants={fadeUp} className="bg-bg-secondary p-8 rounded-3xl shadow-sm border border-border-default relative">
              <div className="absolute -top-4 -left-4 text-brand-indigo/10">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
              </div>
              <h2 className="text-xl font-display font-bold text-text-primary mb-4 ml-6">Professional Summary</h2>
              <p className="text-text-secondary leading-relaxed text-lg ml-6">{about}</p>
            </motion.div>

            {/* Experience */}
            <motion.div variants={fadeUp} className="bg-bg-secondary p-8 rounded-3xl shadow-sm border border-border-default">
              <h2 className="text-xl font-display font-bold text-text-primary mb-8 flex items-center gap-3">
                <Briefcase className="w-6 h-6 text-text-primary" />
                <span>Career History</span>
              </h2>

              <div className="space-y-6">
                {experience.map((exp, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full border-2 border-border-default bg-bg-tertiary group-hover:border-brand-indigo group-hover:bg-brand-indigo/10 transition-colors flex items-center justify-center shrink-0">
                        <Briefcase className="w-4 h-4 text-text-muted group-hover:text-brand-indigo transition-colors" />
                      </div>
                      {i < experience.length - 1 && (
                        <div className="w-0.5 flex-1 bg-border-default mt-2" />
                      )}
                    </div>
                    <div className="pb-8">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                        <h3 className="font-bold text-text-primary text-lg">{exp.role}</h3>
                        <span className="text-xs font-bold text-brand-indigo bg-brand-indigo/10 px-3 py-1 rounded-full whitespace-nowrap w-max">
                          {exp.duration}
                        </span>
                      </div>
                      <p className="text-text-primary font-semibold mb-2">{exp.company}</p>
                      <p className="text-text-secondary text-sm leading-relaxed">{exp.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

          </motion.div>

        </div>
      </div>

      {/* ── Edit Profile Modal ── */}
      <AnimatePresence>
        {isEditing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsEditing(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl bg-bg-secondary rounded-3xl shadow-2xl border border-border-default overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-8 py-5 border-b border-border-default">
                <h2 className="text-xl font-display font-bold text-text-primary flex items-center gap-2">
                  <User className="w-5 h-5 text-brand-indigo" />
                  Edit Profile
                </h2>
                <button onClick={() => setIsEditing(false)} className="p-2 rounded-lg hover:bg-bg-tertiary text-text-muted hover:text-text-primary transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="px-8 py-6 space-y-5 max-h-[60vh] overflow-y-auto">
                
                {/* Upload Shortcuts */}
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => { avatarInputRef.current?.click(); }}
                    className="flex items-center justify-center gap-2 p-4 rounded-2xl border-2 border-dashed border-border-default hover:border-brand-indigo bg-bg-primary hover:bg-brand-indigo/5 transition-all text-text-secondary hover:text-brand-indigo"
                  >
                    <Camera className="w-5 h-5" />
                    <span className="font-bold text-sm">Change Photo</span>
                  </button>
                  <button
                    onClick={() => { bannerInputRef.current?.click(); }}
                    className="flex items-center justify-center gap-2 p-4 rounded-2xl border-2 border-dashed border-border-default hover:border-brand-cyan bg-bg-primary hover:bg-brand-cyan/5 transition-all text-text-secondary hover:text-brand-cyan"
                  >
                    <ImagePlus className="w-5 h-5" />
                    <span className="font-bold text-sm">Change Banner</span>
                  </button>
                </div>

                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-text-muted uppercase tracking-wider pl-1">Full Name</label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-border-default bg-bg-primary focus:border-brand-indigo focus:ring-1 focus:ring-brand-indigo outline-none transition-all text-sm font-semibold text-text-primary"
                  />
                </div>

                {/* Headline */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-text-muted uppercase tracking-wider pl-1">Headline</label>
                  <input
                    type="text"
                    value={editHeadline}
                    onChange={(e) => setEditHeadline(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-border-default bg-bg-primary focus:border-brand-indigo focus:ring-1 focus:ring-brand-indigo outline-none transition-all text-sm text-text-primary"
                  />
                </div>

                {/* Location */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-text-muted uppercase tracking-wider pl-1">Location</label>
                  <input
                    type="text"
                    value={editLocation}
                    onChange={(e) => setEditLocation(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-border-default bg-bg-primary focus:border-brand-indigo focus:ring-1 focus:ring-brand-indigo outline-none transition-all text-sm text-text-primary"
                  />
                </div>

                {/* About */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-text-muted uppercase tracking-wider pl-1">About</label>
                  <textarea
                    value={editAbout}
                    onChange={(e) => setEditAbout(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-border-default bg-bg-primary focus:border-brand-indigo focus:ring-1 focus:ring-brand-indigo outline-none transition-all text-sm text-text-primary resize-none"
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-3 px-8 py-5 border-t border-border-default bg-bg-tertiary/50">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-5 py-2.5 rounded-xl border border-border-default text-text-secondary font-bold hover:bg-bg-tertiary transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProfile}
                  className="px-6 py-2.5 bg-brand-gradient text-white rounded-xl font-bold shadow-md hover:shadow-glow transition-all flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
}

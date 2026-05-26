"use client";

import { useAuthStore } from "@/store/useAuthStore";
import PageWrapper from "@/components/layout/PageWrapper";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import {
  LogOut, MapPin, Briefcase, GraduationCap, Link as LinkIcon, CheckCircle2, Award, Calendar, Edit3,
  Check, Trash2, Plus, Camera, ImagePlus, X, Save, FolderOpen, Heart, Globe, BrainCircuit, Code2, ShieldCheck
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/* ── Types ── */
interface ExperienceItem { role: string; company: string; duration: string; desc: string; }
interface EducationItem { school: string; degree: string; year: string; }
interface SkillItem { name: string; }
interface CustomSection { id: string; title: string; content: string; }

export default function ProfilePage() {
  const { user, isAuthenticated, logout, updateUser } = useAuthStore();
  const router = useRouter();

  const avatarInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  /* ── Editable Section States ── */
  const [editingSection, setEditingSection] = useState<string | null>(null);

  // Profile Info
  const [name, setName] = useState("");
  const [headline, setHeadline] = useState("");
  const [location, setLocation] = useState("");
  const [connections, setConnections] = useState("500+ connections");

  // About
  const [about, setAbout] = useState("");

  // Experience
  const [experience, setExperience] = useState<ExperienceItem[]>([]);

  // Education
  const [education, setEducation] = useState<EducationItem[]>([]);

  // Skills
  const [skills, setSkills] = useState<SkillItem[]>([]);
  const [newSkill, setNewSkill] = useState("");

  // Custom Sections
  const [customSections, setCustomSections] = useState<CustomSection[]>([]);
  const [showAddMenu, setShowAddMenu] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    if (user) {
      const isCand = user.role === "CANDIDATE";
      setName(user.name);
      setHeadline(isCand ? "Senior Backend Engineer | Node.js & PostgreSQL Expert" : "Technical Recruiter at TechCorp Inc.");
      setLocation("San Francisco, CA (Remote)");
      setAbout(isCand
        ? "Passionate backend engineer with 4+ years of experience building scalable microservices and resilient APIs. I thrive in high-performance environments and love solving complex architectural challenges. Always learning, currently diving deep into Kubernetes and distributed systems."
        : "Dedicated technical recruiter focused on finding and nurturing top engineering talent. I believe in skills over resumes and use data-driven insights to make fair, equitable hiring decisions.");
      setExperience(isCand ? [
        { role: "Backend Engineer", company: "TechCorp", duration: "2022 - Present", desc: "Lead the migration from a monolithic architecture to microservices using Node.js and Docker. Reduced API latency by 40%." },
        { role: "Software Developer", company: "StartupX", duration: "2020 - 2022", desc: "Developed core features for a fintech platform. Integrated third-party payment gateways and maintained PostgreSQL databases." }
      ] : [
        { role: "Senior Technical Recruiter", company: "TechCorp", duration: "2021 - Present", desc: "Managing end-to-end engineering hiring. Implemented skills-first assessment platforms." },
        { role: "Talent Acquisition Specialist", company: "Global HR", duration: "2018 - 2021", desc: "Sourced candidates for Fortune 500 tech companies." }
      ]);
      setEducation([
        { degree: "B.S. Computer Science", school: "University of Technology", year: "2016 - 2020" }
      ]);
      setSkills(isCand
        ? [{ name: "Node.js" }, { name: "TypeScript" }, { name: "PostgreSQL" }, { name: "Docker" }, { name: "AWS" }, { name: "GraphQL" }, { name: "System Design" }]
        : [{ name: "Technical Sourcing" }, { name: "Interviewing" }, { name: "Negotiation" }, { name: "DEI" }, { name: "Workday" }]);
    }
  }, [isAuthenticated, user, router]);

  const handleSignOut = () => { logout(); router.push("/"); };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => updateUser({ avatar: reader.result as string });
    reader.readAsDataURL(file);
  };

  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => updateUser({ banner: reader.result as string });
    reader.readAsDataURL(file);
  };

  const saveSection = (section: string) => {
    if (section === "info") updateUser({ name });
    setEditingSection(null);
  };

  /* ── Experience Handlers ── */
  const addExperience = () => setExperience([...experience, { role: "New Role", company: "Company", duration: "20XX - Present", desc: "Description..." }]);
  const removeExperience = (idx: number) => setExperience(experience.filter((_, i) => i !== idx));
  const updateExperience = (idx: number, field: keyof ExperienceItem, value: string) => {
    const updated = [...experience];
    updated[idx] = { ...updated[idx], [field]: value };
    setExperience(updated);
  };

  /* ── Education Handlers ── */
  const addEducation = () => setEducation([...education, { school: "New School", degree: "Degree", year: "20XX - 20XX" }]);
  const removeEducation = (idx: number) => setEducation(education.filter((_, i) => i !== idx));
  const updateEducation = (idx: number, field: keyof EducationItem, value: string) => {
    const updated = [...education];
    updated[idx] = { ...updated[idx], [field]: value };
    setEducation(updated);
  };

  /* ── Skills Handlers ── */
  const addSkill = () => {
    if (!newSkill.trim()) return;
    setSkills([...skills, { name: newSkill.trim() }]);
    setNewSkill("");
  };
  const removeSkill = (idx: number) => setSkills(skills.filter((_, i) => i !== idx));

  /* ── Custom Sections Handlers ── */
  const addCustomSection = (title: string) => {
    setCustomSections([...customSections, { id: Date.now().toString(), title, content: "Add content here..." }]);
    setShowAddMenu(false);
  };
  const removeCustomSection = (id: string) => {
    setCustomSections(customSections.filter((s) => s.id !== id));
    if (editingSection === `custom-${id}`) setEditingSection(null);
  };

  if (!user) return null;
  const isCandidate = user.role === "CANDIDATE";

  /* ── Reusable Section Component ── */
  const Section = ({ id, title, icon, children, onRemove }: { id: string; title: string; icon?: React.ReactNode; children: React.ReactNode; onRemove?: () => void }) => (
    <motion.div variants={fadeUp} className="bg-bg-secondary p-6 md:p-8 rounded-2xl shadow-sm border border-border-default group/section relative">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-display font-bold text-text-primary flex items-center gap-3">
          {icon && <span>{icon}</span>}
          {title}
        </h2>
        <div className="flex items-center gap-2">
          {editingSection === id ? (
            <button onClick={() => saveSection(id)} className="p-2 rounded-lg bg-success/10 text-success hover:bg-success/20 transition-colors" title="Save">
              <Check className="w-4 h-4" />
            </button>
          ) : (
            <button onClick={() => setEditingSection(id)} className="p-2 rounded-lg text-text-muted hover:text-brand-indigo hover:bg-brand-indigo/10 transition-colors opacity-0 group-hover/section:opacity-100" title="Edit">
              <Edit3 className="w-4 h-4" />
            </button>
          )}
          {onRemove && (
            <button onClick={onRemove} className="p-2 rounded-lg text-text-muted hover:text-danger hover:bg-danger/10 transition-colors opacity-0 group-hover/section:opacity-100" title="Remove">
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
      <div>{children}</div>
    </motion.div>
  );

  return (
    <PageWrapper className="min-h-screen bg-bg-primary pb-20">
      <input ref={avatarInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
      <input ref={bannerInputRef} type="file" accept="image/*" className="hidden" onChange={handleBannerUpload} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 space-y-6">
        
        {/* Profile Header Card */}
        <motion.div 
          variants={fadeUp}
          initial="initial"
          animate="animate"
          className="bg-bg-secondary rounded-2xl shadow-sm border border-border-default overflow-hidden"
        >
          {/* Banner */}
          <div 
            className="h-40 md:h-56 relative group cursor-pointer"
            onClick={() => bannerInputRef.current?.click()}
          >
            {user.banner ? (
              <img src={user.banner} alt="Banner" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-brand-gradient" />
            )}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
               <button className="bg-bg-secondary/40 backdrop-blur-md px-4 py-2 rounded-xl text-white font-bold text-sm shadow-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                 <ImagePlus className="w-4 h-4" />
                 Change Banner
               </button>
            </div>
          </div>

          <div className="px-6 md:px-10 pb-8 relative group/info">
            {/* Edit Info Button Overlay */}
            {editingSection !== "info" && (
              <button onClick={() => setEditingSection("info")} className="absolute top-4 right-4 p-2 rounded-lg text-text-muted hover:text-brand-indigo hover:bg-brand-indigo/10 transition-colors opacity-0 group-hover/info:opacity-100 z-20">
                <Edit3 className="w-5 h-5" />
              </button>
            )}

            {/* Avatar & Actions Row */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end -mt-16 md:-mt-24 mb-6 gap-4">
              <div 
                className="w-32 h-32 md:w-40 md:h-40 rounded-[2rem] border-4 border-bg-secondary bg-bg-tertiary flex items-center justify-center shadow-lg overflow-hidden relative z-10 group cursor-pointer"
                onClick={() => avatarInputRef.current?.click()}
              >
                {user.avatar ? (
                  <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-brand-gradient flex items-center justify-center text-white text-6xl font-bold">
                    {user.name.charAt(0)}
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <Camera className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                {isCandidate && (
                  <div className="absolute bottom-2 right-2 bg-bg-secondary p-1 rounded-xl shadow-md border border-border-default">
                    <div className="bg-success/10 text-success flex items-center gap-1.5 px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Verified</span>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-3 w-full md:w-auto mt-2 md:mt-0">
                {editingSection === "info" && (
                  <button onClick={() => saveSection("info")} className="px-5 py-2.5 bg-brand-gradient text-white font-bold rounded-xl shadow-sm hover:shadow-glow transition-all flex items-center justify-center gap-2">
                    <Save className="w-4 h-4" /> Save
                  </button>
                )}
                <button 
                  onClick={() => setEditingSection("info")}
                  className="px-5 py-2.5 bg-bg-tertiary text-text-primary hover:text-brand-indigo font-bold rounded-xl border border-border-default hover:border-brand-indigo transition-all flex items-center gap-2"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
                <button 
                  onClick={handleSignOut}
                  className="px-5 py-2.5 bg-transparent border-2 border-border-default text-text-primary hover:bg-bg-tertiary font-bold rounded-xl transition-all flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>

            {/* User Info */}
            <div className="max-w-3xl">
              {editingSection === "info" ? (
                <div className="space-y-3 relative z-10">
                  <input value={name} onChange={(e) => setName(e.target.value)} className="w-full text-3xl font-display font-bold text-text-primary bg-bg-primary px-4 py-2 rounded-lg border border-border-default focus:border-brand-indigo outline-none" placeholder="Name" />
                  <input value={headline} onChange={(e) => setHeadline(e.target.value)} className="w-full text-lg text-text-secondary bg-bg-primary px-4 py-2 rounded-lg border border-border-default focus:border-brand-indigo outline-none" placeholder="Headline" />
                  <div className="flex gap-3">
                    <input value={location} onChange={(e) => setLocation(e.target.value)} className="w-full text-sm text-text-muted bg-bg-primary px-4 py-2 rounded-lg border border-border-default focus:border-brand-indigo outline-none" placeholder="Location" />
                    <input value={connections} onChange={(e) => setConnections(e.target.value)} className="w-full text-sm text-text-muted bg-bg-primary px-4 py-2 rounded-lg border border-border-default focus:border-brand-indigo outline-none" placeholder="Connections" />
                  </div>
                </div>
              ) : (
                <>
                  <h1 className="text-3xl md:text-4xl font-display font-bold text-text-primary flex items-center space-x-4">
                    <span>{name}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest bg-brand-indigo/10 text-brand-indigo px-3 py-1 rounded-md">
                      {user.role}
                    </span>
                  </h1>
                  <p className="text-lg text-text-secondary mt-1 font-medium">{headline}</p>
                  
                  <div className="flex flex-wrap items-center gap-3 text-sm text-text-muted mt-5">
                    <span className="flex items-center gap-1.5 bg-bg-tertiary px-3 py-1.5 rounded-lg border border-border-subtle">
                      <MapPin className="w-4 h-4 text-brand-cyan" />
                      <span>{location}</span>
                    </span>
                    <span className="flex items-center gap-1.5 bg-bg-tertiary px-3 py-1.5 rounded-lg border border-border-subtle hover:text-brand-indigo cursor-pointer transition-colors">
                      <LinkIcon className="w-4 h-4 text-brand-violet" />
                      <span>{connections}</span>
                    </span>
                    <span className="flex items-center gap-1.5 bg-bg-tertiary px-3 py-1.5 rounded-lg border border-border-subtle">
                      <Award className="w-4 h-4 text-brand-indigo" />
                      <span>ID: cand_001</span>
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </motion.div>

        {/* Two Column Layout (Left Narrow, Right Wide) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN (Intelligence & Skills) */}
          <motion.div variants={staggerContainer} initial="initial" animate="animate" className="lg:col-span-4 space-y-6">
            
            {/* BeyondResume Intelligence */}
            {isCandidate && (
              <motion.div variants={fadeUp} className="bg-bg-secondary p-8 rounded-3xl shadow-sm border border-border-default relative overflow-hidden group">
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
            <Section id="skills" title="Verified Skills" icon={<Code2 className="w-6 h-6 text-brand-violet" />}>
              <div className="flex flex-wrap gap-2.5">
                {skills.map((skill, i) => (
                  <span key={i} className="relative group/skill px-4 py-2 bg-bg-primary text-text-primary border border-border-default rounded-xl text-sm font-bold shadow-sm">
                    {skill.name}
                    {editingSection === "skills" && (
                      <button onClick={() => removeSkill(i)}
                        className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-danger text-white rounded-full flex items-center justify-center opacity-0 group-hover/skill:opacity-100 transition-opacity">
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </span>
                ))}
                {editingSection === "skills" && (
                  <form onSubmit={(e) => { e.preventDefault(); addSkill(); }} className="flex items-center gap-2 mt-2 w-full">
                    <input value={newSkill} onChange={(e) => setNewSkill(e.target.value)} placeholder="Add skill..."
                      className="flex-1 px-4 py-2 bg-bg-primary border border-dashed border-border-default rounded-xl text-sm text-text-primary font-bold outline-none focus:border-brand-indigo" />
                    <button type="submit" className="p-2 rounded-xl bg-brand-indigo/10 text-brand-indigo hover:bg-brand-indigo/20 transition-colors shrink-0">
                      <Plus className="w-5 h-5" />
                    </button>
                  </form>
                )}
              </div>
            </Section>

          </motion.div>


          {/* RIGHT COLUMN (About & Experience & Custom) */}
          <motion.div variants={staggerContainer} initial="initial" animate="animate" className="lg:col-span-8 space-y-8">
            
            {/* About */}
            <div className="relative group/section">
              <motion.div variants={fadeUp} className="bg-bg-secondary p-8 md:p-10 rounded-3xl shadow-sm border border-border-default relative">
                <div className="absolute -top-4 -left-4 text-brand-indigo/10 pointer-events-none">
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
                </div>
                
                <div className="flex items-center justify-between mb-6 ml-6 relative z-10">
                  <h2 className="text-xl font-display font-bold text-text-primary">Professional Summary</h2>
                  
                  <div className="flex items-center gap-2">
                    {editingSection === "about" ? (
                      <button onClick={() => saveSection("about")} className="p-2 rounded-lg bg-success/10 text-success hover:bg-success/20 transition-colors" title="Save">
                        <Check className="w-4 h-4" />
                      </button>
                    ) : (
                      <button onClick={() => setEditingSection("about")} className="p-2 rounded-lg text-text-muted hover:text-brand-indigo hover:bg-brand-indigo/10 transition-colors opacity-0 group-hover/section:opacity-100" title="Edit">
                        <Edit3 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="ml-6 relative z-10">
                  {editingSection === "about" ? (
                    <textarea value={about} onChange={(e) => setAbout(e.target.value)} rows={5}
                      className="w-full bg-bg-primary px-4 py-3 rounded-xl border border-border-default focus:border-brand-indigo outline-none text-base text-text-primary resize-none leading-relaxed" />
                  ) : (
                    <p className="text-text-secondary leading-relaxed text-base">{about}</p>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Experience */}
            <Section id="experience" title="Career History" icon={<Briefcase className="w-6 h-6 text-text-primary" />}>
              <div className="space-y-10 relative before:absolute before:inset-0 before:ml-[1.125rem] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border-default before:to-transparent mt-4">
                {experience.map((exp, i) => (
                  <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-bg-secondary bg-bg-tertiary group-hover:border-brand-indigo transition-colors text-text-muted shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] relative">
                      {editingSection === "experience" ? (
                        <div className="space-y-2 bg-bg-primary p-6 rounded-2xl border border-border-subtle relative">
                           <button onClick={() => removeExperience(i)} className="absolute top-2 right-2 p-1.5 rounded-md text-text-muted hover:text-danger hover:bg-danger/10 transition-colors shrink-0">
                             <Trash2 className="w-4 h-4" />
                           </button>
                           <input value={exp.role} onChange={(e) => updateExperience(i, "role", e.target.value)} className="font-bold text-text-primary bg-transparent border-b border-border-default focus:border-brand-indigo outline-none w-[90%]" placeholder="Role" />
                           <input value={exp.company} onChange={(e) => updateExperience(i, "company", e.target.value)} className="text-text-primary font-medium bg-transparent border-b border-border-default focus:border-brand-indigo outline-none w-[90%]" placeholder="Company" />
                           <input value={exp.duration} onChange={(e) => updateExperience(i, "duration", e.target.value)} className="text-sm text-text-muted bg-transparent border-b border-border-default focus:border-brand-indigo outline-none w-full" placeholder="Duration" />
                           <textarea value={exp.desc} onChange={(e) => updateExperience(i, "desc", e.target.value)} rows={3} className="w-full text-sm text-text-secondary bg-transparent border-b border-border-default focus:border-brand-indigo outline-none resize-none mt-2" placeholder="Description" />
                        </div>
                      ) : (
                        <div className="bg-transparent group-hover:bg-bg-primary p-4 rounded-2xl transition-colors">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                            <h3 className="font-bold text-text-primary text-lg">{exp.role}</h3>
                            <span className="text-xs font-bold text-brand-indigo bg-brand-indigo/10 px-3 py-1 rounded-full whitespace-nowrap w-max">
                              {exp.duration}
                            </span>
                          </div>
                          <p className="text-text-primary font-bold mb-3">{exp.company}</p>
                          <p className="text-text-secondary text-sm leading-relaxed">{exp.desc}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {editingSection === "experience" && (
                  <button onClick={addExperience} className="w-full py-4 border-2 border-dashed border-border-default rounded-xl text-sm font-bold text-text-muted hover:text-brand-indigo hover:border-brand-indigo transition-colors flex items-center justify-center gap-2 mt-4 relative z-10 bg-bg-secondary">
                    <Plus className="w-4 h-4" /> Add Experience
                  </button>
                )}
              </div>
            </Section>

            {/* Custom Sections */}
            {customSections.map((section) => (
              <Section key={section.id} id={`custom-${section.id}`} title={section.title} icon={<FolderOpen className="w-6 h-6 text-brand-cyan" />} onRemove={() => removeCustomSection(section.id)}>
                {editingSection === `custom-${section.id}` ? (
                  <div className="space-y-3 mt-4">
                    <input
                      value={section.title}
                      onChange={(e) => setCustomSections(customSections.map((s) => s.id === section.id ? { ...s, title: e.target.value } : s))}
                      className="w-full font-bold text-text-primary text-xl bg-bg-primary px-4 py-2 rounded-lg border border-border-default focus:border-brand-indigo outline-none"
                      placeholder="Section Title"
                    />
                    <textarea
                      value={section.content}
                      onChange={(e) => setCustomSections(customSections.map((s) => s.id === section.id ? { ...s, content: e.target.value } : s))}
                      rows={4}
                      className="w-full text-base text-text-primary bg-bg-primary px-4 py-3 rounded-xl border border-border-default focus:border-brand-indigo outline-none resize-none leading-relaxed"
                    />
                  </div>
                ) : (
                  <p className="text-text-secondary leading-relaxed text-base mt-2">{section.content}</p>
                )}
              </Section>
            ))}

            {/* Add Section Menu */}
            <div className="relative mt-8">
              <button
                onClick={() => setShowAddMenu(!showAddMenu)}
                className="w-full py-5 border-2 border-dashed border-border-default rounded-2xl text-sm font-bold text-text-muted hover:text-brand-indigo hover:border-brand-indigo hover:bg-brand-indigo/5 transition-all flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Custom Section
              </button>

              <AnimatePresence>
                {showAddMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="absolute left-0 right-0 bottom-full mb-2 bg-bg-secondary rounded-xl border border-border-default shadow-lg z-20 overflow-hidden"
                  >
                    {[
                      { label: "Education", icon: <GraduationCap className="w-4 h-4" /> },
                      { label: "Projects", icon: <FolderOpen className="w-4 h-4" /> },
                      { label: "Certifications", icon: <Award className="w-4 h-4" /> },
                      { label: "Languages", icon: <Globe className="w-4 h-4" /> },
                      { label: "Interests", icon: <Heart className="w-4 h-4" /> },
                      { label: "Custom Section", icon: <Plus className="w-4 h-4" /> },
                    ].map((item, i) => (
                      <button
                        key={i}
                        onClick={() => addCustomSection(item.label)}
                        className="w-full flex items-center gap-3 px-5 py-3 text-sm font-semibold text-text-secondary hover:bg-bg-tertiary hover:text-brand-indigo transition-colors text-left"
                      >
                        {item.icon}
                        {item.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </motion.div>

        </div>
      </div>
    </PageWrapper>
  );
}

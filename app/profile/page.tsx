"use client";

import { useAuthStore } from "@/store/useAuthStore";
import PageWrapper from "@/components/layout/PageWrapper";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import {
  LogOut, MapPin, Briefcase, GraduationCap, Link as LinkIcon, CheckCircle2, Award, Calendar, Edit3,
  Check, Trash2, Plus, Camera, ImagePlus, X, Save, FolderOpen, Heart, Globe
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
  const Section = ({ id, title, children, onRemove }: { id: string; title: string; children: React.ReactNode; onRemove?: () => void }) => (
    <motion.div variants={fadeUp} className="bg-bg-secondary p-6 md:p-8 rounded-2xl shadow-sm border border-border-default group/section relative">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-text-primary">{title}</h2>
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

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8">
        
        {/* Profile Header Card */}
        <motion.div 
          variants={fadeUp}
          initial="initial"
          animate="animate"
          className="bg-bg-secondary rounded-2xl shadow-sm border border-border-default overflow-hidden mb-6"
        >
          {/* Banner */}
          <div 
            className="h-32 md:h-48 relative group cursor-pointer"
            onClick={() => bannerInputRef.current?.click()}
          >
            {user.banner ? (
              <img src={user.banner} alt="Banner" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-brand-gradient" />
            )}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
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
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end -mt-16 md:-mt-20 mb-6 gap-4">
              <div 
                className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-bg-secondary bg-bg-tertiary flex items-center justify-center shadow-md overflow-hidden relative z-10 group cursor-pointer"
                onClick={() => avatarInputRef.current?.click()}
              >
                {user.avatar ? (
                  <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-brand-gradient flex items-center justify-center text-white text-5xl font-bold">
                    {user.name.charAt(0)}
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <Camera className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
              
              <div className="flex items-center space-x-3 w-full md:w-auto mt-2 md:mt-0">
                {editingSection === "info" && (
                  <button onClick={() => saveSection("info")} className="flex-1 md:flex-none px-6 py-2 bg-brand-gradient text-white font-bold rounded-xl shadow-sm hover:shadow-glow transition-all flex items-center justify-center gap-2">
                    <Save className="w-4 h-4" /> Save
                  </button>
                )}
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
              {editingSection === "info" ? (
                <div className="space-y-3 relative z-10">
                  <input value={name} onChange={(e) => setName(e.target.value)} className="w-full text-2xl md:text-3xl font-bold text-text-primary bg-bg-primary px-4 py-2 rounded-lg border border-border-default focus:border-brand-indigo outline-none" placeholder="Name" />
                  <input value={headline} onChange={(e) => setHeadline(e.target.value)} className="w-full text-lg text-text-secondary bg-bg-primary px-4 py-2 rounded-lg border border-border-default focus:border-brand-indigo outline-none" placeholder="Headline" />
                  <div className="flex gap-3">
                    <input value={location} onChange={(e) => setLocation(e.target.value)} className="w-full text-sm text-text-muted bg-bg-primary px-4 py-2 rounded-lg border border-border-default focus:border-brand-indigo outline-none" placeholder="Location" />
                    <input value={connections} onChange={(e) => setConnections(e.target.value)} className="w-full text-sm text-text-muted bg-bg-primary px-4 py-2 rounded-lg border border-border-default focus:border-brand-indigo outline-none" placeholder="Connections" />
                  </div>
                </div>
              ) : (
                <>
                  <h1 className="text-2xl md:text-3xl font-bold text-text-primary flex items-center space-x-3">
                    <span>{name}</span>
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
                </>
              )}
            </div>
          </div>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Column */}
          <motion.div variants={staggerContainer} initial="initial" animate="animate" className="lg:col-span-2 space-y-6">
            
            {/* About */}
            <Section id="about" title="About">
              {editingSection === "about" ? (
                <textarea value={about} onChange={(e) => setAbout(e.target.value)} rows={5}
                  className="w-full bg-bg-primary px-4 py-3 rounded-lg border border-border-default focus:border-brand-indigo outline-none text-sm text-text-primary resize-none leading-relaxed" />
              ) : (
                <p className="text-text-secondary leading-relaxed">{about}</p>
              )}
            </Section>

            {/* Experience */}
            <Section id="experience" title="Experience">
              <div className="space-y-8">
                {experience.map((exp, i) => (
                  <div key={i} className="flex space-x-4 relative">
                    <div className="w-12 h-12 rounded-xl bg-bg-tertiary flex items-center justify-center shrink-0 border border-border-subtle">
                      <Briefcase className="w-6 h-6 text-text-muted" />
                    </div>
                    {editingSection === "experience" ? (
                      <div className="w-full space-y-2 bg-bg-primary p-4 rounded-xl border border-border-subtle relative">
                         <button onClick={() => removeExperience(i)} className="absolute top-2 right-2 p-1.5 rounded-md text-text-muted hover:text-danger hover:bg-danger/10 transition-colors shrink-0">
                           <Trash2 className="w-4 h-4" />
                         </button>
                         <input value={exp.role} onChange={(e) => updateExperience(i, "role", e.target.value)} className="font-bold text-text-primary bg-transparent border-b border-border-default focus:border-brand-indigo outline-none w-[90%]" placeholder="Role" />
                         <input value={exp.company} onChange={(e) => updateExperience(i, "company", e.target.value)} className="text-text-primary font-medium bg-transparent border-b border-border-default focus:border-brand-indigo outline-none w-[90%]" placeholder="Company" />
                         <input value={exp.duration} onChange={(e) => updateExperience(i, "duration", e.target.value)} className="text-sm text-text-muted bg-transparent border-b border-border-default focus:border-brand-indigo outline-none w-full" placeholder="Duration" />
                         <textarea value={exp.desc} onChange={(e) => updateExperience(i, "desc", e.target.value)} rows={2} className="w-full text-sm text-text-secondary bg-transparent border-b border-border-default focus:border-brand-indigo outline-none resize-none mt-2" placeholder="Description" />
                      </div>
                    ) : (
                      <div>
                        <h3 className="font-bold text-text-primary text-lg">{exp.role}</h3>
                        <p className="text-text-primary font-medium">{exp.company}</p>
                        <p className="text-sm text-text-muted mb-2 flex items-center space-x-1 mt-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{exp.duration}</span>
                        </p>
                        <p className="text-text-secondary text-sm leading-relaxed">{exp.desc}</p>
                      </div>
                    )}
                  </div>
                ))}
                {editingSection === "experience" && (
                  <button onClick={addExperience} className="w-full py-3 border-2 border-dashed border-border-default rounded-xl text-sm font-bold text-text-muted hover:text-brand-indigo hover:border-brand-indigo transition-colors flex items-center justify-center gap-2 mt-4">
                    <Plus className="w-4 h-4" /> Add Experience
                  </button>
                )}
              </div>
            </Section>

            {/* Education */}
            <Section id="education" title="Education">
              <div className="space-y-6">
                {education.map((edu, i) => (
                  <div key={i} className="flex space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-bg-tertiary flex items-center justify-center shrink-0 border border-border-subtle">
                      <GraduationCap className="w-6 h-6 text-text-muted" />
                    </div>
                    {editingSection === "education" ? (
                      <div className="w-full space-y-2 bg-bg-primary p-4 rounded-xl border border-border-subtle relative">
                         <button onClick={() => removeEducation(i)} className="absolute top-2 right-2 p-1.5 rounded-md text-text-muted hover:text-danger hover:bg-danger/10 transition-colors shrink-0">
                           <Trash2 className="w-4 h-4" />
                         </button>
                         <input value={edu.school} onChange={(e) => updateEducation(i, "school", e.target.value)} className="font-bold text-text-primary text-lg bg-transparent border-b border-border-default focus:border-brand-indigo outline-none w-[90%]" placeholder="School" />
                         <input value={edu.degree} onChange={(e) => updateEducation(i, "degree", e.target.value)} className="text-text-secondary bg-transparent border-b border-border-default focus:border-brand-indigo outline-none w-[90%]" placeholder="Degree" />
                         <input value={edu.year} onChange={(e) => updateEducation(i, "year", e.target.value)} className="text-sm text-text-muted bg-transparent border-b border-border-default focus:border-brand-indigo outline-none w-full mt-1" placeholder="Year" />
                      </div>
                    ) : (
                      <div>
                        <h3 className="font-bold text-text-primary text-lg">{edu.school}</h3>
                        <p className="text-text-secondary">{edu.degree}</p>
                        <p className="text-sm text-text-muted mt-1">{edu.year}</p>
                      </div>
                    )}
                  </div>
                ))}
                {editingSection === "education" && (
                  <button onClick={addEducation} className="w-full py-3 border-2 border-dashed border-border-default rounded-xl text-sm font-bold text-text-muted hover:text-brand-indigo hover:border-brand-indigo transition-colors flex items-center justify-center gap-2 mt-4">
                    <Plus className="w-4 h-4" /> Add Education
                  </button>
                )}
              </div>
            </Section>

            {/* Custom Sections */}
            {customSections.map((section) => (
              <Section key={section.id} id={`custom-${section.id}`} title={section.title} onRemove={() => removeCustomSection(section.id)}>
                {editingSection === `custom-${section.id}` ? (
                  <div className="space-y-3">
                    <input
                      value={section.title}
                      onChange={(e) => setCustomSections(customSections.map((s) => s.id === section.id ? { ...s, title: e.target.value } : s))}
                      className="w-full font-bold text-text-primary bg-bg-primary px-4 py-2 rounded-lg border border-border-default focus:border-brand-indigo outline-none"
                      placeholder="Section Title"
                    />
                    <textarea
                      value={section.content}
                      onChange={(e) => setCustomSections(customSections.map((s) => s.id === section.id ? { ...s, content: e.target.value } : s))}
                      rows={4}
                      className="w-full text-sm text-text-primary bg-bg-primary px-4 py-3 rounded-lg border border-border-default focus:border-brand-indigo outline-none resize-none leading-relaxed"
                    />
                  </div>
                ) : (
                  <p className="text-text-secondary leading-relaxed">{section.content}</p>
                )}
              </Section>
            ))}

            {/* Add Section Menu */}
            <div className="relative">
              <button
                onClick={() => setShowAddMenu(!showAddMenu)}
                className="w-full py-4 border-2 border-dashed border-border-default rounded-2xl text-sm font-bold text-text-muted hover:text-brand-indigo hover:border-brand-indigo hover:bg-brand-indigo/5 transition-all flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Section
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
            <Section id="skills" title="Skills">
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <span key={i} className="relative group/skill px-3 py-1.5 bg-bg-tertiary text-text-secondary border border-border-default rounded-lg text-sm font-semibold hover:border-brand-indigo transition-colors cursor-default">
                    {skill.name}
                    {editingSection === "skills" && (
                      <button onClick={() => removeSkill(i)}
                        className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-danger text-white rounded-full flex items-center justify-center opacity-0 group-hover/skill:opacity-100 transition-opacity">
                        <X className="w-2.5 h-2.5" />
                      </button>
                    )}
                  </span>
                ))}
                {editingSection === "skills" && (
                  <form onSubmit={(e) => { e.preventDefault(); addSkill(); }} className="flex items-center gap-2 mt-2 w-full">
                    <input value={newSkill} onChange={(e) => setNewSkill(e.target.value)} placeholder="Add skill..."
                      className="flex-1 px-3 py-1.5 bg-bg-primary border border-dashed border-border-default rounded-lg text-sm text-text-primary outline-none focus:border-brand-indigo" />
                    <button type="submit" className="p-1.5 rounded-lg bg-brand-indigo/10 text-brand-indigo hover:bg-brand-indigo/20 transition-colors shrink-0">
                      <Plus className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>
            </Section>

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

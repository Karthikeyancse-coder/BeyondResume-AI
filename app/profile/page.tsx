"use client";

import { useAuthStore } from "@/store/useAuthStore";
import PageWrapper from "@/components/layout/PageWrapper";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import {
  LogOut, MapPin, Briefcase, GraduationCap, Link as LinkIcon, CheckCircle2, Award, Calendar, Edit3,
  Check, Trash2, Plus, Camera, ImagePlus, X, Save, FolderOpen, Heart, Globe, BrainCircuit, Code2, ShieldCheck,
  Pin, ExternalLink, Image as ImageIcon
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
interface ProjectItem { id: string; name: string; desc: string; link: string; isPinned: boolean; }
interface CertItem { id: string; name: string; issuer: string; date: string; image?: string; }
interface LanguageItem { id: string; name: string; proficiency: number; }

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

  // About & Experience & Education & Skills
  const [about, setAbout] = useState("");
  const [experience, setExperience] = useState<ExperienceItem[]>([]);
  const [education, setEducation] = useState<EducationItem[]>([]);
  const [skills, setSkills] = useState<SkillItem[]>([]);
  const [newSkill, setNewSkill] = useState("");

  // New Specific Sections
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [showProjects, setShowProjects] = useState(false);

  const [certifications, setCertifications] = useState<CertItem[]>([]);
  const [showCertifications, setShowCertifications] = useState(false);

  const [languages, setLanguages] = useState<LanguageItem[]>([]);
  const [showLanguages, setShowLanguages] = useState(false);

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
        { role: "Senior Technical Recruiter", company: "TechCorp", duration: "2021 - Present", desc: "Managing end-to-end engineering hiring. Implemented skills-first assessment platforms." }
      ]);
      
      setSkills(isCand
        ? [{ name: "Node.js" }, { name: "TypeScript" }, { name: "PostgreSQL" }, { name: "Docker" }, { name: "AWS" }, { name: "GraphQL" }, { name: "System Design" }]
        : [{ name: "Technical Sourcing" }, { name: "Interviewing" }, { name: "Negotiation" }, { name: "DEI" }]);
      
      if (isCand) {
        setShowProjects(true);
        setProjects([
          { id: "1", name: "AI Verification Platform", desc: "Built a fully automated AI assessment system using Next.js and Python.", link: "github.com/example/ai", isPinned: true },
          { id: "2", name: "E-Commerce Microservices", desc: "Migrated a legacy monolith to a scalable Node.js microservices architecture.", link: "live-store.example.com", isPinned: false }
        ]);
        
        setShowCertifications(true);
        setCertifications([
          { id: "1", name: "AWS Certified Solutions Architect", issuer: "Amazon Web Services", date: "Aug 2023", image: "" }
        ]);

        setShowLanguages(true);
        setLanguages([
          { id: "1", name: "English", proficiency: 5 },
          { id: "2", name: "Spanish", proficiency: 3 }
        ]);
      }
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

  const handleCertImageUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setCertifications(certifications.map(c => c.id === id ? { ...c, image: reader.result as string } : c));
    };
    reader.readAsDataURL(file);
  };

  const saveSection = (section: string) => {
    if (section === "info") updateUser({ name });
    setEditingSection(null);
  };

  /* ── Handlers ── */
  const updateExperience = (idx: number, field: keyof ExperienceItem, value: string) => {
    const updated = [...experience];
    updated[idx] = { ...updated[idx], [field]: value };
    setExperience(updated);
  };

  const addSkill = () => {
    if (!newSkill.trim()) return;
    setSkills([...skills, { name: newSkill.trim() }]);
    setNewSkill("");
  };

  const handleAddMenuClick = (type: string) => {
    setShowAddMenu(false);
    if (type === "Projects") setShowProjects(true);
    else if (type === "Certifications") setShowCertifications(true);
    else if (type === "Languages") setShowLanguages(true);
    else if (type === "Custom Section") {
      setCustomSections([...customSections, { id: Date.now().toString(), title: "New Section", content: "Add content here..." }]);
    }
  };

  if (!user) return null;
  const isCandidate = user.role === "CANDIDATE";

  const proficiencies = ["Beginner", "Elementary", "Intermediate", "Advanced", "Professional / Native"];

  /* ── Reusable Section Component ── */
  const Section = ({ id, title, icon, children, onRemove }: { id: string; title: string; icon?: React.ReactNode; children: React.ReactNode; onRemove?: () => void }) => (
    <motion.div variants={fadeUp} className="bg-bg-secondary p-6 md:p-8 rounded-3xl shadow-sm border border-border-default group/section relative">
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
                        className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-danger text-white rounded-full flex items-center justify-center opacity-0 group-hover/skill:opacity-100 transition-opacity z-10">
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

            {/* Languages (Bar Chart) */}
            {showLanguages && (
              <Section id="languages" title="Languages" icon={<Globe className="w-6 h-6 text-brand-cyan" />} onRemove={() => setShowLanguages(false)}>
                <div className="space-y-5">
                  {languages.map((lang, i) => (
                    <div key={lang.id} className="relative group/lang">
                      {editingSection === "languages" ? (
                        <div className="flex flex-col gap-2 bg-bg-primary p-3 rounded-xl border border-border-default">
                           <div className="flex justify-between items-center gap-2">
                             <input value={lang.name} onChange={(e) => setLanguages(languages.map((l, idx) => idx === i ? { ...l, name: e.target.value } : l))} className="font-bold text-text-primary bg-transparent outline-none flex-1" placeholder="Language" />
                             <button onClick={() => setLanguages(languages.filter((_, idx) => idx !== i))} className="p-1 text-text-muted hover:text-danger rounded transition-colors"><Trash2 className="w-4 h-4" /></button>
                           </div>
                           <input type="range" min="1" max="5" step="1" value={lang.proficiency} onChange={(e) => setLanguages(languages.map((l, idx) => idx === i ? { ...l, proficiency: parseInt(e.target.value) } : l))} className="w-full cursor-pointer accent-brand-indigo" />
                           <div className="text-xs text-text-muted text-right font-medium">{proficiencies[lang.proficiency - 1]}</div>
                        </div>
                      ) : (
                        <>
                          <div className="flex justify-between text-sm mb-1.5 font-bold">
                            <span className="text-text-primary">{lang.name}</span>
                            <span className="text-brand-indigo">{proficiencies[lang.proficiency - 1]}</span>
                          </div>
                          <div className="w-full h-2 bg-bg-tertiary rounded-full overflow-hidden flex shadow-inner">
                            {[1, 2, 3, 4, 5].map((level) => (
                              <div key={level} className={`flex-1 transition-all duration-500 ${level <= lang.proficiency ? 'bg-brand-indigo' : 'bg-transparent'} ${level < 5 ? 'border-r border-bg-secondary' : ''}`} />
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                  {editingSection === "languages" && (
                    <button onClick={() => setLanguages([...languages, { id: Date.now().toString(), name: "New Language", proficiency: 1 }])} className="w-full py-2 border-2 border-dashed border-border-default rounded-xl text-sm font-bold text-text-muted hover:text-brand-indigo hover:border-brand-indigo transition-colors flex items-center justify-center gap-2">
                      <Plus className="w-4 h-4" /> Add Language
                    </button>
                  )}
                </div>
              </Section>
            )}

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
                           <button onClick={() => setExperience(experience.filter((_, idx) => idx !== i))} className="absolute top-2 right-2 p-1.5 rounded-md text-text-muted hover:text-danger hover:bg-danger/10 transition-colors shrink-0">
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
                  <button onClick={() => setExperience([...experience, { role: "New Role", company: "Company", duration: "20XX - Present", desc: "Description..." }])} className="w-full py-4 border-2 border-dashed border-border-default rounded-xl text-sm font-bold text-text-muted hover:text-brand-indigo hover:border-brand-indigo transition-colors flex items-center justify-center gap-2 mt-4 relative z-10 bg-bg-secondary">
                    <Plus className="w-4 h-4" /> Add Experience
                  </button>
                )}
              </div>
            </Section>

            {/* Projects (Cards Layout) */}
            {showProjects && (
              <Section id="projects" title="Projects" icon={<FolderOpen className="w-6 h-6 text-brand-indigo" />} onRemove={() => setShowProjects(false)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {projects.map((proj, i) => (
                    <div key={proj.id} className={cn("bg-bg-primary p-6 rounded-2xl border transition-colors relative group/project", proj.isPinned ? "border-brand-indigo/30 shadow-md" : "border-border-default")}>
                      {editingSection === "projects" ? (
                        <div className="space-y-3">
                           <div className="flex justify-between items-start gap-2">
                             <input value={proj.name} onChange={(e) => setProjects(projects.map((p, idx) => idx === i ? { ...p, name: e.target.value } : p))} className="font-bold text-lg text-text-primary bg-transparent outline-none w-[80%] border-b border-border-default focus:border-brand-indigo" placeholder="Project Name" />
                             <button onClick={() => setProjects(projects.filter((_, idx) => idx !== i))} className="p-1.5 bg-danger/10 text-danger rounded-md hover:bg-danger/20 transition-colors shrink-0"><Trash2 className="w-4 h-4" /></button>
                           </div>
                           <textarea value={proj.desc} onChange={(e) => setProjects(projects.map((p, idx) => idx === i ? { ...p, desc: e.target.value } : p))} rows={2} className="w-full text-sm text-text-secondary bg-transparent outline-none resize-none border-b border-border-default focus:border-brand-indigo" placeholder="Description" />
                           <input value={proj.link} onChange={(e) => setProjects(projects.map((p, idx) => idx === i ? { ...p, link: e.target.value } : p))} className="text-sm text-brand-indigo bg-transparent outline-none w-full border-b border-border-default focus:border-brand-indigo" placeholder="Project Link (URL)" />
                           <label className="flex items-center gap-2 text-sm text-text-muted cursor-pointer mt-2">
                             <input type="checkbox" checked={proj.isPinned} onChange={(e) => setProjects(projects.map((p, idx) => idx === i ? { ...p, isPinned: e.target.checked } : p))} className="accent-brand-indigo w-4 h-4" />
                             Pin Project
                           </label>
                        </div>
                      ) : (
                        <>
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-lg text-text-primary leading-tight">{proj.name}</h3>
                            {proj.isPinned && <Pin className="w-4 h-4 text-brand-indigo shrink-0 mt-1" />}
                          </div>
                          <p className="text-sm text-text-secondary leading-relaxed mb-4">{proj.desc}</p>
                          {proj.link && (
                            <a href={`https://${proj.link.replace('https://', '')}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-indigo hover:text-brand-violet transition-colors">
                              <span>View Project</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </>
                      )}
                    </div>
                  ))}
                  {editingSection === "projects" && (
                    <button onClick={() => setProjects([...projects, { id: Date.now().toString(), name: "New Project", desc: "Description...", link: "", isPinned: false }])} className="h-full min-h-[160px] border-2 border-dashed border-border-default rounded-2xl flex flex-col items-center justify-center gap-2 text-text-muted hover:text-brand-indigo hover:border-brand-indigo transition-colors hover:bg-brand-indigo/5">
                      <Plus className="w-6 h-6" />
                      <span className="font-bold text-sm">Add Project</span>
                    </button>
                  )}
                </div>
              </Section>
            )}

            {/* Certifications (Cards with Image) */}
            {showCertifications && (
              <Section id="certifications" title="Certifications" icon={<Award className="w-6 h-6 text-brand-violet" />} onRemove={() => setShowCertifications(false)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {certifications.map((cert, i) => (
                    <div key={cert.id} className="bg-bg-primary p-4 rounded-2xl border border-border-default flex gap-4">
                      {editingSection === "certifications" ? (
                        <div className="w-full flex gap-4 relative pr-6">
                           <button onClick={() => setCertifications(certifications.filter((_, idx) => idx !== i))} className="absolute top-0 right-0 p-1 text-text-muted hover:text-danger rounded transition-colors"><Trash2 className="w-4 h-4" /></button>
                           
                           <label className="w-16 h-16 bg-bg-tertiary rounded-xl shrink-0 flex items-center justify-center cursor-pointer overflow-hidden border border-dashed border-border-default hover:border-brand-indigo transition-colors">
                             <input type="file" accept="image/*" className="hidden" onChange={(e) => handleCertImageUpload(cert.id, e)} />
                             {cert.image ? <img src={cert.image} className="w-full h-full object-cover" /> : <ImageIcon className="w-5 h-5 text-text-muted" />}
                           </label>
                           
                           <div className="flex-1 space-y-2">
                             <input value={cert.name} onChange={(e) => setCertifications(certifications.map((c, idx) => idx === i ? { ...c, name: e.target.value } : c))} className="font-bold text-text-primary bg-transparent border-b border-border-default focus:border-brand-indigo outline-none w-full" placeholder="Certification Name" />
                             <input value={cert.issuer} onChange={(e) => setCertifications(certifications.map((c, idx) => idx === i ? { ...c, issuer: e.target.value } : c))} className="text-sm text-text-secondary bg-transparent border-b border-border-default focus:border-brand-indigo outline-none w-full" placeholder="Issuer (e.g. AWS)" />
                             <input value={cert.date} onChange={(e) => setCertifications(certifications.map((c, idx) => idx === i ? { ...c, date: e.target.value } : c))} className="text-xs text-text-muted bg-transparent border-b border-border-default focus:border-brand-indigo outline-none w-full" placeholder="Date (e.g. Aug 2023)" />
                           </div>
                        </div>
                      ) : (
                        <>
                          <div className="w-16 h-16 bg-bg-tertiary rounded-xl shrink-0 flex items-center justify-center border border-border-subtle overflow-hidden">
                            {cert.image ? <img src={cert.image} className="w-full h-full object-cover" /> : <Award className="w-6 h-6 text-text-muted" />}
                          </div>
                          <div className="pt-1">
                            <h3 className="font-bold text-text-primary leading-tight mb-1">{cert.name}</h3>
                            <p className="text-sm text-text-secondary mb-0.5">{cert.issuer}</p>
                            <p className="text-xs font-bold text-brand-indigo">{cert.date}</p>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                  {editingSection === "certifications" && (
                    <button onClick={() => setCertifications([...certifications, { id: Date.now().toString(), name: "New Certification", issuer: "Issuer", date: "Date", image: "" }])} className="h-full min-h-[100px] border-2 border-dashed border-border-default rounded-2xl flex flex-col items-center justify-center gap-2 text-text-muted hover:text-brand-indigo hover:border-brand-indigo transition-colors hover:bg-brand-indigo/5">
                      <Plus className="w-5 h-5" />
                      <span className="font-bold text-sm">Add Certification</span>
                    </button>
                  )}
                </div>
              </Section>
            )}

            {/* Custom Generic Sections */}
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
                      { label: "Custom Section", icon: <Plus className="w-4 h-4" /> },
                    ].map((item, i) => (
                      <button
                        key={i}
                        onClick={() => handleAddMenuClick(item.label)}
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

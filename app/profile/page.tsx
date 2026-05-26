"use client";

import { useAuthStore } from "@/store/useAuthStore";
import PageWrapper from "@/components/layout/PageWrapper";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import {
  LogOut, MapPin, Briefcase, GraduationCap, Link as LinkIcon, Award, Calendar, Edit3,
  Check, Trash2, Plus, Camera, ImagePlus, X, Save, FolderOpen, Heart, Globe, BrainCircuit, Code2, ShieldCheck,
  ExternalLink, Image as ImageIcon, Mail, Phone, Trophy, BookOpen, Users, Star, FileText
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/* ── Types ── */
interface ExperienceItem { role: string; company: string; duration: string; desc: string; }
interface EducationItem { school: string; degree: string; field: string; year: string; gpa: string; }
interface SkillItem { name: string; level: number; }
interface ProjectItem { id: string; name: string; desc: string; tech: string; link: string; isPinned: boolean; }
interface CertItem { id: string; name: string; issuer: string; date: string; credentialId: string; image?: string; }
interface LanguageItem { id: string; name: string; proficiency: number; }
interface AwardItem { id: string; title: string; issuer: string; date: string; desc: string; }
interface VolunteerItem { id: string; role: string; org: string; duration: string; desc: string; }
interface PublicationItem { id: string; title: string; publisher: string; date: string; link: string; }
interface CustomSection { id: string; title: string; content: string; }

/* ── Contact Info ── */
interface ContactInfo {
  email: string; phone: string; website: string;
  github: string; linkedin: string; twitter: string;
}

export default function ProfilePage() {
  const { user, isAuthenticated, logout, updateUser } = useAuthStore();
  const router = useRouter();

  const avatarInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  const [editingSection, setEditingSection] = useState<string | null>(null);

  // Header
  const [name, setName] = useState("");
  const [headline, setHeadline] = useState("");
  const [location, setLocation] = useState("");

  // Contact
  const [contact, setContact] = useState<ContactInfo>({ email: "", phone: "", website: "", github: "", linkedin: "", twitter: "" });

  // About
  const [about, setAbout] = useState("");

  // Experience
  const [experience, setExperience] = useState<ExperienceItem[]>([]);

  // Education
  const [education, setEducation] = useState<EducationItem[]>([]);

  // Skills
  const [skills, setSkills] = useState<SkillItem[]>([]);

  // Projects
  const [projects, setProjects] = useState<ProjectItem[]>([]);

  // Certifications
  const [certifications, setCertifications] = useState<CertItem[]>([]);

  // Languages
  const [languages, setLanguages] = useState<LanguageItem[]>([]);

  // Awards
  const [awards, setAwards] = useState<AwardItem[]>([]);

  // Volunteer
  const [volunteer, setVolunteer] = useState<VolunteerItem[]>([]);

  // Publications
  const [publications, setPublications] = useState<PublicationItem[]>([]);

  // Interests
  const [interests, setInterests] = useState<string[]>([]);
  const [newInterest, setNewInterest] = useState("");

  // Custom Sections
  const [customSections, setCustomSections] = useState<CustomSection[]>([]);
  const [showAddMenu, setShowAddMenu] = useState(false);

  // Sections visibility
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({
    about: true, experience: true, education: true, skills: true,
    projects: true, certifications: true, languages: true,
    awards: false, volunteer: false, publications: false, interests: false,
  });

  const proficiencyLabels = ["Beginner", "Elementary", "Intermediate", "Advanced", "Professional"];
  const skillLabels = ["Basic", "Familiar", "Proficient", "Advanced", "Expert"];

  useEffect(() => {
    if (!isAuthenticated) { router.push("/login"); return; }
    if (!user) return;
    const isCand = user.role === "CANDIDATE";
    setName(user.name);
    setHeadline(isCand ? "Senior Backend Engineer | Node.js & PostgreSQL Expert" : "Technical Recruiter at TechCorp Inc.");
    setLocation("San Francisco, CA (Remote)");
    setContact({ email: user.email, phone: "+1 (555) 987-6543", website: "arjunmehta.dev", github: "github.com/arjundev", linkedin: "linkedin.com/in/arjunmehta", twitter: "@arjundev" });
    setAbout(isCand
      ? "Passionate backend engineer with 4+ years of experience building scalable microservices and resilient APIs. I thrive in high-performance environments and love solving complex architectural challenges. Always learning, currently diving deep into Kubernetes and distributed systems."
      : "Dedicated technical recruiter focused on finding and nurturing top engineering talent. I believe in skills over resumes and use data-driven insights to make fair, equitable hiring decisions.");
    setExperience(isCand ? [
      { role: "Backend Engineer", company: "TechCorp", duration: "2022 - Present", desc: "Lead the migration from a monolithic architecture to microservices using Node.js and Docker. Reduced API latency by 40%." },
      { role: "Software Developer", company: "StartupX", duration: "2020 - 2022", desc: "Developed core features for a fintech platform. Integrated third-party payment gateways and maintained PostgreSQL databases." }
    ] : [
      { role: "Senior Technical Recruiter", company: "TechCorp", duration: "2021 - Present", desc: "Managing end-to-end engineering hiring. Implemented skills-first assessment platforms." }
    ]);
    setEducation([
      { school: "University of Technology", degree: "Bachelor of Science", field: "Computer Science", year: "2016 - 2020", gpa: "3.8 / 4.0" }
    ]);
    setSkills(isCand
      ? [{ name: "Node.js", level: 5 }, { name: "TypeScript", level: 4 }, { name: "PostgreSQL", level: 4 }, { name: "Docker", level: 3 }, { name: "AWS", level: 4 }, { name: "GraphQL", level: 3 }, { name: "System Design", level: 4 }]
      : [{ name: "Technical Sourcing", level: 5 }, { name: "Interviewing", level: 4 }, { name: "Negotiation", level: 4 }, { name: "DEI", level: 3 }]);
    if (isCand) {
      setProjects([
        { id: "1", name: "AI Verification Platform", desc: "Built a fully automated AI assessment system using Next.js and Python for analyzing developer capabilities.", tech: "Next.js, Python, TensorFlow", link: "github.com/example/ai-verify", isPinned: true },
        { id: "2", name: "E-Commerce Microservices", desc: "Migrated a legacy monolith to a scalable Node.js microservices architecture with event-driven patterns.", tech: "Node.js, Docker, RabbitMQ", link: "github.com/example/ecom", isPinned: false }
      ]);
      setCertifications([
        { id: "1", name: "AWS Certified Solutions Architect", issuer: "Amazon Web Services", date: "Aug 2023", credentialId: "AWS-CSA-7829", image: "" }
      ]);
      setLanguages([
        { id: "1", name: "English", proficiency: 5 },
        { id: "2", name: "Spanish", proficiency: 3 },
        { id: "3", name: "Hindi", proficiency: 4 }
      ]);
      setInterests(["Open Source", "Distributed Systems", "Rock Climbing", "Chess"]);
    }
  }, [isAuthenticated, user, router]);

  const handleSignOut = () => { logout(); router.push("/"); };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => updateUser({ avatar: reader.result as string });
    reader.readAsDataURL(file);
  };
  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => updateUser({ banner: reader.result as string });
    reader.readAsDataURL(file);
  };
  const handleCertImageUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setCertifications(certifications.map(c => c.id === id ? { ...c, image: reader.result as string } : c));
    reader.readAsDataURL(file);
  };

  const saveSection = (section: string) => {
    if (section === "info") updateUser({ name });
    setEditingSection(null);
  };

  const toggleSection = (key: string) => {
    setVisibleSections(prev => ({ ...prev, [key]: !prev[key] }));
    setShowAddMenu(false);
  };

  if (!user) return null;
  const isCandidate = user.role === "CANDIDATE";

  /* ── Section Wrapper ── */
  const Section = ({ id, title, icon, children, removable }: { id: string; title: string; icon?: React.ReactNode; children: React.ReactNode; removable?: boolean }) => (
    <motion.div variants={fadeUp} className="bg-bg-secondary p-6 md:p-8 rounded-3xl shadow-sm border border-border-default group/section relative">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-display font-bold text-text-primary flex items-center gap-3">
          {icon && <span className="text-brand-indigo">{icon}</span>}
          {title}
        </h2>
        <div className="flex items-center gap-2">
          {editingSection === id ? (
            <button onClick={() => saveSection(id)} className="p-2 rounded-lg bg-success/10 text-success hover:bg-success/20 transition-colors" title="Save"><Check className="w-4 h-4" /></button>
          ) : (
            <button onClick={() => setEditingSection(id)} className="p-2 rounded-lg text-text-muted hover:text-brand-indigo hover:bg-brand-indigo/10 transition-colors opacity-0 group-hover/section:opacity-100" title="Edit"><Edit3 className="w-4 h-4" /></button>
          )}
          {removable && (
            <button onClick={() => toggleSection(id)} className="p-2 rounded-lg text-text-muted hover:text-danger hover:bg-danger/10 transition-colors opacity-0 group-hover/section:opacity-100" title="Remove"><Trash2 className="w-4 h-4" /></button>
          )}
        </div>
      </div>
      <div>{children}</div>
    </motion.div>
  );

  const removeItem = <T,>(arr: T[], idx: number) => arr.filter((_, i) => i !== idx);

  return (
    <PageWrapper className="min-h-screen bg-bg-primary pb-20">
      <input ref={avatarInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
      <input ref={bannerInputRef} type="file" accept="image/*" className="hidden" onChange={handleBannerUpload} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 space-y-6">
        
        {/* ═══════════ HEADER CARD ═══════════ */}
        <motion.div variants={fadeUp} initial="initial" animate="animate" className="bg-bg-secondary rounded-2xl shadow-sm border border-border-default overflow-hidden">
          {/* Banner */}
          <div className="h-40 md:h-56 relative group cursor-pointer" onClick={() => bannerInputRef.current?.click()}>
            {user.banner ? <img src={user.banner} alt="Banner" className="w-full h-full object-cover" /> : <div className="w-full h-full bg-brand-gradient" />}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
              <button className="bg-bg-secondary/40 backdrop-blur-md px-4 py-2 rounded-xl text-white font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2"><ImagePlus className="w-4 h-4" />Change Banner</button>
            </div>
          </div>

          <div className="px-6 md:px-10 pb-8 relative group/info">
            {editingSection !== "info" && <button onClick={() => setEditingSection("info")} className="absolute top-4 right-4 p-2 rounded-lg text-text-muted hover:text-brand-indigo hover:bg-brand-indigo/10 transition-colors opacity-0 group-hover/info:opacity-100 z-20"><Edit3 className="w-5 h-5" /></button>}

            <div className="flex flex-col md:flex-row justify-between items-start md:items-end -mt-16 md:-mt-24 mb-6 gap-4">
              {/* Avatar */}
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-[2rem] border-4 border-bg-secondary bg-bg-tertiary flex items-center justify-center shadow-lg overflow-hidden relative z-10 group cursor-pointer" onClick={() => avatarInputRef.current?.click()}>
                {user.avatar ? <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" /> : <div className="w-full h-full bg-brand-gradient flex items-center justify-center text-white text-6xl font-bold">{user.name.charAt(0)}</div>}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center"><Camera className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" /></div>
                {isCandidate && <div className="absolute bottom-2 right-2 bg-bg-secondary p-1 rounded-xl shadow-md border border-border-default"><div className="bg-success/10 text-success flex items-center gap-1.5 px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider"><ShieldCheck className="w-3 h-3" /><span>Verified</span></div></div>}
              </div>
              {/* Buttons */}
              <div className="flex items-center space-x-3 w-full md:w-auto mt-2 md:mt-0">
                {editingSection === "info" && <button onClick={() => saveSection("info")} className="px-5 py-2.5 bg-brand-gradient text-white font-bold rounded-xl shadow-sm hover:shadow-glow transition-all flex items-center gap-2"><Save className="w-4 h-4" /> Save</button>}
                <button onClick={() => setEditingSection("info")} className="px-5 py-2.5 bg-bg-tertiary text-text-primary hover:text-brand-indigo font-bold rounded-xl border border-border-default hover:border-brand-indigo transition-all flex items-center gap-2"><Edit3 className="w-4 h-4" /><span>Edit Profile</span></button>
                <button onClick={handleSignOut} className="px-5 py-2.5 bg-transparent border-2 border-border-default text-text-primary hover:bg-bg-tertiary font-bold rounded-xl transition-all flex items-center gap-2"><LogOut className="w-4 h-4" /><span>Sign Out</span></button>
              </div>
            </div>

            {/* User Info */}
            <div className="max-w-4xl">
              {editingSection === "info" ? (
                <div className="space-y-3 relative z-10">
                  <input value={name} onChange={(e) => setName(e.target.value)} className="w-full text-3xl font-display font-bold text-text-primary bg-bg-primary px-4 py-2 rounded-lg border border-border-default focus:border-brand-indigo outline-none" placeholder="Full Name" />
                  <input value={headline} onChange={(e) => setHeadline(e.target.value)} className="w-full text-lg text-text-secondary bg-bg-primary px-4 py-2 rounded-lg border border-border-default focus:border-brand-indigo outline-none" placeholder="Headline / Title" />
                  <input value={location} onChange={(e) => setLocation(e.target.value)} className="w-full text-sm text-text-muted bg-bg-primary px-4 py-2 rounded-lg border border-border-default focus:border-brand-indigo outline-none" placeholder="Location" />
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                    <input value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} className="text-sm bg-bg-primary px-4 py-2 rounded-lg border border-border-default focus:border-brand-indigo outline-none text-text-primary" placeholder="Email" />
                    <input value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} className="text-sm bg-bg-primary px-4 py-2 rounded-lg border border-border-default focus:border-brand-indigo outline-none text-text-primary" placeholder="Phone" />
                    <input value={contact.website} onChange={(e) => setContact({ ...contact, website: e.target.value })} className="text-sm bg-bg-primary px-4 py-2 rounded-lg border border-border-default focus:border-brand-indigo outline-none text-text-primary" placeholder="Website" />
                    <input value={contact.github} onChange={(e) => setContact({ ...contact, github: e.target.value })} className="text-sm bg-bg-primary px-4 py-2 rounded-lg border border-border-default focus:border-brand-indigo outline-none text-text-primary" placeholder="GitHub URL" />
                    <input value={contact.linkedin} onChange={(e) => setContact({ ...contact, linkedin: e.target.value })} className="text-sm bg-bg-primary px-4 py-2 rounded-lg border border-border-default focus:border-brand-indigo outline-none text-text-primary" placeholder="LinkedIn URL" />
                    <input value={contact.twitter} onChange={(e) => setContact({ ...contact, twitter: e.target.value })} className="text-sm bg-bg-primary px-4 py-2 rounded-lg border border-border-default focus:border-brand-indigo outline-none text-text-primary" placeholder="Twitter Handle" />
                  </div>
                </div>
              ) : (
                <>
                  <h1 className="text-3xl md:text-4xl font-display font-bold text-text-primary flex items-center space-x-4">
                    <span>{name}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest bg-brand-indigo/10 text-brand-indigo px-3 py-1 rounded-md">{user.role}</span>
                  </h1>
                  <p className="text-lg text-text-secondary mt-1 font-medium">{headline}</p>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-text-muted mt-5">
                    <span className="flex items-center gap-1.5 bg-bg-tertiary px-3 py-1.5 rounded-lg border border-border-subtle"><MapPin className="w-4 h-4 text-brand-cyan" />{location}</span>
                    {contact.email && <span className="flex items-center gap-1.5 bg-bg-tertiary px-3 py-1.5 rounded-lg border border-border-subtle"><Mail className="w-4 h-4 text-brand-violet" />{contact.email}</span>}
                    {contact.phone && <span className="flex items-center gap-1.5 bg-bg-tertiary px-3 py-1.5 rounded-lg border border-border-subtle"><Phone className="w-4 h-4 text-success" />{contact.phone}</span>}
                    {contact.website && <a href={`https://${contact.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 bg-bg-tertiary px-3 py-1.5 rounded-lg border border-border-subtle hover:text-brand-indigo transition-colors"><Globe className="w-4 h-4 text-brand-indigo" />{contact.website}</a>}
                  </div>
                  {/* Social Links */}
                  <div className="flex items-center gap-3 mt-3">
                    {contact.github && <a href={`https://${contact.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 bg-bg-tertiary rounded-xl border border-border-subtle hover:border-brand-indigo hover:text-brand-indigo transition-colors text-text-muted text-sm font-bold"><Code2 className="w-4 h-4" />GitHub</a>}
                    {contact.linkedin && <a href={`https://${contact.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 bg-bg-tertiary rounded-xl border border-border-subtle hover:border-brand-indigo hover:text-brand-indigo transition-colors text-text-muted text-sm font-bold"><LinkIcon className="w-4 h-4" />LinkedIn</a>}
                    {contact.twitter && <a href={`https://twitter.com/${contact.twitter.replace('@','')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 bg-bg-tertiary rounded-xl border border-border-subtle hover:border-brand-indigo hover:text-brand-indigo transition-colors text-text-muted text-sm font-bold"><Globe className="w-4 h-4" />Twitter</a>}
                  </div>
                </>
              )}
            </div>
          </div>
        </motion.div>

        {/* ═══════════ TWO COLUMN LAYOUT ═══════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* ── LEFT COLUMN ── */}
          <motion.div variants={staggerContainer} initial="initial" animate="animate" className="lg:col-span-4 space-y-6">

            {/* AI Assessment */}
            {isCandidate && (
              <motion.div variants={fadeUp} className="bg-bg-secondary p-8 rounded-3xl shadow-sm border border-border-default relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-brand-gradient" />
                <h2 className="text-xl font-display font-bold text-text-primary mb-6 flex items-center gap-3"><BrainCircuit className="w-6 h-6 text-brand-indigo" />AI Assessment</h2>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-end mb-2"><span className="text-sm font-bold text-text-secondary uppercase tracking-wider">Capability</span><span className="text-2xl font-bold text-text-primary">87<span className="text-sm text-text-muted">/100</span></span></div>
                    <div className="w-full h-2.5 bg-bg-tertiary rounded-full overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: "87%" }} transition={{ duration: 1.5, delay: 0.3 }} className="h-full bg-brand-indigo rounded-full" /></div>
                  </div>
                  <div>
                    <div className="flex justify-between items-end mb-2"><span className="text-sm font-bold text-text-secondary uppercase tracking-wider">Authenticity</span><span className="text-2xl font-bold text-text-primary">91<span className="text-sm text-text-muted">/100</span></span></div>
                    <div className="w-full h-2.5 bg-bg-tertiary rounded-full overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: "91%" }} transition={{ duration: 1.5, delay: 0.5 }} className="h-full bg-brand-cyan rounded-full" /></div>
                  </div>
                  <div className="pt-4 border-t border-border-subtle">
                    <p className="text-xs text-text-muted leading-relaxed flex items-start gap-2"><Award className="w-4 h-4 text-success shrink-0 mt-0.5" /><span>Profile verified via deep technical interviews and semantic code analysis. Top 15% in backend systems.</span></p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Skills with Proficiency Bars */}
            {visibleSections.skills && (
              <Section id="skills" title="Skills" icon={<Code2 className="w-6 h-6" />}>
                <div className="space-y-4">
                  {skills.map((skill, i) => (
                    <div key={i} className="relative group/skill">
                      {editingSection === "skills" ? (
                        <div className="flex items-center gap-2 bg-bg-primary p-3 rounded-xl border border-border-default">
                          <input value={skill.name} onChange={(e) => { const u = [...skills]; u[i] = { ...u[i], name: e.target.value }; setSkills(u); }} className="flex-1 font-bold text-text-primary bg-transparent outline-none" placeholder="Skill" />
                          <select value={skill.level} onChange={(e) => { const u = [...skills]; u[i] = { ...u[i], level: parseInt(e.target.value) }; setSkills(u); }} className="bg-bg-tertiary border border-border-default rounded-lg px-2 py-1 text-xs text-text-primary outline-none">
                            {skillLabels.map((l, idx) => <option key={idx} value={idx + 1}>{l}</option>)}
                          </select>
                          <button onClick={() => setSkills(removeItem(skills, i))} className="p-1 text-text-muted hover:text-danger"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      ) : (
                        <>
                          <div className="flex justify-between items-center text-sm mb-1.5">
                            <span className="font-bold text-text-primary">{skill.name}</span>
                            <span className="text-xs font-bold text-brand-indigo">{skillLabels[skill.level - 1]}</span>
                          </div>
                          <div className="w-full h-1.5 bg-bg-tertiary rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: `${(skill.level / 5) * 100}%` }} transition={{ duration: 1, delay: i * 0.1 }} className="h-full bg-brand-indigo rounded-full" />
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                  {editingSection === "skills" && (
                    <button onClick={() => setSkills([...skills, { name: "New Skill", level: 1 }])} className="w-full py-2 border-2 border-dashed border-border-default rounded-xl text-sm font-bold text-text-muted hover:text-brand-indigo hover:border-brand-indigo transition-colors flex items-center justify-center gap-2"><Plus className="w-4 h-4" />Add Skill</button>
                  )}
                </div>
              </Section>
            )}

            {/* Languages */}
            {visibleSections.languages && (
              <Section id="languages" title="Languages" icon={<Globe className="w-6 h-6" />} removable>
                <div className="space-y-5">
                  {languages.map((lang, i) => (
                    <div key={lang.id}>
                      {editingSection === "languages" ? (
                        <div className="flex flex-col gap-2 bg-bg-primary p-3 rounded-xl border border-border-default">
                          <div className="flex justify-between items-center gap-2">
                            <input value={lang.name} onChange={(e) => setLanguages(languages.map((l, idx) => idx === i ? { ...l, name: e.target.value } : l))} className="font-bold text-text-primary bg-transparent outline-none flex-1" placeholder="Language" />
                            <button onClick={() => setLanguages(removeItem(languages, i))} className="p-1 text-text-muted hover:text-danger"><Trash2 className="w-4 h-4" /></button>
                          </div>
                          <input type="range" min="1" max="5" step="1" value={lang.proficiency} onChange={(e) => setLanguages(languages.map((l, idx) => idx === i ? { ...l, proficiency: parseInt(e.target.value) } : l))} className="w-full cursor-pointer accent-brand-indigo" />
                          <div className="text-xs text-text-muted text-right font-medium">{proficiencyLabels[lang.proficiency - 1]}</div>
                        </div>
                      ) : (
                        <>
                          <div className="flex justify-between text-sm mb-1.5 font-bold">
                            <span className="text-text-primary">{lang.name}</span>
                            <span className="text-brand-indigo">{proficiencyLabels[lang.proficiency - 1]}</span>
                          </div>
                          <div className="w-full h-2 bg-bg-tertiary rounded-full overflow-hidden flex shadow-inner">
                            {[1, 2, 3, 4, 5].map((level) => (
                              <div key={level} className={`flex-1 transition-all duration-500 ${level <= lang.proficiency ? 'bg-brand-cyan' : 'bg-transparent'} ${level < 5 ? 'border-r border-bg-secondary' : ''}`} />
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                  {editingSection === "languages" && (
                    <button onClick={() => setLanguages([...languages, { id: Date.now().toString(), name: "New Language", proficiency: 1 }])} className="w-full py-2 border-2 border-dashed border-border-default rounded-xl text-sm font-bold text-text-muted hover:text-brand-indigo hover:border-brand-indigo transition-colors flex items-center justify-center gap-2"><Plus className="w-4 h-4" />Add Language</button>
                  )}
                </div>
              </Section>
            )}

            {/* Interests */}
            {visibleSections.interests && (
              <Section id="interests" title="Interests" icon={<Heart className="w-6 h-6" />} removable>
                <div className="flex flex-wrap gap-2.5">
                  {interests.map((item, i) => (
                    <span key={i} className="relative group/tag px-4 py-2 bg-bg-primary text-text-primary border border-border-default rounded-xl text-sm font-bold shadow-sm">
                      {item}
                      {editingSection === "interests" && <button onClick={() => setInterests(removeItem(interests, i))} className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-danger text-white rounded-full flex items-center justify-center opacity-0 group-hover/tag:opacity-100 transition-opacity z-10"><X className="w-3 h-3" /></button>}
                    </span>
                  ))}
                  {editingSection === "interests" && (
                    <form onSubmit={(e) => { e.preventDefault(); if (newInterest.trim()) { setInterests([...interests, newInterest.trim()]); setNewInterest(""); }}} className="flex items-center gap-2 mt-2 w-full">
                      <input value={newInterest} onChange={(e) => setNewInterest(e.target.value)} placeholder="Add interest..." className="flex-1 px-4 py-2 bg-bg-primary border border-dashed border-border-default rounded-xl text-sm text-text-primary font-bold outline-none focus:border-brand-indigo" />
                      <button type="submit" className="p-2 rounded-xl bg-brand-indigo/10 text-brand-indigo hover:bg-brand-indigo/20 transition-colors"><Plus className="w-5 h-5" /></button>
                    </form>
                  )}
                </div>
              </Section>
            )}

            {/* Profile Details */}
            <motion.div variants={fadeUp} className="bg-bg-secondary p-6 rounded-3xl shadow-sm border border-border-default">
              <h2 className="text-lg font-display font-bold text-text-primary mb-4 flex items-center gap-3"><FileText className="w-5 h-5 text-brand-indigo" />Profile Details</h2>
              <div className="space-y-4">
                <div><p className="text-xs font-bold text-text-muted uppercase mb-1">Email</p><p className="text-sm font-semibold text-text-primary">{user.email}</p></div>
                <div><p className="text-xs font-bold text-text-muted uppercase mb-1">Account ID</p><p className="text-xs font-mono text-text-secondary bg-bg-tertiary p-2 rounded-md border border-border-subtle break-all">{user.id}</p></div>
                <div><p className="text-xs font-bold text-text-muted uppercase mb-1">Role</p><p className="text-sm font-semibold text-brand-indigo">{user.role}</p></div>
              </div>
            </motion.div>

          </motion.div>

          {/* ── RIGHT COLUMN ── */}
          <motion.div variants={staggerContainer} initial="initial" animate="animate" className="lg:col-span-8 space-y-8">

            {/* Professional Summary */}
            {visibleSections.about && (
              <div className="relative group/section">
                <motion.div variants={fadeUp} className="bg-bg-secondary p-8 md:p-10 rounded-3xl shadow-sm border border-border-default relative">
                  <div className="absolute -top-4 -left-4 text-brand-indigo/10 pointer-events-none"><svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg></div>
                  <div className="flex items-center justify-between mb-6 ml-6 relative z-10">
                    <h2 className="text-xl font-display font-bold text-text-primary">Professional Summary</h2>
                    <div className="flex items-center gap-2">
                      {editingSection === "about" ? (
                        <button onClick={() => saveSection("about")} className="p-2 rounded-lg bg-success/10 text-success hover:bg-success/20 transition-colors"><Check className="w-4 h-4" /></button>
                      ) : (
                        <button onClick={() => setEditingSection("about")} className="p-2 rounded-lg text-text-muted hover:text-brand-indigo hover:bg-brand-indigo/10 transition-colors opacity-0 group-hover/section:opacity-100"><Edit3 className="w-4 h-4" /></button>
                      )}
                    </div>
                  </div>
                  <div className="ml-6 relative z-10">
                    {editingSection === "about" ? (
                      <textarea value={about} onChange={(e) => setAbout(e.target.value)} rows={5} className="w-full bg-bg-primary px-4 py-3 rounded-xl border border-border-default focus:border-brand-indigo outline-none text-base text-text-primary resize-none leading-relaxed" />
                    ) : (
                      <p className="text-text-secondary leading-relaxed text-base">{about}</p>
                    )}
                  </div>
                </motion.div>
              </div>
            )}

            {/* Career History */}
            {visibleSections.experience && (
              <Section id="experience" title="Career History" icon={<Briefcase className="w-6 h-6" />}>
                <div className="space-y-6">
                  {experience.map((exp, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-bg-tertiary flex items-center justify-center shrink-0 border border-border-subtle mt-1"><Briefcase className="w-5 h-5 text-text-muted" /></div>
                      {editingSection === "experience" ? (
                        <div className="flex-1 space-y-2 bg-bg-primary p-5 rounded-2xl border border-border-subtle relative">
                          <button onClick={() => setExperience(removeItem(experience, i))} className="absolute top-2 right-2 p-1.5 rounded-md text-text-muted hover:text-danger hover:bg-danger/10 transition-colors"><Trash2 className="w-4 h-4" /></button>
                          <input value={exp.role} onChange={(e) => { const u = [...experience]; u[i] = { ...u[i], role: e.target.value }; setExperience(u); }} className="font-bold text-lg text-text-primary bg-transparent border-b border-border-default focus:border-brand-indigo outline-none w-[90%]" placeholder="Job Title" />
                          <input value={exp.company} onChange={(e) => { const u = [...experience]; u[i] = { ...u[i], company: e.target.value }; setExperience(u); }} className="text-text-primary font-medium bg-transparent border-b border-border-default focus:border-brand-indigo outline-none w-[90%]" placeholder="Company Name" />
                          <input value={exp.duration} onChange={(e) => { const u = [...experience]; u[i] = { ...u[i], duration: e.target.value }; setExperience(u); }} className="text-sm text-text-muted bg-transparent border-b border-border-default focus:border-brand-indigo outline-none w-full" placeholder="Duration (e.g. Jan 2022 - Present)" />
                          <textarea value={exp.desc} onChange={(e) => { const u = [...experience]; u[i] = { ...u[i], desc: e.target.value }; setExperience(u); }} rows={3} className="w-full text-sm text-text-secondary bg-transparent border-b border-border-default focus:border-brand-indigo outline-none resize-none mt-2" placeholder="Description of responsibilities and achievements" />
                        </div>
                      ) : (
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                            <h3 className="font-bold text-text-primary text-lg">{exp.role}</h3>
                            <span className="text-xs font-bold text-brand-indigo bg-brand-indigo/10 px-3 py-1 rounded-full whitespace-nowrap w-max">{exp.duration}</span>
                          </div>
                          <p className="text-text-primary font-bold mb-2">{exp.company}</p>
                          <p className="text-text-secondary text-sm leading-relaxed">{exp.desc}</p>
                        </div>
                      )}
                    </div>
                  ))}
                  {editingSection === "experience" && <button onClick={() => setExperience([...experience, { role: "", company: "", duration: "", desc: "" }])} className="w-full py-3 border-2 border-dashed border-border-default rounded-xl text-sm font-bold text-text-muted hover:text-brand-indigo hover:border-brand-indigo transition-colors flex items-center justify-center gap-2"><Plus className="w-4 h-4" />Add Experience</button>}
                </div>
              </Section>
            )}

            {/* Education */}
            {visibleSections.education && (
              <Section id="education" title="Education" icon={<GraduationCap className="w-6 h-6" />}>
                <div className="space-y-6">
                  {education.map((edu, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-bg-tertiary flex items-center justify-center shrink-0 border border-border-subtle mt-1"><GraduationCap className="w-5 h-5 text-text-muted" /></div>
                      {editingSection === "education" ? (
                        <div className="flex-1 space-y-2 bg-bg-primary p-5 rounded-2xl border border-border-subtle relative">
                          <button onClick={() => setEducation(removeItem(education, i))} className="absolute top-2 right-2 p-1.5 rounded-md text-text-muted hover:text-danger hover:bg-danger/10 transition-colors"><Trash2 className="w-4 h-4" /></button>
                          <input value={edu.school} onChange={(e) => { const u = [...education]; u[i] = { ...u[i], school: e.target.value }; setEducation(u); }} className="font-bold text-lg text-text-primary bg-transparent border-b border-border-default focus:border-brand-indigo outline-none w-[90%]" placeholder="School / University" />
                          <input value={edu.degree} onChange={(e) => { const u = [...education]; u[i] = { ...u[i], degree: e.target.value }; setEducation(u); }} className="text-text-primary font-medium bg-transparent border-b border-border-default focus:border-brand-indigo outline-none w-[90%]" placeholder="Degree (e.g. Bachelor of Science)" />
                          <input value={edu.field} onChange={(e) => { const u = [...education]; u[i] = { ...u[i], field: e.target.value }; setEducation(u); }} className="text-sm text-text-secondary bg-transparent border-b border-border-default focus:border-brand-indigo outline-none w-full" placeholder="Field of Study (e.g. Computer Science)" />
                          <div className="flex gap-3">
                            <input value={edu.year} onChange={(e) => { const u = [...education]; u[i] = { ...u[i], year: e.target.value }; setEducation(u); }} className="text-sm text-text-muted bg-transparent border-b border-border-default focus:border-brand-indigo outline-none flex-1" placeholder="Years (2016 - 2020)" />
                            <input value={edu.gpa} onChange={(e) => { const u = [...education]; u[i] = { ...u[i], gpa: e.target.value }; setEducation(u); }} className="text-sm text-text-muted bg-transparent border-b border-border-default focus:border-brand-indigo outline-none flex-1" placeholder="GPA (3.8 / 4.0)" />
                          </div>
                        </div>
                      ) : (
                        <div className="flex-1">
                          <h3 className="font-bold text-text-primary text-lg">{edu.school}</h3>
                          <p className="text-text-primary font-medium">{edu.degree} — {edu.field}</p>
                          <div className="flex items-center gap-4 text-sm text-text-muted mt-1">
                            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{edu.year}</span>
                            {edu.gpa && <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-brand-indigo" />GPA: {edu.gpa}</span>}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  {editingSection === "education" && <button onClick={() => setEducation([...education, { school: "", degree: "", field: "", year: "", gpa: "" }])} className="w-full py-3 border-2 border-dashed border-border-default rounded-xl text-sm font-bold text-text-muted hover:text-brand-indigo hover:border-brand-indigo transition-colors flex items-center justify-center gap-2"><Plus className="w-4 h-4" />Add Education</button>}
                </div>
              </Section>
            )}

            {/* Projects */}
            {visibleSections.projects && (
              <Section id="projects" title="Projects" icon={<FolderOpen className="w-6 h-6" />} removable>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {projects.map((proj, i) => (
                    <div key={proj.id} className={cn("bg-bg-primary p-6 rounded-2xl border transition-colors relative", proj.isPinned ? "border-brand-indigo/30 shadow-md" : "border-border-default")}>
                      {editingSection === "projects" ? (
                        <div className="space-y-3">
                          <div className="flex justify-between items-start gap-2">
                            <input value={proj.name} onChange={(e) => setProjects(projects.map((p, idx) => idx === i ? { ...p, name: e.target.value } : p))} className="font-bold text-lg text-text-primary bg-transparent outline-none w-[80%] border-b border-border-default focus:border-brand-indigo" placeholder="Project Name" />
                            <button onClick={() => setProjects(removeItem(projects, i))} className="p-1.5 bg-danger/10 text-danger rounded-md hover:bg-danger/20"><Trash2 className="w-4 h-4" /></button>
                          </div>
                          <textarea value={proj.desc} onChange={(e) => setProjects(projects.map((p, idx) => idx === i ? { ...p, desc: e.target.value } : p))} rows={2} className="w-full text-sm text-text-secondary bg-transparent outline-none resize-none border-b border-border-default focus:border-brand-indigo" placeholder="Description" />
                          <input value={proj.tech} onChange={(e) => setProjects(projects.map((p, idx) => idx === i ? { ...p, tech: e.target.value } : p))} className="text-xs text-text-muted bg-transparent outline-none w-full border-b border-border-default focus:border-brand-indigo" placeholder="Tech Stack (comma separated)" />
                          <input value={proj.link} onChange={(e) => setProjects(projects.map((p, idx) => idx === i ? { ...p, link: e.target.value } : p))} className="text-sm text-brand-indigo bg-transparent outline-none w-full border-b border-border-default focus:border-brand-indigo" placeholder="Project Link (URL)" />
                          <label className="flex items-center gap-2 text-sm text-text-muted cursor-pointer mt-2"><input type="checkbox" checked={proj.isPinned} onChange={(e) => setProjects(projects.map((p, idx) => idx === i ? { ...p, isPinned: e.target.checked } : p))} className="accent-brand-indigo w-4 h-4" />Pin Project</label>
                        </div>
                      ) : (
                        <>
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-lg text-text-primary leading-tight">{proj.name}</h3>
                            {proj.isPinned && <Star className="w-4 h-4 text-brand-indigo shrink-0 mt-1 fill-brand-indigo" />}
                          </div>
                          <p className="text-sm text-text-secondary leading-relaxed mb-3">{proj.desc}</p>
                          {proj.tech && <div className="flex flex-wrap gap-1.5 mb-3">{proj.tech.split(",").map((t, ti) => <span key={ti} className="text-[11px] font-bold px-2 py-0.5 bg-bg-tertiary text-text-muted rounded-md border border-border-subtle">{t.trim()}</span>)}</div>}
                          {proj.link && <a href={`https://${proj.link.replace('https://','')}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-indigo hover:text-brand-violet transition-colors">View Project<ExternalLink className="w-3.5 h-3.5" /></a>}
                        </>
                      )}
                    </div>
                  ))}
                  {editingSection === "projects" && <button onClick={() => setProjects([...projects, { id: Date.now().toString(), name: "", desc: "", tech: "", link: "", isPinned: false }])} className="min-h-[160px] border-2 border-dashed border-border-default rounded-2xl flex flex-col items-center justify-center gap-2 text-text-muted hover:text-brand-indigo hover:border-brand-indigo transition-colors hover:bg-brand-indigo/5"><Plus className="w-6 h-6" /><span className="font-bold text-sm">Add Project</span></button>}
                </div>
              </Section>
            )}

            {/* Certifications */}
            {visibleSections.certifications && (
              <Section id="certifications" title="Certifications" icon={<Award className="w-6 h-6" />} removable>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {certifications.map((cert, i) => (
                    <div key={cert.id} className="bg-bg-primary p-4 rounded-2xl border border-border-default flex gap-4">
                      {editingSection === "certifications" ? (
                        <div className="w-full flex gap-4 relative pr-6">
                          <button onClick={() => setCertifications(removeItem(certifications, i))} className="absolute top-0 right-0 p-1 text-text-muted hover:text-danger"><Trash2 className="w-4 h-4" /></button>
                          <label className="w-16 h-16 bg-bg-tertiary rounded-xl shrink-0 flex items-center justify-center cursor-pointer overflow-hidden border border-dashed border-border-default hover:border-brand-indigo transition-colors">
                            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleCertImageUpload(cert.id, e)} />
                            {cert.image ? <img src={cert.image} className="w-full h-full object-cover" /> : <ImageIcon className="w-5 h-5 text-text-muted" />}
                          </label>
                          <div className="flex-1 space-y-2">
                            <input value={cert.name} onChange={(e) => setCertifications(certifications.map((c, idx) => idx === i ? { ...c, name: e.target.value } : c))} className="font-bold text-text-primary bg-transparent border-b border-border-default focus:border-brand-indigo outline-none w-full" placeholder="Certification Name" />
                            <input value={cert.issuer} onChange={(e) => setCertifications(certifications.map((c, idx) => idx === i ? { ...c, issuer: e.target.value } : c))} className="text-sm text-text-secondary bg-transparent border-b border-border-default focus:border-brand-indigo outline-none w-full" placeholder="Issuer" />
                            <input value={cert.date} onChange={(e) => setCertifications(certifications.map((c, idx) => idx === i ? { ...c, date: e.target.value } : c))} className="text-xs text-text-muted bg-transparent border-b border-border-default focus:border-brand-indigo outline-none w-full" placeholder="Date" />
                            <input value={cert.credentialId} onChange={(e) => setCertifications(certifications.map((c, idx) => idx === i ? { ...c, credentialId: e.target.value } : c))} className="text-xs text-text-muted bg-transparent border-b border-border-default focus:border-brand-indigo outline-none w-full" placeholder="Credential ID" />
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="w-16 h-16 bg-bg-tertiary rounded-xl shrink-0 flex items-center justify-center border border-border-subtle overflow-hidden">
                            {cert.image ? <img src={cert.image} className="w-full h-full object-cover" /> : <Award className="w-6 h-6 text-text-muted" />}
                          </div>
                          <div className="pt-1">
                            <h3 className="font-bold text-text-primary leading-tight mb-1">{cert.name}</h3>
                            <p className="text-sm text-text-secondary">{cert.issuer}</p>
                            <p className="text-xs text-brand-indigo font-bold mt-1">{cert.date}</p>
                            {cert.credentialId && <p className="text-[11px] text-text-muted mt-0.5">ID: {cert.credentialId}</p>}
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                  {editingSection === "certifications" && <button onClick={() => setCertifications([...certifications, { id: Date.now().toString(), name: "", issuer: "", date: "", credentialId: "", image: "" }])} className="min-h-[100px] border-2 border-dashed border-border-default rounded-2xl flex flex-col items-center justify-center gap-2 text-text-muted hover:text-brand-indigo hover:border-brand-indigo transition-colors hover:bg-brand-indigo/5"><Plus className="w-5 h-5" /><span className="font-bold text-sm">Add Certification</span></button>}
                </div>
              </Section>
            )}

            {/* Awards & Achievements */}
            {visibleSections.awards && (
              <Section id="awards" title="Awards & Achievements" icon={<Trophy className="w-6 h-6" />} removable>
                <div className="space-y-5">
                  {awards.map((aw, i) => (
                    <div key={aw.id} className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-brand-indigo/10 flex items-center justify-center shrink-0 mt-1"><Trophy className="w-5 h-5 text-brand-indigo" /></div>
                      {editingSection === "awards" ? (
                        <div className="flex-1 space-y-2 bg-bg-primary p-4 rounded-xl border border-border-subtle relative">
                          <button onClick={() => setAwards(removeItem(awards, i))} className="absolute top-2 right-2 p-1 text-text-muted hover:text-danger"><Trash2 className="w-4 h-4" /></button>
                          <input value={aw.title} onChange={(e) => setAwards(awards.map((a, idx) => idx === i ? { ...a, title: e.target.value } : a))} className="font-bold text-text-primary bg-transparent border-b border-border-default focus:border-brand-indigo outline-none w-[90%]" placeholder="Award Title" />
                          <input value={aw.issuer} onChange={(e) => setAwards(awards.map((a, idx) => idx === i ? { ...a, issuer: e.target.value } : a))} className="text-sm text-text-secondary bg-transparent border-b border-border-default focus:border-brand-indigo outline-none w-full" placeholder="Issuing Organization" />
                          <input value={aw.date} onChange={(e) => setAwards(awards.map((a, idx) => idx === i ? { ...a, date: e.target.value } : a))} className="text-xs text-text-muted bg-transparent border-b border-border-default focus:border-brand-indigo outline-none w-full" placeholder="Date" />
                          <textarea value={aw.desc} onChange={(e) => setAwards(awards.map((a, idx) => idx === i ? { ...a, desc: e.target.value } : a))} rows={2} className="w-full text-sm text-text-secondary bg-transparent border-b border-border-default focus:border-brand-indigo outline-none resize-none" placeholder="Description" />
                        </div>
                      ) : (
                        <div className="flex-1">
                          <h3 className="font-bold text-text-primary">{aw.title}</h3>
                          <p className="text-sm text-text-secondary">{aw.issuer} • {aw.date}</p>
                          {aw.desc && <p className="text-sm text-text-muted mt-1 leading-relaxed">{aw.desc}</p>}
                        </div>
                      )}
                    </div>
                  ))}
                  {editingSection === "awards" && <button onClick={() => setAwards([...awards, { id: Date.now().toString(), title: "", issuer: "", date: "", desc: "" }])} className="w-full py-3 border-2 border-dashed border-border-default rounded-xl text-sm font-bold text-text-muted hover:text-brand-indigo hover:border-brand-indigo transition-colors flex items-center justify-center gap-2"><Plus className="w-4 h-4" />Add Award</button>}
                </div>
              </Section>
            )}

            {/* Volunteer Experience */}
            {visibleSections.volunteer && (
              <Section id="volunteer" title="Volunteer Experience" icon={<Users className="w-6 h-6" />} removable>
                <div className="space-y-6">
                  {volunteer.map((vol, i) => (
                    <div key={vol.id} className="flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-bg-tertiary flex items-center justify-center shrink-0 border border-border-subtle mt-1"><Users className="w-5 h-5 text-text-muted" /></div>
                      {editingSection === "volunteer" ? (
                        <div className="flex-1 space-y-2 bg-bg-primary p-5 rounded-2xl border border-border-subtle relative">
                          <button onClick={() => setVolunteer(removeItem(volunteer, i))} className="absolute top-2 right-2 p-1 text-text-muted hover:text-danger"><Trash2 className="w-4 h-4" /></button>
                          <input value={vol.role} onChange={(e) => setVolunteer(volunteer.map((v, idx) => idx === i ? { ...v, role: e.target.value } : v))} className="font-bold text-text-primary bg-transparent border-b border-border-default focus:border-brand-indigo outline-none w-[90%]" placeholder="Role" />
                          <input value={vol.org} onChange={(e) => setVolunteer(volunteer.map((v, idx) => idx === i ? { ...v, org: e.target.value } : v))} className="text-text-primary font-medium bg-transparent border-b border-border-default focus:border-brand-indigo outline-none w-[90%]" placeholder="Organization" />
                          <input value={vol.duration} onChange={(e) => setVolunteer(volunteer.map((v, idx) => idx === i ? { ...v, duration: e.target.value } : v))} className="text-sm text-text-muted bg-transparent border-b border-border-default focus:border-brand-indigo outline-none w-full" placeholder="Duration" />
                          <textarea value={vol.desc} onChange={(e) => setVolunteer(volunteer.map((v, idx) => idx === i ? { ...v, desc: e.target.value } : v))} rows={2} className="w-full text-sm text-text-secondary bg-transparent border-b border-border-default focus:border-brand-indigo outline-none resize-none" placeholder="Description" />
                        </div>
                      ) : (
                        <div className="flex-1">
                          <h3 className="font-bold text-text-primary text-lg">{vol.role}</h3>
                          <p className="text-text-primary font-medium">{vol.org}</p>
                          <p className="text-sm text-text-muted mt-1 flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{vol.duration}</p>
                          {vol.desc && <p className="text-sm text-text-secondary mt-2 leading-relaxed">{vol.desc}</p>}
                        </div>
                      )}
                    </div>
                  ))}
                  {editingSection === "volunteer" && <button onClick={() => setVolunteer([...volunteer, { id: Date.now().toString(), role: "", org: "", duration: "", desc: "" }])} className="w-full py-3 border-2 border-dashed border-border-default rounded-xl text-sm font-bold text-text-muted hover:text-brand-indigo hover:border-brand-indigo transition-colors flex items-center justify-center gap-2"><Plus className="w-4 h-4" />Add Volunteer</button>}
                </div>
              </Section>
            )}

            {/* Publications */}
            {visibleSections.publications && (
              <Section id="publications" title="Publications" icon={<BookOpen className="w-6 h-6" />} removable>
                <div className="space-y-4">
                  {publications.map((pub, i) => (
                    <div key={pub.id} className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-bg-tertiary flex items-center justify-center shrink-0 border border-border-subtle mt-1"><BookOpen className="w-4 h-4 text-text-muted" /></div>
                      {editingSection === "publications" ? (
                        <div className="flex-1 space-y-2 bg-bg-primary p-4 rounded-xl border border-border-subtle relative">
                          <button onClick={() => setPublications(removeItem(publications, i))} className="absolute top-2 right-2 p-1 text-text-muted hover:text-danger"><Trash2 className="w-4 h-4" /></button>
                          <input value={pub.title} onChange={(e) => setPublications(publications.map((p, idx) => idx === i ? { ...p, title: e.target.value } : p))} className="font-bold text-text-primary bg-transparent border-b border-border-default focus:border-brand-indigo outline-none w-[90%]" placeholder="Title" />
                          <input value={pub.publisher} onChange={(e) => setPublications(publications.map((p, idx) => idx === i ? { ...p, publisher: e.target.value } : p))} className="text-sm text-text-secondary bg-transparent border-b border-border-default focus:border-brand-indigo outline-none w-full" placeholder="Publisher / Journal" />
                          <input value={pub.date} onChange={(e) => setPublications(publications.map((p, idx) => idx === i ? { ...p, date: e.target.value } : p))} className="text-xs text-text-muted bg-transparent border-b border-border-default focus:border-brand-indigo outline-none w-full" placeholder="Date" />
                          <input value={pub.link} onChange={(e) => setPublications(publications.map((p, idx) => idx === i ? { ...p, link: e.target.value } : p))} className="text-sm text-brand-indigo bg-transparent border-b border-border-default focus:border-brand-indigo outline-none w-full" placeholder="Link" />
                        </div>
                      ) : (
                        <div className="flex-1">
                          <h3 className="font-bold text-text-primary">{pub.title}</h3>
                          <p className="text-sm text-text-secondary">{pub.publisher} • {pub.date}</p>
                          {pub.link && <a href={`https://${pub.link.replace('https://','')}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-bold text-brand-indigo hover:text-brand-violet mt-1 transition-colors">Read<ExternalLink className="w-3 h-3" /></a>}
                        </div>
                      )}
                    </div>
                  ))}
                  {editingSection === "publications" && <button onClick={() => setPublications([...publications, { id: Date.now().toString(), title: "", publisher: "", date: "", link: "" }])} className="w-full py-3 border-2 border-dashed border-border-default rounded-xl text-sm font-bold text-text-muted hover:text-brand-indigo hover:border-brand-indigo transition-colors flex items-center justify-center gap-2"><Plus className="w-4 h-4" />Add Publication</button>}
                </div>
              </Section>
            )}

            {/* Custom Sections */}
            {customSections.map((section) => (
              <Section key={section.id} id={`custom-${section.id}`} title={section.title} icon={<FolderOpen className="w-6 h-6" />} removable>
                {editingSection === `custom-${section.id}` ? (
                  <div className="space-y-3">
                    <input value={section.title} onChange={(e) => setCustomSections(customSections.map((s) => s.id === section.id ? { ...s, title: e.target.value } : s))} className="w-full font-bold text-xl text-text-primary bg-bg-primary px-4 py-2 rounded-lg border border-border-default focus:border-brand-indigo outline-none" placeholder="Section Title" />
                    <textarea value={section.content} onChange={(e) => setCustomSections(customSections.map((s) => s.id === section.id ? { ...s, content: e.target.value } : s))} rows={4} className="w-full text-base text-text-primary bg-bg-primary px-4 py-3 rounded-xl border border-border-default focus:border-brand-indigo outline-none resize-none leading-relaxed" />
                  </div>
                ) : (
                  <p className="text-text-secondary leading-relaxed text-base">{section.content}</p>
                )}
              </Section>
            ))}

            {/* Add Section Menu */}
            <div className="relative mt-8">
              <button onClick={() => setShowAddMenu(!showAddMenu)} className="w-full py-5 border-2 border-dashed border-border-default rounded-2xl text-sm font-bold text-text-muted hover:text-brand-indigo hover:border-brand-indigo hover:bg-brand-indigo/5 transition-all flex items-center justify-center gap-2"><Plus className="w-5 h-5" />Add Section</button>
              <AnimatePresence>
                {showAddMenu && (
                  <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="absolute left-0 right-0 bottom-full mb-2 bg-bg-secondary rounded-xl border border-border-default shadow-lg z-20 overflow-hidden">
                    {[
                      { key: "awards", label: "Awards & Achievements", icon: <Trophy className="w-4 h-4" /> },
                      { key: "volunteer", label: "Volunteer Experience", icon: <Users className="w-4 h-4" /> },
                      { key: "publications", label: "Publications", icon: <BookOpen className="w-4 h-4" /> },
                      { key: "interests", label: "Interests & Hobbies", icon: <Heart className="w-4 h-4" /> },
                      { key: "custom", label: "Custom Section", icon: <Plus className="w-4 h-4" /> },
                    ].filter(item => item.key === "custom" || !visibleSections[item.key]).map((item, i) => (
                      <button key={i} onClick={() => { if (item.key === "custom") { setCustomSections([...customSections, { id: Date.now().toString(), title: "New Section", content: "Add content..." }]); setShowAddMenu(false); } else { toggleSection(item.key); } }} className="w-full flex items-center gap-3 px-5 py-3 text-sm font-semibold text-text-secondary hover:bg-bg-tertiary hover:text-brand-indigo transition-colors text-left">{item.icon}{item.label}</button>
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

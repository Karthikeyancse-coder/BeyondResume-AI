"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Camera, ImagePlus, Edit3, Save, LogOut, Building, Link as LinkIcon, ShieldCheck } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import PageWrapper from "@/components/layout/PageWrapper";
import { toast } from "sonner";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
};

export default function RecruiterProfilePage() {
  const { user, isAuthenticated, logout, updateUser } = useAuthStore();
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  
  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyUrl, setCompanyUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");

  const avatarInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isAuthenticated) { router.push("/login"); return; }
    if (user?.role !== "RECRUITER") { router.push("/dashboard"); return; }
    
    if (user) {
      setName(user.name || "");
      setCompanyName(user.companyName || "");
      setCompanyUrl(user.companyUrl || "");
      setLinkedinUrl(user.linkedinUrl || "");
    }
  }, [isAuthenticated, user, router]);

  if (!user || user.role !== "RECRUITER") return null;

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

  const handleSave = () => {
    updateUser({ name, companyName, companyUrl, linkedinUrl });
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  return (
    <PageWrapper className="min-h-screen bg-bg-primary pb-20 lg:pb-0">
      <input ref={avatarInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
      <input ref={bannerInputRef} type="file" accept="image/*" className="hidden" onChange={handleBannerUpload} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 space-y-6">
        
        {/* ═══════════ HEADER CARD ═══════════ */}
        <motion.div variants={fadeUp} initial="initial" animate="animate" className="bg-bg-secondary rounded-2xl shadow-sm border border-border-default overflow-hidden">
          {/* Banner */}
          <div className="h-32 sm:h-40 md:h-56 relative group cursor-pointer bg-black" onClick={() => bannerInputRef.current?.click()}>
            {user.banner ? (
              <img src={user.banner} alt="Banner" className="w-full h-full object-cover object-center opacity-80" />
            ) : (
              <div className="w-full h-full bg-brand-gradient opacity-80" />
            )}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
              <button className="bg-bg-secondary/40 backdrop-blur-md px-4 py-2 rounded-xl text-white font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                <ImagePlus className="w-4 h-4" /> Change Banner
              </button>
            </div>
          </div>

          <div className="px-6 md:px-10 pb-8 relative group/info">
            {!isEditing && (
              <button onClick={() => setIsEditing(true)} className="absolute top-4 right-4 p-2 rounded-lg text-text-muted hover:text-brand-indigo hover:bg-brand-indigo/10 transition-colors opacity-0 group-hover/info:opacity-100 z-20">
                <Edit3 className="w-5 h-5" />
              </button>
            )}

            <div className="flex flex-col md:flex-row justify-between items-start md:items-end -mt-12 md:-mt-24 mb-6 gap-4">
              {/* Avatar */}
              <div className="w-24 h-24 md:w-40 md:h-40 rounded-[2rem] border-4 border-bg-secondary bg-bg-tertiary flex items-center justify-center shadow-lg overflow-hidden relative z-10 group cursor-pointer shrink-0" onClick={() => avatarInputRef.current?.click()}>
                {user.avatar ? (
                  <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-brand-gradient flex items-center justify-center text-white text-4xl md:text-6xl font-bold">
                    {user.name.charAt(0)}
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <Camera className="w-6 h-6 md:w-8 md:h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
              
              {/* Buttons */}
              <div className="flex items-center gap-2 md:gap-3 w-full md:w-auto mt-4 md:mt-0">
                {isEditing ? (
                  <button onClick={handleSave} className="flex-1 md:flex-none justify-center px-4 md:px-6 py-2.5 bg-brand-gradient text-white font-bold rounded-xl shadow-md hover:shadow-glow transition-all flex items-center gap-2 whitespace-nowrap">
                    <Save className="w-4 h-4" /> Save
                  </button>
                ) : (
                  <>
                    <button onClick={() => setIsEditing(true)} className="flex-1 md:flex-none justify-center px-4 md:px-6 py-2.5 bg-bg-tertiary text-text-primary hover:text-brand-indigo font-bold rounded-xl border border-border-default hover:border-brand-indigo transition-all flex items-center gap-2 whitespace-nowrap">
                      <Edit3 className="w-4 h-4" /> Edit Profile
                    </button>
                    <button onClick={handleSignOut} className="flex-1 md:flex-none justify-center px-4 md:px-6 py-2.5 bg-transparent border-2 border-border-default text-text-primary hover:bg-bg-tertiary font-bold rounded-xl transition-all flex items-center gap-2 whitespace-nowrap">
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Recruiter Info */}
            <div className="max-w-3xl">
              {isEditing ? (
                <div className="space-y-4 relative z-10">
                  <input value={name} onChange={(e) => setName(e.target.value)} className="w-full text-3xl font-display font-bold text-text-primary bg-bg-primary px-4 py-2 rounded-lg border border-border-default focus:border-brand-indigo outline-none" placeholder="Your Full Name" />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-text-muted uppercase tracking-wider pl-1">Company Name</label>
                      <input value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="w-full text-sm bg-bg-primary px-4 py-2.5 rounded-lg border border-border-default focus:border-brand-indigo outline-none text-text-primary" placeholder="e.g. Google" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-text-muted uppercase tracking-wider pl-1">Company Website</label>
                      <input value={companyUrl} onChange={(e) => setCompanyUrl(e.target.value)} className="w-full text-sm bg-bg-primary px-4 py-2.5 rounded-lg border border-border-default focus:border-brand-indigo outline-none text-text-primary" placeholder="e.g. https://google.com" />
                    </div>
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-xs font-bold text-text-muted uppercase tracking-wider pl-1">LinkedIn URL</label>
                      <input value={linkedinUrl} onChange={(e) => setLinkedinUrl(e.target.value)} className="w-full text-sm bg-bg-primary px-4 py-2.5 rounded-lg border border-border-default focus:border-brand-indigo outline-none text-text-primary" placeholder="Your LinkedIn Profile" />
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-1">
                    <h1 className="text-2xl md:text-4xl font-display font-bold text-text-primary">
                      {name}
                    </h1>
                    <span className="bg-brand-indigo/10 text-brand-indigo flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border border-brand-indigo/20">
                      Recruiter
                    </span>
                    {user.verificationStatus === "verified" && (
                      <span className="bg-success/10 text-success flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border border-success/20">
                        <ShieldCheck className="w-3 h-3" />
                        Verified Company
                      </span>
                    )}
                  </div>
                  
                  <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 mt-4 text-sm text-text-secondary">
                    {companyName && (
                      <div className="flex items-center gap-2 font-medium">
                        <Building className="w-4 h-4 text-brand-indigo" />
                        {companyName}
                      </div>
                    )}
                    {companyUrl && (
                      <a href={companyUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-brand-indigo transition-colors">
                        <LinkIcon className="w-4 h-4 text-text-muted" />
                        {companyUrl.replace(/^https?:\/\//, '')}
                      </a>
                    )}
                    {user.email && (
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4 flex items-center justify-center text-text-muted">@</span>
                        {user.email}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </PageWrapper>
  );
}

// /lib/resume-data-mapper.ts
// 🔴 TODO: REPLACE mockFullProfile → GET /api/candidates/profile

import type { ProfileState, ExperienceItem, EducationItem, SkillItem, ProjectItem, CertItem, LanguageItem } from "@/store/useProfileStore";

/* ── Types ── */
export interface CareerEntry {
  title: string;
  company: string;
  period: string;
  description: string;
}

export interface SkillEntry {
  name: string;
  level: string;
}

export interface EducationEntry {
  degree: string;
  school: string;
  period: string;
  gpa: string;
}

export interface ProjectEntry {
  name: string;
  description: string;
  tech: string[];
  url: string;
  starred: boolean;
}

export interface CertEntry {
  name: string;
  issuer: string;
  date: string;
  credId: string;
}

export interface LanguageEntry {
  name: string;
  level: string;
}

export interface AIScores {
  capability: number;
  authenticity: number;
  verifiedText: string;
}

export interface ResumeData {
  name: string;
  role: string;
  location: string;
  email: string;
  phone: string;
  website: string;
  github: string;
  linkedin: string;

  summary: string;
  experience: CareerEntry[];
  skills: SkillEntry[];
  education: EducationEntry[];
  projects: ProjectEntry[];
  certifications: CertEntry[];
  languages: LanguageEntry[];
  aiScores: AIScores;
}

export type SectionKey =
  | "summary"
  | "experience"
  | "skills"
  | "education"
  | "projects"
  | "certifications"
  | "languages"
  | "aiScores";

export type EnabledSections = Record<SectionKey, boolean>;

export const defaultEnabledSections: EnabledSections = {
  summary: true,
  experience: true,
  skills: true,
  education: true,
  projects: true,
  certifications: true,
  languages: true,
  aiScores: false, // Default OFF for candidates
};

export function getResumeData(p: ProfileState): ResumeData {
  return {
    name: p.name,
    role: p.headline,
    location: p.location,
    email: p.contact.email,
    phone: p.contact.phone,
    website: p.contact.website,
    github: p.contact.github,
    linkedin: p.contact.linkedin,

    summary: p.about,
    experience: p.experience.map((e: ExperienceItem) => ({
      title: e.role,
      company: e.company,
      period: e.duration,
      description: e.desc
    })),
    skills: p.skills.map((s: SkillItem) => ({
      name: s.name,
      level: s.level === 5 ? "Expert" : s.level === 4 ? "Advanced" : s.level === 3 ? "Proficient" : "Basic"
    })),
    education: p.education.map((e: EducationItem) => ({
      degree: e.degree + " " + e.field,
      school: e.school,
      period: e.year,
      gpa: e.gpa
    })),
    projects: p.projects.map((pr: ProjectItem) => ({
      name: pr.name,
      description: pr.desc,
      tech: pr.tech.split(",").map((t: string) => t.trim()),
      url: pr.link,
      starred: pr.isPinned
    })),
    certifications: p.certifications.map((c: CertItem) => ({
      name: c.name,
      issuer: c.issuer,
      date: c.date,
      credId: c.credentialId
    })),
    languages: p.languages.map((l: LanguageItem) => ({
      name: l.name,
      level: l.proficiency === 5 ? "Professional" : l.proficiency === 4 ? "Advanced" : l.proficiency === 3 ? "Intermediate" : "Basic"
    })),
    aiScores: {
      capability: 87, // Mocked for now
      authenticity: 91,
      verifiedText: "Profile verified via deep technical interviews and semantic code analysis. Top 15% in backend systems."
    },
  };
}

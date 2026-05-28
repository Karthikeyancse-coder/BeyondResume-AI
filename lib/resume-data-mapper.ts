// /lib/resume-data-mapper.ts
// 🔴 TODO: REPLACE mockFullProfile → GET /api/candidates/profile

import { mockFullProfile } from "./mock-data";

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

export function getResumeData(): ResumeData {
  const p = mockFullProfile;
  return {
    name: p.fullName,
    role: p.currentRole,
    location: p.location,
    email: p.email,
    phone: p.phone,
    website: p.portfolioUrl,
    github: p.githubUrl,
    linkedin: p.linkedinUrl,

    summary: p.professionalSummary,
    experience: p.careerHistory,
    skills: p.skills,
    education: p.education,
    projects: p.projects,
    certifications: p.certifications,
    languages: p.languages,
    aiScores: {
      capability: p.capabilityScore,
      authenticity: p.authenticityScore,
      verifiedText: p.verifiedText,
    },
  };
}

import { create } from 'zustand';
import { mockFullProfile } from '@/lib/mock-data';

export interface ExperienceItem { role: string; company: string; duration: string; desc: string; }
export interface EducationItem { school: string; degree: string; field: string; year: string; gpa: string; }
export interface SkillItem { name: string; level: number; }
export interface ProjectItem { id: string; name: string; desc: string; tech: string; link: string; isPinned: boolean; }
export interface CertItem { id: string; name: string; issuer: string; date: string; credentialId: string; image?: string; }
export interface LanguageItem { id: string; name: string; proficiency: number; }
export interface AwardItem { id: string; title: string; issuer: string; date: string; desc: string; image?: string; }
export interface VolunteerItem { id: string; role: string; org: string; duration: string; desc: string; }
export interface PublicationItem { id: string; title: string; publisher: string; date: string; link: string; }
export interface CustomSection { id: string; title: string; content: string; }

export interface ContactInfo {
  email: string; phone: string; website: string;
  github: string; linkedin: string; twitter: string;
}

export interface ProfileState {
  name: string;
  headline: string;
  location: string;
  contact: ContactInfo;
  about: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillItem[];
  projects: ProjectItem[];
  certifications: CertItem[];
  languages: LanguageItem[];
  awards: AwardItem[];
  volunteer: VolunteerItem[];
  publications: PublicationItem[];
  interests: string[];
  customSections: CustomSection[];
  resumeConfig?: {
    template: string;
    enabledSections: Record<string, boolean>;
  };
  
  updateProfile: (data: Partial<ProfileState>) => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  name: mockFullProfile.fullName,
  headline: mockFullProfile.currentRole,
  location: mockFullProfile.location,
  contact: {
    email: mockFullProfile.email,
    phone: mockFullProfile.phone,
    website: mockFullProfile.portfolioUrl,
    github: mockFullProfile.githubUrl,
    linkedin: mockFullProfile.linkedinUrl,
    twitter: mockFullProfile.twitter,
  },
  about: mockFullProfile.professionalSummary,
  experience: mockFullProfile.careerHistory.map(h => ({
    role: h.title,
    company: h.company,
    duration: h.period,
    desc: h.description,
  })),
  education: mockFullProfile.education.map(e => ({
    school: e.school,
    degree: e.degree,
    field: e.degree.includes(' ') ? e.degree.split(' ').slice(1).join(' ') : e.degree,
    year: e.period,
    gpa: e.gpa,
  })),
  skills: mockFullProfile.skills.map(s => ({
    name: s.name,
    level: s.level === 'Expert' ? 5 : s.level === 'Advanced' ? 4 : s.level === 'Proficient' ? 3 : 2,
  })),
  projects: mockFullProfile.projects.map((p, i) => ({
    id: i.toString(),
    name: p.name,
    desc: p.description,
    tech: p.tech.join(', '),
    link: p.url,
    isPinned: p.starred,
  })),
  certifications: mockFullProfile.certifications.map((c, i) => ({
    id: i.toString(),
    name: c.name,
    issuer: c.issuer,
    date: c.date,
    credentialId: c.credId,
  })),
  languages: mockFullProfile.languages.map((l, i) => ({
    id: i.toString(),
    name: l.name,
    proficiency: l.level === 'Professional' ? 5 : l.level === 'Advanced' ? 4 : l.level === 'Intermediate' ? 3 : 2,
  })),
  awards: [],
  volunteer: [],
  publications: [],
  interests: [],
  customSections: [],

  updateProfile: (data) => set((state) => ({ ...state, ...data })),
}));

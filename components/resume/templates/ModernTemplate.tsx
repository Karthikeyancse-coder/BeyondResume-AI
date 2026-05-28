"use client";

import type { ResumeData, EnabledSections } from "@/lib/resume-data-mapper";
import { Mail, Phone, Globe, MapPin, Briefcase, GraduationCap, Code2, Award, BookOpen, ShieldCheck } from "lucide-react";

interface Props {
  data: ResumeData;
  sections: EnabledSections;
}

export default function ModernTemplate({ data, sections }: Props) {
  return (
    <div className="w-[794px] min-h-[1123px] bg-white text-gray-800 font-sans text-[11px] leading-relaxed p-8">
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent leading-tight">
          {data.name}
        </h1>
        <p className="text-sm text-gray-500 font-medium mt-1">{data.role}</p>

        <div className="flex flex-wrap items-center gap-4 mt-3 text-[10px] text-gray-500">
          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{data.location}</span>
          <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{data.email}</span>
          <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{data.phone}</span>
          {data.website && <span className="flex items-center gap-1"><Globe className="w-3 h-3" />{data.website}</span>}
          {data.github && <span className="flex items-center gap-1"><Code2 className="w-3 h-3" />{data.github}</span>}
          {data.linkedin && <span className="flex items-center gap-1"><Globe className="w-3 h-3" />{data.linkedin}</span>}
        </div>
      </div>

      {/* Summary */}
      {sections.summary && (
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1.5">
            <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-800">Summary</h2>
          </div>
          <div className="w-full h-px bg-gradient-to-r from-indigo-400 to-cyan-300 mb-2" />
          <p className="text-gray-600 leading-relaxed">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      {sections.experience && (
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1.5">
            <Briefcase className="w-3.5 h-3.5 text-indigo-500" />
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-800">Experience</h2>
          </div>
          <div className="w-full h-px bg-gradient-to-r from-indigo-400 to-cyan-300 mb-2" />
          <div className="space-y-3">
            {data.experience.map((e, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-gray-900">{e.title} <span className="font-normal text-gray-500">at {e.company}</span></h3>
                  <span className="text-[9px] text-indigo-500 font-semibold shrink-0">{e.period}</span>
                </div>
                <p className="text-gray-600 mt-0.5">{e.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {sections.skills && (
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1.5">
            <Code2 className="w-3.5 h-3.5 text-indigo-500" />
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-800">Skills</h2>
          </div>
          <div className="w-full h-px bg-gradient-to-r from-indigo-400 to-cyan-300 mb-2" />
          <div className="flex flex-wrap gap-1.5">
            {data.skills.map((s, i) => (
              <span key={i} className="px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-md text-[10px] font-semibold border border-indigo-100">
                {s.name} <span className="text-indigo-400 ml-0.5">• {s.level}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {sections.education && (
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1.5">
            <GraduationCap className="w-3.5 h-3.5 text-indigo-500" />
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-800">Education</h2>
          </div>
          <div className="w-full h-px bg-gradient-to-r from-indigo-400 to-cyan-300 mb-2" />
          {data.education.map((e, i) => (
            <div key={i}>
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-gray-900">{e.degree}</h3>
                <span className="text-[9px] text-indigo-500 font-semibold">{e.period}</span>
              </div>
              <p className="text-gray-500 text-[10px]">{e.school} — GPA: {e.gpa}</p>
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {sections.projects && (
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1.5">
            <Code2 className="w-3.5 h-3.5 text-indigo-500" />
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-800">Projects</h2>
          </div>
          <div className="w-full h-px bg-gradient-to-r from-indigo-400 to-cyan-300 mb-2" />
          <div className="space-y-2">
            {data.projects.map((p, i) => (
              <div key={i}>
                <h3 className="font-bold text-gray-900">{p.name}</h3>
                <p className="text-gray-600">{p.description}</p>
                <div className="flex flex-wrap gap-1 mt-0.5">
                  {p.tech.map((t, ti) => (
                    <span key={ti} className="text-[9px] text-indigo-500 font-semibold">{t}{ti < p.tech.length - 1 ? " •" : ""}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {sections.certifications && (
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1.5">
            <Award className="w-3.5 h-3.5 text-indigo-500" />
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-800">Certifications</h2>
          </div>
          <div className="w-full h-px bg-gradient-to-r from-indigo-400 to-cyan-300 mb-2" />
          {data.certifications.map((c, i) => (
            <div key={i} className="flex items-start gap-2">
              <Award className="w-3 h-3 text-indigo-400 mt-0.5 shrink-0" />
              <div>
                <span className="font-bold text-gray-900">{c.name}</span>
                <span className="text-gray-500"> — {c.issuer} ({c.date})</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Languages */}
      {sections.languages && (
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1.5">
            <Globe className="w-3.5 h-3.5 text-indigo-500" />
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-800">Languages</h2>
          </div>
          <div className="w-full h-px bg-gradient-to-r from-indigo-400 to-cyan-300 mb-2" />
          <div className="flex flex-wrap gap-3">
            {data.languages.map((l, i) => (
              <span key={i} className="text-[10px]"><span className="font-bold text-gray-900">{l.name}</span> <span className="text-gray-500">({l.level})</span></span>
            ))}
          </div>
        </div>
      )}

      {/* AI Scores */}
      {sections.aiScores && (
        <div className="mt-auto pt-4 border-t border-indigo-100">
          <div className="flex items-center gap-2 mb-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-800">BeyondResume AI Verified</h2>
          </div>
          <div className="flex gap-6 text-[10px]">
            <span>Capability: <span className="font-bold text-indigo-600">{data.aiScores.capability}/100</span></span>
            <span>Authenticity: <span className="font-bold text-cyan-600">{data.aiScores.authenticity}/100</span></span>
          </div>
          <p className="text-[8px] text-gray-400 mt-1">{data.aiScores.verifiedText}</p>
        </div>
      )}
    </div>
  );
}

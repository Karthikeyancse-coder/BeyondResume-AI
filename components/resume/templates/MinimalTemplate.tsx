"use client";

import type { ResumeData, EnabledSections } from "@/lib/resume-data-mapper";

interface Props {
  data: ResumeData;
  sections: EnabledSections;
}

export default function MinimalTemplate({ data, sections }: Props) {
  return (
    <div className="w-[794px] min-h-[1123px] bg-white text-gray-900 font-sans text-[11px] leading-relaxed p-8">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">{data.name}</h1>
        <p className="text-xs text-gray-500 mt-0.5">{data.role}</p>
        <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-2 text-[10px] text-gray-400">
          <span>{data.email}</span>
          <span>{data.phone}</span>
          <span>{data.location}</span>
          {data.website && <span>{data.website}</span>}
          {data.github && <span>{data.github}</span>}
          {data.linkedin && <span>{data.linkedin}</span>}
        </div>
      </div>

      {/* Accent line */}
      <div className="w-12 h-0.5 bg-gray-900 mb-4" />

      {/* Summary */}
      {sections.summary && (
        <div className="mb-4">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-900 mb-1">Profile</h2>
          <p className="text-gray-600">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      {sections.experience && (
        <div className="mb-4">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-900 mb-1">Experience</h2>
          <div className="w-12 h-px bg-gray-300 mb-2" />
          <div className="space-y-2.5">
            {data.experience.map((e, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-gray-900">{e.title}</span>
                  <span className="text-[9px] text-gray-400">{e.period}</span>
                </div>
                <p className="text-[10px] text-gray-500 font-medium">{e.company}</p>
                <p className="text-gray-600 mt-0.5">{e.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {sections.education && (
        <div className="mb-4">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-900 mb-1">Education</h2>
          <div className="w-12 h-px bg-gray-300 mb-2" />
          {data.education.map((e, i) => (
            <div key={i}>
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-gray-900">{e.degree}</span>
                <span className="text-[9px] text-gray-400">{e.period}</span>
              </div>
              <p className="text-[10px] text-gray-500">{e.school} — GPA: {e.gpa}</p>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {sections.skills && (
        <div className="mb-4">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-900 mb-1">Skills</h2>
          <div className="w-12 h-px bg-gray-300 mb-2" />
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px]">
            {data.skills.map((s, i) => (
              <span key={i}><span className="font-semibold">{s.name}</span> <span className="text-gray-400">({s.level})</span></span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {sections.projects && (
        <div className="mb-4">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-900 mb-1">Projects</h2>
          <div className="w-12 h-px bg-gray-300 mb-2" />
          <div className="space-y-2">
            {data.projects.map((p, i) => (
              <div key={i}>
                <span className="font-bold text-gray-900">{p.name}</span>
                <span className="text-gray-400 text-[9px] ml-2">{p.tech.join(", ")}</span>
                <p className="text-gray-600 mt-0.5">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {sections.certifications && (
        <div className="mb-4">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-900 mb-1">Certifications</h2>
          <div className="w-12 h-px bg-gray-300 mb-2" />
          {data.certifications.map((c, i) => (
            <div key={i}>
              <span className="font-bold">{c.name}</span>
              <span className="text-gray-500"> — {c.issuer}, {c.date}</span>
            </div>
          ))}
        </div>
      )}

      {/* Languages */}
      {sections.languages && (
        <div className="mb-4">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-900 mb-1">Languages</h2>
          <div className="w-12 h-px bg-gray-300 mb-2" />
          <div className="flex gap-4 text-[10px]">
            {data.languages.map((l, i) => (
              <span key={i}><span className="font-semibold">{l.name}</span> <span className="text-gray-400">({l.level})</span></span>
            ))}
          </div>
        </div>
      )}

      {/* AI Scores */}
      {sections.aiScores && (
        <div className="mt-auto pt-3 border-t border-gray-200">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-900 mb-1">BeyondResume AI Verified</h2>
          <div className="flex gap-4 text-[10px]">
            <span>Capability: <span className="font-bold">{data.aiScores.capability}/100</span></span>
            <span>Authenticity: <span className="font-bold">{data.aiScores.authenticity}/100</span></span>
          </div>
          <p className="text-[8px] text-gray-400 mt-0.5">{data.aiScores.verifiedText}</p>
        </div>
      )}
    </div>
  );
}

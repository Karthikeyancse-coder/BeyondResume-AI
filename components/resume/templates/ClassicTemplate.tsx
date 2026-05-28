"use client";

import type { ResumeData, EnabledSections } from "@/lib/resume-data-mapper";
import { Mail, Phone, Globe, MapPin, Award } from "lucide-react";

interface Props {
  data: ResumeData;
  sections: EnabledSections;
}

export default function ClassicTemplate({ data, sections }: Props) {
  return (
    <div className="w-[794px] min-h-[1123px] bg-white text-gray-800 font-sans text-[11px] leading-relaxed flex">
      {/* LEFT SIDEBAR */}
      <div className="w-[265px] bg-[#1e293b] text-white p-6 flex flex-col gap-5 shrink-0">
        {/* Name & Role */}
        <div>
          <h1 className="text-xl font-bold tracking-tight leading-tight">{data.name}</h1>
          <p className="text-[10px] text-slate-300 mt-1 leading-snug">{data.role}</p>
        </div>

        {/* Contact */}
        <div className="space-y-2">
          <h3 className="text-[9px] font-bold uppercase tracking-widest text-indigo-300 border-b border-slate-600 pb-1">Contact</h3>
          <div className="space-y-1.5 text-[10px]">
            <div className="flex items-center gap-2"><Mail className="w-3 h-3 text-indigo-300 shrink-0" /><span className="break-all">{data.email}</span></div>
            <div className="flex items-center gap-2"><Phone className="w-3 h-3 text-indigo-300 shrink-0" /><span>{data.phone}</span></div>
            <div className="flex items-center gap-2"><MapPin className="w-3 h-3 text-indigo-300 shrink-0" /><span>{data.location}</span></div>
            {data.website && <div className="flex items-center gap-2"><Globe className="w-3 h-3 text-indigo-300 shrink-0" /><span>{data.website}</span></div>}
            {data.github && <div className="flex items-center gap-2"><Globe className="w-3 h-3 text-indigo-300 shrink-0" /><span>{data.github}</span></div>}
            {data.linkedin && <div className="flex items-center gap-2"><Globe className="w-3 h-3 text-indigo-300 shrink-0" /><span>{data.linkedin}</span></div>}
          </div>
        </div>

        {/* Skills */}
        {sections.skills && (
          <div className="space-y-2">
            <h3 className="text-[9px] font-bold uppercase tracking-widest text-indigo-300 border-b border-slate-600 pb-1">Skills</h3>
            <div className="space-y-1.5">
              {data.skills.map((s, i) => (
                <div key={i} className="flex justify-between text-[10px]">
                  <span>{s.name}</span>
                  <span className="text-indigo-300 text-[9px]">{s.level}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {sections.languages && (
          <div className="space-y-2">
            <h3 className="text-[9px] font-bold uppercase tracking-widest text-indigo-300 border-b border-slate-600 pb-1">Languages</h3>
            <div className="space-y-1">
              {data.languages.map((l, i) => (
                <div key={i} className="flex justify-between text-[10px]">
                  <span>{l.name}</span>
                  <span className="text-slate-400">{l.level}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AI Scores */}
        {sections.aiScores && (
          <div className="space-y-2 mt-auto">
            <h3 className="text-[9px] font-bold uppercase tracking-widest text-indigo-300 border-b border-slate-600 pb-1">AI Verified</h3>
            <div className="space-y-1.5">
              <div className="flex justify-between text-[10px]"><span>Capability</span><span className="text-indigo-300 font-bold">{data.aiScores.capability}/100</span></div>
              <div className="flex justify-between text-[10px]"><span>Authenticity</span><span className="text-cyan-300 font-bold">{data.aiScores.authenticity}/100</span></div>
              <p className="text-[8px] text-slate-400 leading-snug mt-1">{data.aiScores.verifiedText}</p>
            </div>
          </div>
        )}
      </div>

      {/* RIGHT MAIN */}
      <div className="flex-1 p-6 flex flex-col gap-4">
        {/* Gradient accent bar */}
        <div className="w-full h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400 rounded-full" />

        {/* Summary */}
        {sections.summary && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-1.5">Professional Summary</h2>
            <p className="text-gray-600 leading-relaxed">{data.summary}</p>
          </div>
        )}

        {/* Experience */}
        {sections.experience && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-2">Experience</h2>
            <div className="space-y-3">
              {data.experience.map((e, i) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-gray-900">{e.title}</h3>
                    <span className="text-[9px] text-gray-500">{e.period}</span>
                  </div>
                  <p className="text-gray-500 font-medium text-[10px]">{e.company}</p>
                  <p className="text-gray-600 mt-0.5">{e.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {sections.education && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-2">Education</h2>
            {data.education.map((e, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-gray-900">{e.degree}</h3>
                  <span className="text-[9px] text-gray-500">{e.period}</span>
                </div>
                <p className="text-gray-500 font-medium text-[10px]">{e.school} • GPA: {e.gpa}</p>
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {sections.projects && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-2">Projects</h2>
            <div className="space-y-2">
              {data.projects.map((p, i) => (
                <div key={i}>
                  <h3 className="font-bold text-gray-900">{p.name}</h3>
                  <p className="text-gray-600">{p.description}</p>
                  <p className="text-[9px] text-indigo-500 mt-0.5">{p.tech.join(" • ")}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {sections.certifications && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-2">Certifications</h2>
            {data.certifications.map((c, i) => (
              <div key={i} className="flex items-start gap-2">
                <Award className="w-3.5 h-3.5 text-indigo-500 mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-bold text-gray-900">{c.name}</h3>
                  <p className="text-[10px] text-gray-500">{c.issuer} • {c.date} • ID: {c.credId}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

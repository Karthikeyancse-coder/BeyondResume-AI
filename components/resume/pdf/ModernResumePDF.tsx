import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import type { ResumeData, EnabledSections } from "@/lib/resume-data-mapper";

const s = StyleSheet.create({
  page: { padding: 32, fontFamily: "Helvetica", fontSize: 9, lineHeight: 1.5, color: "#374151" },
  name: { fontSize: 24, fontFamily: "Helvetica-Bold", color: "#4f46e5" },
  role: { fontSize: 10, color: "#6b7280", marginTop: 2 },
  contact: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginTop: 8, fontSize: 8, color: "#6b7280" },
  divider: { height: 1, backgroundColor: "#818cf8", marginVertical: 8, opacity: 0.4 },
  sectionH: { fontSize: 9, fontFamily: "Helvetica-Bold", letterSpacing: 1.2, textTransform: "uppercase" as const, color: "#111827", marginBottom: 4 },
  section: { marginBottom: 10 },
  jobRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" },
  jobTitle: { fontSize: 10, fontFamily: "Helvetica-Bold", color: "#111827" },
  company: { fontSize: 8, color: "#6b7280" },
  period: { fontSize: 7, color: "#4f46e5", fontFamily: "Helvetica-Bold" },
  desc: { fontSize: 8, color: "#4b5563", marginTop: 2, marginBottom: 6 },
  tag: { fontSize: 7, backgroundColor: "#eef2ff", color: "#4338ca", paddingHorizontal: 6, paddingVertical: 2, borderRadius: 3, marginRight: 4, marginBottom: 3 },
  tagWrap: { flexDirection: "row", flexWrap: "wrap" },
  aiBox: { borderTopWidth: 0.5, borderTopColor: "#c7d2fe", paddingTop: 8, marginTop: "auto" },
});

interface Props { data: ResumeData; sections: EnabledSections; }

export default function ModernResumePDF({ data, sections }: Props) {
  return (
    <Document>
      <Page size="A4" style={s.page}>
        <Text style={s.name}>{data.name}</Text>
        <Text style={s.role}>{data.role}</Text>
        <View style={s.contact}>
          <Text>{data.email}</Text>
          <Text>{data.phone}</Text>
          <Text>{data.location}</Text>
          {data.website ? <Text>{data.website}</Text> : null}
          {data.github ? <Text>{data.github}</Text> : null}
          {data.linkedin ? <Text>{data.linkedin}</Text> : null}
        </View>

        {sections.summary && (
          <View style={s.section}>
            <View style={s.divider} />
            <Text style={s.sectionH}>Summary</Text>
            <Text style={s.desc}>{data.summary}</Text>
          </View>
        )}

        {sections.experience && (
          <View style={s.section}>
            <View style={s.divider} />
            <Text style={s.sectionH}>Experience</Text>
            {data.experience.map((e, i) => (
              <View key={i} style={{ marginBottom: 6 }}>
                <View style={s.jobRow}>
                  <Text style={s.jobTitle}>{e.title} <Text style={s.company}>at {e.company}</Text></Text>
                  <Text style={s.period}>{e.period}</Text>
                </View>
                <Text style={s.desc}>{e.description}</Text>
              </View>
            ))}
          </View>
        )}

        {sections.skills && (
          <View style={s.section}>
            <View style={s.divider} />
            <Text style={s.sectionH}>Skills</Text>
            <View style={s.tagWrap}>
              {data.skills.map((sk, i) => (
                <Text key={i} style={s.tag}>{sk.name} • {sk.level}</Text>
              ))}
            </View>
          </View>
        )}

        {sections.education && (
          <View style={s.section}>
            <View style={s.divider} />
            <Text style={s.sectionH}>Education</Text>
            {data.education.map((e, i) => (
              <View key={i}>
                <View style={s.jobRow}>
                  <Text style={s.jobTitle}>{e.degree}</Text>
                  <Text style={s.period}>{e.period}</Text>
                </View>
                <Text style={s.company}>{e.school} — GPA: {e.gpa}</Text>
              </View>
            ))}
          </View>
        )}

        {sections.projects && (
          <View style={s.section}>
            <View style={s.divider} />
            <Text style={s.sectionH}>Projects</Text>
            {data.projects.map((p, i) => (
              <View key={i} style={{ marginBottom: 4 }}>
                <Text style={s.jobTitle}>{p.name}</Text>
                <Text style={s.desc}>{p.description}</Text>
                <Text style={{ fontSize: 7, color: "#4f46e5" }}>{p.tech.join(" • ")}</Text>
              </View>
            ))}
          </View>
        )}

        {sections.certifications && (
          <View style={s.section}>
            <View style={s.divider} />
            <Text style={s.sectionH}>Certifications</Text>
            {data.certifications.map((c, i) => (
              <View key={i}>
                <Text style={s.jobTitle}>{c.name}</Text>
                <Text style={s.company}>{c.issuer} — {c.date}</Text>
              </View>
            ))}
          </View>
        )}

        {sections.languages && (
          <View style={s.section}>
            <View style={s.divider} />
            <Text style={s.sectionH}>Languages</Text>
            <View style={{ flexDirection: "row", gap: 12 }}>
              {data.languages.map((l, i) => (
                <Text key={i} style={{ fontSize: 8 }}><Text style={{ fontFamily: "Helvetica-Bold" }}>{l.name}</Text> ({l.level})</Text>
              ))}
            </View>
          </View>
        )}

        {sections.aiScores && (
          <View style={s.aiBox}>
            <Text style={s.sectionH}>BeyondResume AI Verified</Text>
            <View style={{ flexDirection: "row", gap: 16, fontSize: 8 }}>
              <Text>Capability: <Text style={{ fontFamily: "Helvetica-Bold", color: "#4f46e5" }}>{data.aiScores.capability}/100</Text></Text>
              <Text>Authenticity: <Text style={{ fontFamily: "Helvetica-Bold", color: "#0891b2" }}>{data.aiScores.authenticity}/100</Text></Text>
            </View>
            <Text style={{ fontSize: 6, color: "#9ca3af", marginTop: 3 }}>{data.aiScores.verifiedText}</Text>
          </View>
        )}
      </Page>
    </Document>
  );
}

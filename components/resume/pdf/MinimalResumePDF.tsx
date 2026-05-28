import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import type { ResumeData, EnabledSections } from "@/lib/resume-data-mapper";

const s = StyleSheet.create({
  page: { padding: 32, fontFamily: "Helvetica", fontSize: 9, lineHeight: 1.6, color: "#111827" },
  name: { fontSize: 20, fontFamily: "Helvetica-Bold", letterSpacing: -0.5 },
  role: { fontSize: 9, color: "#6b7280", marginTop: 1 },
  contact: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginTop: 6, fontSize: 8, color: "#9ca3af" },
  accent: { width: 40, height: 2, backgroundColor: "#111827", marginVertical: 10 },
  sectionH: { fontSize: 8, fontFamily: "Helvetica-Bold", letterSpacing: 2, textTransform: "uppercase" as const, marginBottom: 3 },
  line: { width: 40, height: 0.5, backgroundColor: "#d1d5db", marginBottom: 6 },
  section: { marginBottom: 10 },
  jobRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" },
  jobTitle: { fontSize: 9, fontFamily: "Helvetica-Bold" },
  company: { fontSize: 8, color: "#6b7280", marginBottom: 1 },
  period: { fontSize: 7, color: "#9ca3af" },
  desc: { fontSize: 8, color: "#4b5563", marginTop: 1, marginBottom: 5 },
  inline: { flexDirection: "row", flexWrap: "wrap", gap: 12, fontSize: 8 },
  aiBox: { borderTopWidth: 0.5, borderTopColor: "#e5e7eb", paddingTop: 8, marginTop: "auto" },
});

interface Props { data: ResumeData; sections: EnabledSections; }

export default function MinimalResumePDF({ data, sections }: Props) {
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

        <View style={s.accent} />

        {sections.summary && (
          <View style={s.section}>
            <Text style={s.sectionH}>Profile</Text>
            <Text style={s.desc}>{data.summary}</Text>
          </View>
        )}

        {sections.experience && (
          <View style={s.section}>
            <Text style={s.sectionH}>Experience</Text>
            <View style={s.line} />
            {data.experience.map((e, i) => (
              <View key={i} style={{ marginBottom: 5 }}>
                <View style={s.jobRow}>
                  <Text style={s.jobTitle}>{e.title}</Text>
                  <Text style={s.period}>{e.period}</Text>
                </View>
                <Text style={s.company}>{e.company}</Text>
                <Text style={s.desc}>{e.description}</Text>
              </View>
            ))}
          </View>
        )}

        {sections.education && (
          <View style={s.section}>
            <Text style={s.sectionH}>Education</Text>
            <View style={s.line} />
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

        {sections.skills && (
          <View style={s.section}>
            <Text style={s.sectionH}>Skills</Text>
            <View style={s.line} />
            <View style={s.inline}>
              {data.skills.map((sk, i) => (
                <Text key={i}><Text style={{ fontFamily: "Helvetica-Bold" }}>{sk.name}</Text> <Text style={{ color: "#9ca3af" }}>({sk.level})</Text></Text>
              ))}
            </View>
          </View>
        )}

        {sections.projects && (
          <View style={s.section}>
            <Text style={s.sectionH}>Projects</Text>
            <View style={s.line} />
            {data.projects.map((p, i) => (
              <View key={i} style={{ marginBottom: 4 }}>
                <Text style={s.jobTitle}>{p.name} <Text style={{ fontSize: 7, color: "#9ca3af", fontFamily: "Helvetica" }}>{p.tech.join(", ")}</Text></Text>
                <Text style={s.desc}>{p.description}</Text>
              </View>
            ))}
          </View>
        )}

        {sections.certifications && (
          <View style={s.section}>
            <Text style={s.sectionH}>Certifications</Text>
            <View style={s.line} />
            {data.certifications.map((c, i) => (
              <View key={i}>
                <Text><Text style={{ fontFamily: "Helvetica-Bold" }}>{c.name}</Text> — {c.issuer}, {c.date}</Text>
              </View>
            ))}
          </View>
        )}

        {sections.languages && (
          <View style={s.section}>
            <Text style={s.sectionH}>Languages</Text>
            <View style={s.line} />
            <View style={s.inline}>
              {data.languages.map((l, i) => (
                <Text key={i}><Text style={{ fontFamily: "Helvetica-Bold" }}>{l.name}</Text> <Text style={{ color: "#9ca3af" }}>({l.level})</Text></Text>
              ))}
            </View>
          </View>
        )}

        {sections.aiScores && (
          <View style={s.aiBox}>
            <Text style={s.sectionH}>BeyondResume AI Verified</Text>
            <View style={{ flexDirection: "row", gap: 16, fontSize: 8 }}>
              <Text>Capability: <Text style={{ fontFamily: "Helvetica-Bold" }}>{data.aiScores.capability}/100</Text></Text>
              <Text>Authenticity: <Text style={{ fontFamily: "Helvetica-Bold" }}>{data.aiScores.authenticity}/100</Text></Text>
            </View>
            <Text style={{ fontSize: 6, color: "#9ca3af", marginTop: 3 }}>{data.aiScores.verifiedText}</Text>
          </View>
        )}
      </Page>
    </Document>
  );
}

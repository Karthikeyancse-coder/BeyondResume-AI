import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import type { ResumeData, EnabledSections } from "@/lib/resume-data-mapper";

const s = StyleSheet.create({
  page: { flexDirection: "row", fontFamily: "Helvetica", fontSize: 9, lineHeight: 1.5 },
  sidebar: { width: "33%", backgroundColor: "#1e293b", color: "#fff", padding: 24, justifyContent: "flex-start" },
  main: { width: "67%", padding: 24 },
  name: { fontSize: 18, fontFamily: "Helvetica-Bold", marginBottom: 4 },
  role: { fontSize: 8, color: "#94a3b8", marginBottom: 12 },
  sideH: { fontSize: 7, fontFamily: "Helvetica-Bold", letterSpacing: 1.5, textTransform: "uppercase" as const, color: "#818cf8", borderBottomWidth: 0.5, borderBottomColor: "#475569", paddingBottom: 3, marginBottom: 6 },
  sideRow: { flexDirection: "row", justifyContent: "space-between", fontSize: 8, marginBottom: 3 },
  sideLabel: { color: "#e2e8f0" },
  sideVal: { color: "#818cf8", fontSize: 7 },
  accent: { height: 3, backgroundColor: "#4f46e5", borderRadius: 2, marginBottom: 12 },
  mainH: { fontSize: 9, fontFamily: "Helvetica-Bold", letterSpacing: 1.2, textTransform: "uppercase" as const, color: "#4f46e5", marginBottom: 4 },
  jobTitle: { fontSize: 10, fontFamily: "Helvetica-Bold", color: "#111" },
  company: { fontSize: 8, color: "#6b7280", marginBottom: 2 },
  desc: { fontSize: 8, color: "#4b5563", marginBottom: 6 },
  period: { fontSize: 7, color: "#9ca3af" },
  section: { marginBottom: 10 },
  contactRow: { flexDirection: "row", alignItems: "center", fontSize: 8, color: "#e2e8f0", marginBottom: 3 },
  tag: { fontSize: 7, backgroundColor: "#eef2ff", color: "#4338ca", paddingHorizontal: 6, paddingVertical: 2, borderRadius: 3, marginRight: 4, marginBottom: 3 },
  tagWrap: { flexDirection: "row", flexWrap: "wrap" },
  aiBox: { marginTop: "auto", borderTopWidth: 0.5, borderTopColor: "#475569", paddingTop: 8 },
});

interface Props { data: ResumeData; sections: EnabledSections; }

export default function ClassicResumePDF({ data, sections }: Props) {
  return (
    <Document>
      <Page size="A4" style={s.page}>
        {/* Sidebar */}
        <View style={s.sidebar}>
          <Text style={s.name}>{data.name}</Text>
          <Text style={s.role}>{data.role}</Text>

          <Text style={s.sideH}>Contact</Text>
          <Text style={[s.contactRow, { marginBottom: 2 }]}>{data.email}</Text>
          <Text style={[s.contactRow, { marginBottom: 2 }]}>{data.phone}</Text>
          <Text style={[s.contactRow, { marginBottom: 2 }]}>{data.location}</Text>
          {data.website ? <Text style={[s.contactRow, { marginBottom: 2 }]}>{data.website}</Text> : null}
          {data.github ? <Text style={[s.contactRow, { marginBottom: 2 }]}>{data.github}</Text> : null}
          {data.linkedin ? <Text style={[s.contactRow, { marginBottom: 8 }]}>{data.linkedin}</Text> : null}

          {sections.skills && (
            <View style={s.section}>
              <Text style={s.sideH}>Skills</Text>
              {data.skills.map((sk, i) => (
                <View key={i} style={s.sideRow}>
                  <Text style={s.sideLabel}>{sk.name}</Text>
                  <Text style={s.sideVal}>{sk.level}</Text>
                </View>
              ))}
            </View>
          )}

          {sections.languages && (
            <View style={s.section}>
              <Text style={s.sideH}>Languages</Text>
              {data.languages.map((l, i) => (
                <View key={i} style={s.sideRow}>
                  <Text style={s.sideLabel}>{l.name}</Text>
                  <Text style={{ ...s.sideVal, color: "#94a3b8" }}>{l.level}</Text>
                </View>
              ))}
            </View>
          )}

          {sections.aiScores && (
            <View style={s.aiBox}>
              <Text style={s.sideH}>AI Verified</Text>
              <View style={s.sideRow}>
                <Text style={s.sideLabel}>Capability</Text>
                <Text style={s.sideVal}>{data.aiScores.capability}/100</Text>
              </View>
              <View style={s.sideRow}>
                <Text style={s.sideLabel}>Authenticity</Text>
                <Text style={{ ...s.sideVal, color: "#22d3ee" }}>{data.aiScores.authenticity}/100</Text>
              </View>
              <Text style={{ fontSize: 6, color: "#94a3b8", marginTop: 4 }}>{data.aiScores.verifiedText}</Text>
            </View>
          )}
        </View>

        {/* Main */}
        <View style={s.main}>
          <View style={s.accent} />

          {sections.summary && (
            <View style={s.section}>
              <Text style={s.mainH}>Professional Summary</Text>
              <Text style={s.desc}>{data.summary}</Text>
            </View>
          )}

          {sections.experience && (
            <View style={s.section}>
              <Text style={s.mainH}>Experience</Text>
              {data.experience.map((e, i) => (
                <View key={i} style={{ marginBottom: 6 }}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
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
              <Text style={s.mainH}>Education</Text>
              {data.education.map((e, i) => (
                <View key={i}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={s.jobTitle}>{e.degree}</Text>
                    <Text style={s.period}>{e.period}</Text>
                  </View>
                  <Text style={s.company}>{e.school} • GPA: {e.gpa}</Text>
                </View>
              ))}
            </View>
          )}

          {sections.projects && (
            <View style={s.section}>
              <Text style={s.mainH}>Projects</Text>
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
              <Text style={s.mainH}>Certifications</Text>
              {data.certifications.map((c, i) => (
                <View key={i}>
                  <Text style={s.jobTitle}>{c.name}</Text>
                  <Text style={s.company}>{c.issuer} • {c.date} • ID: {c.credId}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
}

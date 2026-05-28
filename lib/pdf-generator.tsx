import { pdf } from "@react-pdf/renderer";
import type { ResumeData, EnabledSections } from "./resume-data-mapper";
import type { TemplateName } from "@/components/resume/TemplateCard";
import ClassicResumePDF from "@/components/resume/pdf/ClassicResumePDF";
import ModernResumePDF from "@/components/resume/pdf/ModernResumePDF";
import MinimalResumePDF from "@/components/resume/pdf/MinimalResumePDF";

export async function generateResumePDF(
  template: TemplateName,
  data: ResumeData,
  sections: EnabledSections
) {
  let PdfComponent;
  switch (template) {
    case "classic":
      PdfComponent = ClassicResumePDF;
      break;
    case "modern":
      PdfComponent = ModernResumePDF;
      break;
    case "minimal":
      PdfComponent = MinimalResumePDF;
      break;
    default:
      PdfComponent = ModernResumePDF;
  }

  // Use the library's pdf() builder to generate a blob.
  const blob = await pdf(<PdfComponent data={data} sections={sections} />).toBlob();
  
  // Format the filename: FirstName_LastName_Resume.pdf
  const filename = `${data.name.replace(/\s+/g, "_")}_Resume.pdf`;
  
  return { blob, filename };
}

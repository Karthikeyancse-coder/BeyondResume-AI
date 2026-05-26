import PageWrapper from "@/components/layout/PageWrapper";
import Hero from "@/components/landing/Hero";
import ProblemSection from "@/components/landing/ProblemSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HowItWorks from "@/components/landing/HowItWorks";
import CTASection from "@/components/landing/CTASection";

export default function Home() {
  return (
    <PageWrapper>
      <Hero />
      <ProblemSection />
      <FeaturesSection />
      <HowItWorks />
      <CTASection />
    </PageWrapper>
  );
}

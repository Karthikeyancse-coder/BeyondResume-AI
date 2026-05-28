"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { useAuthStore } from "@/store/useAuthStore";
import PageWrapper from "@/components/layout/PageWrapper";
import CompanyVerifyForm from "@/components/auth/CompanyVerifyForm";
import VerificationStep from "@/components/auth/VerificationStep";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export default function VerifyCompanyPage() {
  const router = useRouter();
  const { user, submitCompanyVerification } = useAuthStore();

  const steps = [
    { label: "Account Created" },
    { label: "Email Verified" },
    { label: "Company Verified" },
  ];

  const handleSubmit = (method: "linkedin" | "document", value: string) => {
    submitCompanyVerification(method, value);
    setTimeout(() => router.push("/recruiter/verification-pending"), 1500);
  };

  return (
    <PageWrapper className="min-h-screen bg-bg-primary pb-20 lg:pb-0">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-10 space-y-8">
        {/* Back */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm font-medium text-text-muted hover:text-text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <motion.div
          variants={fadeUp}
          initial="initial"
          animate="animate"
          className="bg-bg-secondary rounded-2xl border border-border-default shadow-sm p-6 sm:p-10 space-y-8"
        >
          {/* Step Indicator */}
          <VerificationStep steps={steps} currentStep={2} />

          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-brand-indigo/10 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-7 h-7 text-brand-indigo" />
            </div>
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-text-primary">
              Verify Your Company
            </h1>
            <p className="text-text-secondary text-sm max-w-md mx-auto">
              We verify every company to protect candidates. Choose one method below to verify your company.
            </p>
          </div>

          {/* Form */}
          <CompanyVerifyForm
            onSubmit={handleSubmit}
          />
        </motion.div>
      </div>
    </PageWrapper>
  );
}

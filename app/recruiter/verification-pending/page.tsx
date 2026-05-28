"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import PageWrapper from "@/components/layout/PageWrapper";
import { useAuthStore } from "@/store/useAuthStore";
import { Clock, CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function VerificationPendingPage() {
  const { user } = useAuthStore();

  const allowedActions = [
    { label: "Browse platform features", allowed: true },
    { label: "Set up your company profile", allowed: true },
    { label: "Post jobs (available after verification)", allowed: false },
    { label: "View candidate profiles (available after verification)", allowed: false },
    { label: "Download resumes (available after verification)", allowed: false },
  ];

  return (
    <PageWrapper className="min-h-screen bg-bg-primary pb-20 lg:pb-0 flex items-center justify-center p-4">
      <motion.div
        variants={fadeUp}
        initial="initial"
        animate="animate"
        className="w-full max-w-lg bg-bg-secondary rounded-3xl shadow-xl border border-border-default overflow-hidden relative"
      >
        {/* Banner */}
        <div className="h-32 bg-warning/10 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-warning/20 rounded-full blur-2xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-16 h-16 rounded-full bg-white dark:bg-bg-secondary shadow-md flex items-center justify-center">
              <Clock className="w-8 h-8 text-warning animate-pulse" />
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="font-display font-bold text-2xl text-text-primary mb-2">
              Verification Pending
            </h1>
            <p className="text-text-secondary text-sm">
              Thank you, {user?.name?.split(" ")[0] || "there"}! Your recruiter account is under review.
            </p>
          </div>

          <div className="bg-bg-tertiary p-4 rounded-xl border border-border-default flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <span className="text-2xl">⏳</span>
              <div>
                <p className="font-bold text-text-primary text-sm">Status: Pending Review</p>
                <p className="text-xs text-text-muted">Expected within 24 hours</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <h3 className="text-sm font-bold text-text-primary">What you can do while waiting:</h3>
            <ul className="space-y-3">
              {allowedActions.map((action, i) => (
                <li key={i} className="flex items-start gap-3">
                  {action.allowed ? (
                    <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-text-muted shrink-0" />
                  )}
                  <span className={cn(
                    "text-sm",
                    action.allowed ? "text-text-primary font-medium" : "text-text-muted"
                  )}>
                    {action.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-xs text-center text-text-muted mb-8">
            We&apos;ll email you at <span className="font-bold text-text-primary">{user?.email}</span> when approved.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/profile"
              className="flex-1 py-3 px-4 rounded-xl border-2 border-border-default text-text-primary font-bold text-center hover:bg-bg-tertiary transition-colors"
            >
              Set Up Profile
            </Link>
            <Link
              href="/recruiter/dashboard"
              className="flex-1 py-3 px-4 rounded-xl bg-brand-gradient text-white font-bold text-center hover:shadow-glow transition-all flex items-center justify-center gap-2"
            >
              Go to Dashboard <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </motion.div>
    </PageWrapper>
  );
}

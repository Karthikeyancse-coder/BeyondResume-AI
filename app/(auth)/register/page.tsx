"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { useAuthStore } from "@/store/useAuthStore";
import PageWrapper from "@/components/layout/PageWrapper";
import Link from "next/link";
import { Mail, Lock, UserPlus, Briefcase, UserCircle, User } from "lucide-react";
import { cn } from "@/lib/utils";

function RegisterForm() {
  const [role, setRole] = useState<"CANDIDATE" | "RECRUITER">("CANDIDATE");
  const { loginAsCandidate, loginAsRecruiter } = useAuthStore();
  const router = useRouter();
  
  const searchParams = useSearchParams();

  useEffect(() => {
    const roleParam = searchParams?.get("role");
    if (roleParam === "recruiter") {
      setRole("RECRUITER");
    }
  }, [searchParams]);

  const handleMockRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === "CANDIDATE") {
      loginAsCandidate();
      router.push("/dashboard");
    } else {
      loginAsRecruiter();
      router.push("/recruiter/dashboard");
    }
  };

  return (
    <div className="w-full max-w-md bg-bg-secondary p-8 rounded-3xl shadow-xl border border-border-default relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-brand-gradient" />
      
      <div className="text-center mb-8">
        <h1 className="font-display font-bold text-2xl text-text-primary mb-2">Create an Account</h1>
          <p className="text-sm text-text-secondary">Join BeyondResume AI today</p>
        </div>

        {/* Role Toggle */}
        <div className="flex p-1 bg-bg-tertiary rounded-xl mb-8 border border-border-subtle">
          <button
            type="button"
            onClick={() => setRole("CANDIDATE")}
            className={cn(
              "flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-lg text-sm font-bold transition-all",
              role === "CANDIDATE" ? "bg-bg-secondary shadow-sm text-brand-indigo" : "text-text-muted hover:text-text-primary"
            )}
          >
            <UserCircle className="w-4 h-4" />
            <span>Candidate</span>
          </button>
          <button
            type="button"
            onClick={() => setRole("RECRUITER")}
            className={cn(
              "flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-lg text-sm font-bold transition-all",
              role === "RECRUITER" ? "bg-bg-secondary shadow-sm text-brand-cyan" : "text-text-muted hover:text-text-primary"
            )}
          >
            <Briefcase className="w-4 h-4" />
            <span>Recruiter</span>
          </button>
        </div>

        <form onSubmit={handleMockRegister} className="space-y-5">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-text-secondary pl-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
              <input
                type="text"
                required
                placeholder={role === "CANDIDATE" ? "e.g., Arjun Mehta" : "e.g., Sarah Connor"}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-border-default bg-bg-primary focus:border-brand-indigo focus:ring-1 focus:ring-brand-indigo outline-none transition-all text-sm"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-text-secondary pl-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
              <input
                type="email"
                required
                placeholder={role === "CANDIDATE" ? "arjun@example.com" : "sarah@techcorp.com"}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-border-default bg-bg-primary focus:border-brand-indigo focus:ring-1 focus:ring-brand-indigo outline-none transition-all text-sm"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-text-secondary pl-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
              <input
                type="password"
                required
                placeholder="Create a strong password"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-border-default bg-bg-primary focus:border-brand-indigo focus:ring-1 focus:ring-brand-indigo outline-none transition-all text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center space-x-2 py-3.5 bg-brand-gradient text-white rounded-xl font-bold shadow-md hover:shadow-glow hover:-translate-y-0.5 transition-all mt-4"
          >
            <UserPlus className="w-5 h-5" />
            <span>Create Account</span>
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-text-secondary">
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-brand-indigo hover:underline">
            Sign in instead
          </Link>
        </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <PageWrapper className="min-h-[90vh] flex items-center justify-center p-6 bg-bg-primary">
      <motion.div variants={fadeUp} initial="initial" animate="animate" className="w-full max-w-md">
        <Suspense fallback={<div className="w-full h-96 flex items-center justify-center">Loading...</div>}>
          <RegisterForm />
        </Suspense>
      </motion.div>
    </PageWrapper>
  );
}

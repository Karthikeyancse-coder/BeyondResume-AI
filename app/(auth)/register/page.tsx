"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { useAuthStore } from "@/store/useAuthStore";
import Link from "next/link";
import { Mail, Lock, UserPlus, Briefcase, UserCircle, User, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

function RegisterForm() {
  const [role, setRole] = useState<"CANDIDATE" | "RECRUITER">("CANDIDATE");
  const { loginAsCandidate, loginAsRecruiter } = useAuthStore();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const roleParam = searchParams?.get("role");
    if (roleParam === "recruiter") setRole("RECRUITER");
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
    <div className="min-h-screen flex items-center justify-center bg-[#F5F7FF] dark:bg-[#0B0F19] p-4 sm:p-6 lg:p-8 relative overflow-hidden font-sans">

      {/* Ambient background blobs */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#00C6FF]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#8B5CF6]/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      {/* Main Glassmorphism Container */}
      <div className="relative w-full max-w-[1200px] min-h-[700px] lg:min-h-[700px] flex flex-col lg:flex-row bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-[28px] shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)] border border-white/50 dark:border-white/10 overflow-hidden ring-1 ring-brand-indigo/20">

        {/* Left Side: Register Form */}
        <div className="w-full lg:w-1/2 flex items-start justify-center p-8 sm:p-10 relative z-10 bg-white/70 dark:bg-[#0B1020] transition-colors duration-300 overflow-y-auto">

          <motion.div
            variants={fadeUp}
            initial="initial"
            animate="animate"
            className="w-full max-w-[440px] py-8"
          >
            {/* Logo */}
            <div className="flex items-center space-x-2 mb-7">
              <div className="w-8 h-8 rounded-lg bg-brand-gradient flex items-center justify-center">
                <span className="text-white font-bold font-display text-sm">BR</span>
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-gray-900 dark:text-white">
                BeyondResume<span className="text-brand-indigo dark:text-[#00C6FF]">AI</span>
              </span>
            </div>

            {/* Heading */}
            <div className="mb-6">
              <h1 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white mb-2">
                Create Account
              </h1>
              <p className="text-gray-500 dark:text-[#D1D5FF] opacity-90 font-medium">
                Join BeyondResume AI today.
              </p>
            </div>

            {/* Role Toggle */}
            <div className="flex p-1.5 bg-gray-100 dark:bg-white/5 rounded-2xl mb-6 border border-transparent dark:border-white/10">
              <button
                type="button"
                onClick={() => setRole("CANDIDATE")}
                className={cn(
                  "flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl text-sm font-bold transition-all duration-300",
                  role === "CANDIDATE"
                    ? "bg-white shadow-sm text-brand-indigo dark:text-[#5B5BF7]"
                    : "text-gray-500 dark:text-white/60 hover:text-gray-900 dark:hover:text-white"
                )}
              >
                <UserCircle className="w-5 h-5" />
                <span>Candidate</span>
              </button>
              <button
                type="button"
                onClick={() => setRole("RECRUITER")}
                className={cn(
                  "flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl text-sm font-bold transition-all duration-300",
                  role === "RECRUITER"
                    ? "bg-white shadow-sm text-brand-cyan dark:text-[#00C6FF]"
                    : "text-gray-500 dark:text-white/60 hover:text-gray-900 dark:hover:text-white"
                )}
              >
                <Briefcase className="w-5 h-5" />
                <span>Recruiter</span>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleMockRegister} className="space-y-4">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-700 dark:text-white uppercase tracking-wider pl-1">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-brand-indigo transition-colors" />
                  <input
                    type="text"
                    required
                    placeholder={role === "CANDIDATE" ? "e.g., Arjun Mehta" : "e.g., Sarah Connor"}
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-gray-200 dark:border-transparent bg-white dark:bg-white/5 focus:border-brand-indigo focus:ring-4 focus:ring-brand-indigo/20 outline-none transition-all text-sm font-medium text-gray-900 dark:text-white placeholder:text-gray-400 shadow-sm"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-700 dark:text-white uppercase tracking-wider pl-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-brand-indigo transition-colors" />
                  <input
                    type="email"
                    required
                    placeholder={role === "CANDIDATE" ? "arjun@example.com" : "sarah@techcorp.com"}
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-gray-200 dark:border-transparent bg-white dark:bg-white/5 focus:border-brand-indigo focus:ring-4 focus:ring-brand-indigo/20 outline-none transition-all text-sm font-medium text-gray-900 dark:text-white placeholder:text-gray-400 shadow-sm"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-700 dark:text-white uppercase tracking-wider pl-1">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-brand-indigo transition-colors" />
                  <input
                    type="password"
                    required
                    placeholder="Create a strong password"
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-gray-200 dark:border-transparent bg-white dark:bg-white/5 focus:border-brand-indigo focus:ring-4 focus:ring-brand-indigo/20 outline-none transition-all text-sm font-medium text-gray-900 dark:text-white placeholder:text-gray-400 shadow-sm"
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center space-x-2 py-4 bg-brand-gradient text-white rounded-2xl font-bold shadow-lg shadow-brand-indigo/25 hover:shadow-glow hover:-translate-y-0.5 transition-all group"
                >
                  <UserPlus className="w-5 h-5" />
                  <span>Create Account</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </form>

            <div className="mt-6 text-center text-sm text-gray-500 dark:text-white/50">
              Already have an account?{" "}
              <Link href="/login" className="font-bold text-brand-indigo dark:text-[#00C6FF] hover:underline">
                Sign in instead
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Wave Animation */}
        <div className="hidden lg:block w-1/2 relative overflow-hidden">

          {/* Deep gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a6e] via-[#4f46e5] to-[#7c3aed]" />

          <style dangerouslySetInnerHTML={{__html: `
            .wave-box-reg {
              position: absolute;
              inset: 0;
              overflow: hidden;
            }
            .wave-reg {
              position: absolute;
              width: 200%;
              left: -50%;
              border-radius: 45%;
              background: rgba(255, 255, 255, 0.08);
            }
            .wave-reg-1 { height: 360px; bottom: -80px; animation: wave-move-reg 7s linear infinite; }
            .wave-reg-2 { height: 320px; bottom: -60px; background: rgba(255,255,255,0.05); animation: wave-move-reg 10s linear infinite reverse; }
            .wave-reg-3 { height: 280px; bottom: -40px; background: rgba(255,255,255,0.12); animation: wave-move-reg 8s linear infinite 2s; }
            .wave-reg-4 { height: 420px; bottom: -100px; background: rgba(100,80,255,0.15); animation: wave-move-reg 12s linear infinite reverse 1s; }
            .wave-reg-5 { height: 260px; bottom: 30%; background: rgba(255,255,255,0.04); animation: wave-move-reg 9s linear infinite 4s; }
            .wave-reg-6 { height: 300px; bottom: 20%; background: rgba(139,92,246,0.12); animation: wave-move-reg 11s linear infinite reverse 3s; }
            @keyframes wave-move-reg {
              0%   { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            .orb-reg {
              position: absolute;
              border-radius: 50%;
              filter: blur(40px);
              animation: orb-float-reg 6s ease-in-out infinite;
            }
            .orb-reg-1 { width: 200px; height: 200px; background: rgba(99,102,241,0.35); top: 10%; left: 10%; animation-delay: 0s; }
            .orb-reg-2 { width: 150px; height: 150px; background: rgba(34,211,238,0.3); top: 20%; right: 10%; animation-delay: 2s; }
            .orb-reg-3 { width: 180px; height: 180px; background: rgba(139,92,246,0.3); bottom: 15%; left: 20%; animation-delay: 4s; }
            @keyframes orb-float-reg {
              0%, 100% { transform: translateY(0px) scale(1); }
              50%       { transform: translateY(-24px) scale(1.08); }
            }
          `}} />

          <div className="wave-box-reg">
            <div className="orb-reg orb-reg-1" />
            <div className="orb-reg orb-reg-2" />
            <div className="orb-reg orb-reg-3" />
            <div className="wave-reg wave-reg-4" />
            <div className="wave-reg wave-reg-1" />
            <div className="wave-reg wave-reg-6" />
            <div className="wave-reg wave-reg-2" />
            <div className="wave-reg wave-reg-5" />
            <div className="wave-reg wave-reg-3" />
          </div>

          {/* Subtle top shine */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black/10 z-10 pointer-events-none" />
        </div>

      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#F5F7FF]">
        <div className="text-brand-indigo font-display font-bold text-xl animate-pulse">Loading...</div>
      </div>
    }>
      <RegisterForm />
    </Suspense>
  );
}

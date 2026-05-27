"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { useAuthStore } from "@/store/useAuthStore";
import Link from "next/link";
import { Mail, Lock, Briefcase, UserCircle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const [role, setRole] = useState<"CANDIDATE" | "RECRUITER">("CANDIDATE");
  const { loginAsCandidate, loginAsRecruiter } = useAuthStore();
  const router = useRouter();

  const handleMockLogin = (e: React.FormEvent) => {
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
      
      {/* Ambient page background to make glassmorphism pop */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#00C6FF]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#8B5CF6]/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      {/* Main Glassmorphism Container */}
      <div className="relative w-full max-w-[1200px] min-h-[600px] lg:h-[650px] flex flex-col lg:flex-row bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-[28px] shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)] border border-white/50 dark:border-white/10 overflow-hidden ring-1 ring-brand-indigo/20">
        
        {/* Left Side: Login Form */}
        <div className="w-full lg:w-1/2 h-full flex items-center justify-center p-8 sm:p-12 relative z-10 bg-white/70 dark:bg-[#0B1020] transition-colors duration-300">
        
        {/* Decorative subtle blobs for left side in mobile */}
        <div className="lg:hidden absolute top-0 left-0 w-full h-64 bg-brand-gradient opacity-10 blur-3xl rounded-b-full pointer-events-none" />

        <motion.div
          variants={fadeUp}
          initial="initial"
          animate="animate"
          className="w-full max-w-[440px]"
        >
          {/* Logo (Optional but good for branding) */}
          <div className="flex items-center space-x-2 mb-12">
            <div className="w-8 h-8 rounded-lg bg-brand-gradient flex items-center justify-center">
              <span className="text-white font-bold font-display text-sm">BR</span>
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-gray-900 dark:text-white">
              BeyondResume<span className="text-brand-indigo dark:text-[#00C6FF]">AI</span>
            </span>
          </div>

          <div className="mb-8">
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white mb-3 drop-shadow-sm dark:drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              Welcome Back
            </h1>
            <p className="text-gray-500 dark:text-[#D1D5FF] opacity-90 font-medium">Please login to your account.</p>
          </div>

          {/* Role Toggle */}
          <div className="flex p-1.5 bg-gray-100 dark:bg-white/5 rounded-2xl mb-8 border border-transparent dark:border-white/10">
            <button
              type="button"
              onClick={() => setRole("CANDIDATE")}
              className={cn(
                "flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl text-sm font-bold transition-all duration-300",
                role === "CANDIDATE" ? "bg-white shadow-sm text-brand-indigo dark:text-[#5B5BF7]" : "text-gray-500 dark:text-white/60 hover:text-gray-900 dark:hover:text-white"
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
                role === "RECRUITER" ? "bg-white shadow-sm text-brand-cyan dark:text-[#00C6FF]" : "text-gray-500 dark:text-white/60 hover:text-gray-900 dark:hover:text-white"
              )}
            >
              <Briefcase className="w-5 h-5" />
              <span>Recruiter</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center py-4 mb-4">
            <div className="flex-grow border-t border-gray-200 dark:border-white/10"></div>
            <span className="flex-shrink-0 mx-4 text-gray-400 dark:text-white/50 text-xs uppercase tracking-widest font-semibold">OR</span>
            <div className="flex-grow border-t border-gray-200 dark:border-white/10"></div>
          </div>

          <form onSubmit={handleMockLogin} className="space-y-6">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-700 dark:text-white uppercase tracking-wider pl-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-brand-indigo transition-colors" />
                <input
                  type="email"
                  required
                  defaultValue={role === "CANDIDATE" ? "arjun@example.com" : "sarah@techcorp.com"}
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-gray-200 dark:border-transparent bg-white dark:bg-white/5 focus:border-brand-indigo focus:ring-4 focus:ring-brand-indigo/20 outline-none transition-all text-sm font-medium text-gray-900 dark:text-white placeholder:text-gray-400 shadow-sm"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-700 dark:text-white uppercase tracking-wider pl-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-brand-indigo transition-colors" />
                <input
                  type="password"
                  required
                  defaultValue="password123"
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-gray-200 dark:border-transparent bg-white dark:bg-white/5 focus:border-brand-indigo focus:ring-4 focus:ring-brand-indigo/20 outline-none transition-all text-sm font-medium text-gray-900 dark:text-white placeholder:text-gray-400 tracking-widest shadow-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <input type="checkbox" className="hidden peer" />
            <div className="flex items-center space-x-2 pt-2">
              <label className="flex items-center space-x-2 cursor-pointer relative">
                <input type="checkbox" className="absolute opacity-0 w-0 h-0 peer" />
                <div className="w-5 h-5 rounded border border-gray-300 dark:border-white/30 flex items-center justify-center peer-checked:border-brand-indigo dark:peer-checked:border-[#00C6FF] peer-focus-visible:ring-2 peer-focus-visible:ring-brand-indigo/50 transition-colors bg-white dark:bg-white/10">
                  <CheckCircleIcon />
                </div>
                <span className="text-sm font-medium text-gray-600 dark:text-white">Remember me</span>
              </label>
              <div className="flex-1" />
              <Link href="#" className="text-sm font-medium text-brand-indigo dark:text-[#00C6FF] hover:opacity-80 transition-opacity">
                Forgot password?
              </Link>
            </div>

            <div className="flex items-center space-x-4 pt-4">
              <button
                type="submit"
                className="flex-1 flex items-center justify-center space-x-2 py-4 bg-brand-gradient text-white rounded-2xl font-bold shadow-lg shadow-brand-indigo/25 hover:shadow-glow hover:-translate-y-0.5 transition-all group"
              >
                <span>Login</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <Link href={`/register?role=${role.toLowerCase()}`} className="flex-1 flex items-center justify-center space-x-2 py-4 bg-gray-100 dark:bg-white/5 text-gray-900 dark:text-white border border-gray-200 dark:border-white/20 rounded-2xl font-bold hover:bg-gray-200 dark:hover:border-white/40 dark:hover:bg-white/10 transition-all">
                <span>Sign Up</span>
              </Link>
            </div>
          </form>

          <div className="mt-12 text-xs text-gray-500 dark:text-white/50 leading-relaxed text-center">
            By signing up, you agree to BeyondResume&apos;s <br/>
            <Link href="#" className="text-brand-indigo dark:text-[#00C6FF] hover:underline font-medium">Terms and Conditions</Link> & <Link href="#" className="text-brand-indigo dark:text-[#00C6FF] hover:underline font-medium">Privacy Policy</Link>
          </div>
        </motion.div>
      </div>

      {/* Right Side: Wave Animation */}
      <div className="hidden lg:flex w-1/2 h-full relative overflow-hidden flex-col items-center justify-center text-white">
        
        {/* Deep gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a6e] via-[#4f46e5] to-[#7c3aed]" />

        <style dangerouslySetInnerHTML={{__html: `
          .wave-box {
            position: absolute;
            inset: 0;
            overflow: hidden;
          }
          .wave {
            position: absolute;
            width: 200%;
            left: -50%;
            border-radius: 45%;
            background: rgba(255, 255, 255, 0.08);
          }
          .wave-1 {
            height: 360px;
            bottom: -80px;
            animation: wave-move 7s linear infinite;
          }
          .wave-2 {
            height: 320px;
            bottom: -60px;
            background: rgba(255, 255, 255, 0.05);
            animation: wave-move 10s linear infinite reverse;
          }
          .wave-3 {
            height: 280px;
            bottom: -40px;
            background: rgba(255, 255, 255, 0.12);
            animation: wave-move 8s linear infinite 2s;
          }
          .wave-4 {
            height: 420px;
            bottom: -100px;
            background: rgba(100, 80, 255, 0.15);
            animation: wave-move 12s linear infinite reverse 1s;
          }
          .wave-5 {
            height: 260px;
            bottom: 30%;
            background: rgba(255, 255, 255, 0.04);
            animation: wave-move 9s linear infinite 4s;
          }
          .wave-6 {
            height: 300px;
            bottom: 20%;
            background: rgba(139, 92, 246, 0.12);
            animation: wave-move 11s linear infinite reverse 3s;
          }
          @keyframes wave-move {
            0%   { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          /* Floating glowing orbs */
          .orb {
            position: absolute;
            border-radius: 50%;
            filter: blur(40px);
            animation: orb-float 6s ease-in-out infinite;
          }
          .orb-1 {
            width: 200px; height: 200px;
            background: rgba(99,102,241,0.35);
            top: 10%; left: 10%;
            animation-delay: 0s;
          }
          .orb-2 {
            width: 150px; height: 150px;
            background: rgba(34,211,238,0.3);
            top: 20%; right: 10%;
            animation-delay: 2s;
          }
          .orb-3 {
            width: 180px; height: 180px;
            background: rgba(139,92,246,0.3);
            bottom: 15%; left: 20%;
            animation-delay: 4s;
          }
          @keyframes orb-float {
            0%, 100% { transform: translateY(0px) scale(1); }
            50%       { transform: translateY(-24px) scale(1.08); }
          }
        `}} />

        <div className="wave-box">
          <div className="orb orb-1" />
          <div className="orb orb-2" />
          <div className="orb orb-3" />
          <div className="wave wave-4" />
          <div className="wave wave-1" />
          <div className="wave wave-6" />
          <div className="wave wave-2" />
          <div className="wave wave-5" />
          <div className="wave wave-3" />
        </div>

        {/* Subtle top shine */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black/10 z-10 pointer-events-none" />
      </div>
      
    </div>
  </div>
  );
}

function CheckCircleIcon() {
  return (
    <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brand-indigo hidden peer-checked:block">
      <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

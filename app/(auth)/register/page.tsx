"use client";

import { useState, useEffect, Suspense, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { useAuthStore } from "@/store/useAuthStore";
import Link from "next/link";
import {
  Mail, Lock, UserPlus, Briefcase, UserCircle, User, ArrowRight,
  Code2, Building2, Globe, ArrowLeft, CheckCircle2, RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { isBlockedDomain, isPersonalDomain, domainMatchesWebsite, getDomain } from "@/lib/blocked-email-domains";
import OTPInput from "@/components/auth/OTPInput";
import VerificationStep from "@/components/auth/VerificationStep";
import CompanyVerifyForm from "@/components/auth/CompanyVerifyForm";

function RegisterForm() {
  const [role, setRole] = useState<"CANDIDATE" | "RECRUITER">("CANDIDATE");
  const { startRegistration, verifyOtp, resendOtp, submitCompanyVerification, registrationStep, setRegistrationStep } = useAuthStore();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Candidate form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [githubUrl, setGithubUrl] = useState("");

  // Recruiter form state
  const [companyName, setCompanyName] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");

  // Validation
  const [emailError, setEmailError] = useState<string | null>(null);
  const [domainMismatchError, setDomainMismatchError] = useState<string | null>(null);

  // OTP state
  const [otpError, setOtpError] = useState<string | null>(null);
  const [otpSuccess, setOtpSuccess] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const roleParam = searchParams?.get("role");
    if (roleParam === "recruiter") setRole("RECRUITER");
  }, [searchParams]);

  // Resend countdown timer
  useEffect(() => {
    if (resendTimer <= 0) return;
    const id = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    return () => clearTimeout(id);
  }, [resendTimer]);

  // Real-time email validation
  const validateEmail = useCallback((emailValue: string) => {
    if (!emailValue.includes("@")) {
      setEmailError(null);
      return;
    }
    if (isBlockedDomain(emailValue)) {
      setEmailError("Disposable email addresses are not allowed. Please use a real email.");
      return;
    }
    if (role === "RECRUITER" && isPersonalDomain(emailValue)) {
      setEmailError("Personal emails are not accepted for recruiter accounts. Please use your official company email.");
      return;
    }
    setEmailError(null);
  }, [role]);

  // Domain match validation for recruiter
  const validateDomainMatch = useCallback(() => {
    if (role !== "RECRUITER" || !email.includes("@") || !companyWebsite) {
      setDomainMismatchError(null);
      return;
    }
    if (!domainMatchesWebsite(email, companyWebsite)) {
      const emailDom = getDomain(email);
      const webDom = companyWebsite.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/.*$/, "");
      setDomainMismatchError(
        `Your email domain (${emailDom}) doesn't match your company website (${webDom}). Please use an email that matches ${webDom}.`
      );
    } else {
      setDomainMismatchError(null);
    }
  }, [email, companyWebsite, role]);

  useEffect(() => { validateEmail(email); }, [email, validateEmail]);
  useEffect(() => { validateDomainMatch(); }, [email, companyWebsite, validateDomainMatch]);

  // After OTP for candidate → redirect to dashboard
  useEffect(() => {
    if (otpSuccess && role === "CANDIDATE" && registrationStep === 1) {
      const timer = setTimeout(() => router.push("/dashboard"), 1500);
      return () => clearTimeout(timer);
    }
  }, [otpSuccess, role, registrationStep, router]);

  // After company verification → redirect to pending page
  useEffect(() => {
    if (registrationStep === 4) {
      const timer = setTimeout(() => router.push("/recruiter/verification-pending"), 1500);
      return () => clearTimeout(timer);
    }
  }, [registrationStep, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailError || domainMismatchError) return;
    setIsSubmitting(true);

    startRegistration({
      name, email, password, role,
      githubUrl: role === "CANDIDATE" ? githubUrl : undefined,
      companyName: role === "RECRUITER" ? companyName : undefined,
      companyUrl: role === "RECRUITER" ? companyWebsite : undefined,
    });

    setResendTimer(45);
    setIsSubmitting(false);
  };

  const handleOtpComplete = (code: string) => {
    setOtpError(null);
    const success = verifyOtp(code);
    if (success) {
      setOtpSuccess(true);
    } else {
      setOtpError("Invalid code. Please try again.");
    }
  };

  const handleResendOtp = () => {
    if (resendTimer > 0) return;
    resendOtp();
    setResendTimer(45);
    setOtpError(null);
  };

  // ── RECRUITER STEP INDICATOR ──
  const recruiterSteps = [
    { label: "Account" },
    { label: "Email OTP" },
    { label: "Company" },
  ];

  // ── RENDER ──
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F7FF] dark:bg-[#0B0F19] p-4 sm:p-6 lg:p-8 relative overflow-hidden font-sans">

      {/* Ambient background blobs */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#00C6FF]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#8B5CF6]/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      {/* Main Glassmorphism Container */}
      <div className="relative w-full max-w-[1200px] min-h-[500px] lg:min-h-[500px] flex flex-col lg:flex-row bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-[28px] shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)] border border-white/50 dark:border-white/10 overflow-hidden ring-1 ring-brand-indigo/20">

        {/* Left Side: Register Form */}
        <div className="w-full lg:w-1/2 flex items-start justify-center p-4 sm:p-6 lg:p-8 relative z-10 bg-white/70 dark:bg-[#0B1020] transition-colors duration-300 overflow-y-auto">

          <motion.div
            variants={fadeUp}
            initial="initial"
            animate="animate"
            className="w-full max-w-[440px] py-2 sm:py-4"
          >
            {/* Logo */}
            <div className="flex items-center space-x-2 mb-3 sm:mb-4">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-brand-gradient flex items-center justify-center">
                <span className="text-white font-bold font-display text-xs sm:text-sm">BR</span>
              </div>
              <span className="font-display font-bold text-lg sm:text-xl tracking-tight text-gray-900 dark:text-white">
                BeyondResume<span className="text-brand-indigo dark:text-[#00C6FF]">AI</span>
              </span>
            </div>

            <AnimatePresence mode="wait">
              {/* ═══════ STEP 1: FORM ═══════ */}
              {registrationStep === 1 && (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Heading */}
                  <div className="mb-3">
                    <h1 className="font-display font-bold text-2xl sm:text-3xl text-gray-900 dark:text-white mb-0.5">
                      Create Account
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-[#D1D5FF] opacity-90 font-medium">
                      Join BeyondResume AI today.
                    </p>
                  </div>

                  {/* Role Toggle */}
                  <div className="flex p-1 bg-gray-100 dark:bg-white/5 rounded-xl mb-4 border border-transparent dark:border-white/10">
                    <button
                      type="button"
                      onClick={() => { setRole("CANDIDATE"); setEmailError(null); setDomainMismatchError(null); }}
                      className={cn(
                        "flex-1 flex items-center justify-center space-x-1.5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all duration-300",
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
                      onClick={() => { setRole("RECRUITER"); setEmailError(null); setDomainMismatchError(null); }}
                      className={cn(
                        "flex-1 flex items-center justify-center space-x-1.5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all duration-300",
                        role === "RECRUITER"
                          ? "bg-white shadow-sm text-brand-cyan dark:text-[#00C6FF]"
                          : "text-gray-500 dark:text-white/60 hover:text-gray-900 dark:hover:text-white"
                      )}
                    >
                      <Briefcase className="w-5 h-5" />
                      <span>Recruiter</span>
                    </button>
                  </div>

                  {/* Recruiter Step Indicator */}
                  {role === "RECRUITER" && (
                    <div className="mb-3">
                      <VerificationStep steps={recruiterSteps} currentStep={0} />
                    </div>
                  )}

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-2.5">
                    {/* Full Name */}
                    <div className="space-y-0.5">
                      <label className="text-[9px] sm:text-[10px] font-bold text-gray-700 dark:text-white uppercase tracking-wider pl-1">Full Name</label>
                      <div className="relative group">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-brand-indigo transition-colors" />
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder={role === "CANDIDATE" ? "e.g., Arjun Mehta" : "e.g., Sarah Connor"}
                          className="w-full pl-10 pr-4 py-2 sm:py-2.5 rounded-xl border-2 border-gray-200 dark:border-transparent bg-white dark:bg-white/5 focus:border-brand-indigo focus:ring-4 focus:ring-brand-indigo/20 outline-none transition-all text-xs sm:text-sm font-medium text-gray-900 dark:text-white placeholder:text-gray-400 shadow-sm"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-0.5">
                      <label className="text-[9px] sm:text-[10px] font-bold text-gray-700 dark:text-white uppercase tracking-wider pl-1">
                        {role === "RECRUITER" ? "Work Email" : "Email Address"}
                      </label>
                      <div className="relative group">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-brand-indigo transition-colors" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder={role === "CANDIDATE" ? "arjun@example.com" : "sarah@techcorp.com"}
                          className={cn(
                            "w-full pl-10 pr-4 py-2 sm:py-2.5 rounded-xl border-2 bg-white dark:bg-white/5 focus:ring-4 outline-none transition-all text-xs sm:text-sm font-medium text-gray-900 dark:text-white placeholder:text-gray-400 shadow-sm",
                            emailError
                              ? "border-danger focus:border-danger focus:ring-danger/20"
                              : "border-gray-200 dark:border-transparent focus:border-brand-indigo focus:ring-brand-indigo/20"
                          )}
                        />
                      </div>
                      {role === "RECRUITER" && !emailError && (
                        <p className="text-[11px] text-gray-400 dark:text-white/30 pl-1">
                          Use your official company email — gmail/yahoo not accepted
                        </p>
                      )}
                      {emailError && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-xs font-medium text-danger pl-1"
                        >
                          ⚠️ {emailError}
                        </motion.p>
                      )}
                    </div>

                    {/* GitHub URL — Candidate only */}
                    {role === "CANDIDATE" && (
                      <div className="space-y-0.5">
                        <label className="text-[9px] sm:text-[10px] font-bold text-gray-700 dark:text-white uppercase tracking-wider pl-1">
                          GitHub URL <span className="text-gray-400 dark:text-white/30 normal-case font-medium">(optional)</span>
                        </label>
                        <div className="relative group">
                          <Code2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-brand-indigo transition-colors" />
                          <input
                            type="url"
                            value={githubUrl}
                            onChange={(e) => setGithubUrl(e.target.value)}
                            placeholder="github.com/yourusername"
                            className="w-full pl-10 pr-4 py-2 sm:py-2.5 rounded-xl border-2 border-gray-200 dark:border-transparent bg-white dark:bg-white/5 focus:border-brand-indigo focus:ring-4 focus:ring-brand-indigo/20 outline-none transition-all text-xs sm:text-sm font-medium text-gray-900 dark:text-white placeholder:text-gray-400 shadow-sm"
                          />
                        </div>
                        <p className="text-[11px] text-gray-400 dark:text-white/30 pl-1">
                          Linking GitHub improves your Authenticity Score
                        </p>
                      </div>
                    )}

                    {/* Password */}
                    <div className="space-y-0.5">
                      <label className="text-[9px] sm:text-[10px] font-bold text-gray-700 dark:text-white uppercase tracking-wider pl-1">Password</label>
                      <div className="relative group">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-brand-indigo transition-colors" />
                        <input
                          type="password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Create a strong password"
                          className="w-full pl-10 pr-4 py-2 sm:py-2.5 rounded-xl border-2 border-gray-200 dark:border-transparent bg-white dark:bg-white/5 focus:border-brand-indigo focus:ring-4 focus:ring-brand-indigo/20 outline-none transition-all text-xs sm:text-sm font-medium text-gray-900 dark:text-white placeholder:text-gray-400 shadow-sm"
                        />
                      </div>
                    </div>

                    {/* Submit */}
                    <div className="pt-1">
                      <button
                        type="submit"
                        disabled={!!emailError || !!domainMismatchError || isSubmitting}
                        className={cn(
                          "w-full flex items-center justify-center space-x-1.5 py-2 sm:py-2.5 rounded-xl font-bold shadow-lg transition-all group text-sm",
                          emailError || domainMismatchError
                            ? "bg-gray-300 dark:bg-white/10 text-gray-500 cursor-not-allowed"
                            : "bg-brand-gradient text-white shadow-brand-indigo/25 hover:shadow-glow hover:-translate-y-0.5"
                        )}
                      >
                        <UserPlus className="w-4 h-4" />
                        <span>{role === "RECRUITER" ? "Create Recruiter Account" : "Create Account"}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </form>

                  <div className="mt-3 sm:mt-4 text-center text-xs sm:text-sm text-gray-500 dark:text-white/50">
                    Already have an account?{" "}
                    <Link href="/login" className="font-bold text-brand-indigo dark:text-[#00C6FF] hover:underline">
                      Sign in instead
                    </Link>
                  </div>
                </motion.div>
              )}

              {/* ═══════ STEP 2: OTP VERIFICATION ═══════ */}
              {registrationStep === 2 && (
                <motion.div
                  key="otp"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  {role === "RECRUITER" && (
                    <div className="mb-8">
                      <VerificationStep steps={recruiterSteps} currentStep={1} />
                    </div>
                  )}

                  <div className="mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-brand-indigo/10 flex items-center justify-center mx-auto mb-4">
                      <Mail className="w-8 h-8 text-brand-indigo dark:text-[#00C6FF]" />
                    </div>
                    <h2 className="font-display font-bold text-2xl sm:text-3xl text-gray-900 dark:text-white mb-2">
                      Verify Your Email
                    </h2>
                    <p className="text-gray-500 dark:text-[#D1D5FF] text-sm">
                      We sent a 6-digit code to:
                    </p>
                    <p className="font-bold text-brand-indigo dark:text-[#00C6FF] mt-1">
                      {email}
                    </p>
                    <div className="mt-2 text-xs text-gray-400 dark:text-white/30 bg-gray-50 dark:bg-white/5 inline-block px-3 py-1 rounded-lg">
                      💡 Use code: <span className="font-mono font-bold text-brand-indigo dark:text-[#00C6FF]">123456</span> (mock)
                    </div>
                  </div>

                  {otpSuccess ? (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="space-y-4"
                    >
                      <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-8 h-8 text-success" />
                      </div>
                      <p className="font-bold text-success text-lg">Email Verified! ✅</p>
                      <p className="text-sm text-gray-500 dark:text-white/50">
                        {role === "RECRUITER" ? "Proceeding to company verification..." : "Redirecting to dashboard..."}
                      </p>
                    </motion.div>
                  ) : (
                    <>
                      <OTPInput onComplete={handleOtpComplete} error={otpError} />

                      <div className="mt-8 space-y-3">
                        <button
                          onClick={handleResendOtp}
                          disabled={resendTimer > 0}
                          className={cn(
                            "text-sm font-medium transition-colors",
                            resendTimer > 0
                              ? "text-gray-400 dark:text-white/30 cursor-not-allowed"
                              : "text-brand-indigo dark:text-[#00C6FF] hover:underline cursor-pointer"
                          )}
                        >
                          {resendTimer > 0 ? (
                            <span className="flex items-center justify-center gap-1">
                              <RotateCcw className="w-3.5 h-3.5" /> Resend in {resendTimer}s
                            </span>
                          ) : (
                            "Didn't receive it? Resend code"
                          )}
                        </button>

                        <button
                          onClick={() => { setRegistrationStep(1); setOtpError(null); }}
                          className="block mx-auto text-sm text-gray-400 dark:text-white/40 hover:text-gray-600 dark:hover:text-white/60 transition-colors"
                        >
                          <span className="flex items-center gap-1"><ArrowLeft className="w-3.5 h-3.5" /> Wrong email? Go back</span>
                        </button>
                      </div>
                    </>
                  )}
                </motion.div>
              )}

              {/* ═══════ STEP 3: COMPANY VERIFICATION (Recruiter Only) ═══════ */}
              {registrationStep === 3 && role === "RECRUITER" && (
                <motion.div
                  key="company"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-6">
                    <VerificationStep steps={recruiterSteps} currentStep={2} />
                  </div>

                  <div className="mb-6">
                    <h2 className="font-display font-bold text-2xl sm:text-3xl text-gray-900 dark:text-white mb-2">
                      Verify Your Company
                    </h2>
                    <p className="text-gray-500 dark:text-[#D1D5FF] text-sm">
                      We verify every company to protect candidates on the platform.
                    </p>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="space-y-1">
                      <label className="text-[10px] sm:text-xs font-bold text-gray-700 dark:text-white uppercase tracking-wider pl-1">Company Name</label>
                      <div className="relative group">
                        <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-brand-indigo transition-colors" />
                        <input
                          type="text"
                          required
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          placeholder="e.g., TechCorp Solutions"
                          className="w-full pl-10 pr-4 py-2 sm:py-2.5 rounded-xl border-2 border-gray-200 dark:border-transparent bg-white dark:bg-white/5 focus:border-brand-indigo focus:ring-4 focus:ring-brand-indigo/20 outline-none transition-all text-sm font-medium text-gray-900 dark:text-white placeholder:text-gray-400 shadow-sm"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] sm:text-xs font-bold text-gray-700 dark:text-white uppercase tracking-wider pl-1">Company Website</label>
                      <div className="relative group">
                        <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-brand-indigo transition-colors" />
                        <input
                          type="url"
                          required
                          value={companyWebsite}
                          onChange={(e) => setCompanyWebsite(e.target.value)}
                          placeholder="https://techcorp.com"
                          className="w-full pl-10 pr-4 py-2 sm:py-2.5 rounded-xl border-2 border-gray-200 dark:border-transparent bg-white dark:bg-white/5 focus:border-brand-indigo focus:ring-4 focus:ring-brand-indigo/20 outline-none transition-all text-sm font-medium text-gray-900 dark:text-white placeholder:text-gray-400 shadow-sm"
                        />
                      </div>
                      {domainMismatchError && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-xs font-medium text-danger pl-1 mt-1"
                        >
                          ⚠️ {domainMismatchError}
                        </motion.p>
                      )}
                    </div>
                  </div>

                  <CompanyVerifyForm
                    onSubmit={(method, value) => {
                      submitCompanyVerification(method, value, companyName, companyWebsite);
                    }}
                    canSubmit={companyName.trim().length > 0 && companyWebsite.trim().length > 0 && !domainMismatchError}
                  />
                </motion.div>
              )}

              {/* ═══════ STEP 4: PENDING REDIRECT ═══════ */}
              {registrationStep === 4 && (
                <motion.div
                  key="pending"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-warning/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🕐</span>
                  </div>
                  <h2 className="font-display font-bold text-2xl text-gray-900 dark:text-white mb-2">
                    Submitted!
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-white/50">
                    Redirecting to your dashboard...
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
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

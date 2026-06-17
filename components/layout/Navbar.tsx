"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";
import ThemeToggle from "@/components/shared/ThemeToggle";
import { BrainCircuit } from "lucide-react";
import NotificationBell from "@/components/notifications/NotificationBell";

export default function Navbar() {
  const { user, isAuthenticated } = useAuthStore();

  return (
    <nav className="hidden lg:flex sticky top-0 z-50 w-full h-16 bg-bg-secondary/80 backdrop-blur-md border-b border-border-default items-center justify-between px-8 shadow-sm">
      {/* Left: Logo */}
      <div className="flex items-center">
        <Link href="/" className="flex items-center space-x-2 font-display font-bold text-2xl tracking-tight">
          <BrainCircuit className="w-8 h-8 text-brand-indigo" />
          <span>BeyondResume <span className="text-brand-cyan">AI</span></span>
        </Link>
      </div>

      {/* Center: Nav Links */}
      <div className="flex items-center space-x-8 font-medium text-text-secondary text-sm">
        {!isAuthenticated ? (
          <>
            <Link href="/" className="relative text-text-secondary hover:text-brand-indigo transition-colors after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-brand-indigo after:transition-all after:duration-300 hover:after:w-full">Home</Link>
            <Link href="/#features" className="relative text-text-secondary hover:text-brand-indigo transition-colors after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-brand-indigo after:transition-all after:duration-300 hover:after:w-full">Features</Link>
            <Link href="/#how-it-works" className="relative text-text-secondary hover:text-brand-indigo transition-colors after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-brand-indigo after:transition-all after:duration-300 hover:after:w-full">How It Works</Link>
            <Link href="/#pricing" className="relative text-text-secondary hover:text-brand-indigo transition-colors after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-brand-indigo after:transition-all after:duration-300 hover:after:w-full">Pricing</Link>
          </>
        ) : user?.role === "CANDIDATE" ? (
          <>
            <Link href="/dashboard" className="relative text-text-secondary hover:text-brand-indigo transition-colors after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-brand-indigo after:transition-all after:duration-300 hover:after:w-full">Dashboard</Link>
            <Link href="/job" className="relative text-text-secondary hover:text-brand-indigo transition-colors after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-brand-indigo after:transition-all after:duration-300 hover:after:w-full">Jobs</Link>
            <Link href="/interview" className="relative text-text-secondary hover:text-brand-indigo transition-colors after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-brand-indigo after:transition-all after:duration-300 hover:after:w-full">Interview</Link>
            <Link href="/scores" className="relative text-text-secondary hover:text-brand-indigo transition-colors after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-brand-indigo after:transition-all after:duration-300 hover:after:w-full">Scores</Link>
            <Link href="/roadmap" className="relative text-text-secondary hover:text-brand-indigo transition-colors after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-brand-indigo after:transition-all after:duration-300 hover:after:w-full">Roadmap</Link>
          </>
        ) : user?.role === "RECRUITER" ? (
          <>
            <Link href="/recruiter/dashboard" className="relative text-text-secondary hover:text-brand-indigo transition-colors after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-brand-indigo after:transition-all after:duration-300 hover:after:w-full">Dashboard</Link>
            <Link href="/recruiter/post-job" className="relative text-text-secondary hover:text-brand-indigo transition-colors after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-brand-indigo after:transition-all after:duration-300 hover:after:w-full">Post Job</Link>
            <Link href="/recruiter/candidates" className="relative text-text-secondary hover:text-brand-indigo transition-colors after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-brand-indigo after:transition-all after:duration-300 hover:after:w-full">Candidates</Link>
            <Link href="/recruiter/analytics" className="relative text-text-secondary hover:text-brand-indigo transition-colors after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-brand-indigo after:transition-all after:duration-300 hover:after:w-full">Analytics</Link>
          </>
        ) : null}
      </div>

      {/* Right: Actions */}
      <div className="flex items-center space-x-4">
        <ThemeToggle />
        
        {!isAuthenticated ? (
          <>
            <Link href="/login" className="text-sm font-semibold text-text-secondary hover:text-text-primary transition-colors">
              Login
            </Link>
            <Link href="/register" className="text-sm font-semibold text-white bg-brand-indigo hover:bg-brand-violet transition-colors px-4 py-2 rounded-md shadow-sm">
              Get Started &rarr;
            </Link>
          </>
        ) : (
          <>
            <NotificationBell />
            <Link href={user?.role === "RECRUITER" ? "/recruiter/profile" : "/profile"} className="flex items-center space-x-2 p-1 rounded-md hover:bg-bg-tertiary transition-colors">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-brand-gradient flex items-center justify-center text-white font-bold text-sm">
                {user?.avatar ? (
                  <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  user?.name.charAt(0)
                )}
              </div>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";
import ThemeToggle from "@/components/shared/ThemeToggle";
import { Bell, UserCircle, BrainCircuit } from "lucide-react";

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
            <Link href="/" className="hover:text-brand-indigo transition-colors">Home</Link>
            <Link href="/#features" className="hover:text-brand-indigo transition-colors">Features</Link>
            <Link href="/#how-it-works" className="hover:text-brand-indigo transition-colors">How It Works</Link>
            <Link href="/#pricing" className="hover:text-brand-indigo transition-colors">Pricing</Link>
          </>
        ) : user?.role === "CANDIDATE" ? (
          <>
            <Link href="/dashboard" className="hover:text-brand-indigo transition-colors">Dashboard</Link>
            <Link href="/upload" className="hover:text-brand-indigo transition-colors">Upload</Link>
            <Link href="/interview" className="hover:text-brand-indigo transition-colors">Interview</Link>
            <Link href="/scores" className="hover:text-brand-indigo transition-colors">Scores</Link>
            <Link href="/roadmap" className="hover:text-brand-indigo transition-colors">Roadmap</Link>
          </>
        ) : user?.role === "RECRUITER" ? (
          <>
            <Link href="/recruiter/dashboard" className="hover:text-brand-indigo transition-colors">Dashboard</Link>
            <Link href="/recruiter/post-job" className="hover:text-brand-indigo transition-colors">Post Job</Link>
            <Link href="/recruiter/dashboard" className="hover:text-brand-indigo transition-colors">Candidates</Link>
            <Link href="/recruiter/dashboard" className="hover:text-brand-indigo transition-colors">Analytics</Link>
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
            <button className="text-text-muted hover:text-brand-indigo transition-colors p-2 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full border border-bg-secondary"></span>
            </button>
            <Link href="/profile" className="flex items-center space-x-2 p-1 rounded-md hover:bg-bg-tertiary transition-colors">
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

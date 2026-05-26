"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";
import ThemeToggle from "@/components/shared/ThemeToggle";
import { Bell, Menu, BrainCircuit } from "lucide-react";

export default function MobileHeader() {
  const { user, isAuthenticated } = useAuthStore();

  return (
    <header className="lg:hidden sticky top-0 z-50 w-full h-14 bg-bg-secondary/80 backdrop-blur-md border-b border-border-default flex items-center justify-between px-4 shadow-sm">
      <Link href="/" className="flex items-center space-x-1.5 font-display font-bold text-lg tracking-tight">
        <BrainCircuit className="w-5 h-5 text-brand-indigo" />
        <span>BeyondResume <span className="text-brand-cyan">AI</span></span>
      </Link>
      
      <div className="flex items-center space-x-3">
        <ThemeToggle />
        
        {isAuthenticated ? (
          <>
            <button className="text-text-muted hover:text-brand-indigo transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-danger rounded-full border border-bg-secondary"></span>
            </button>
            <Link href="/profile" className="flex items-center justify-center w-7 h-7 rounded-full overflow-hidden bg-brand-gradient text-white font-bold text-xs">
              {user?.avatar ? (
                <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                user?.name.charAt(0)
              )}
            </Link>
          </>
        ) : (
          <button className="text-text-muted hover:text-text-primary p-1">
            <Menu className="w-6 h-6" />
          </button>
        )}
      </div>
    </header>
  );
}

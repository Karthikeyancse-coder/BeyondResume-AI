"use client";

import { useAuthStore } from "@/store/useAuthStore";
import PageWrapper from "@/components/layout/PageWrapper";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { LogOut, User, Mail, Shield, Building2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  const handleSignOut = () => {
    logout();
    router.push("/");
  };

  if (!user) return null;

  return (
    <PageWrapper className="min-h-[90vh] flex items-center justify-center p-6 bg-bg-primary">
      <motion.div
        variants={fadeUp}
        initial="initial"
        animate="animate"
        className="w-full max-w-lg bg-bg-secondary p-8 md:p-10 rounded-3xl shadow-xl border border-border-default relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-brand-gradient" />
        
        <div className="flex flex-col items-center mb-10 mt-4">
          <div className="w-24 h-24 rounded-full bg-brand-gradient flex items-center justify-center text-white font-bold text-4xl shadow-lg mb-4">
            {user.name.charAt(0)}
          </div>
          <h1 className="font-display font-bold text-3xl text-text-primary">{user.name}</h1>
          <span className="mt-2 bg-brand-indigo/10 text-brand-indigo text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            {user.role}
          </span>
        </div>

        <div className="space-y-6 mb-10">
          <div className="flex items-center p-4 bg-bg-tertiary rounded-xl border border-border-subtle">
            <User className="w-6 h-6 text-brand-cyan mr-4" />
            <div>
              <p className="text-xs font-bold text-text-muted uppercase">Full Name</p>
              <p className="text-sm font-semibold text-text-primary">{user.name}</p>
            </div>
          </div>
          
          <div className="flex items-center p-4 bg-bg-tertiary rounded-xl border border-border-subtle">
            <Mail className="w-6 h-6 text-brand-violet mr-4" />
            <div>
              <p className="text-xs font-bold text-text-muted uppercase">Email Address</p>
              <p className="text-sm font-semibold text-text-primary">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center p-4 bg-bg-tertiary rounded-xl border border-border-subtle">
            <Shield className="w-6 h-6 text-brand-indigo mr-4" />
            <div>
              <p className="text-xs font-bold text-text-muted uppercase">Account ID</p>
              <p className="text-sm font-semibold text-text-primary font-mono">{user.id}</p>
            </div>
          </div>

          {user.role === "RECRUITER" && (
            <div className="flex items-center p-4 bg-bg-tertiary rounded-xl border border-border-subtle">
              <Building2 className="w-6 h-6 text-success mr-4" />
              <div>
                <p className="text-xs font-bold text-text-muted uppercase">Company</p>
                <p className="text-sm font-semibold text-text-primary">TechCorp Inc.</p>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={handleSignOut}
          className="w-full flex items-center justify-center space-x-2 py-3.5 border-2 border-danger text-danger rounded-xl font-bold hover:bg-danger/10 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </motion.div>
    </PageWrapper>
  );
}

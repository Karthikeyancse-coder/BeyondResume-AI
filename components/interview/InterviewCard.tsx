"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Calendar, Building2, Terminal, HelpCircle, ListTodo, ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface InterviewCardProps {
  interview: {
    id: string;
    companyName: string;
    companyLogo: string;
    jobRole: string;
    interviewType: string;
    status: string;
    interviewDate: string;
  };
  index: number;
}

export default function InterviewCard({ interview, index }: InterviewCardProps) {
  const router = useRouter();

  const handleAttend = () => {
    // Route based on interview type
    router.push(`/interview/${interview.interviewType}/${interview.id}`);
  };

  const getTypeDetails = (type: string) => {
    switch (type) {
      case "coding":
        return { icon: Terminal, label: "Coding Exam", color: "text-brand-cyan", bg: "bg-brand-cyan/10" };
      case "qa":
        return { icon: HelpCircle, label: "Q&A Round", color: "text-brand-indigo", bg: "bg-brand-indigo/10" };
      case "mcq":
        return { icon: ListTodo, label: "MCQ Quiz", color: "text-brand-violet", bg: "bg-brand-violet/10" };
      default:
        return { icon: HelpCircle, label: "Assessment", color: "text-text-secondary", bg: "bg-bg-tertiary" };
    }
  };

  const typeDetails = getTypeDetails(interview.interviewType);
  const Icon = typeDetails.icon;

  const date = new Date(interview.interviewDate).toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit"
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-bg-secondary rounded-2xl border border-border-subtle p-6 hover:shadow-md transition-shadow relative overflow-hidden group flex flex-col"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-xl bg-bg-tertiary flex items-center justify-center text-xl font-bold text-text-secondary border border-border-default">
            {interview.companyLogo}
          </div>
          <div>
            <h3 className="text-xl font-bold text-text-primary">{interview.jobRole}</h3>
            <div className="flex items-center text-text-secondary mt-1 space-x-2">
              <Building2 className="w-4 h-4" />
              <span>{interview.companyName}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-1.5 bg-success/10 text-success px-3 py-1 rounded-full text-xs font-semibold">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>{interview.status}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-6 flex-1">
        <div className={cn("flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-medium", typeDetails.bg, typeDetails.color)}>
          <Icon className="w-4 h-4" />
          <span>{typeDetails.label}</span>
        </div>
        <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-bg-tertiary text-text-secondary">
          <Calendar className="w-4 h-4" />
          <span>{date}</span>
        </div>
      </div>

      <div className="pt-4 border-t border-border-subtle">
        <button 
          onClick={handleAttend}
          className="w-full flex items-center justify-center space-x-2 bg-brand-indigo hover:bg-brand-violet text-white py-3 rounded-xl font-bold transition-colors shadow-sm"
        >
          <span>Attend Interview</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
}

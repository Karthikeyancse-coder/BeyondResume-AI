"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { mockCompanyQAQuestions } from "@/lib/mock-data";
import { Timer, ArrowRight, ArrowLeft, CheckCircle2, Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PageWrapper from "@/components/layout/PageWrapper";
export default function QAInterviewPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentQuestion = mockCompanyQAQuestions[currentIndex];

  useEffect(() => {
    if (timeLeft <= 0 && !isSubmitted) {
      handleSubmit();
      return;
    }
    const timer = setInterval(() => {
      if (!isSubmitted) setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, isSubmitted]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleNext = () => {
    if (currentIndex < mockCompanyQAQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setTimeout(() => {
      router.push("/interview");
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <PageWrapper className="min-h-[80vh] flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-bg-secondary p-10 rounded-3xl shadow-lg border border-border-default text-center max-w-md w-full"
        >
          <CheckCircle2 className="w-20 h-20 text-brand-indigo mx-auto mb-6" />
          <h2 className="text-3xl font-bold font-display text-text-primary mb-2">
            Interview Complete
          </h2>
          <p className="text-text-secondary">
            Your answers have been recorded successfully. Returning to dashboard...
          </p>
        </motion.div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper className="min-h-screen flex flex-col p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-bold text-xl text-text-primary">Q&A Assessment</h1>
          <p className="text-sm text-text-secondary font-medium">Question {currentIndex + 1} of {mockCompanyQAQuestions.length}</p>
        </div>
        <div className={`flex items-center space-x-2 font-mono font-bold text-lg px-4 py-2 rounded-lg border ${timeLeft < 300 ? "bg-danger/10 text-danger border-danger/20" : "bg-bg-tertiary text-text-primary border-border-subtle"}`}>
          <Timer className="w-5 h-5" />
          <span>{formatTime(timeLeft)}</span>
        </div>
      </div>

      <div className="h-2 w-full bg-border-subtle rounded-full overflow-hidden mb-8">
        <motion.div 
          className="h-full bg-brand-indigo rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${((currentIndex + 1) / mockCompanyQAQuestions.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Main Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`q-${currentIndex}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="flex-1 flex flex-col"
        >
          <div className="bg-bg-secondary p-8 md:p-10 rounded-3xl shadow-md border border-border-default mb-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full bg-brand-indigo/10 flex items-center justify-center shrink-0 mt-1">
                <Bot className="w-6 h-6 text-brand-indigo" />
              </div>
              <h2 className="font-display font-semibold text-2xl text-text-primary leading-snug">
                {currentQuestion.question}
              </h2>
            </div>
          </div>

          <div className="flex-1 flex flex-col">
            <textarea
              value={answers[currentQuestion.id] || ""}
              onChange={(e) => setAnswers({ ...answers, [currentQuestion.id]: e.target.value })}
              placeholder="Type your detailed answer here..."
              className="w-full flex-1 min-h-[200px] p-6 rounded-2xl border border-border-strong bg-bg-primary focus:bg-bg-secondary focus:border-brand-indigo focus:ring-2 focus:ring-brand-indigo/20 outline-none resize-none transition-all text-text-primary text-lg"
            />
          </div>

          <div className="flex items-center justify-between mt-8">
            <button 
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="flex items-center space-x-2 px-6 py-3 rounded-xl font-bold text-text-secondary hover:bg-bg-tertiary transition-colors disabled:opacity-50"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Previous</span>
            </button>

            <button
              onClick={handleNext}
              className="flex items-center space-x-2 px-8 py-3.5 bg-brand-indigo text-white rounded-xl font-bold shadow-sm hover:bg-brand-violet transition-all"
            >
              <span>{currentIndex === mockCompanyQAQuestions.length - 1 ? "Submit Exam" : "Next Question"}</span>
              {currentIndex !== mockCompanyQAQuestions.length - 1 && <ArrowRight className="w-5 h-5" />}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </PageWrapper>
  );
}

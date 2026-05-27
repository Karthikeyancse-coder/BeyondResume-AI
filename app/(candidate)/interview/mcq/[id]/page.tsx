"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { mockCompanyMCQQuestions } from "@/lib/mock-data";
import { Timer, ArrowRight, ArrowLeft, ListTodo } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PageWrapper from "@/components/layout/PageWrapper";
import { cn } from "@/lib/utils";

export default function MCQInterviewPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = mockCompanyMCQQuestions[currentIndex];

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
    if (currentIndex < mockCompanyMCQQuestions.length - 1) {
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

  const handleSelectOption = (index: number) => {
    setAnswers({ ...answers, [currentQuestion.id]: index });
  };

  const handleSubmit = () => {
    // Calculate score
    let calculatedScore = 0;
    mockCompanyMCQQuestions.forEach(q => {
      if (answers[q.id] === q.correctAnswerIndex) {
        calculatedScore += 1;
      }
    });
    setScore(Math.round((calculatedScore / mockCompanyMCQQuestions.length) * 100));
    setIsSubmitted(true);
    
    setTimeout(() => {
      router.push("/interview");
    }, 4000);
  };

  if (isSubmitted) {
    return (
      <PageWrapper className="min-h-[80vh] flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-bg-secondary p-10 rounded-3xl shadow-lg border border-border-default text-center max-w-md w-full"
        >
          <div className="relative w-24 h-24 mx-auto mb-6">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="48" cy="48" r="45" fill="none" stroke="currentColor" strokeWidth="6" className="text-border-subtle" />
              <circle cx="48" cy="48" r="45" fill="none" stroke="currentColor" strokeWidth="6" strokeDasharray="283" strokeDashoffset={283 - (283 * score) / 100} className="text-brand-violet transition-all duration-1000" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center font-bold text-2xl text-text-primary">
              {score}%
            </div>
          </div>
          <h2 className="text-3xl font-bold font-display text-text-primary mb-2">
            Quiz Completed!
          </h2>
          <p className="text-text-secondary">
            Your results have been saved. Returning to dashboard...
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
          <h1 className="font-display font-bold text-xl text-text-primary">MCQ Assessment</h1>
          <p className="text-sm text-text-secondary font-medium">Question {currentIndex + 1} of {mockCompanyMCQQuestions.length}</p>
        </div>
        <div className={`flex items-center space-x-2 font-mono font-bold text-lg px-4 py-2 rounded-lg border ${timeLeft < 300 ? "bg-danger/10 text-danger border-danger/20" : "bg-bg-tertiary text-text-primary border-border-subtle"}`}>
          <Timer className="w-5 h-5" />
          <span>{formatTime(timeLeft)}</span>
        </div>
      </div>

      <div className="flex gap-2 mb-8">
        {mockCompanyMCQQuestions.map((_, i) => (
          <div 
            key={i} 
            className={cn(
              "h-2 flex-1 rounded-full transition-colors",
              i === currentIndex ? "bg-brand-violet" :
              answers[mockCompanyMCQQuestions[i].id] !== undefined ? "bg-brand-violet/30" :
              "bg-border-subtle"
            )}
          />
        ))}
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
          <div className="bg-bg-secondary p-8 md:p-10 rounded-3xl shadow-md border border-border-default mb-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full bg-brand-violet/10 flex items-center justify-center shrink-0 mt-1">
                <ListTodo className="w-6 h-6 text-brand-violet" />
              </div>
              <h2 className="font-display font-semibold text-2xl text-text-primary leading-snug">
                {currentQuestion.question}
              </h2>
            </div>
          </div>

          <div className="flex-1 flex flex-col space-y-4">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = answers[currentQuestion.id] === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={cn(
                    "w-full flex items-center p-5 rounded-2xl border-2 text-left transition-all",
                    isSelected 
                      ? "border-brand-violet bg-brand-violet/5" 
                      : "border-border-default bg-bg-secondary hover:border-brand-violet/30 hover:bg-bg-tertiary"
                  )}
                >
                  <div className={cn(
                    "w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center shrink-0 transition-colors",
                    isSelected ? "border-brand-violet bg-brand-violet" : "border-border-strong"
                  )}>
                    {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                  </div>
                  <span className={cn(
                    "text-lg font-medium",
                    isSelected ? "text-brand-violet" : "text-text-primary"
                  )}>
                    {option}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between mt-12">
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
              disabled={answers[currentQuestion.id] === undefined}
              className="flex items-center space-x-2 px-8 py-3.5 bg-brand-violet text-white rounded-xl font-bold shadow-sm hover:opacity-90 transition-all disabled:opacity-50"
            >
              <span>{currentIndex === mockCompanyMCQQuestions.length - 1 ? "Submit Exam" : "Next Question"}</span>
              {currentIndex !== mockCompanyMCQQuestions.length - 1 && <ArrowRight className="w-5 h-5" />}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </PageWrapper>
  );
}

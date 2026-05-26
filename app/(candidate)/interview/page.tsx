"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import PageWrapper from "@/components/layout/PageWrapper";
import { fadeUp } from "@/lib/animations";
import { mockInterviewQuestions } from "@/lib/mock-data";
import { Bot, ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { cn } from "@/lib/utils";

export default function InterviewPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  
  const router = useRouter();
  const currentQuestion = mockInterviewQuestions[currentIndex];

  const handleNext = () => {
    if (!answer.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI thinking time
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnswer("");
      if (currentIndex < mockInterviewQuestions.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setIsComplete(true);
      }
    }, 1500);
  };

  if (isComplete) {
    return (
      <PageWrapper className="min-h-[90vh] flex items-center justify-center p-6 bg-bg-primary">
        <motion.div
          variants={fadeUp}
          initial="initial"
          animate="animate"
          className="w-full max-w-lg bg-bg-secondary p-10 rounded-3xl shadow-xl border border-border-default text-center flex flex-col items-center space-y-6"
        >
          <div className="w-20 h-20 relative">
            <LoadingSpinner size="lg" className="absolute inset-0" />
            <Bot className="absolute inset-0 m-auto w-8 h-8 text-brand-indigo" />
          </div>
          <div>
            <h2 className="font-display font-bold text-3xl text-text-primary mb-3">Interview Complete! 🎉</h2>
            <p className="text-text-secondary">
              We are calculating your capability scores based on your architectural reasoning and depth...
            </p>
          </div>
          <button
            onClick={() => router.push("/scores")}
            className="px-8 py-3.5 bg-brand-gradient text-white rounded-xl font-bold shadow-md hover:shadow-glow hover:-translate-y-0.5 transition-all w-full mt-4"
          >
            View Your Scores &rarr;
          </button>
        </motion.div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper className="min-h-screen flex flex-col p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-bold text-xl text-text-primary">AI Capability Interview</h1>
          <p className="text-sm text-text-secondary font-medium">Question {currentIndex + 1} of {mockInterviewQuestions.length}</p>
        </div>
        <div className="h-2 w-32 bg-border-subtle rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-brand-gradient rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentIndex) / mockInterviewQuestions.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Main Card */}
      <AnimatePresence mode="wait">
        {isAnalyzing ? (
          <motion.div
            key="analyzing"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="flex-1 flex flex-col items-center justify-center py-20"
          >
            <Loader2 className="w-12 h-12 text-brand-cyan animate-spin mb-6" />
            <p className="font-bold text-lg text-text-primary animate-pulse">Analyzing your reasoning...</p>
          </motion.div>
        ) : (
          <motion.div
            key={`q-${currentIndex}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex-1 flex flex-col"
          >
            <div className="bg-bg-secondary p-8 md:p-10 rounded-3xl shadow-md border border-border-default mb-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-brand-indigo" />
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-brand-indigo/10 flex items-center justify-center shrink-0 mt-1">
                  <Bot className="w-6 h-6 text-brand-indigo" />
                </div>
                <div>
                  <span className={cn(
                    "inline-block px-2 py-1 rounded text-xs font-bold mb-3 uppercase tracking-wider",
                    currentQuestion.depth === "advanced" ? "bg-danger/10 text-danger" :
                    currentQuestion.depth === "deep" ? "bg-brand-violet/10 text-brand-violet" :
                    "bg-brand-indigo/10 text-brand-indigo"
                  )}>
                    {currentQuestion.depth} LEVEL
                  </span>
                  <h2 className="font-display font-semibold text-2xl text-text-primary leading-snug">
                    {currentQuestion.question}
                  </h2>
                </div>
              </div>
            </div>

            <div className="flex-1 flex flex-col">
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Share your reasoning — depth of thinking matters more than perfect answers..."
                className="w-full flex-1 min-h-[160px] p-6 rounded-2xl border border-border-strong bg-bg-primary focus:bg-bg-secondary focus:border-brand-indigo focus:ring-2 focus:ring-brand-indigo/20 outline-none resize-none transition-all text-text-primary text-lg"
              />
              <div className="flex justify-end mt-2">
                <span className={cn(
                  "text-xs font-medium",
                  answer.length < 50 ? "text-text-muted" : "text-success"
                )}>
                  {answer.length} characters (aim for detailed reasoning)
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between mt-8">
              <button 
                onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
                disabled={currentIndex === 0}
                className="flex items-center space-x-2 px-6 py-3 rounded-xl font-bold text-text-secondary hover:bg-bg-tertiary transition-colors disabled:opacity-50"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Previous</span>
              </button>

              <button
                onClick={handleNext}
                disabled={!answer.trim()}
                className="flex items-center space-x-2 px-8 py-3.5 bg-brand-gradient text-white rounded-xl font-bold shadow-md hover:shadow-glow hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-md"
              >
                <span>{currentIndex === mockInterviewQuestions.length - 1 ? "Submit Final Answer" : "Submit Answer"}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
}

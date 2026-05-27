"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { mockCodingExam } from "@/lib/mock-data";
import { Timer, Play, Send, CheckCircle2, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import PageWrapper from "@/components/layout/PageWrapper";

export default function CodingInterviewPage() {
  const router = useRouter();
  const [code, setCode] = useState("function twoSum(nums, target) {\n  // Write your code here\n  \n}");
  const [language, setLanguage] = useState("javascript");
  const [timeLeft, setTimeLeft] = useState(mockCodingExam.timeLimitMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [evaluation, setEvaluation] = useState<"pass" | "fail" | null>(null);

  // Timer logic
  useEffect(() => {
    if (timeLeft <= 0 && !isSubmitted) {
      handleSubmit(); // Auto submit
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

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setOutput("Running test cases...\nTest Case 1: Pass\nTest Case 2: Pass\nAll tests passed!");
    }, 1500);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setEvaluation("pass");
    setTimeout(() => {
      router.push("/interview"); // Redirect to dashboard after a delay
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
          {evaluation === "pass" ? (
            <CheckCircle2 className="w-20 h-20 text-success mx-auto mb-6" />
          ) : (
            <XCircle className="w-20 h-20 text-danger mx-auto mb-6" />
          )}
          <h2 className="text-3xl font-bold font-display text-text-primary mb-2">
            Assessment Submitted!
          </h2>
          <p className="text-text-secondary">
            Your code has been saved and auto-evaluated. Returning to dashboard...
          </p>
        </motion.div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper className="min-h-screen p-6 max-w-7xl mx-auto flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 shrink-0 bg-bg-secondary p-4 rounded-xl border border-border-default shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-text-primary">{mockCodingExam.title}</h1>
          <p className="text-sm text-text-secondary">Coding Assessment</p>
        </div>
        <div className={`flex items-center space-x-2 font-mono font-bold text-lg px-4 py-2 rounded-lg border ${timeLeft < 300 ? "bg-danger/10 text-danger border-danger/20" : "bg-bg-tertiary text-text-primary border-border-subtle"}`}>
          <Timer className="w-5 h-5" />
          <span>{formatTime(timeLeft)}</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
        {/* Left Panel: Description */}
        <div className="w-full lg:w-1/3 bg-bg-secondary border border-border-default rounded-xl p-6 overflow-y-auto flex flex-col space-y-6">
          <div>
            <h3 className="font-bold text-lg mb-2 text-text-primary">Problem Statement</h3>
            <p className="text-text-secondary text-sm leading-relaxed whitespace-pre-wrap">
              {mockCodingExam.description}
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-text-primary">Examples</h3>
            {mockCodingExam.examples.map((ex, i) => (
              <div key={i} className="bg-bg-tertiary p-4 rounded-lg border border-border-subtle font-mono text-xs text-text-primary space-y-1">
                <div><span className="text-brand-indigo font-bold">Input:</span> {ex.input}</div>
                <div><span className="text-success font-bold">Output:</span> {ex.output}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel: Editor & Output */}
        <div className="w-full lg:w-2/3 flex flex-col gap-6">
          {/* Editor */}
          <div className="flex-1 bg-bg-secondary border border-border-default rounded-xl overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-4 py-2 border-b border-border-default bg-bg-tertiary">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-bg-primary text-sm font-semibold px-3 py-1.5 rounded border border-border-subtle text-text-primary outline-none focus:border-brand-indigo"
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="cpp">C++</option>
              </select>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={handleRun}
                  disabled={isRunning}
                  className="flex items-center space-x-1.5 px-4 py-1.5 bg-bg-primary hover:bg-bg-tertiary text-text-primary border border-border-subtle rounded-md text-sm font-semibold transition-colors disabled:opacity-50"
                >
                  <Play className="w-4 h-4" />
                  <span>Run</span>
                </button>
                <button 
                  onClick={handleSubmit}
                  className="flex items-center space-x-1.5 px-4 py-1.5 bg-brand-indigo hover:bg-brand-violet text-white border border-transparent rounded-md text-sm font-semibold shadow-sm transition-colors"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit</span>
                </button>
              </div>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-1 w-full bg-[#1e1e1e] text-[#d4d4d4] font-mono p-4 outline-none resize-none text-sm"
              spellCheck={false}
            />
          </div>

          {/* Output console */}
          <div className="h-48 bg-[#1e1e1e] border border-border-default rounded-xl overflow-hidden flex flex-col shrink-0">
            <div className="px-4 py-1.5 bg-[#252526] text-[#cccccc] text-xs font-semibold uppercase tracking-wider border-b border-[#333]">
              Console Output
            </div>
            <div className="flex-1 p-4 font-mono text-sm text-[#4af626] whitespace-pre-wrap overflow-y-auto">
              {isRunning ? "Running code in sandbox..." : output || "Click 'Run' to see output here."}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

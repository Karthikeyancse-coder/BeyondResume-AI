/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useRef } from "react";
import { useChat } from "@ai-sdk/react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { mockRoadmap } from "@/lib/mock-data";

export default function RoadmapChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/roadmap-chat",
    body: {
      context: mockRoadmap
    }
  } as any) as any;

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 w-14 h-14 rounded-full bg-brand-gradient text-white shadow-lg shadow-brand-indigo/30 flex items-center justify-center z-50 transition-all",
          isOpen ? "opacity-0 pointer-events-none scale-75" : "opacity-100"
        )}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 w-[380px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-6rem)] bg-bg-secondary rounded-2xl shadow-2xl border border-border-default flex flex-col overflow-hidden z-50"
          >
            {/* Header */}
            <div className="p-4 bg-brand-gradient text-white flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Roadmap Assistant</h3>
                  <p className="text-[10px] text-white/80">Powered by BeyondResume AI</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-bg-primary">
              {(!messages || messages.length === 0) && (
                <div className="text-center text-text-secondary mt-10">
                  <div className="w-12 h-12 rounded-full bg-brand-indigo/10 flex items-center justify-center mx-auto mb-3">
                    <Bot className="w-6 h-6 text-brand-indigo" />
                  </div>
                  <p className="text-sm font-medium">Hi there! 👋</p>
                  <p className="text-xs mt-1">I can help you understand your missing skills, recommend learning resources, or explain concepts from your roadmap.</p>
                </div>
              )}

              {messages?.map((m: any) => (
                <div
                  key={m.id}
                  className={cn(
                    "flex gap-3 max-w-[85%]",
                    m.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                    m.role === "user" ? "bg-brand-cyan/20 text-brand-cyan" : "bg-brand-indigo/20 text-brand-indigo"
                  )}>
                    {m.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className={cn(
                    "p-3 rounded-2xl text-sm whitespace-pre-wrap leading-relaxed shadow-sm border",
                    m.role === "user" 
                      ? "bg-brand-gradient text-white rounded-tr-none border-transparent" 
                      : "bg-bg-secondary text-text-primary rounded-tl-none border-border-default"
                  )}>
                    {m.content}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex gap-3 max-w-[85%] mr-auto">
                  <div className="w-8 h-8 rounded-full bg-brand-indigo/20 text-brand-indigo flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="p-3 rounded-2xl bg-bg-secondary rounded-tl-none border border-border-default flex items-center gap-2">
                    <Loader2 className="w-4 h-4 text-brand-indigo animate-spin" />
                    <span className="text-xs text-text-secondary">AI is thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="p-3 border-t border-border-default bg-bg-secondary">
              <div className="relative">
                <input
                  type="text"
                  value={input || ""}
                  onChange={handleInputChange}
                  placeholder="Ask about your roadmap..."
                  className="w-full bg-bg-tertiary border border-border-default text-text-primary text-sm rounded-xl pl-4 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-brand-indigo/50 transition-all"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !(input || "").trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-brand-indigo text-white rounded-lg hover:bg-brand-violet transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

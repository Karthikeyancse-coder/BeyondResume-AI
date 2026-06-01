"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Send, Paperclip, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import MessageBubble from "./MessageBubble";
import { format } from "date-fns";

interface ChatWindowProps {
  threadId: string;
  messages: any[];
  title: string;
  subtitle: string;
  isVerified?: boolean;
  stage?: string;
  backHref: string;
  onSendMessage: (content: string) => void;
  currentUserId: string;
}

export default function ChatWindow({ 
  threadId, messages, title, subtitle, isVerified, stage, backHref, onSendMessage, currentUserId 
}: ChatWindowProps) {
  const [inputValue, setInputValue] = useState("");
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    onSendMessage(inputValue.trim());
    setInputValue("");
  };

  // Group messages by day
  const groupedMessages: { [date: string]: any[] } = {};
  messages.forEach(msg => {
    const date = format(new Date(msg.createdAt), "MMM d, yyyy");
    if (!groupedMessages[date]) groupedMessages[date] = [];
    groupedMessages[date].push(msg);
  });

  return (
    <div className="flex flex-col h-full bg-bg-secondary border border-white/5 rounded-xl overflow-hidden relative">
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-white/5 bg-bg-secondary/80 backdrop-blur z-10">
        <div className="flex items-center gap-3">
          <Link href={backHref} className="lg:hidden p-2 text-text-secondary hover:text-text-primary transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-semibold text-text-primary">{title}</h2>
              {isVerified && (
                <CheckCircle2 className="w-4 h-4 text-brand-cyan" title="Verified Company" />
              )}
            </div>
            <p className="text-xs text-text-secondary">{subtitle}</p>
          </div>
        </div>

        {stage && (
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-full border border-white/5">
            <span className="text-xs text-text-tertiary">Stage:</span>
            <span className="text-xs font-medium text-brand-indigo capitalize flex items-center gap-1">
              {stage === 'selected' ? '⭐ Selected' : stage === 'offer' ? '🎁 Offer' : stage === 'hired' ? '🎉 Hired' : stage}
            </span>
          </div>
        )}
      </div>

      {/* Message Area */}
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar bg-bg-primary/50">
        {Object.entries(groupedMessages).map(([date, dayMessages]) => (
          <div key={date}>
            <div className="flex justify-center my-4">
              <span className="text-[10px] uppercase font-semibold text-text-tertiary bg-bg-secondary px-3 py-1 rounded-full border border-white/5">
                {date === format(new Date(), "MMM d, yyyy") ? "Today" : date}
              </span>
            </div>
            
            {dayMessages.map((msg) => (
              <MessageBubble 
                key={msg.id} 
                message={msg} 
                isOwn={msg.sender === currentUserId} 
              />
            ))}
          </div>
        ))}
        <div ref={endOfMessagesRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-bg-secondary border-t border-white/5">
        <form onSubmit={handleSend} className="flex items-end gap-2 relative">
          <div className="flex-1 relative bg-bg-primary border border-white/10 rounded-xl overflow-hidden focus-within:border-brand-indigo transition-colors flex items-center">
            <button type="button" className="p-3 text-text-tertiary hover:text-text-primary transition-colors">
              <Paperclip className="w-5 h-5" />
            </button>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-transparent py-3 pr-4 text-sm text-text-primary focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="p-3 bg-brand-indigo hover:bg-brand-violet text-white rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0 shadow-lg shadow-brand-indigo/20"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}

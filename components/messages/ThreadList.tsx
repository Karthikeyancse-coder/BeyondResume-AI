"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

interface ThreadListProps {
  threads: {
    threadId: string;
    company: string;
    recruiter: string;
    jobTitle: string;
    stage: string;
    unreadCount: number;
    lastMessage: string;
    lastMessageTime: string;
  }[];
  activeThreadId?: string;
  baseUrl: string;
}

export default function ThreadList({ threads, activeThreadId, baseUrl }: ThreadListProps) {
  return (
    <div className="flex flex-col h-full bg-bg-secondary border border-white/5 rounded-xl overflow-hidden">
      
      {/* Search Header */}
      <div className="p-4 border-b border-white/5 bg-bg-secondary/80 backdrop-blur z-10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
          <input 
            type="text" 
            placeholder="Search conversations..."
            className="w-full bg-bg-primary border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-text-primary focus:outline-none focus:border-brand-indigo transition-colors"
          />
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {threads.map((thread) => {
          const isActive = activeThreadId === thread.threadId;
          const hasUnread = thread.unreadCount > 0;

          return (
            <Link 
              key={thread.threadId}
              href={`${baseUrl}/${thread.threadId}`}
              className={cn(
                "block p-4 border-b border-white/5 transition-colors relative",
                isActive ? "bg-white/10" : "hover:bg-white/5",
                hasUnread && !isActive && "bg-brand-indigo/5"
              )}
            >
              {/* Unread Indicator */}
              {hasUnread && (
                <div className="absolute left-0 top-0 h-full w-1 bg-brand-indigo" />
              )}

              <div className="flex items-start gap-3">
                
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-brand-gradient flex items-center justify-center shrink-0 text-white font-bold text-sm shadow-md">
                  {thread.company.charAt(0)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-text-primary text-sm truncate pr-2">
                      {thread.company} <span className="text-text-tertiary font-normal">· {thread.recruiter}</span>
                    </h3>
                    <span className={cn("text-[10px] whitespace-nowrap", hasUnread ? "text-brand-indigo font-bold" : "text-text-tertiary")}>
                      {formatDistanceToNow(new Date(thread.lastMessageTime), { addSuffix: false })}
                    </span>
                  </div>
                  
                  <p className="text-xs font-medium text-brand-cyan mb-1 truncate">
                    {thread.jobTitle}
                  </p>
                  
                  <p className={cn("text-xs truncate", hasUnread ? "text-text-primary font-semibold" : "text-text-secondary")}>
                    {thread.lastMessage}
                  </p>
                  
                  <div className="flex items-center justify-between mt-2">
                    {hasUnread && (
                      <span className="text-[10px] font-bold text-brand-indigo flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-indigo animate-pulse" />
                        {thread.unreadCount} unread
                      </span>
                    )}
                    
                    <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-text-secondary ml-auto capitalize">
                      {thread.stage === 'selected' ? '⭐ Selected' : thread.stage === 'offer' ? '🎁 Offer' : '🎉 Hired'}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

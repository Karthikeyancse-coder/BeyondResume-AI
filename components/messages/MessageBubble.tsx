"use client";

import { Check, CheckCheck } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface MessageBubbleProps {
  message: {
    id: string;
    sender: string;
    senderName?: string;
    content: string;
    createdAt: string;
    read?: boolean;
  };
  isOwn: boolean;
}

export default function MessageBubble({ message, isOwn }: MessageBubbleProps) {
  const time = format(new Date(message.createdAt), "h:mm a");

  return (
    <div className={cn("flex w-full mb-4", isOwn ? "justify-end" : "justify-start")}>
      <div className={cn("flex flex-col max-w-[75%]", isOwn ? "items-end" : "items-start")}>
        
        {!isOwn && message.senderName && (
          <span className="text-xs text-text-tertiary mb-1 ml-1">{message.senderName}</span>
        )}

        <div
          className={cn(
            "px-4 py-2 rounded-2xl relative group",
            isOwn 
              ? "bg-brand-indigo text-white rounded-tr-sm" 
              : "bg-bg-tertiary border border-white/5 text-text-primary rounded-tl-sm"
          )}
        >
          <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
        </div>

        <div className="flex items-center gap-1 mt-1 text-[10px] text-text-tertiary px-1">
          <span>{time}</span>
          {isOwn && (
            <span className="ml-1">
              {message.read ? (
                <CheckCheck className="w-3 h-3 text-brand-cyan" />
              ) : (
                <Check className="w-3 h-3 text-text-tertiary" />
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

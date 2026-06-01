"use client";

import { useState } from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { MessageCircle, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Notification, NOTIFICATION_TYPES } from "./notification-types";
import ResponseButtons from "./ResponseButtons";
import { cn } from "@/lib/utils";

interface NotificationCardProps {
  notification: Notification;
}

export default function NotificationCard({ notification }: NotificationCardProps) {
  const router = useRouter();
  const typeInfo = NOTIFICATION_TYPES[notification.type];
  const [status, setStatus] = useState<'pending' | 'accepted' | 'declined'>('pending');

  const handleAccept = () => {
    setStatus('accepted');
    toast.success("You've accepted! Recruiter has been notified.");
    // Wait briefly for toast, then redirect to chat
    setTimeout(() => {
      router.push(`/messages/${notification.threadId}`);
    }, 1500);
    // 🔴 TODO: REPLACE WITH API CALL → POST /api/candidates/respond-selection { response: 'accept' }
  };

  const handleDecline = () => {
    setStatus('declined');
    toast.success("Response sent. Good luck with your search!");
    // 🔴 TODO: REPLACE WITH API CALL → POST /api/candidates/respond-selection { response: 'decline', reason }
  };

  const handleAskQuestion = () => {
    router.push(`/messages/${notification.threadId}?ask=true`);
  };

  return (
    <div className="bg-bg-secondary border border-white/5 rounded-xl p-6 relative group overflow-hidden">
      {!notification.read && (
        <div className="absolute top-0 right-0 px-3 py-1 bg-brand-indigo/10 text-brand-indigo text-xs font-bold rounded-bl-xl flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-brand-indigo animate-pulse" />
          Unread
        </div>
      )}
      {notification.read && (
        <div className="absolute top-0 right-0 px-3 py-1 text-text-tertiary text-xs flex items-center gap-1">
          ✓ Read
        </div>
      )}

      <div className="flex gap-4">
        <div className={cn("w-12 h-12 rounded-full flex items-center justify-center shrink-0 text-xl", typeInfo.color)}>
          {typeInfo.icon}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-text-primary text-lg">
              {notification.company}
            </h3>
            <span className="text-text-tertiary text-sm">·</span>
            <span className="text-text-secondary text-sm">
              {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
            </span>
          </div>

          <p className="text-text-primary font-medium mb-3">
            {notification.type === 'SELECTED' && `You've been selected for ${notification.jobTitle}`}
            {notification.type === 'OFFER_EXTENDED' && `Offer Extended — ${notification.jobTitle}`}
            {notification.type === 'NEW_MESSAGE' && `New Message regarding ${notification.jobTitle}`}
          </p>

          {(notification.message || notification.preview) && (
            <div className="bg-bg-primary/50 border border-white/5 rounded-lg p-4 mb-4 relative">
              <div className="absolute top-4 left-0 w-1 h-full bg-brand-indigo/30 -ml-px rounded-r" />
              <p className="text-text-secondary text-sm italic">
                &quot;{notification.message || notification.preview}&quot;
              </p>
            </div>
          )}

          {notification.nextSteps && (
            <p className="text-sm text-text-primary mb-4 bg-brand-cyan/5 border border-brand-cyan/10 p-3 rounded-lg inline-block">
              <span className="font-semibold text-brand-cyan">Next Steps:</span> {notification.nextSteps}
            </p>
          )}

          {/* Action Buttons based on Type */}
          {notification.type === 'SELECTED' && (
            <ResponseButtons 
              onAccept={handleAccept} 
              onDecline={handleDecline} 
              onAskQuestion={handleAskQuestion}
              accepted={status === 'accepted'}
              declined={status === 'declined'}
            />
          )}

          {notification.type === 'OFFER_EXTENDED' && (
            <Link 
              href={`/messages/${notification.threadId}`}
              className="inline-flex items-center gap-2 text-brand-cyan hover:text-cyan-400 font-medium text-sm mt-2 transition-colors"
            >
              View Offer in Chat <ArrowRight className="w-4 h-4" />
            </Link>
          )}

          {notification.type === 'NEW_MESSAGE' && (
            <Link 
              href={`/messages/${notification.threadId}`}
              className="inline-flex items-center gap-2 text-brand-violet hover:text-purple-400 font-medium text-sm mt-2 transition-colors"
            >
              Reply in Chat <MessageCircle className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

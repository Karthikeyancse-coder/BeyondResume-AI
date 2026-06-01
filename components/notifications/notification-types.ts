export const NOTIFICATION_TYPES = {
  SELECTED:        { icon: "⭐", color: "bg-brand-indigo/10 text-brand-indigo",  label: "Selected for Role"     },
  OFFER_EXTENDED:  { icon: "🎁", color: "bg-brand-cyan/10 text-brand-cyan",   label: "Offer Extended"        },
  HIRED:           { icon: "🎉", color: "bg-emerald-500/10 text-emerald-500", label: "Congratulations!"      },
  DECLINED:        { icon: "📋", color: "bg-slate-500/10 text-slate-500",         label: "Application Update"    },
  NEW_MESSAGE:     { icon: "💬", color: "bg-brand-violet/10 text-brand-violet",  label: "New Message"           },
  PROFILE_VIEWED:  { icon: "👁️",  color: "bg-amber-500/10 text-amber-500",         label: "Profile Viewed"        },
  INTERVIEW_DUE:   { icon: "🤖", color: "bg-brand-indigo/10 text-brand-indigo",  label: "Complete Interview"    },
  SCORE_READY:     { icon: "📊", color: "bg-brand-cyan/10 text-brand-cyan",    label: "Scores Ready"          },
} as const;

export type NotificationType = keyof typeof NOTIFICATION_TYPES;

export interface Notification {
  id: string;
  type: NotificationType;
  read: boolean;
  createdAt: string;
  company: string;
  recruiter?: string;
  jobTitle?: string;
  message?: string;
  nextSteps?: string;
  preview?: string;
  threadId?: string;
}

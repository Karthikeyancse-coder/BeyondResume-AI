"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Check, MessageCircle, X } from "lucide-react";
import { NOTIFICATION_TYPES, Notification } from "./notification-types";
import { cn } from "@/lib/utils";

interface NotificationDropdownProps {
  notifications: Notification[];
  isOpen: boolean;
  onClose: () => void;
  onMarkAllAsRead: () => void;
}

export default function NotificationDropdown({ notifications, isOpen, onClose, onMarkAllAsRead }: NotificationDropdownProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop for mobile closing */}
          <div className="fixed inset-0 z-40 sm:hidden" onClick={onClose} />
          
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-2 w-[380px] max-h-[480px] bg-bg-primary border border-white/10 rounded-xl shadow-2xl z-50 flex flex-col overflow-hidden glass-panel"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-bg-secondary/50">
              <h3 className="font-semibold text-text-primary">Notifications</h3>
              <button 
                onClick={onMarkAllAsRead}
                className="text-xs text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1"
              >
                <Check className="w-3 h-3" /> Mark all as read
              </button>
            </div>

            {/* List */}
            <div className="overflow-y-auto flex-1 custom-scrollbar">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-text-secondary flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3">
                    <span className="text-2xl">📭</span>
                  </div>
                  <p>No notifications yet</p>
                </div>
              ) : (
                <div className="flex flex-col">
                  {notifications.map((notification) => {
                    const typeInfo = NOTIFICATION_TYPES[notification.type];
                    
                    return (
                      <div 
                        key={notification.id} 
                        className={cn(
                          "p-4 border-b border-white/5 hover:bg-white/5 transition-colors relative group",
                          !notification.read && "bg-brand-indigo/5"
                        )}
                      >
                        {!notification.read && (
                          <div className="absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-brand-indigo" />
                        )}
                        
                        <div className={cn("pl-4 flex gap-3")}>
                          <div className={cn("w-8 h-8 rounded-full flex items-center justify-center shrink-0", typeInfo.color)}>
                            {typeInfo.icon}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-text-primary font-medium leading-snug">
                              {notification.type === 'SELECTED' && `${notification.company} selected you for ${notification.jobTitle}`}
                              {notification.type === 'OFFER_EXTENDED' && `${notification.company} extended an offer!`}
                              {notification.type === 'NEW_MESSAGE' && `New message from ${notification.company}`}
                              {notification.type === 'HIRED' && `You were hired by ${notification.company}!`}
                            </p>
                            
                            {(notification.message || notification.preview) && (
                              <p className="text-xs text-text-secondary mt-1 line-clamp-2">
                                "{notification.message || notification.preview}"
                              </p>
                            )}
                            
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-[10px] text-text-tertiary">
                                {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                              </span>
                              
                              {notification.type === 'SELECTED' && (
                                <div className="flex items-center gap-2 ml-auto">
                                  <Link href={`/notifications`} onClick={onClose} className="text-[11px] font-medium text-success-green hover:underline">Accept</Link>
                                  <Link href={`/notifications`} onClick={onClose} className="text-[11px] font-medium text-error-red hover:underline">Decline</Link>
                                  <Link href={`/messages/${notification.threadId}`} onClick={onClose} className="text-[11px] font-medium text-brand-cyan hover:underline flex items-center gap-1">
                                    Chat <MessageCircle className="w-3 h-3" />
                                  </Link>
                                </div>
                              )}

                              {notification.type === 'NEW_MESSAGE' && (
                                <Link href={`/messages/${notification.threadId}`} onClick={onClose} className="text-[11px] font-medium text-brand-cyan hover:underline ml-auto flex items-center gap-1">
                                  View Message <MessageCircle className="w-3 h-3" />
                                </Link>
                              )}
                              
                              {notification.type === 'OFFER_EXTENDED' && (
                                <Link href={`/messages/${notification.threadId}`} onClick={onClose} className="text-[11px] font-medium text-brand-cyan hover:underline ml-auto flex items-center gap-1">
                                  View Offer
                                </Link>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-white/10 bg-bg-secondary/50 text-center">
              <Link 
                href="/notifications" 
                onClick={onClose}
                className="text-xs font-medium text-brand-indigo hover:text-brand-cyan transition-colors"
              >
                View All Notifications →
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

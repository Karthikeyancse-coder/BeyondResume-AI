"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bell } from "lucide-react";
import PageWrapper from "@/components/layout/PageWrapper";
import NotificationCard from "@/components/notifications/NotificationCard";
import { mockNotifications } from "@/lib/mock-data";
import { Notification, NotificationType } from "@/components/notifications/notification-types";
import { useAuthStore } from "@/store/useAuthStore";

type FilterType = 'All' | 'Unread' | 'Jobs' | 'Messages' | 'System';

export default function NotificationsPage() {
  const [filter, setFilter] = useState<FilterType>('All');
  const [notifications, setNotifications] = useState<Notification[]>(
    mockNotifications.map(n => ({...n, type: n.type as NotificationType}))
  );

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'Unread') return !n.read;
    if (filter === 'Jobs') return n.type === 'SELECTED' || n.type === 'OFFER_EXTENDED' || n.type === 'HIRED';
    if (filter === 'Messages') return n.type === 'NEW_MESSAGE';
    if (filter === 'System') return n.type === 'PROFILE_VIEWED' || n.type === 'INTERVIEW_DUE' || n.type === 'SCORE_READY';
    return true; // All
  });

  return (
    <PageWrapper>
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-text-primary mb-2 flex items-center gap-3">
              <Bell className="w-8 h-8 text-brand-indigo" />
              Notifications
            </h1>
            <p className="text-text-secondary">Stay updated on your job applications and messages.</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {(['All', 'Unread', 'Jobs', 'Messages', 'System'] as FilterType[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === f 
                    ? 'bg-brand-indigo text-white shadow-lg shadow-brand-indigo/20' 
                    : 'bg-bg-tertiary text-text-secondary hover:text-text-primary hover:bg-white/5'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* List */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20 bg-bg-secondary rounded-xl border border-white/5"
            >
              <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                <Bell className="w-10 h-10 text-text-muted" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">You're all caught up!</h3>
              <p className="text-text-secondary">No {filter !== 'All' ? filter.toLowerCase() : ''} notifications to display right now.</p>
            </motion.div>
          ) : (
            filteredNotifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <NotificationCard notification={notification} />
              </motion.div>
            ))
          )}
        </div>

      </div>
    </PageWrapper>
  );
}

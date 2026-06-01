"use client";

import { useState } from "react";
import { Bell } from "lucide-react";
import { motion } from "framer-motion";
import NotificationDropdown from "./NotificationDropdown";
import { mockNotifications } from "@/lib/mock-data";
import { Notification, NotificationType } from "./notification-types";
import { useAuthStore } from "@/store/useAuthStore";

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  // Typecast mock data to Notification array
  const [notifications, setNotifications] = useState<Notification[]>(
    mockNotifications.map(n => ({...n, type: n.type as NotificationType}))
  );
  const { user } = useAuthStore();

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    // 🔴 TODO: REPLACE WITH API CALL → POST /api/notifications/read-all
  };

  // Only show for authenticated candidates (and recruiters if we extend it)
  if (!user) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-text-secondary hover:text-text-primary hover:bg-white/5 rounded-full transition-colors flex items-center justify-center"
      >
        <Bell className="w-5 h-5" />
        
        {unreadCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-1 right-1 w-4 h-4 bg-error-red text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg border border-bg-primary"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </motion.div>
        )}
      </button>

      <NotificationDropdown 
        notifications={notifications}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onMarkAllAsRead={handleMarkAllAsRead}
      />
    </div>
  );
}

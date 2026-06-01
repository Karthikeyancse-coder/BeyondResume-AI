"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { 
  Home, Sparkles, Lightbulb, LogIn, Rocket,
  Bot, BarChart2, Map, PlusSquare, Users, Settings, Briefcase, Bell
} from "lucide-react";
import { mockNotifications } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function MobileNav() {
  const { user, isAuthenticated } = useAuthStore();
  const pathname = usePathname();
  const unreadCount = mockNotifications.filter(n => !n.read).length;

  const getLinks = () => {
    if (!isAuthenticated) {
      return [
        { href: "/", label: "Home", icon: Home },
        { href: "/#features", label: "Features", icon: Sparkles },
        { href: "/#how-it-works", label: "Guide", icon: Lightbulb },
        { href: "/login", label: "Login", icon: LogIn },
        { href: "/register", label: "Start", icon: Rocket },
      ];
    }
    if (user?.role === "CANDIDATE") {
      return [
        { href: "/dashboard", label: "Home", icon: Home },
        { href: "/job", label: "Jobs", icon: Briefcase },
        { href: "/interview", label: "Interview", icon: Bot },
        { href: "/notifications", label: "Alerts", icon: Bell },
        { href: "/roadmap", label: "Roadmap", icon: Map },
      ];
    }
    if (user?.role === "RECRUITER") {
      return [
        { href: "/recruiter/dashboard", label: "Home", icon: Home },
        { href: "/recruiter/post-job", label: "Post Job", icon: PlusSquare },
        { href: "/recruiter/candidates", label: "Candidates", icon: Users },
        { href: "/notifications", label: "Alerts", icon: Bell },
      ];
    }
    return [];
  };

  const links = getLinks();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 h-[calc(64px+env(safe-area-inset-bottom))] pb-[env(safe-area-inset-bottom)] bg-bg-secondary border-t border-border-default shadow-[0_-4px_16px_rgba(0,0,0,0.08)]">
      <ul className="flex h-16 items-center justify-around px-2">
        {links.map((link) => {
          const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
          const Icon = link.icon;
          
          return (
            <li key={link.label} className="w-full">
              <Link 
                href={link.href}
                className={cn(
                  "flex flex-col items-center justify-center w-full h-full space-y-1 text-text-muted hover:text-brand-indigo transition-colors relative",
                  isActive && "text-brand-indigo font-medium"
                )}
              >
                <div className="relative">
                  <Icon className="w-5 h-5" />
                  {link.icon === Bell && unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-error-red text-white text-[8px] font-bold rounded-full flex items-center justify-center border border-bg-secondary">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </div>
                <span className="text-[10px]">{link.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

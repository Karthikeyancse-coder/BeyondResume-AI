"use client";

import { useThemeStore } from "@/store/useThemeStore";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-full bg-bg-tertiary hover:bg-bg-hover border border-border-subtle transition-colors focus:outline-none focus:ring-2 focus:ring-brand-indigo overflow-hidden"
      aria-label="Toggle Theme"
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        <AnimatePresence mode="wait" initial={false}>
          {theme === "light" ? (
            <motion.div
              key="sun"
              initial={{ y: -20, opacity: 0, rotate: -90 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: 20, opacity: 0, rotate: 90 }}
              transition={{ duration: 0.3 }}
              className="absolute"
            >
              <Sun className="w-5 h-5 text-warning" />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ y: -20, opacity: 0, rotate: -90 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: 20, opacity: 0, rotate: 90 }}
              transition={{ duration: 0.3 }}
              className="absolute"
            >
              <Moon className="w-5 h-5 text-brand-cyan" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </button>
  );
}

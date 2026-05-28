"use client";

import { useState, useRef, KeyboardEvent, ClipboardEvent, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface OTPInputProps {
  length?: number;
  onComplete: (code: string) => void;
  error?: string | null;
  disabled?: boolean;
}

export default function OTPInput({ length = 6, onComplete, error, disabled = false }: OTPInputProps) {
  const [values, setValues] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(length).fill(null));

  useEffect(() => {
    // Auto-focus first input on mount
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (idx: number, value: string) => {
    if (disabled) return;
    // Only allow single digits
    const digit = value.replace(/\D/g, "").slice(-1);
    const newValues = [...values];
    newValues[idx] = digit;
    setValues(newValues);

    // Auto-advance to next input
    if (digit && idx < length - 1) {
      inputRefs.current[idx + 1]?.focus();
    }

    // Check if all filled
    const code = newValues.join("");
    if (code.length === length && !newValues.includes("")) {
      onComplete(code);
    }
  };

  const handleKeyDown = (idx: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;
    if (e.key === "Backspace") {
      if (!values[idx] && idx > 0) {
        // Move to previous input if current is empty
        const newValues = [...values];
        newValues[idx - 1] = "";
        setValues(newValues);
        inputRefs.current[idx - 1]?.focus();
      } else {
        const newValues = [...values];
        newValues[idx] = "";
        setValues(newValues);
      }
    } else if (e.key === "ArrowLeft" && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    } else if (e.key === "ArrowRight" && idx < length - 1) {
      inputRefs.current[idx + 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    if (disabled) return;
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    if (pasted.length === 0) return;

    const newValues = [...values];
    for (let i = 0; i < pasted.length; i++) {
      newValues[i] = pasted[i];
    }
    setValues(newValues);

    // Focus last filled or last input
    const focusIdx = Math.min(pasted.length, length - 1);
    inputRefs.current[focusIdx]?.focus();

    if (pasted.length === length) {
      onComplete(pasted);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-center gap-2 sm:gap-3">
        {values.map((val, idx) => (
          <motion.input
            key={idx}
            ref={(el) => { inputRefs.current[idx] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={val}
            disabled={disabled}
            onChange={(e) => handleChange(idx, e.target.value)}
            onKeyDown={(e) => handleKeyDown(idx, e)}
            onPaste={handlePaste}
            onFocus={(e) => e.target.select()}
            className={cn(
              "w-11 h-14 sm:w-14 sm:h-16 text-center text-xl sm:text-2xl font-display font-bold rounded-2xl border-2 outline-none transition-all duration-200",
              "bg-white dark:bg-white/5 shadow-sm",
              disabled && "opacity-50 cursor-not-allowed",
              error
                ? "border-danger text-danger"
                : val
                  ? "border-brand-indigo text-brand-indigo dark:text-[#00C6FF] dark:border-[#00C6FF]"
                  : "border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:border-brand-indigo focus:ring-4 focus:ring-brand-indigo/20"
            )}
            animate={error ? { x: [0, -8, 8, -8, 8, 0] } : {}}
            transition={{ duration: 0.4 }}
          />
        ))}
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-sm font-medium text-danger"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}

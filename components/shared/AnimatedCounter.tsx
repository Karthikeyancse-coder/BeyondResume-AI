"use client";

import { useEffect, useRef } from "react";
import { useMotionValue, useSpring, motion } from "framer-motion";
import { counterSpring } from "@/lib/animations";

interface AnimatedCounterProps {
  from?: number;
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export default function AnimatedCounter({
  from = 0,
  to,
  suffix = "",
  prefix = "",
  className = "",
}: AnimatedCounterProps) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(from);
  const springValue = useSpring(motionValue, counterSpring);
  
  useEffect(() => {
    motionValue.set(to);
  }, [to, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (nodeRef.current) {
        nodeRef.current.textContent = `${prefix}${Math.round(latest)}${suffix}`;
      }
    });
  }, [springValue, prefix, suffix]);

  return (
    <motion.span ref={nodeRef} className={className}>
      {prefix}{from}{suffix}
    </motion.span>
  );
}

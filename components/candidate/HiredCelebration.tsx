"use client";

import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { X, Sparkles } from "lucide-react";

interface HiredCelebrationProps {
  company: string;
  role: string;
  onClose: () => void;
}

export default function HiredCelebration({ company, role, onClose }: HiredCelebrationProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Small delay for dramatic effect
    const timer = setTimeout(() => {
      setShow(true);
      
      const duration = 5000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

      const interval: ReturnType<typeof setInterval> = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: Math.random(), y: Math.random() - 0.2 } }));
      }, 250);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-700">
      <div className="bg-bg-secondary border border-white/10 rounded-3xl w-full max-w-lg p-8 relative overflow-hidden shadow-[0_0_100px_rgba(255,255,255,0.1)] text-center animate-in zoom-in-50 duration-700">
        
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-success-green/20 blur-[100px] pointer-events-none" />

        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-text-tertiary hover:text-white transition-colors rounded-full hover:bg-white/10 z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative z-10 flex flex-col items-center">
          <div className="w-24 h-24 mb-6 rounded-full bg-gradient-to-br from-success-green/20 to-success-green/5 flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.3)]">
            <span className="text-5xl">🎉</span>
          </div>
          
          <h2 className="text-3xl font-display font-bold text-white mb-2 flex items-center justify-center gap-2">
            Congratulations!
          </h2>
          
          <div className="space-y-2 mt-4 text-lg">
            <p className="text-text-secondary">You have been officially hired as</p>
            <p className="font-bold text-brand-cyan text-xl">{role}</p>
            <p className="text-text-secondary">at <span className="font-bold text-white">{company}</span></p>
          </div>

          <p className="mt-8 text-sm text-text-tertiary italic max-w-[80%] mx-auto">
            Your hard work paid off. Welcome to the next step of your career journey with BeyondResume AI.
          </p>
          
          <button 
            onClick={onClose}
            className="mt-8 px-8 py-3 bg-white text-bg-primary font-bold rounded-full hover:scale-105 transition-transform flex items-center gap-2"
          >
            Continue to Dashboard <Sparkles className="w-4 h-4 text-brand-indigo" />
          </button>
        </div>
      </div>
    </div>
  );
}

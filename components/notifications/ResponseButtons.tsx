"use client";

import { useState } from "react";
import { Check, X, HelpCircle } from "lucide-react";

interface ResponseButtonsProps {
  onAccept: () => void;
  onDecline: (reason?: string) => void;
  onAskQuestion: () => void;
  accepted?: boolean;
  declined?: boolean;
}

export default function ResponseButtons({ onAccept, onDecline, onAskQuestion, accepted, declined }: ResponseButtonsProps) {
  const [showDeclineForm, setShowDeclineForm] = useState(false);
  const [declineReason, setDeclineReason] = useState("");
  const [customReason, setCustomReason] = useState("");

  if (accepted) {
    return (
      <div className="flex items-center gap-2 text-success-green font-medium text-sm bg-success-green/10 px-4 py-2 rounded-lg inline-flex">
        <Check className="w-4 h-4" /> You accepted this selection
      </div>
    );
  }

  if (declined) {
    return (
      <div className="flex items-center gap-2 text-error-red font-medium text-sm bg-error-red/10 px-4 py-2 rounded-lg inline-flex">
        <X className="w-4 h-4" /> You declined this selection
      </div>
    );
  }

  if (showDeclineForm) {
    return (
      <div className="bg-bg-tertiary p-4 rounded-xl border border-white/10 mt-3 animate-in fade-in slide-in-from-top-2">
        <p className="text-sm text-text-secondary mb-3">Let them know why (optional — shown to recruiter):</p>
        
        <div className="space-y-2 mb-4">
          {["I've accepted another offer", "The role isn't the right fit", "Salary expectations don't match", "Other"].map(reason => (
            <label key={reason} className="flex items-center gap-2 text-sm text-text-primary cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors">
              <input 
                type="radio" 
                name="declineReason" 
                value={reason} 
                checked={declineReason === reason}
                onChange={() => setDeclineReason(reason)}
                className="accent-brand-indigo"
              />
              {reason}
            </label>
          ))}
          
          {declineReason === "Other" && (
            <input 
              type="text" 
              placeholder="Please specify..."
              value={customReason}
              onChange={(e) => setCustomReason(e.target.value)}
              className="w-full mt-2 bg-bg-primary border border-white/10 rounded-lg p-2 text-sm text-text-primary focus:outline-none focus:border-brand-indigo transition-colors"
            />
          )}
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onDecline(declineReason === "Other" ? customReason : declineReason)}
            className="px-4 py-2 bg-error-red hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Confirm Decline
          </button>
          <button 
            onClick={() => setShowDeclineForm(false)}
            className="px-4 py-2 text-text-secondary hover:text-text-primary text-sm font-medium transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-3 mt-4">
      <button 
        onClick={onAccept}
        className="flex items-center gap-2 px-4 py-2 bg-brand-indigo hover:bg-brand-violet text-white text-sm font-medium rounded-lg transition-colors shadow-lg shadow-brand-indigo/20"
      >
        <Check className="w-4 h-4" /> Accept & Chat
      </button>
      
      <button 
        onClick={() => setShowDeclineForm(true)}
        className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-error-red/10 text-text-primary hover:text-error-red text-sm font-medium rounded-lg transition-colors border border-white/5 hover:border-error-red/20"
      >
        <X className="w-4 h-4" /> Decline
      </button>
      
      <button 
        onClick={onAskQuestion}
        className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-brand-cyan/10 text-text-primary hover:text-brand-cyan text-sm font-medium rounded-lg transition-colors border border-white/5 hover:border-brand-cyan/20 ml-auto"
      >
        <HelpCircle className="w-4 h-4" /> Ask a Question
      </button>
    </div>
  );
}

"use client";

import PageWrapper from "@/components/layout/PageWrapper";
import ThreadList from "@/components/messages/ThreadList";
import { mockMessageThreads } from "@/lib/mock-data";
import { MessageCircle } from "lucide-react";

export default function RecruiterMessagesIndexPage() {
  // Use mock data for recruiter view, but switch the company name to candidate name
  // In a real app, the API would return a different shape for recruiters
  const recruiterThreads = mockMessageThreads.map(t => ({
    ...t,
    company: "Arjun Mehta", // Show candidate name instead of company
    recruiter: "Candidate",
  }));

  return (
    <PageWrapper>
      <div className="max-w-[1400px] mx-auto px-4 py-6 sm:px-6 lg:px-8 h-[calc(100vh-64px)]">
        <h1 className="text-2xl font-display font-bold text-text-primary mb-4">Messages</h1>
        
        <div className="flex h-[calc(100%-3rem)] gap-4">
          <div className="w-full lg:w-1/4 h-full">
            <ThreadList 
              threads={recruiterThreads} 
              baseUrl="/recruiter/messages" 
            />
          </div>
          
          <div className="hidden lg:flex flex-1 h-full bg-bg-secondary border border-white/5 rounded-xl items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-text-tertiary" />
              </div>
              <h3 className="text-xl font-medium text-text-primary mb-2">Candidate Conversations</h3>
              <p className="text-text-secondary">Select a conversation from the list to start chatting.</p>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

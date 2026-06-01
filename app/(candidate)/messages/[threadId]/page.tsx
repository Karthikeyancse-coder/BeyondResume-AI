"use client";

import { useState } from "react";
import PageWrapper from "@/components/layout/PageWrapper";
import ThreadList from "@/components/messages/ThreadList";
import ChatWindow from "@/components/messages/ChatWindow";
import JobContextPanel from "@/components/messages/JobContextPanel";
import { mockMessageThreads, mockMessages } from "@/lib/mock-data";
import { useAuthStore } from "@/store/useAuthStore";

export default function MessageThreadPage({ params }: { params: { threadId: string } }) {
  const { user } = useAuthStore();
  const threadId = params.threadId;
  
  // Find current thread
  const thread = mockMessageThreads.find(t => t.threadId === threadId) || mockMessageThreads[0];
  
  // Get messages (in a real app this would fetch for the specific thread)
  const [messages, setMessages] = useState(mockMessages);

  const handleSendMessage = (content: string) => {
    const newMsg = {
      id: `msg_new_${Date.now()}`,
      threadId,
      sender: user?.role === "RECRUITER" ? "recruiter" : "candidate",
      content,
      createdAt: new Date().toISOString(),
      read: false,
    };
    setMessages([...messages, newMsg]);
  };

  return (
    <PageWrapper>
      <div className="max-w-[1400px] mx-auto px-4 py-6 sm:px-6 lg:px-8 h-[calc(100vh-64px-env(safe-area-inset-bottom))] lg:h-[calc(100vh-64px)]">
        <h1 className="hidden lg:block text-2xl font-display font-bold text-text-primary mb-4">Messages</h1>
        
        <div className="flex h-full lg:h-[calc(100%-3rem)] gap-4">
          {/* Thread List - Hidden on mobile when viewing a thread */}
          <div className="hidden lg:block w-1/4 h-full">
            <ThreadList 
              threads={mockMessageThreads} 
              activeThreadId={threadId}
              baseUrl="/messages" 
            />
          </div>
          
          {/* Chat Window */}
          <div className="w-full lg:w-1/2 h-full">
            <ChatWindow 
              threadId={threadId}
              messages={messages}
              title={`${thread.company} · ${thread.recruiter}`}
              subtitle={thread.jobTitle}
              isVerified={true} // In real app, comes from thread data
              stage={thread.stage}
              backHref="/messages"
              onSendMessage={handleSendMessage}
              currentUserId="candidate" // This is the candidate view
            />
          </div>

          {/* Job Context - Hidden on mobile */}
          <div className="hidden lg:block w-1/4 h-full">
            <JobContextPanel 
              jobTitle={thread.jobTitle}
              company={thread.company}
              isVerified={true}
              stage={thread.stage}
              sinceDate="May 22, 2025"
            />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

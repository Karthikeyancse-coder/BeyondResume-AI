# Project Overview

## Project Name
**BeyondResume AI**

## Purpose
BeyondResume AI is an advanced, zero-trust recruitment ecosystem designed to fix the broken hiring landscape. It moves beyond static, keyword-stuffed resumes by providing candidates with autonomous capability assessments, dynamic "Trust Scores," and continuous AI-driven learning roadmaps. For recruiters, it offers a secure, verified talent pool where companies can confidently hire candidates based on proven, verifiable skills rather than inflated self-reported claims.

## Key Features
- **🛡️ Zero-Trust Verification System**: Enforces strict identity verification for recruiters (via business documents/LinkedIn) and restricts data access for unverified accounts, ensuring candidate data privacy.
- **🤖 AI Roadmap Assistant**: An embedded, context-aware chatbot powered by Google Gemini that analyzes a candidate's current skills and generates highly personalized learning paths to bridge skill gaps.
- **📄 Real-Time Resume Builder**: A split-screen, mobile-responsive resume generator with instant ATS-friendly PDF export, powered by global state management for auto-saving.
- **💼 Secure Job Marketplace**: Allows verified recruiters to post opportunities and enables candidates to instantly apply using their trusted BeyondResume profile.
- **🎨 Premium Glassmorphism UI**: A visually stunning, highly interactive user interface featuring dynamic micro-animations, translucent backgrounds, and sleek dark modes built with Framer Motion and Tailwind CSS.

## Technology Stack
- **Language / Framework**: TypeScript, React 18, Next.js 14 (App Router)
- **Libraries / APIs**: 
  - Vercel AI SDK (`@ai-sdk/react`)
  - Google Gemini API (`@google/genai`)
  - Framer Motion (Animations)
  - Zustand (State Management)
  - Tailwind CSS & `clsx` / `tailwind-merge` (Styling)
  - `@react-pdf/renderer` (PDF Generation)
- **Tools**: ESLint, Prettier, Git, Vercel (Deployment)

## Target Users
- **Candidates / Job Seekers**: Individuals looking to build their careers, identify skill gaps, upskill via AI roadmaps, and apply to trusted companies without fear of data scraping.
- **Recruiters / Hiring Managers**: HR professionals and technical recruiters who need a verified, high-trust talent pool to reduce hiring time and eliminate fraudulent applicants.
- **Students / Fresh Graduates**: Early-career individuals seeking structured, AI-guided mentorship to transition into the tech industry.

## Status
- **Current Progress**: Beta / Active Development
- **Known Issues or Limitations**: 
  - Currently utilizing mock data for user profiles, roadmaps, and jobs for demonstration purposes (backend database integration pending).
  - Recruiter document verification is currently a simulated frontend flow awaiting a fully functional admin approval dashboard backend.

## Future Plans
- **Admin Verification Dashboard**: A dedicated portal for platform administrators to manually review and approve/reject recruiter business documents.
- **Full Backend Integration**: Replacing mock data with a production database (e.g., PostgreSQL/Prisma) for persistent user data storage.
- **Advanced Assessment Sandbox**: An interactive coding environment where candidates can take technical assessments that directly influence their BeyondResume Trust Score.
- **SSO Authentication**: Implementing NextAuth.js for seamless Google, GitHub, and LinkedIn social logins.

## Quick Start / Demo
- **Live Deployment**: The platform is continuously deployed via Vercel. 
- **Local Setup**:
  ```bash
  git clone https://github.com/Karthikeyancse-coder/BeyondResume-AI.git
  cd BeyondResume-AI
  npm install
  npm run dev
  ```

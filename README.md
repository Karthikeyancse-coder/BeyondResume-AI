# BeyondResume AI

> An advanced, AI-powered hiring ecosystem that redefines the recruitment process through Zero-Trust Verification, autonomous capability assessments, and continuous candidate growth.

---

## 🌟 Why Do We Need This? (Problem Statement)
The modern recruitment landscape is broken:
- **For Companies**: Traditional hiring relies on static resumes that are often exaggerated. Recruiters waste countless hours filtering through "keyword-stuffed" noise rather than evaluating actual capability. Furthermore, fraudulent platforms and fake candidates plague the system.
- **For Candidates**: Job seekers send their resumes into black holes without receiving actionable feedback. They lack a clear understanding of their skill gaps or a structured path to improve. Additionally, their personal data is frequently exposed to unverified, potentially malicious actors.

**The Solution:** BeyondResume AI replaces the static resume with a dynamic, verified "Trust Score." It serves as a continuous growth platform that securely connects the right talent with the right opportunity using AI-driven insights and rigorous verification protocols.

---

## 🌍 Alignment with UN Sustainable Development Goals (SDGs)
BeyondResume AI directly contributes to global sustainability targets:
- **Goal 4: Quality Education** 📚  
  By utilizing our **AI Roadmap Assistant**, candidates receive personalized, continuous learning paths. The system identifies specific skill gaps and recommends targeted educational resources, ensuring lifelong learning and skill relevance in a rapidly changing tech landscape.
- **Goal 8: Decent Work and Economic Growth** 📈  
  By removing bias from keyword-based screening and focusing on verified capability, the platform democratizes access to high-quality jobs. It creates a secure, efficient hiring market that empowers individuals to secure meaningful employment while helping businesses grow.

---

## 🏗️ System Architecture & Tech Stack
BeyondResume AI is built on a modern, robust, and scalable foundation:
- **Framework**: Next.js 14 (App Router)
- **UI/Styling**: React 18, Tailwind CSS, `clsx`, `tailwind-merge`
- **Animations**: Framer Motion (for dynamic micro-interactions, page transitions, and glassmorphism effects)
- **State Management**: Zustand (for lightweight, global state handling across complex builder flows)
- **AI Integration**: Vercel AI SDK (`@ai-sdk/react`), Google Gemini API (`@google/genai`)
- **PDF Generation**: `@react-pdf/renderer` for high-quality, ATS-friendly resume generation
- **Security**: Custom middleware for role-based access control, strict domain enforcement logic, and visual data-locking overlays.

---

## 🔄 User Workflow

### 👨‍💻 Candidate Workflow
1. **Secure Onboarding**: Register and verify email via a simulated 6-digit OTP.
2. **Dashboard Overview**: Track your BeyondResume Trust Score, profile completion, and recent activities.
3. **Resume Builder**: Use a dual-pane, real-time preview builder to craft and export ATS-optimized PDFs.
4. **AI Roadmap Assistant**: Chat with an context-aware AI that analyzes your current skills and generates a tailored learning path.
5. **Interview Prep**: Access capability assessments and technical mock interviews.
6. **Job Marketplace**: Browse verified job listings, apply instantly using your profile, and safely manage applications.

### 🏢 Recruiter Workflow
1. **Strict Onboarding**: Register using an official company domain. Disposable and generic public email domains (e.g., Gmail, Yahoo) are strictly blocked.
2. **Company Verification**: Mandatory upload of business registration documents or an active LinkedIn Company Page URL.
3. **Pending State Limits**: Until approved by an admin, recruiter accounts are restricted. Sensitive candidate data (emails, phone numbers, GitHub links) is visually blurred/locked, and resume downloads are disabled.
4. **Talent Discovery**: Once verified, post jobs and filter the candidate pool using objective Trust Scores and verified skills.

---

## ✨ Feature Implementation Breakdown

### 1. 🛡️ Trust & Zero-Trust Verification System
- **Email OTP Verification**: Required for all newly created accounts.
- **Recruiter Domain Enforcement**: Advanced blocklists reject non-corporate emails during recruiter signup.
- **Candidate Data Privacy (`LockedFieldOverlay`)**: Unverified recruiters are presented with beautifully blurred overlays over sensitive candidate information. They are actively blocked from downloading candidate PDFs.
- **Warning Banners**: Candidates receive prominent visual warnings if they are interacting with an unverified company.

### 2. 🤖 AI Roadmap Assistant
- **Embedded Chat UI**: A floating, animated chatbot (`RoadmapChatbot.tsx`) built with Framer Motion.
- **Context-Aware LLM**: Powered by Vercel AI SDK and Google Gemini. The assistant doesn't just answer generic questions; it receives the user's specific roadmap and skill data in the background to provide hyper-personalized career advice and debugging help.
- **Streaming Responses**: Delivers fast, typing-effect responses for a premium UX.

### 3. 📄 Real-Time Resume Builder
- **Dynamic Interface**: A responsive builder that offers seamless switching between Desktop and Mobile layout previews.
- **Global State**: Built on Zustand to auto-save and persist user input across sessions without unnecessary database writes.
- **Instant PDF Export**: Click to generate a highly professional, formatted PDF document instantly.

### 4. 🎨 Modern & Premium UI/UX
- **Design System**: Built around rich, vibrant color palettes (indigo, cyan, violet gradients).
- **Glassmorphism**: Extensive use of translucent backgrounds and backdrop blurs to create depth.
- **Micro-animations**: Smooth sliding underline effects on navigation, fade-up page transitions, and interactive hover states ensure the application feels alive and responsive.

### 5. 💼 Advanced Job Board
- Candidates can browse listings and apply instantly.
- Upload/Apply functionality handles parsing and submitting applications securely to verified companies.

---

## 🚀 Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Karthikeyancse-coder/BeyondResume-AI.git
   cd BeyondResume-AI
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Configure Environment Variables**:
   Create a `.env.local` file and add your Google Gemini API key:
   ```env
   GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here
   ```
4. **Run the development server**:
   ```bash
   npm run dev
   ```
5. **Open the App**:
   Navigate to [http://localhost:3000](http://localhost:3000)

*Note: The platform currently uses mock data for demonstration purposes.*

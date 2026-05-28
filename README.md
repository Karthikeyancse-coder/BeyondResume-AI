# BeyondResume AI

An advanced, AI-powered hiring ecosystem that redefines the recruitment process through Zero-Trust Verification, autonomous capability assessments, and continuous candidate growth.

---

## 🛡️ Trust & Verification System

To solve the prevalent issues of fake recruiter accounts and unverified candidates, BeyondResume AI incorporates a multi-layered Trust & Verification System. 

### Implemented Features
- **Email OTP Verification:** All new accounts (both candidates and recruiters) must verify their email address via a 6-digit OTP before accessing the platform.
- **Role-Based Registration:** Candidates and recruiters have distinct registration flows tailored to their needs.
- **Basic Verification UI Components:** Built-in components for Trust Badges, verification steps, and OTP input.

### 🚀 Future Implementations (Planned)

The following advanced security and verification features are planned for future releases and are part of the core architectural roadmap:

#### 1. Advanced Recruiter Company Verification
- **Work Email Enforcement:** Strict blocking of personal domains (gmail.com, yahoo.com) for recruiter accounts. Email domains must match the company's official website.
- **Document/LinkedIn Verification:** Recruiters must provide either an active LinkedIn Company Page URL or upload an official business document (e.g., GST certificate, business registration) for manual review.
- **Pending Review State:** Recruiter accounts remain in a limited "Pending" state until an admin approves them, preventing them from viewing candidate contact info or downloading resumes.

#### 2. Platform-Wide Trust Badges & Data Protection
- **Trust Badges:** Visual indicators (`✅ Verified`, `⏳ Pending`, `⚠️ Unverified`) displayed on recruiter profiles, job posts, and messages.
- **Candidate Data Lock:** Unverified recruiters will only see blurred versions of sensitive candidate data (Email, Phone, GitHub URL, Resume Download). A lock overlay will prompt them to complete verification.
- **Candidate Warnings:** Candidates applying to unverified recruiters will see a prominent warning banner advising them against sharing personal data off-platform.
- **Resume Download Rate Limiting:** Even verified recruiters will have daily/monthly limits on resume downloads to prevent data scraping.

#### 3. Login Security & Anti-Fraud Layers
- **Failed Attempt Lockouts:** 
  - 3 failed attempts → CAPTCHA triggered
  - 5 failed attempts → Account locked for 15 minutes
- **Suspicious Login Detection:** Alerts for logins from new devices or geographic locations, prompting the user to secure their account.
- **Disposable Email Blocking:** Comprehensive blocklist for disposable email providers (e.g., mailinator.com) during registration.
- **GitHub Uniqueness:** Ensuring a single GitHub profile cannot be linked to multiple candidate accounts.

#### 4. Admin Verification Dashboard
- A dedicated secure dashboard (`/admin/verifications`) for the BeyondResume AI team to review pending recruiter registrations, inspect uploaded documents, and approve or reject accounts with specific reasons.

---

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000)

*Note: The platform currently uses mock data for demonstration purposes.*

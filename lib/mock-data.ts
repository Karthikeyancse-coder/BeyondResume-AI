// /lib/mock-data.ts
// 🔴 MOCK DATA FILE
// Replace each function's return value with real API call when backend is ready
// Each function is marked with: // TODO: REPLACE WITH API → /api/endpoint

export const mockCandidateProfile = {
  // TODO: REPLACE WITH API → GET /api/candidates/profile
  id: "cand_001",
  fullName: "Arjun Mehta",
  email: "arjun@example.com",
  experienceLevel: "mid",
  capabilityScore: 78,
  authenticityScore: 91,
  growthScore: 85,
  alignmentScore: 72,
  finalRankScore: 82,
  resumeUrl: "/mock/resume.pdf",
  githubUrl: "https://github.com/arjunmehta",
  portfolioUrl: "https://arjunmehta.dev",
};

export const mockScoreBreakdown = {
  // TODO: REPLACE WITH API → GET /api/candidates/scores
  capability: {
    score: 78,
    label: "Capability Score",
    weight: "30%",
    breakdown: {
      backend: 82,
      frontend: 71,
      systemDesign: 75,
      problemSolving: 84,
      devOps: 68,
      aiMl: 60,
    }
  },
  authenticity: {
    score: 91,
    label: "Authenticity Score",
    weight: "25%",
    signals: ["Consistent commit history", "Original project architecture", "Genuine debugging patterns"]
  },
  alignment: {
    score: 72,
    label: "Alignment Score",
    weight: "20%",
    role: "Backend Engineer",
    fitFactors: ["Strong Node.js match", "Good system design exposure", "Medium DevOps gap"]
  },
  growth: {
    score: 85,
    label: "Growth Potential",
    weight: "10%",
    learningVelocity: "High",
    projection: "Senior level in 18 months"
  }
};

export const mockGitHubAnalysis = {
  // TODO: REPLACE WITH API → GET /api/github/analysis
  commitConsistency: 88,
  projectEvolution: 76,
  debuggingMaturity: 82,
  architectureGrowth: 71,
  authenticityRisk: 9,
  topRepositories: [
    { name: "task-manager-api", stars: 12, commits: 87, isOriginal: true },
    { name: "ecommerce-frontend", stars: 5, commits: 43, isOriginal: true },
    { name: "ml-sentiment", stars: 2, commits: 21, isOriginal: false },
  ]
};

export const mockInterviewQuestions = [
  // TODO: REPLACE WITH API → POST /api/interviews/generate
  { id: "q1", question: "You mentioned building a JWT authentication system. Why did you choose JWT over server-side sessions for this project?", depth: "medium" },
  { id: "q2", question: "How did you handle token expiration and refresh logic in your implementation?", depth: "deep" },
  { id: "q3", question: "Walk me through how you'd scale your authentication system to handle 100,000 concurrent users.", depth: "advanced" },
];

export const mockRoadmap = {
  // TODO: REPLACE WITH API → GET /api/candidates/roadmap
  missingSkills: [
    { skill: "Kubernetes & Container Orchestration", priority: "high", reason: "Required for senior backend roles" },
    { skill: "System Design at Scale", priority: "high", reason: "Weak in load balancing architecture" },
    { skill: "GraphQL API Design", priority: "medium", reason: "Growing demand in target companies" },
    { skill: "Redis Caching Patterns", priority: "medium", reason: "Performance optimization gap identified" },
    { skill: "CI/CD Pipeline Design", priority: "low", reason: "Basic knowledge present, needs depth" },
  ],
  recommendedProjects: [
    { name: "Build a URL Shortener with Redis + Analytics", tech: ["Redis", "Node.js", "PostgreSQL"], duration: "2 weeks", difficulty: "medium" },
    { name: "Design a Notification System for 1M users", tech: ["Kafka", "WebSockets", "Docker"], duration: "3 weeks", difficulty: "hard" },
    { name: "GraphQL API for an E-commerce Platform", tech: ["GraphQL", "Prisma", "Next.js"], duration: "2 weeks", difficulty: "medium" },
  ],
  estimatedGrowthTime: "4-6 months to close critical gaps"
};

export const mockCandidatesForRecruiter = [
  // TODO: REPLACE WITH API → GET /api/recruiter/candidates
  {
    id: "c1", name: "Arjun Mehta", role: "Backend Engineer",
    capabilityScore: 78, authenticityScore: 91, alignmentScore: 72, growthScore: 85,
    finalScore: 82, riskLevel: "low", isVerified: true,
    radar: { backend: 82, frontend: 71, systemDesign: 75, problemSolving: 84, devOps: 68, aiMl: 60 },
    github: { commitConsistency: 88, projectEvolution: 76, debuggingMaturity: 82, architectureGrowth: 71, authenticityRisk: 9 },
    interviewInsights: ["Strong backend reasoning demonstrated", "Architecture decisions well-justified", "DevOps knowledge gap detected"],
    riskSignals: [],
  },
  {
    id: "c2", name: "Priya Sharma", role: "Full Stack Developer",
    capabilityScore: 85, authenticityScore: 64, alignmentScore: 88, growthScore: 91,
    finalScore: 80, riskLevel: "medium", isVerified: false,
    radar: { backend: 75, frontend: 90, systemDesign: 68, problemSolving: 88, devOps: 72, aiMl: 55 },
    github: { commitConsistency: 72, projectEvolution: 81, debuggingMaturity: 65, architectureGrowth: 78, authenticityRisk: 36 },
    interviewInsights: ["Exceptional frontend skills shown", "Good problem-solving approach", "Some authenticity concerns in system design answers"],
    riskSignals: ["36% authenticity risk — some forked repositories detected"],
  },
  {
    id: "c3", name: "Rahul Dev", role: "Backend Engineer",
    capabilityScore: 62, authenticityScore: 95, alignmentScore: 79, growthScore: 77,
    finalScore: 73, riskLevel: "low", isVerified: true,
    radar: { backend: 70, frontend: 45, systemDesign: 60, problemSolving: 72, devOps: 58, aiMl: 40 },
    github: { commitConsistency: 92, projectEvolution: 70, debuggingMaturity: 88, architectureGrowth: 65, authenticityRisk: 5 },
    interviewInsights: ["Authentic coder with genuine skills", "Needs improvement in system design", "Strong debugging methodology"],
    riskSignals: [],
  },
  {
    id: "c4", name: "Sara Lin", role: "Frontend Engineer",
    capabilityScore: 90, authenticityScore: 31, alignmentScore: 55, growthScore: 70,
    finalScore: 65, riskLevel: "high", isVerified: false,
    radar: { backend: 40, frontend: 95, systemDesign: 50, problemSolving: 78, devOps: 35, aiMl: 82 },
    github: { commitConsistency: 45, projectEvolution: 30, debuggingMaturity: 38, architectureGrowth: 25, authenticityRisk: 69 },
    interviewInsights: ["Technical skills appear strong on paper", "Inconsistencies detected in code explanation", "Unable to explain repository architecture"],
    riskSignals: ["LOW Authenticity Score — Possible copied GitHub repository", "Commit patterns suggest bulk-uploaded code", "Interview answers inconsistent with code quality"],
  },
  {
    id: "c5", name: "Dev Patel", role: "DevOps Engineer",
    capabilityScore: 71, authenticityScore: 88, alignmentScore: 82, growthScore: 90,
    finalScore: 79, riskLevel: "low", isVerified: true,
    radar: { backend: 65, frontend: 40, systemDesign: 72, problemSolving: 76, devOps: 92, aiMl: 45 },
    github: { commitConsistency: 85, projectEvolution: 82, debuggingMaturity: 78, architectureGrowth: 80, authenticityRisk: 12 },
    interviewInsights: ["Strong DevOps and infrastructure knowledge", "Good understanding of CI/CD pipelines", "Growing interest in cloud architecture"],
    riskSignals: [],
  },
  {
    id: "c6", name: "Meera Joshi", role: "Full Stack Developer",
    capabilityScore: 55, authenticityScore: 77, alignmentScore: 65, growthScore: 82,
    finalScore: 68, riskLevel: "low", isVerified: true,
    radar: { backend: 55, frontend: 62, systemDesign: 48, problemSolving: 60, devOps: 42, aiMl: 35 },
    github: { commitConsistency: 78, projectEvolution: 65, debuggingMaturity: 72, architectureGrowth: 60, authenticityRisk: 23 },
    interviewInsights: ["Solid fundamentals but limited depth", "Shows strong learning potential", "Needs more real-world project experience"],
    riskSignals: [],
  },
];

// 🔴 TODO: REPLACE → GET /api/recruiter/analytics
export const mockAnalytics = {
  scoreDistribution: [
    { range: "0-20",   count: 1 },
    { range: "20-40",  count: 2 },
    { range: "40-60",  count: 4 },
    { range: "60-80",  count: 6 },
    { range: "80-100", count: 3 },
  ],
  scatterData: [
    { name: "Arjun",  capability: 78, authenticity: 91 },
    { name: "Priya",  capability: 85, authenticity: 64 },
    { name: "Rahul",  capability: 62, authenticity: 95 },
    { name: "Sara",   capability: 90, authenticity: 31 },
    { name: "Dev",    capability: 71, authenticity: 88 },
    { name: "Meera",  capability: 55, authenticity: 77 },
  ],
  riskBreakdown: [
    { name: "Low Risk",    value: 10, color: "#10B981" },
    { name: "Medium Risk", value: 6,  color: "#F59E0B" },
    { name: "High Risk",   value: 2,  color: "#EF4444" },
  ],
  weeklyTrend: [
    { week: "Week 1", total: 4, highTrust: 3 },
    { week: "Week 2", total: 7, highTrust: 5 },
    { week: "Week 3", total: 6, highTrust: 4 },
    { week: "Week 4", total: 7, highTrust: 6 },
  ],
  skillGaps: [
    { skill: "Kubernetes",     low: 2, medium: 5, high: 4, critical: 2 },
    { skill: "System Design",  low: 1, medium: 3, high: 6, critical: 3 },
    { skill: "GraphQL",        low: 4, medium: 5, high: 2, critical: 1 },
    { skill: "Redis",          low: 3, medium: 6, high: 2, critical: 0 },
    { skill: "CI/CD",          low: 5, medium: 4, high: 2, critical: 1 },
    { skill: "Docker",         low: 3, medium: 4, high: 3, critical: 1 },
    { skill: "AWS",            low: 2, medium: 5, high: 3, critical: 2 },
    { skill: "Testing",        low: 4, medium: 5, high: 2, critical: 0 },
  ]
};

export const mockRecommendedJobs = [
  // TODO: REPLACE WITH API → GET /api/candidates/jobs/recommended
  {
    id: "job_001",
    title: "Senior Backend Engineer",
    company: "TechNova Inc.",
    location: "Remote (US/Canada)",
    salary: "$130k - $160k",
    type: "Full-time",
    matchScore: 92,
    matchReasons: ["Strong Node.js fit", "System Design matches requirements", "Culture alignment"],
    missingSkills: ["Kubernetes (Bonus)"],
    logo: "T",
    postedAt: "2 days ago",
  },
  {
    id: "job_002",
    title: "Node.js Developer",
    company: "FinFlow Systems",
    location: "New York, NY (Hybrid)",
    salary: "$110k - $140k",
    type: "Full-time",
    matchScore: 88,
    matchReasons: ["Perfect capability score for backend", "PostgreSQL expertise"],
    missingSkills: ["Redis"],
    logo: "F",
    postedAt: "1 week ago",
  },
  {
    id: "job_003",
    title: "Full Stack Developer",
    company: "CloudSync",
    location: "Remote",
    salary: "$100k - $130k",
    type: "Full-time",
    matchScore: 75,
    matchReasons: ["Backend skills align perfectly"],
    missingSkills: ["React/Frontend gap", "Docker"],
    logo: "C",
    postedAt: "3 days ago",
  },
  {
    id: "job_004",
    title: "Backend Engineer",
    company: "StartupXYZ",
    location: "San Francisco, CA",
    salary: "$120k - $150k + Equity",
    type: "Full-time",
    matchScore: 68,
    matchReasons: ["Good problem solving"],
    missingSkills: ["System Design at Scale", "GraphQL API Design"],
    logo: "S",
    postedAt: "5 hours ago",
  },
];

export const mockCompanyInterviews = [
  // TODO: REPLACE WITH API → GET /api/interviews/approved/:candidateId
  {
    id: "ci_001",
    companyName: "Infosys",
    companyLogo: "I",
    jobRole: "MERN Stack Developer",
    interviewType: "coding",
    status: "Approved",
    interviewDate: "2026-05-28T10:00:00Z"
  },
  {
    id: "ci_002",
    companyName: "TCS",
    companyLogo: "T",
    jobRole: "Frontend Developer",
    interviewType: "qa",
    status: "Approved",
    interviewDate: "2026-05-29T14:30:00Z"
  },
  {
    id: "ci_003",
    companyName: "Wipro",
    companyLogo: "W",
    jobRole: "Backend Engineer",
    interviewType: "mcq",
    status: "Approved",
    interviewDate: "2026-06-02T11:00:00Z"
  }
];

export const mockCodingExam = {
  // TODO: REPLACE WITH API → GET /api/interviews/coding/:id
  id: "coding_001",
  title: "Two Sum Problem",
  description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.",
  examples: [
    { input: "nums = [2,7,11,15], target = 9", output: "[0,1]" },
    { input: "nums = [3,2,4], target = 6", output: "[1,2]" }
  ],
  timeLimitMinutes: 45
};

export const mockCompanyQAQuestions = [
  // TODO: REPLACE WITH API → GET /api/interviews/qa/:id
  { id: "cqa_1", question: "Tell me about yourself and your journey as a developer." },
  { id: "cqa_2", question: "Explain React Hooks and how you've used them in your projects." },
  { id: "cqa_3", question: "What is a REST API and what are the best practices for designing one?" }
];

export const mockCompanyMCQQuestions = [
  // TODO: REPLACE WITH API → GET /api/interviews/mcq/:id
  {
    id: "mcq_1",
    question: "What does CSS stand for?",
    options: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"],
    correctAnswerIndex: 1
  },
  {
    id: "mcq_2",
    question: "Which hook is used for side effects in React?",
    options: ["useState", "useMemo", "useEffect", "useRef"],
    correctAnswerIndex: 2
  },
  {
    id: "mcq_3",
    question: "What is the time complexity of binary search?",
    options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
    correctAnswerIndex: 2
  }
];

// 🔴 TODO: REPLACE → GET /api/candidates/profile (full detail)
export const mockFullProfile = {
  fullName:    "Arjun Mehta",
  currentRole: "Senior Backend Engineer | Node.js & PostgreSQL Expert",
  location:    "San Francisco, CA (Remote)",
  email:       "arjun@example.com",
  phone:       "+1 (555) 987-6543",
  portfolioUrl:"arjunmehta.dev",
  githubUrl:   "github.com/arjundev",
  linkedinUrl: "linkedin.com/in/arjunmehta",
  twitter:     "@arjundev",

  professionalSummary: "Passionate backend engineer with 4+ years building scalable microservices and resilient APIs. I thrive in high-performance environments and love solving complex architectural challenges.",

  careerHistory: [
    {
      title:    "Backend Engineer",
      company:  "TechCorp",
      period:   "2022 – Present",
      description: "Lead migration from monolithic to microservices using Node.js and Docker. Reduced API latency by 40%."
    },
    {
      title:    "Software Developer",
      company:  "StartupX",
      period:   "2020 – 2022",
      description: "Developed core features for a fintech platform. Integrated payment gateways and maintained PostgreSQL databases."
    }
  ],

  skills: [
    { name: "Node.js",       level: "Expert" },
    { name: "TypeScript",    level: "Advanced" },
    { name: "PostgreSQL",    level: "Advanced" },
    { name: "Docker",        level: "Proficient" },
    { name: "AWS",           level: "Advanced" },
    { name: "GraphQL",       level: "Proficient" },
    { name: "System Design", level: "Advanced" },
  ],

  education: [
    {
      degree:  "B.Tech Computer Science",
      school:  "University of Technology",
      period:  "2016 – 2020",
      gpa:     "3.8/4.0"
    }
  ],

  projects: [
    {
      name:        "AI Verification Platform",
      description: "Built a fully automated AI assessment system using Next.js and Python.",
      tech:        ["Next.js", "Python", "TensorFlow"],
      url:         "github.com/arjundev/ai-verify",
      starred:     true
    },
    {
      name:        "E-Commerce Microservices",
      description: "Migrated legacy monolith to scalable Node.js microservices.",
      tech:        ["Node.js", "Docker", "RabbitMQ"],
      url:         "github.com/arjundev/ecom-ms",
      starred:     false
    }
  ],

  certifications: [
    {
      name:     "AWS Certified Solutions Architect",
      issuer:   "Amazon Web Services",
      date:     "Aug 2023",
      credId:   "AWS-CSA-7829"
    }
  ],

  languages: [
    { name: "English", level: "Professional" },
    { name: "Spanish", level: "Intermediate" },
    { name: "Hindi",   level: "Advanced" }
  ],

  capabilityScore:   87,
  authenticityScore: 91,
  verifiedText:      "Profile verified via deep technical interviews and semantic code analysis. Top 15% in backend systems."
};

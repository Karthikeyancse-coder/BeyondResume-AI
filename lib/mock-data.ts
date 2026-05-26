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
  { id: "c1", name: "Arjun Mehta", role: "Backend Engineer", capabilityScore: 78, authenticityScore: 91, alignmentScore: 72, growthScore: 85, finalScore: 82, riskLevel: "low", isVerified: true },
  { id: "c2", name: "Priya Sharma", role: "Full Stack Developer", capabilityScore: 85, authenticityScore: 64, alignmentScore: 88, growthScore: 91, finalScore: 80, riskLevel: "medium", isVerified: false },
  { id: "c3", name: "Rahul Dev", role: "Backend Engineer", capabilityScore: 62, authenticityScore: 95, alignmentScore: 79, growthScore: 77, finalScore: 73, riskLevel: "low", isVerified: true },
  { id: "c4", name: "Sara Lin", role: "Frontend Engineer", capabilityScore: 90, authenticityScore: 31, alignmentScore: 55, growthScore: 70, finalScore: 65, riskLevel: "high", isVerified: false },
];

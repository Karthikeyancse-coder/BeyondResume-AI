const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding demo data...\n");

  // ─── Demo Candidate ──────────────────────────────
  const candidate = await prisma.user.upsert({
    where: { email: "arjun@demo.com" },
    update: {},
    create: {
      email: "arjun@demo.com",
      name: "Arjun Mehta",
      role: "CANDIDATE",
      candidateProfile: {
        create: {
          resumeUrl: "https://example.com/arjun_resume.pdf",
          githubUrl: "https://github.com/arjunmehta",
          portfolioUrl: "https://arjun.dev",
          capabilityScore: 87,
          authenticityScore: 91,
          alignmentScore: 84,
          growthScore: 78,
          finalScore: 87,
          isVerified: true,
        },
      },
    },
  });
  console.log("✅ Created candidate:", candidate.name, `(${candidate.email})`);

  // ─── Demo Recruiter ──────────────────────────────
  const recruiter = await prisma.user.upsert({
    where: { email: "sarah@techcorp.com" },
    update: {},
    create: {
      email: "sarah@techcorp.com",
      name: "Sarah Connor",
      role: "RECRUITER",
      recruiterProfile: {
        create: {
          companyName: "TechCorp Inc.",
          companyUrl: "https://techcorp.com",
        },
      },
    },
  });
  console.log("✅ Created recruiter:", recruiter.name, `(${recruiter.email})`);

  // Get the recruiter profile for job creation
  const recruiterProfile = await prisma.recruiterProfile.findUnique({
    where: { userId: recruiter.id },
  });

  // ─── Demo Job ─────────────────────────────────────
  const job = await prisma.job.create({
    data: {
      title: "Senior Backend Engineer",
      description:
        "We are looking for a Senior Backend Engineer to design and build scalable APIs and microservices using Node.js and PostgreSQL. You will work closely with our platform team to deliver high-performance, reliable backend systems.",
      skills: ["Node.js", "PostgreSQL", "Docker", "GraphQL", "AWS"],
      experienceLevel: "senior",
      location: "San Francisco",
      isRemote: true,
      recruiterId: recruiterProfile.id,
    },
  });
  console.log("✅ Created job:", job.title);

  // Get the candidate profile for interview creation
  const candidateProfile = await prisma.candidateProfile.findUnique({
    where: { userId: candidate.id },
  });

  // ─── Demo Interview ───────────────────────────────
  const interview = await prisma.interview.create({
    data: {
      candidateProfileId: candidateProfile.id,
      status: "COMPLETED",
      startedAt: new Date("2026-05-20T10:00:00Z"),
      completedAt: new Date("2026-05-20T10:45:00Z"),
      questions: {
        create: [
          {
            content:
              "Walk me through how you would design a real-time notification system for a large-scale e-commerce platform.",
            depth: "deep",
            answer:
              "I would use a combination of WebSockets for real-time delivery and a message queue like RabbitMQ or Kafka for reliability. The notification service would be a separate microservice that consumes events from the main application...",
            aiScore: 88,
            aiFeedback:
              "Excellent architectural thinking. Candidate correctly identified the need for message queues and separation of concerns. Could improve by discussing fallback mechanisms.",
          },
          {
            content:
              "How do you handle database migrations in a production environment with zero downtime?",
            depth: "advanced",
            answer:
              "I follow a blue-green deployment strategy combined with backward-compatible migrations. First, I add new columns without removing old ones, deploy the new code that writes to both, then migrate data, and finally remove the old columns in a subsequent release...",
            aiScore: 92,
            aiFeedback:
              "Outstanding answer. Demonstrates deep production experience with migration strategies. The blue-green approach with backward compatibility shows mature engineering practices.",
          },
          {
            content:
              "Describe a time when you had to debug a complex performance issue in production.",
            depth: "medium",
            answer:
              "We had an API endpoint that was taking 8 seconds under load. I used APM tools to trace the bottleneck to an N+1 query in our ORM. I restructured the query to use eager loading and added a Redis cache layer for frequently accessed data, bringing response time down to 200ms...",
            aiScore: 85,
            aiFeedback:
              "Good real-world example with measurable results. The candidate showed systematic debugging approach. Could elaborate more on monitoring setup.",
          },
        ],
      },
    },
  });
  console.log("✅ Created interview with 3 questions");

  // ─── Demo Roadmap ─────────────────────────────────
  const roadmap = await prisma.roadmap.create({
    data: {
      candidateProfileId: candidateProfile.id,
      missingSkills: [
        { skill: "Kubernetes", priority: "high" },
        { skill: "Terraform", priority: "medium" },
        { skill: "gRPC", priority: "low" },
      ],
      recommendedProjects: [
        {
          title: "Build a K8s-native Microservice",
          description: "Deploy a multi-service app on Kubernetes with Helm charts",
          estimatedDays: 14,
        },
        {
          title: "Infrastructure as Code Portfolio",
          description: "Create a Terraform module for a production-ready AWS setup",
          estimatedDays: 7,
        },
      ],
      estimatedTime: "6-8 weeks",
    },
  });
  console.log("✅ Created roadmap for candidate");

  console.log("\n🎉 Seeding complete! Demo accounts:");
  console.log("   📧 Candidate: arjun@demo.com");
  console.log("   📧 Recruiter: sarah@techcorp.com");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

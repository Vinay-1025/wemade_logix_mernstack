export const fp25Data = {
  projectId: 25,
  projectCode: "FP-25",
  projectTitle: "Freelance Developer Freelancer Bid Board",
  difficulty: "Advanced",
  duration: {
    totalDays: 14,
    expectedEffortHours: "40-50",
    objective: "Design, develop, test and deploy a complete advanced MERN Stack application in 2 weeks."
  },
  techStack: [
    "React.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "JWT Authentication",
    "Stripe API",
    "Socket.io",
    "Multer",
    "PDF-Kit"
  ],
  overview: "Build a job board featuring client projects, developer bids, milestone budgets, and direct messaging portals.",
  problemStatement: [
    "Manual and inconsistent tracking of client project postings, developer bids, and contract milestones.",
    "Difficulty in coordinating project agreements and managing escrow data safety.",
    "Inefficient project progress visibility and lack of direct communication pipelines between clients and developers.",
    "Lack of real-time stats and visual dashboard insights on developer earnings and client budgets."
  ],
  objectives: [
    "Build a robust and secure MERN stack freelance bidding and project management application.",
    "Implement isolated workflow dashboards for Clients, Developers, and platform Admins.",
    "Ensure strict database schema constraints for bids, project milestone escrows, and messaging histories.",
    "Deploy the complete working systems to production cloud hosts."
  ],
  roles: {
    "Admin": [
        "Configure platform parameters, categories, and payment service models",
        "Moderate flagged projects, developer bids, and user disputes",
        "Audit system transaction flows, payment escrows, and activity logs",
        "Manage global system integrations and system credentials"
    ],
    "Client": [
        "Post freelance project cards with descriptions and milestone budgets",
        "Browse developer bidding profiles and accept project bids",
        "Manage project development milestones and release escrow payments via Stripe",
        "Review developer work deliveries and write feedback ratings"
    ],
    "Developer": [
        "Search and filter active project catalogs by budget range and skill tags",
        "Submit custom bidding proposals on active client projects",
        "Submit milestone deliverables and track work approval progress",
        "Initiate real-time direct chats with clients and track personal project earnings"
    ]
  },
  modules: [
    "Authentication & Professional Profiles",
    "Project Directory & Bid Board",
    "Milestone Tracker & Escrow Pipeline",
    "Real-Time Messaging Hub (Socket.io)",
    "Payment Gateway (Stripe Checkout)"
  ],
  pages: {
    "Public": [
        "Home",
        "Projects Board",
        "Developers Directory",
        "Login",
        "Register"
    ],
    "Developer": [
        "Dashboard (My active projects, bids submitted, earnings history)",
        "Bids Proposals Manager",
        "Milestone Submission Panel",
        "Chat Desk (Client messaging)"
    ],
    "Client": [
        "Dashboard (My posted projects, incoming bids queue)",
        "New Project Publisher (Upload specs using Multer)",
        "Escrow Milestone Manager",
        "Chat Desk (Developer messaging)"
    ],
    "Admin": [
        "Dashboard (Active jobs, platform commission reports)",
        "Disputes & Escrow Arbitrator",
        "Diagnostics & Audit Logs"
    ]
  },
  databaseCollections: [
    "Users",
    "Projects",
    "Bids",
    "Milestones",
    "Messages",
    "Transactions"
  ],
  mandatoryFeatures: {
    "authentication": [
      "Register",
      "Login",
      "JWT",
      "Password Hashing"
    ],
    "frontend": [
      "React",
      "React Router",
      "Responsive Freelancer UI",
      "Form Validation"
    ],
    "backend": [
      "Express",
      "REST APIs (Projects, Bids, Milestones)",
      "MVC",
      "Middleware (Authentication, Role Check controls)",
      "Error Handling"
    ],
    "database": [
      "MongoDB",
      "Minimum 5 collections",
      "Relationships (Project -> Bids, Client -> Projects)"
    ],
    "general": [
      "CRUD Operations (Projects, Bids)",
      "Search & Filter (projects by budget, skills, bidding status)",
      "Dashboard Panels showing payment summaries and active project charts",
      "Profile & Payout settings Management",
      "Deployment"
    ]
  },
  bonusFeatures: [
    "Stripe payment processing for milestone escrow holdings",
    "Live developer-client messaging desk via WebSockets (Socket.io)",
    "PDF contract and invoice generator (using PDF-Kit)",
    "Project files attachment uploader (using Multer)",
    "Dark mode developer workspace"
  ],
  submissionChecklist: [
    "GitHub Repository",
    "Frontend URL",
    "Backend URL",
    "README",
    "ER Diagram",
    "Postman Collection",
    "Presentation"
  ]
};

export default fp25Data;

export const fp28Data = {
  projectId: 28,
  projectCode: "FP-28",
  projectTitle: "Charity Donation & Crowdfunding Platform",
  difficulty: "Intermediate",
  duration: {
    totalDays: 14,
    expectedEffortHours: "40-50",
    objective: "Design, develop, test and deploy a complete intermediate MERN Stack application in 2 weeks."
  },
  techStack: [
    "React.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "JWT Authentication",
    "Chart.js",
    "Stripe API",
    "Multer",
    "PDF-Kit"
  ],
  overview: "Build a fundraising portal tracking donation goals, backer comments, campaign categories, and transparency logs.",
  problemStatement: [
    "Manual and error-prone tracking of charitable campaigns, fundraising targets, and contributions.",
    "Difficulty in ensuring financial transparency and tracking how collected donations are utilized.",
    "Inefficient verification pipelines for validating and onboarding campaign organizers.",
    "Lack of real-time statistics and interactive dashboards for campaign progression and backer counts."
  ],
  objectives: [
    "Build a robust and secure MERN stack charity donation and crowdfunding platform.",
    "Implement isolated workflow dashboards for Donors, Campaign Creators, and Admins.",
    "Ensure strict database schema constraints for contribution transactions, target parameters, and updates.",
    "Deploy the complete working systems to production cloud hosts."
  ],
  roles: {
    "Admin": [
        "Configure platform commission models, tags, and category taxonomies",
        "Verify and approve credentialed Campaign Creator registrations",
        "Audit platform transaction flows, payment escrows, and access security logs",
        "Monitor server performance metrics and diagnostics reports"
    ],
    "Creator": [
        "Launch public campaigns with target funding goals and descriptions",
        "Upload campaign video/photo resources using Multer",
        "Post transparency updates detailing how collected funds are being utilized",
        "View donor registry details and campaign contribution graphs"
    ],
    "Donor": [
        "Browse and search active campaigns by categories (Medical, Education, Disaster)",
        "Contribute funds securely via Stripe payment checkout pipelines",
        "Track campaign progression targets and read transparency updates",
        "Download tax-deductible contribution receipts as PDF"
    ]
  },
  modules: [
    "Authentication & Profile Registry",
    "Campaign Catalog & Details",
    "Donations & Checkout Engine (Stripe)",
    "Campaign Updates & Transparency Log",
    "Fundraising Performance Analytics (Charts)"
  ],
  pages: {
    "Public": [
        "Home",
        "Campaigns Catalog Search",
        "Campaign Details (Interactive donation drawer)",
        "Login",
        "Register"
    ],
    "Donor": [
        "Dashboard (My total contributions, active campaigns watchlist)",
        "Donations Ledger",
        "Receipts & Invoices Center",
        "Account Settings"
    ],
    "Creator": [
        "Dashboard (Active campaigns overview, goal progression indicators)",
        "Campaign Creator Form (Upload media assets)",
        "Transparency Updates Logger",
        "Donor list & Analytics Charts"
    ],
    "Admin": [
        "Dashboard (Total platform volume, verified creators headcount)",
        "Campaign Approvals Panel",
        "System Settings & Audit Log"
    ]
  },
  databaseCollections: [
    "Users",
    "Campaigns",
    "Donations",
    "Updates",
    "PaymentLogs"
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
      "Responsive Crowdfunding Portal UI",
      "Form Validation"
    ],
    "backend": [
      "Express",
      "REST APIs (Campaigns, Donations, Updates)",
      "MVC",
      "Middleware (Authentication, Role Check controls)",
      "Error Handling"
    ],
    "database": [
      "MongoDB",
      "Minimum 5 collections",
      "Relationships (Campaign -> Donations, Creator -> Campaigns)"
    ],
    "general": [
      "CRUD Operations (Campaigns, Donations)",
      "Search & Filter (campaigns by category, goal range, urgency)",
      "Dashboard Panels showing progress bars and contribution timelines",
      "Profile & Payout details Management",
      "Deployment"
    ]
  },
  bonusFeatures: [
    "Stripe checkout integration for secure donation contributions",
    "Interactive campaign funding and backer statistics graphs (using Chart.js)",
    "Auto-generated tax-deductible donation receipts as PDF (using PDF-Kit)",
    "Campaign media banners and photo uploader (using Multer)",
    "Dark mode dashboard themes"
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

export default fp28Data;

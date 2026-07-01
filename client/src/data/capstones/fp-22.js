export const fp22Data = {
  projectId: 22,
  projectCode: "FP-22",
  projectTitle: "Human Resource Management (HRM) System",
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
  "Stripe API"
],
  overview: "Build an enterprise portal tracking employee directory records, department structures, leave requests, and payroll updates.",
  problemStatement: [
    "Manual and error-prone tracking of Human Resource Management (HRM) System events.",
    "Difficulty in coordinating user roles and data access controls.",
    "Inefficient application workflow and status visibility.",
    "Lack of real-time stats and visual dashboard insights."
  ],
  objectives: [
    "Build a robust and secure MERN stack web application.",
    "Implement isolated user experience pipelines for different roles.",
    "Ensure strict database schema constraints and integrity rules.",
    "Deploy the complete working systems to production cloud hosts."
  ],
  roles: {
    "Admin": [
        "Approve campaign registries",
        "Audit platform payments flows",
        "Monitor campaign flags",
        "Access logs"
    ],
    "Creator": [
        "Launch campaign structures",
        "Set campaign monetary goals",
        "Update campaign progression logs",
        "View donor statistics"
    ],
    "Donor": [
        "Browse active campaigns categories",
        "Contribute funds securely via Stripe",
        "View personal donations logs",
        "Track progress"
    ]
},
  modules: [
  "Authentication",
  "Campaign Creator",
  "Payments Hub",
  "Campaign Registry",
  "Progress Analytics"
],
  pages: {
    "Public": [
        "Home",
        "Campaigns Catalog",
        "Campaign Details",
        "Login",
        "Register"
    ],
    "Donor": [
        "Dashboard",
        "Donations Logs",
        "Campaign Invoices",
        "Preferences"
    ],
    "Creator": [
        "Dashboard",
        "New Campaign",
        "Campaign Updates",
        "Donors List"
    ],
    "Admin": [
        "Dashboard",
        "System Approvals",
        "Payment Audits"
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
      "Responsive UI",
      "Form Validation"
    ],
    "backend": [
      "Express",
      "REST APIs",
      "MVC",
      "Middleware",
      "Error Handling"
    ],
    "database": [
      "MongoDB",
      "Minimum 5 collections",
      "Relationships"
    ],
    "general": [
      "CRUD Operations",
      "Search",
      "Filter",
      "Dashboard Panels",
      "Profile Management",
      "Deployment"
    ]
  },
  bonusFeatures: [
  "Stripe Checkout integration",
  "Campaign funding charts",
  "Tax receipt PDF export",
  "Email thank-you templates",
  "Dark mode"
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
export default fp22Data;

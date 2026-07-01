export const fp31Data = {
  projectId: 31,
  projectCode: "FP-31",
  projectTitle: "Local Service Directory & Reviews Platform",
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
  "Socket.io"
],
  overview: "Build a local provider search indexing businesses, user rating scores, contact request pipelines, and maps.",
  problemStatement: [
    "Manual and error-prone tracking of Local Service Directory & Reviews Platform events.",
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
        "Oversee landlord accounts",
        "Configure platform pricing tiers",
        "View system transaction totals",
        "Audit access logs"
    ],
    "Landlord": [
        "Configure property room slots",
        "Manage tenant agreements",
        "Track monthly rent collections",
        "Manage maintenance requests"
    ],
    "Tenant": [
        "Sign tenant agreements online",
        "Pay rent securely via Stripe",
        "File property maintenance requests",
        "View payment receipts"
    ]
},
  modules: [
  "Authentication",
  "Tenancy Catalog",
  "Agreements pipeline",
  "Payments System",
  "Maintenance Support"
],
  pages: {
    "Public": [
        "Home",
        "Properties catalog",
        "Tenancy Details",
        "Login",
        "Register"
    ],
    "Tenant": [
        "Dashboard",
        "My Agreement",
        "Rent Invoices",
        "Maintenance Desk"
    ],
    "Landlord": [
        "Dashboard",
        "Properties editor",
        "Tenants ledger",
        "Fulfillment status"
    ],
    "Admin": [
        "Dashboard",
        "Escrow logs",
        "Platform stats"
    ]
},
  databaseCollections: [
  "Users",
  "Properties",
  "Agreements",
  "Payments",
  "Requests",
  "Logs"
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
  "Agreement PDF contract generation",
  "Live maintenance chat via WebSockets",
  "Email invoice reminders",
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
export default fp31Data;

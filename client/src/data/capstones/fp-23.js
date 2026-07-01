export const fp23Data = {
  projectId: 23,
  projectCode: "FP-23",
  projectTitle: "Interactive Trivia & Gamified Learning Platform",
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
  "Chart.js"
],
  overview: "Build a quiz app supporting trivia categories, timed responses, leaderboard scores, and user quiz creator pipelines.",
  problemStatement: [
    "Manual and error-prone tracking of Interactive Trivia & Gamified Learning Platform events.",
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
        "Access database settings",
        "Configure role permissions",
        "Monitor company activities",
        "Audit security reports"
    ],
    "Manager": [
        "Manage sales agents profiles",
        "Set team sales goals",
        "View dashboard aggregates",
        "Export leads reports"
    ],
    "Agent": [
        "Log client lead listings",
        "Record sales progress details",
        "Log client interaction histories",
        "Track sales targets"
    ]
},
  modules: [
  "Authentication",
  "Lead Pipeline",
  "Interactions Ledger",
  "Sales Dashboards",
  "Goals Controller"
],
  pages: {
    "Public": [
        "Home",
        "Pricing Tiers",
        "Login",
        "Register"
    ],
    "Agent": [
        "Dashboard",
        "My Leads",
        "Activity Logger",
        "Target Progress"
    ],
    "Manager": [
        "Dashboard",
        "Sales Pipelines",
        "Team Directory",
        "Goal settings"
    ],
    "Admin": [
        "Dashboard",
        "System Audits",
        "Organization settings"
    ]
},
  databaseCollections: [
  "Users",
  "Leads",
  "Interactions",
  "SalesGoals",
  "Organizations",
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
  "Interactive sales pipeline charts",
  "Overdue lead email alerts",
  "Leads report PDF export",
  "Dark mode",
  "Activity logs"
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
export default fp23Data;

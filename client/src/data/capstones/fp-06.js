export const fp06Data = {
  projectId: 6,
  projectCode: "FP-06",
  projectTitle: "Online Learning Management System (LMS)",
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
  overview: "Build a course hub supporting student enrollment pipelines, video lectures, submission reviews, and certificate auto-generation.",
  problemStatement: [
    "Manual and error-prone tracking of Online Learning Management System (LMS) events.",
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
        "View system diagnostics",
        "Manage account access levels",
        "Update currency metrics",
        "Audit database logs"
    ],
    "User": [
        "Manage personal profile",
        "Log incomes and expenses",
        "Set monthly budget categories",
        "Generate financial charts"
    ]
},
  modules: [
  "Authentication",
  "Transaction Manager",
  "Category Budgets",
  "Analytical Charts",
  "Recurring Schedules"
],
  pages: {
    "Public": [
        "Home",
        "Interactive Calculator",
        "Login",
        "Register"
    ],
    "User": [
        "Dashboard",
        "Transactions ledger",
        "Budget Settings",
        "Financial Analysis"
    ],
    "Admin": [
        "Dashboard",
        "System Settings",
        "Database Diagnostics"
    ]
},
  databaseCollections: [
  "Users",
  "Transactions",
  "Budgets",
  "Categories",
  "RecurringTransactions"
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
  "Interactive budget charts",
  "CSV ledger export",
  "Email notifications on budget breach",
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
export default fp06Data;

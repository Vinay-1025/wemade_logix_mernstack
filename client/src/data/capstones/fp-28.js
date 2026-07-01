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
  "Chart.js"
],
  overview: "Build a fundraising portal tracking donation goals, backer comments, campaign categories, and transparency logs.",
  problemStatement: [
    "Manual and error-prone tracking of Charity Donation & Crowdfunding Platform events.",
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
        "Manage system dictionaries",
        "Monitor server activity logs",
        "Oversee account registrations",
        "Access parameters"
    ],
    "User": [
        "Write daily journal inputs",
        "Configure personal habit trackers",
        "Analyze habit consistency charts",
        "Set routine alerts"
    ]
},
  modules: [
  "Authentication",
  "Journal Entries",
  "Habits Tracker",
  "Analytical Charts",
  "Alerts Scheduler"
],
  pages: {
    "Public": [
        "Home",
        "Features Overview",
        "Self Care Guide",
        "Login",
        "Register"
    ],
    "User": [
        "Dashboard",
        "Journal Board",
        "Habits Ledger",
        "Analytical Progress"
    ],
    "Admin": [
        "Dashboard",
        "System Diagnostic",
        "Configuration logs"
    ]
},
  databaseCollections: [
  "Users",
  "Entries",
  "Habits",
  "ProgressLogs",
  "Alerts"
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
  "Interactive consistency charts",
  "Daily reminder email triggers",
  "Journal PDF backup export",
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
export default fp28Data;

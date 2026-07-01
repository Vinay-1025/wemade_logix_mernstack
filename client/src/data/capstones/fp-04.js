export const fp04Data = {
  projectId: 4,
  projectCode: "FP-04",
  projectTitle: "Personal Finance & Expense Tracker Dashboard",
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
  "Socket.io",
  "Multer"
],
  overview: "Build an asset portfolio analyzer featuring budget thresholds, custom transaction categories, and SVG chart visualizers.",
  problemStatement: [
    "Manual and error-prone tracking of Personal Finance & Expense Tracker Dashboard events.",
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
        "Manage chat rooms & channels",
        "Monitor compliance & abuse reports",
        "Manage system integrations",
        "Audit access logs"
    ],
    "Moderator": [
        "Audit room conversations",
        "Ban abusive users",
        "Delete offensive postings",
        "Approve public channels"
    ],
    "User": [
        "Create private/public chat channels",
        "Send real-time messages & files",
        "Initiate direct message threads",
        "Manage notifications"
    ]
},
  modules: [
  "Authentication",
  "Channel Registry",
  "Real-Time Messaging Engine",
  "Direct Message Hub",
  "User Directory",
  "Compliance Logger"
],
  pages: {
    "Public": [
        "Home",
        "Product Pricing",
        "Login",
        "Register"
    ],
    "User": [
        "Dashboard",
        "Chat Workspace",
        "Channel Hub",
        "Account Settings"
    ],
    "Admin": [
        "Dashboard",
        "Channels Controller",
        "User Permissions",
        "Abuse Registry"
    ]
},
  databaseCollections: [
  "Users",
  "Channels",
  "Messages",
  "PrivateRooms",
  "Reports",
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
  "Real-time file sharing",
  "Active typing indicators",
  "Message search",
  "Slack-like channel reactions",
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
export default fp04Data;

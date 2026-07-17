export const fp07Data = {
  projectId: 7,
  projectCode: "FP-07",
  projectTitle: "Real-Time Chat & Instant Messenger Hub",
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
  overview: "Build a Slack clone featuring persistent chat channels, private direct messaging, presence indicators, and message history searches.",
  problemStatement: [
    "Manual and inefficient real-time communication tracking across fragmented systems.",
    "Difficulty in coordinating user roles, chat channel moderations, and data access controls.",
    "Inefficient message delivery, lack of status visibility, and weak chat history logging.",
    "Lack of real-time server/channel metrics and admin compliance audit tools."
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
    "Real-time file sharing (using Multer)",
    "Active typing indicators",
    "Message history search",
    "Slack-like channel emoji reactions",
    "Dark mode workspace toggle"
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

export default fp07Data;

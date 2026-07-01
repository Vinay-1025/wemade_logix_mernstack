export const fp18Data = {
  projectId: 18,
  projectCode: "FP-18",
  projectTitle: "Vehicle Rental & Fleet Management System",
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
  "Socket.io"
],
  overview: "Build a booking app checking rental durations, car categories, insurance options, and vehicle return inspection logs.",
  problemStatement: [
    "Manual and error-prone tracking of Vehicle Rental & Fleet Management System events.",
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
        "Configure system queues",
        "Manage service departments",
        "Audit support performance",
        "View log reports"
    ],
    "Agent": [
        "Claim support tickets",
        "Resolve customer queries",
        "Log ticket notes & updates",
        "Transfer tickets"
    ],
    "Client": [
        "Create help tickets",
        "Add messages to ticket updates",
        "Track resolution statuses",
        "Submit performance ratings"
    ]
},
  modules: [
  "Authentication",
  "Tickets Creator",
  "Resolution Pipeline",
  "Live Chat Hub",
  "Performance Analytics"
],
  pages: {
    "Public": [
        "Home",
        "Knowledge Base",
        "FAQs",
        "Login",
        "Register"
    ],
    "Client": [
        "Dashboard",
        "Submit Ticket",
        "My Tickets",
        "Ticket Details"
    ],
    "Agent": [
        "Dashboard",
        "Assigned Queue",
        "Active Chats",
        "Performance Reports"
    ],
    "Admin": [
        "Dashboard",
        "Departments Registry",
        "Logs Desk"
    ]
},
  databaseCollections: [
  "Users",
  "Tickets",
  "Chats",
  "Departments",
  "Logs",
  "Ratings"
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
  "Live ticketing chat via WebSockets",
  "SLA time logs charts",
  "Ticket report PDF export",
  "Email state alerts",
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
export default fp18Data;

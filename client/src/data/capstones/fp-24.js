export const fp24Data = {
  projectId: 24,
  projectCode: "FP-24",
  projectTitle: "Food Delivery & Restaurant Directory App",
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
  overview: "Build an ordering app featuring restaurant menu categories, shopping cart states, order tracker status, and review forms.",
  problemStatement: [
    "Manual and error-prone tracking of Food Delivery & Restaurant Directory App events.",
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
        "Enrol school departments",
        "Access backend logs",
        "Approve curriculum directories",
        "Monitor school databases"
    ],
    "Instructor": [
        "Create classrooms structures",
        "Conduct virtual live chats",
        "Build assignment lists & grade",
        "View classroom metrics"
    ],
    "Student": [
        "Enrol in classroom portals",
        "Access assignments & submit",
        "Join classroom live chats",
        "View academic grades"
    ]
},
  modules: [
  "Authentication",
  "Virtual Classrooms",
  "Study Repository",
  "Tasks Board",
  "Live Chats Desk"
],
  pages: {
    "Public": [
        "Home",
        "Academy Explorer",
        "Academic Paths",
        "Login",
        "Register"
    ],
    "Student": [
        "Dashboard",
        "My Classrooms",
        "Lessons path",
        "Submissions panel"
    ],
    "Instructor": [
        "Dashboard",
        "Course builder",
        "Task Grading Desk",
        "Student Audit"
    ],
    "Admin": [
        "Dashboard",
        "School Registry",
        "Academic Reports"
    ]
},
  databaseCollections: [
  "Users",
  "Classrooms",
  "Materials",
  "Tasks",
  "Submissions",
  "Grades"
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
  "Live classroom chat via WebSockets",
  "Grades distribution charts",
  "Report card PDF generator",
  "Email grade updates",
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
export default fp24Data;

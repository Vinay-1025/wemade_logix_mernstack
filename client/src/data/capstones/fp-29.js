export const fp29Data = {
  projectId: 29,
  projectCode: "FP-29",
  projectTitle: "Weather Station & Geospatial Sensor Portal",
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
  "Multer"
],
  overview: "Build an analytics app parsing weather station metrics, history trends, interactive charts, and local alerts.",
  problemStatement: [
    "Manual and error-prone tracking of Weather Station & Geospatial Sensor Portal events.",
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
        "Approve alumni registries",
        "Approve association job boards",
        "Monitor platform violations",
        "Audit systems logs"
    ],
    "Alumni": [
        "Create alumni profile details",
        "Post job vacancy referrals",
        "Organize reunion events",
        "Search peer directories"
    ],
    "Student": [
        "Search alumni rosters",
        "Apply for job referrals",
        "Inquire alumni guidance",
        "Register for reunions"
    ]
},
  modules: [
  "Authentication",
  "Alumni Directory",
  "Referral Board",
  "Reunion Planner",
  "Messaging Hub"
],
  pages: {
    "Public": [
        "Home",
        "Alumni Explorer",
        "Association Info",
        "Login",
        "Register"
    ],
    "Student": [
        "Dashboard",
        "Alumni Finder",
        "Referrals Desk",
        "Reunion Schedule"
    ],
    "Alumni": [
        "Dashboard",
        "Profile Editor",
        "Post Referral",
        "Alumni Chats"
    ],
    "Admin": [
        "Dashboard",
        "Verify Alumni",
        "System configurations"
    ]
},
  databaseCollections: [
  "Users",
  "AlumniProfiles",
  "Referrals",
  "Events",
  "Messages",
  "Associations"
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
  "Interactive peer map search",
  "Alumni stats dashboard charts",
  "Newsletter PDF creator",
  "Email invite templates",
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
export default fp29Data;

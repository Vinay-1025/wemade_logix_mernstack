export const fp19Data = {
  projectId: 19,
  projectCode: "FP-19",
  projectTitle: "Stock Portfolio & Investment Analytics Portal",
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
  overview: "Build a market tracker managing watchlist portfolios, asset buy/sell transaction logs, and real-time pricing simulations.",
  problemStatement: [
    "Manual and error-prone tracking of Stock Portfolio & Investment Analytics Portal events.",
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
        "Manage system database",
        "Configure template structures",
        "Audit log files",
        "Approve editor layouts"
    ],
    "Editor": [
        "Write blog articles",
        "Upload article cover photos",
        "Tag articles by category",
        "Track article view stats"
    ],
    "Reader": [
        "Read published articles",
        "Add comments in sections",
        "Bookmark articles",
        "Share articles"
    ]
},
  modules: [
  "Authentication",
  "Articles Catalog",
  "Rich Content Builder",
  "Comments Desk",
  "Article Analytics"
],
  pages: {
    "Public": [
        "Home",
        "Blogs Feed",
        "Blog Details",
        "Login",
        "Register"
    ],
    "Reader": [
        "Dashboard",
        "Saved Articles",
        "Notifications",
        "My Comments"
    ],
    "Editor": [
        "Dashboard",
        "New Article",
        "Drafts Manager",
        "View Charts"
    ],
    "Admin": [
        "Dashboard",
        "System Setup",
        "Content Moderations"
    ]
},
  databaseCollections: [
  "Users",
  "Articles",
  "Comments",
  "Categories",
  "ReadStats",
  "Bookmarks"
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
  "Rich text markdown publisher",
  "Article visitor analytics charts",
  "Newsletter email triggers",
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
export default fp19Data;

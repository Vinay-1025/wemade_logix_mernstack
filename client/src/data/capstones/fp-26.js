export const fp26Data = {
  projectId: 26,
  projectCode: "FP-26",
  projectTitle: "Music Streaming & Playlist Curation Service",
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
  overview: "Build an audio catalog supporting playlist creators, favorite tracks, audio player playback controls, and artist bios.",
  problemStatement: [
    "Manual and error-prone tracking of Music Streaming & Playlist Curation Service events.",
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
        "Manage film listings database",
        "Approve editorial reviews",
        "Moderate user comments",
        "Audit system queries"
    ],
    "Editor": [
        "Write film summaries",
        "Upload movie cover artwork",
        "Post film review critiques",
        "View article pageviews"
    ],
    "Viewer": [
        "Browse movie directories",
        "Submit personal review ratings",
        "Participate in discussion threads",
        "Bookmark watchlist"
    ]
},
  modules: [
  "Authentication",
  "Movies Catalog",
  "Editorial Reviews",
  "Viewer Reviews",
  "Watchlist Hub"
],
  pages: {
    "Public": [
        "Home",
        "Movies Database",
        "Critique Reviews",
        "Login",
        "Register"
    ],
    "Viewer": [
        "Dashboard",
        "My Watchlist",
        "My Reviews",
        "Comment history"
    ],
    "Editor": [
        "Dashboard",
        "Publish Movie",
        "Editorial draft",
        "Visitor Charts"
    ],
    "Admin": [
        "Dashboard",
        "Content Approvals",
        "User logs"
    ]
},
  databaseCollections: [
  "Users",
  "Movies",
  "Reviews",
  "Comments",
  "Watchlists",
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
  "Watchlist checker automation",
  "Average rating calculators",
  "Review PDF export summaries",
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
export default fp26Data;

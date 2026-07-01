export const fp20Data = {
  projectId: 20,
  projectCode: "FP-20",
  projectTitle: "Real Estate Listing & Broker Connection Hub",
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
  "Multer",
  "GridFS"
],
  overview: "Build a property search app featuring filters for pricing, location, dimensions, and broker connection forms.",
  problemStatement: [
    "Manual and error-prone tracking of Real Estate Listing & Broker Connection Hub events.",
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
        "Moderate media directories",
        "Audit platform financials",
        "Monitor streaming latency",
        "Manage user data"
    ],
    "Artist": [
        "Upload audio music files",
        "Create album listings",
        "Manage artist public profile",
        "Analyze stream charts"
    ],
    "Listener": [
        "Search artist song directories",
        "Create personal song playlists",
        "Listen to live stream audio",
        "Upvote tracks"
    ]
},
  modules: [
  "Authentication",
  "Audio Streaming",
  "Playlists Hub",
  "Music Catalog",
  "Artist Analytics"
],
  pages: {
    "Public": [
        "Home",
        "Explore Tracks",
        "Artist Finder",
        "Login",
        "Register"
    ],
    "Listener": [
        "Dashboard",
        "Playlists",
        "Favorites",
        "History"
    ],
    "Artist": [
        "Dashboard",
        "Upload Track",
        "My Albums",
        "Streaming Charts"
    ],
    "Admin": [
        "Dashboard",
        "Media Audit",
        "Platform Metrics"
    ]
},
  databaseCollections: [
  "Users",
  "Tracks",
  "Albums",
  "Playlists",
  "StreamLogs",
  "ArtistProfiles"
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
  "Live audio streaming integration",
  "Interactive stream metrics charts",
  "Email analytics reports",
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
export default fp20Data;

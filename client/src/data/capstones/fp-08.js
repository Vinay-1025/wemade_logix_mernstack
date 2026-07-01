export const fp08Data = {
  projectId: 8,
  projectCode: "FP-08",
  projectTitle: "Customer Relationship Management (CRM) Suite",
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
  overview: "Build a business dashboard managing lead sales pipelines, customer communication timelines, sales reporting, and meeting logs.",
  problemStatement: [
    "Manual and error-prone tracking of Customer Relationship Management (CRM) Suite events.",
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
        "Manage server parameters",
        "Manage channels and themes",
        "Moderate flagged postings",
        "View activity logs"
    ],
    "Moderator": [
        "Audit post reports",
        "Ban abusive profiles",
        "Pin informational posts",
        "Review comment queues"
    ],
    "User": [
        "Manage user profile",
        "Publish posts with image uploads",
        "Comment & reply in forums",
        "Upvote/Downvote content"
    ]
},
  modules: [
  "Authentication",
  "Feed Generator",
  "Post Builder",
  "Comment Threading",
  "Moderation Registry"
],
  pages: {
    "Public": [
        "Home",
        "Explore Feed",
        "Forum Categories",
        "Login",
        "Register"
    ],
    "User": [
        "Dashboard",
        "My Profile",
        "Publish Post",
        "Bookmarked Posts"
    ],
    "Admin": [
        "Dashboard",
        "Reported Content",
        "User Permissions"
    ]
},
  databaseCollections: [
  "Users",
  "Posts",
  "Comments",
  "Subforums",
  "Reports",
  "Upvotes"
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
  "Image upload support",
  "Real-time feed updates",
  "CSV Post Export",
  "Activity logs",
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
export default fp08Data;

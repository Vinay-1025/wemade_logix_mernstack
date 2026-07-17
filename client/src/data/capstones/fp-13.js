export const fp13Data = {
  projectId: 13,
  projectCode: "FP-13",
  projectTitle: "Social Media & Community Networking Feed",
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
    "PDF-Kit"
  ],
  overview: "Build a micro-blogging platform featuring text feeds, image uploads, post commenting, like toggles, and user follower relationships.",
  problemStatement: [
    "Manual and complex tracking of social feeds, posts, likes, and comments.",
    "Difficulty in moderating abusive profiles, flagging inappropriate content, and coordinating role permissions.",
    "Inefficient chronological feed retrieval and lack of status visibility for reports.",
    "Lack of user engagement analytics and printable profile summaries."
  ],
  objectives: [
    "Build a robust and secure MERN stack social media networking feed application.",
    "Implement isolated dashboards for Admins, Moderators, and standard Users.",
    "Ensure strict database schema constraints for followers, nested comments, and post likes.",
    "Deploy the complete working systems to production cloud hosts."
  ],
  roles: {
    "Admin": [
        "Configure system-wide settings and directory layouts",
        "Monitor server performance metrics and database status",
        "Manage global tags, topics, and platform-wide configurations",
        "Approve and audit Moderator promotion requests"
    ],
    "Moderator": [
        "Audit post reports and user flagged violations",
        "Ban abusive user profiles and remove offensive listings",
        "Pin announcements and informational posts on the community board",
        "Review and clear comments in the moderation queue"
    ],
    "User": [
        "Manage personal profile, bio, and avatar settings",
        "Publish posts with image uploads (using Multer)",
        "Interact with other users by liking posts, writing comments, and following accounts",
        "Download profile analytics summary and activity logs as a PDF"
    ]
  },
  modules: [
    "Authentication & Profile manager",
    "Feed Generator (Personalized & Global)",
    "Post Creator (Media Uploader)",
    "Comment Threading Engine",
    "Follower & Networking Directory",
    "Moderation & Compliance System"
  ],
  pages: {
    "Public": [
        "Home",
        "Explore Feed",
        "Community Rules & Directory",
        "Login",
        "Register"
    ],
    "User": [
        "Dashboard (Personalized home feed)",
        "Profile Editor & My Post Ledger",
        "Create Post Panel",
        "Followers & Following Network"
    ],
    "Moderator": [
        "Dashboard (Moderation status overview)",
        "Reported Posts & Comments Queue",
        "User Ban & Suspension Manager",
        "Audit Logs"
    ],
    "Admin": [
        "Dashboard (Platform metrics: active users, post volumes)",
        "Moderator Roster Management",
        "Database Diagnostics Logs"
    ]
  },
  databaseCollections: [
    "Users",
    "Posts",
    "Comments",
    "Likes",
    "Followers",
    "Reports"
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
      "Responsive Social Feed UI",
      "Form Validation"
    ],
    "backend": [
      "Express",
      "REST APIs (Posts, Comments, Likes, Follows)",
      "MVC",
      "Middleware (Authentication, Moderator Role Control)",
      "Error Handling"
    ],
    "database": [
      "MongoDB",
      "Minimum 5 collections",
      "Relationships (User -> Posts, Post -> Comments, User -> Followers)"
    ],
    "general": [
      "CRUD Operations (Posts, Comments)",
      "Search & Filter (posts by tags, search queries, profiles)",
      "Dashboard Panels showing follower counts, likes, and engagement metrics",
      "Profile & Privacy Preferences Management",
      "Deployment"
    ]
  },
  bonusFeatures: [
    "PDF Profile Activity compiler & export generator (using PDF-Kit)",
    "Post image upload capabilities (using Multer)",
    "Real-time feed updates and notifications",
    "Dynamic follower feed pipeline",
    "Dark mode interface toggle"
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

export default fp13Data;

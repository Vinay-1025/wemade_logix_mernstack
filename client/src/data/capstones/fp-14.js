export const fp14Data = {
  projectId: 14,
  projectCode: "FP-14",
  projectTitle: "Blogging & Content Management CMS System",
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
    "Chart.js",
    "Multer"
  ],
  overview: "Build a custom publication engine supporting rich-text editors, tag taxonomies, draft status, and public commenting sections.",
  problemStatement: [
    "Manual and unorganized tracking of blog drafts, publication schedules, and content tags.",
    "Difficulty in segregating user roles (Authors, Editors, Admins) and protecting unpublished drafts.",
    "Inefficient management of public comments and lack of automated moderation filters.",
    "Lack of visual content performance dashboards and reader engagement metrics."
  ],
  objectives: [
    "Build a robust and secure MERN stack blogging and content management system (CMS).",
    "Implement isolated editorial pipelines for Authors, Editors, and platform Admins.",
    "Ensure strict database schema constraints for post versions, comments, and category taxonomies.",
    "Deploy the complete working systems to production cloud hosts."
  ],
  roles: {
    "Admin": [
        "Configure global site settings and platform themes",
        "Audit system activities, database backups, and access logs",
        "Manage user role elevations and permission configurations",
        "Monitor platform usage metrics and analytics logs"
    ],
    "Editor": [
        "Manage blog categories, taxonomies, and tag registries",
        "Review, edit, and approve/publish pending articles submitted by Authors",
        "Audit and moderate public comments and flag inappropriate remarks",
        "Analyze overall site-wide post-performance charts"
    ],
    "Author": [
        "Create blog drafts and edit rich-text contents",
        "Upload article cover images and coordinate media resources (using Multer)",
        "Submit articles to Editors for review and publication approval",
        "Track personal article view counts and user engagement analytics"
    ]
  },
  modules: [
    "Authentication & Profile preferences",
    "Article & Draft Registry (Rich-Text Editor)",
    "Taxonomy & Tag Manager",
    "Comment Engine & Moderation Console",
    "Reader Engagement Analytics (Charts)"
  ],
  pages: {
    "Public": [
        "Home (Articles feed)",
        "Article Viewer (Reading interface)",
        "Category & Tag Explorer",
        "Login",
        "Register"
    ],
    "Author": [
        "Dashboard (My articles, view metrics, draft folder)",
        "Rich-Text Article Editor",
        "Comments Feedback Board",
        "Activity Log"
    ],
    "Editor": [
        "Dashboard (Publication calendar, queue sizes)",
        "Review & Approval Deck (Drafts inspector)",
        "Comment Moderation Center",
        "Tag & Category Administrator"
    ],
    "Admin": [
        "Dashboard (User registrations, popular categories)",
        "Roster Manager & Permissions Settings",
        "System Audit Logs"
    ]
  },
  databaseCollections: [
    "Users",
    "Posts",
    "Comments",
    "Categories",
    "Tags",
    "Analytics"
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
      "Responsive CMS Dashboard UI",
      "Form Validation"
    ],
    "backend": [
      "Express",
      "REST APIs (Posts, Comments, Categories)",
      "MVC",
      "Middleware (Authentication, Editor/Author controls)",
      "Error Handling"
    ],
    "database": [
      "MongoDB",
      "Minimum 5 collections",
      "Relationships (User -> Posts, Post -> Comments, Post -> Categories)"
    ],
    "general": [
      "CRUD Operations (Posts, Comments, Categories)",
      "Search & Filter (posts by tags, categories, publication date)",
      "Dashboard Panels showing post read-times and viewer graphs",
      "Profile & Publication settings Management",
      "Deployment"
    ]
  },
  bonusFeatures: [
    "Interactive reader view graphs and performance charts (using Chart.js)",
    "Automated email alerts when comments are flagged or draft status changes",
    "Blog article data summary PDF export",
    "Article cover picture upload capabilities (using Multer)",
    "Dark mode reading option for visitors"
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

export default fp14Data;

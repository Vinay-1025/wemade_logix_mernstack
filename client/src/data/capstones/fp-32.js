export const fp32Data = {
  projectId: 32,
  projectCode: "FP-32",
  projectTitle: "Online Art Gallery & Artist Portfolio Studio",
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
  "Stripe API",
  "Multer"
],
  overview: "Build a design catalog hosting art uploads, virtual showroom filters, custom prints options, and artist contact inquiries.",
  problemStatement: [
    "Manual and error-prone tracking of Online Art Gallery & Artist Portfolio Studio events.",
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
        "Moderate art directories",
        "Audit platform financials",
        "Approve collection curators",
        "Manage user data"
    ],
    "Artist": [
        "Upload art image assets",
        "Configure portfolio displays",
        "Manage prints pricing tiers",
        "Analyze sales charts"
    ],
    "Viewer": [
        "Browse art gallery collections",
        "Purchase custom art prints",
        "Inquire art custom requests",
        "Bookmark favorites"
    ]
},
  modules: [
  "Authentication",
  "Gallery Showcase",
  "Prints Checkout",
  "Artist Portfolios",
  "Sales Analytics"
],
  pages: {
    "Public": [
        "Home",
        "Art Gallery",
        "Artists Finder",
        "Login",
        "Register"
    ],
    "Viewer": [
        "Dashboard",
        "My Purchases",
        "Favorites list",
        "Inquiries Hub"
    ],
    "Artist": [
        "Dashboard",
        "Upload Artwork",
        "Print settings",
        "Sales Reports"
    ],
    "Admin": [
        "Dashboard",
        "Artwork Approvals",
        "Platform margins"
    ]
},
  databaseCollections: [
  "Users",
  "Artworks",
  "Artists",
  "Purchases",
  "Inquiries",
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
  "Stripe custom prints payment",
  "Interactive artwork stats charts",
  "Art invoice PDF generation",
  "Email purchase confirmation",
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
export default fp32Data;

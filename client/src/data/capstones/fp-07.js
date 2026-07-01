export const fp07Data = {
  projectId: 7,
  projectCode: "FP-07",
  projectTitle: "Real-Time Chat & Instant Messenger Hub",
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
  "Socket.io"
],
  overview: "Build a Slack clone featuring persistent chat channels, private direct messaging, presence indicators, and message history searches.",
  problemStatement: [
    "Manual and error-prone tracking of Real-Time Chat & Instant Messenger Hub events.",
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
        "Manage disputation files",
        "Approve categories & services",
        "View platform commission summaries",
        "Audit user databases"
    ],
    "Seller": [
        "Build seller profile & service gigs",
        "Manage work timelines & deliveries",
        "Manage gig inquiries",
        "View earnings reports"
    ],
    "Buyer": [
        "Search & filter services directory",
        "Order services via Stripe checkout",
        "Track project milestones",
        "Submit reviews & feedback"
    ]
},
  modules: [
  "Authentication",
  "Gigs Directory",
  "Ordering Pipeline",
  "Milestone Tracking",
  "Messaging System",
  "Ratings Hub"
],
  pages: {
    "Public": [
        "Home",
        "Gigs Marketplace",
        "Seller Directory",
        "Login",
        "Register"
    ],
    "Buyer": [
        "Dashboard",
        "My Orders",
        "Milestone Manager",
        "Invoice Center"
    ],
    "Seller": [
        "Dashboard",
        "My Gigs Builder",
        "Active Orders",
        "Revenue Charts"
    ],
    "Admin": [
        "Dashboard",
        "Gig Approvals",
        "Escrows Registry"
    ]
},
  databaseCollections: [
  "Users",
  "Gigs",
  "Orders",
  "Milestones",
  "Messages",
  "Reviews"
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
  "Stripe payment processing",
  "Project milestone tracker",
  "Live buyer-seller messaging",
  "Invoice PDF export",
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
export default fp07Data;

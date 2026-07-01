export const fp25Data = {
  projectId: 25,
  projectCode: "FP-25",
  projectTitle: "Freelance Developer Freelancer Bid Board",
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
  "Stripe API"
],
  overview: "Build a job board featuring client projects, developer bids, milestone budgets, and direct messaging portals.",
  problemStatement: [
    "Manual and error-prone tracking of Freelance Developer Freelancer Bid Board events.",
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
        "Approve hotel registries",
        "Configure menu boards & listings",
        "View platform analytics",
        "Audit backend databases"
    ],
    "Manager": [
        "Create room catalog items",
        "Manage reservation schedules",
        "View client checkout logs",
        "Analyze room revenue charts"
    ],
    "Customer": [
        "Browse hotel room directories",
        "Book room reservations securely",
        "Submit post-stay reviews",
        "Download reservation PDFs"
    ]
},
  modules: [
  "Authentication",
  "Rooms Directory",
  "Reservations System",
  "Billing Desk",
  "Reviews Hub"
],
  pages: {
    "Public": [
        "Home",
        "Rooms Catalog",
        "Room Details",
        "Login",
        "Register"
    ],
    "Customer": [
        "Dashboard",
        "My Reservations",
        "Saved Hotels",
        "Receipts"
    ],
    "Manager": [
        "Dashboard",
        "Catalog editor",
        "Bookings Calendar",
        "Earnings Reports"
    ],
    "Admin": [
        "Dashboard",
        "Hotels Directory",
        "Finances Audit"
    ]
},
  databaseCollections: [
  "Users",
  "Hotels",
  "Rooms",
  "Reservations",
  "Reviews",
  "BillingStats"
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
  "Stripe booking payment",
  "Invoice receipt PDF generator",
  "Overbooking validation engine",
  "Email booking confirmation",
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
export default fp25Data;

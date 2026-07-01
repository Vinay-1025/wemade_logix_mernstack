export const fp12Data = {
  projectId: 12,
  projectCode: "FP-12",
  projectTitle: "Job Search & Career Recruitment Portal",
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
  overview: "Build an employer-candidate matching portal featuring resume builders, application trackers, job filtering, and direct chats.",
  problemStatement: [
    "Manual and error-prone tracking of Job Search & Career Recruitment Portal events.",
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
        "Manage restaurant settings",
        "Configure menu categories",
        "View sales summaries",
        "Audit system configurations"
    ],
    "Staff": [
        "Accept restaurant orders",
        "Update table booking status",
        "Manage kitchen status pipelines",
        "Print order receipts"
    ],
    "Customer": [
        "Browse food menu item catalog",
        "Book tables or order takeout",
        "Track order status updates",
        "View receipts"
    ]
},
  modules: [
  "Authentication",
  "Menu Catalog",
  "Table Reservation",
  "Order Pipeline",
  "Staff Dashboard"
],
  pages: {
    "Public": [
        "Home",
        "Menu Board",
        "Table Reservation",
        "Login",
        "Register"
    ],
    "Customer": [
        "Dashboard",
        "My Reservations",
        "Active Orders",
        "History"
    ],
    "Staff": [
        "Dashboard",
        "Kitchen Queue",
        "Tables Status",
        "Menu Configurator"
    ],
    "Admin": [
        "Dashboard",
        "Sales Reports",
        "Staff Management"
    ]
},
  databaseCollections: [
  "Users",
  "MenuItems",
  "Orders",
  "Reservations",
  "Tables",
  "SalesSummary"
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
  "Live order updates via WebSockets",
  "Stripe pre-ordering payments",
  "Bill invoice PDF export",
  "Staff shift records",
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
export default fp12Data;

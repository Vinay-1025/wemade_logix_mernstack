export const fp21Data = {
  projectId: 21,
  projectCode: "FP-21",
  projectTitle: "Cloud File Storage & Encrypted Sharing Portal",
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
  "Google Maps API"
],
  overview: "Build a files directory supporting folder hierarchies, document previewers, access controls, and sharing link tokens.",
  problemStatement: [
    "Manual and error-prone tracking of Cloud File Storage & Encrypted Sharing Portal events.",
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
        "Manage branch centers",
        "Track company inventory lists",
        "Audit platform financial models",
        "View audits"
    ],
    "Staff": [
        "Process car rental check-outs",
        "Update car diagnostic status",
        "Inspect returned vehicles",
        "Update logs"
    ],
    "Customer": [
        "Browse automobile catalog",
        "Book rentals and pick schedules",
        "Pay rental invoices securely",
        "Track booking status"
    ]
},
  modules: [
  "Authentication",
  "Fleet Catalog",
  "Rentals Pipeline",
  "Vehicle Diagnostics",
  "Billing System"
],
  pages: {
    "Public": [
        "Home",
        "Car Fleet Catalog",
        "Rental Details",
        "Login",
        "Register"
    ],
    "Customer": [
        "Dashboard",
        "My Bookings",
        "Saved Cars",
        "Receipts"
    ],
    "Staff": [
        "Dashboard",
        "Fleet Queue",
        "Vehicles Status",
        "Maintenance Panel"
    ],
    "Admin": [
        "Dashboard",
        "Sales Summaries",
        "Branch Configurator"
    ]
},
  databaseCollections: [
  "Users",
  "Vehicles",
  "Rentals",
  "Inspections",
  "Branches",
  "BillingSummary"
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
  "Stripe payment checkout",
  "Rental invoice PDF generator",
  "Vehicle GPS map tracking",
  "Email invoice templates",
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
export default fp21Data;

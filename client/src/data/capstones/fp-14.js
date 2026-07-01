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
  "Chart.js"
],
  overview: "Build a custom publication engine supporting rich-text editors, tag taxonomies, draft status, and public commenting sections.",
  problemStatement: [
    "Manual and error-prone tracking of Blogging & Content Management CMS System events.",
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
        "Manage company structures",
        "Access database backups",
        "Audit admin protocols",
        "Manage general configs"
    ],
    "Manager": [
        "Track stock inventory levels",
        "Create purchase and sales logs",
        "Manage suppliers directory",
        "Analyze inventory charts"
    ],
    "Staff": [
        "Log stock item counts",
        "Process barcode scans",
        "Create warehouse transfers",
        "View notifications"
    ]
},
  modules: [
  "Authentication",
  "Inventory Records",
  "Suppliers Directory",
  "Movement Ledger",
  "Notifications Hub"
],
  pages: {
    "Public": [
        "Home",
        "Stock Catalog",
        "Login",
        "Register"
    ],
    "Staff": [
        "Dashboard",
        "Stock Ledger",
        "Warehouse transfers",
        "Logs Panel"
    ],
    "Manager": [
        "Dashboard",
        "Inventory Analytics",
        "Supplier Manager",
        "Stock alerts"
    ],
    "Admin": [
        "Dashboard",
        "Company Directory",
        "Settings Panel"
    ]
},
  databaseCollections: [
  "Users",
  "Items",
  "Suppliers",
  "Movements",
  "Warehouses",
  "Alerts"
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
  "Interactive stock alerts charts",
  "Low stock email alerts",
  "Stock valuation PDF export",
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
export default fp14Data;

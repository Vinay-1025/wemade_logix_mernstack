export const fp30Data = {
  projectId: 30,
  projectCode: "FP-30",
  projectTitle: "Gym Membership & Schedule Booking System",
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
  "Chart.js"
],
  overview: "Build a club manager app scheduling class times, tracking member attendance, billing status, and training calendars.",
  problemStatement: [
    "Manual and error-prone tracking of Gym Membership & Schedule Booking System events.",
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
        "Manage company databases",
        "Configure system integrations",
        "Audit access protocols",
        "Manage general configs"
    ],
    "Manager": [
        "Track IT asset stock ledger",
        "Assign assets to employees",
        "Manage maintenance schedules",
        "Analyze assets charts"
    ],
    "Staff": [
        "View assigned IT assets",
        "Submit asset replacement files",
        "Report asset damage logs",
        "View notifications"
    ]
},
  modules: [
  "Authentication",
  "Assets Inventory",
  "Asset Allocator",
  "Maintenance Log",
  "Alerts Center"
],
  pages: {
    "Public": [
        "Home",
        "Assets Catalog",
        "Login",
        "Register"
    ],
    "Staff": [
        "Dashboard",
        "My Assigned Assets",
        "File Request",
        "Incident Log"
    ],
    "Manager": [
        "Dashboard",
        "Assets Inventory",
        "Allocations list",
        "Alerts center"
    ],
    "Admin": [
        "Dashboard",
        "Company settings",
        "Backups Panel"
    ]
},
  databaseCollections: [
  "Users",
  "Assets",
  "Allocations",
  "Maintenances",
  "Alerts",
  "Diagnostics"
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
  "Interactive allocation charts",
  "Low asset alerts emails",
  "Asset checklist PDF export",
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
export default fp30Data;

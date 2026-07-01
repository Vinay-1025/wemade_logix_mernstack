export const fp15Data = {
  projectId: 15,
  projectCode: "FP-15",
  projectTitle: "Movie Rating & Cinema Ticketing App",
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
  overview: "Build a showtime browser featuring seat selection grids, movie reviews, genre categories, and promotional codes.",
  problemStatement: [
    "Manual and error-prone tracking of Movie Rating & Cinema Ticketing App events.",
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
        "Manage book registers",
        "Configure member plans",
        "Moderate community posts",
        "Audit library records"
    ],
    "Librarian": [
        "Catalog library book volumes",
        "Manage checkouts & returns",
        "Process overdue fines",
        "Manage reservations"
    ],
    "Reader": [
        "Search book catalogs",
        "Reserve books online",
        "Join discussion board threads",
        "Add book reviews"
    ]
},
  modules: [
  "Authentication",
  "Book Catalog",
  "Checkouts Manager",
  "Discussion Board",
  "Fines Registry"
],
  pages: {
    "Public": [
        "Home",
        "Catalog Search",
        "Discussion Forums",
        "Login",
        "Register"
    ],
    "Reader": [
        "Dashboard",
        "My Bookings",
        "Reading List",
        "Account Settings"
    ],
    "Librarian": [
        "Dashboard",
        "Inventory Ledger",
        "Active Checkouts",
        "Fines Desk"
    ],
    "Admin": [
        "Dashboard",
        "Library Analytics",
        "Member Tiers"
    ]
},
  databaseCollections: [
  "Users",
  "Books",
  "Checkouts",
  "Reservations",
  "Forums",
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
  "Check-out history charts",
  "Overdue book email triggers",
  "Fines invoice PDF export",
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
export default fp15Data;

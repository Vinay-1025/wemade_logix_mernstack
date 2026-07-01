export const fp16Data = {
  projectId: 16,
  projectCode: "FP-16",
  projectTitle: "Event Management & Ticketing Organizer",
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
  overview: "Build an event catalog supporting ticket reservations, check-in QR scan logs, and organizer dashboards.",
  problemStatement: [
    "Manual and error-prone tracking of Event Management & Ticketing Organizer events.",
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
        "Moderate recipe feedback",
        "Monitor catalog tags",
        "Audit system databases",
        "Manage configurations"
    ],
    "Creator": [
        "Create recipes instructions",
        "Upload recipe images",
        "Tag recipe attributes",
        "View user upvotes"
    ],
    "User": [
        "Browse recipes with filters",
        "Build daily meal planners",
        "Generate shopping grocery lists",
        "Submit ratings"
    ]
},
  modules: [
  "Authentication",
  "Recipes Catalog",
  "Meal Planner",
  "Grocery Lists",
  "Upvotes Hub"
],
  pages: {
    "Public": [
        "Home",
        "Recipes Search",
        "Trending Feed",
        "Login",
        "Register"
    ],
    "User": [
        "Dashboard",
        "Meal Planner",
        "My Lists",
        "My Cookbooks"
    ],
    "Creator": [
        "Dashboard",
        "Recipe Publisher",
        "My Analytics",
        "Feedback Panel"
    ],
    "Admin": [
        "Dashboard",
        "Categories Directory",
        "Content Review"
    ]
},
  databaseCollections: [
  "Users",
  "Recipes",
  "MealPlans",
  "GroceryLists",
  "Ratings",
  "Categories"
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
  "Grocery List PDF export",
  "Calorie counter calculators",
  "Recipe rating & reviews",
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
export default fp16Data;

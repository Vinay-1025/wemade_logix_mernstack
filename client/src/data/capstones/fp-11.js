export const fp11Data = {
  projectId: 11,
  projectCode: "FP-11",
  projectTitle: "Hotel & Resort Booking Engine",
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
  overview: "Build a reservations system checking room category availabilities, promotional discounts, dining options, and guest checks.",
  problemStatement: [
    "Manual and error-prone tracking of Hotel & Resort Booking Engine events.",
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
        "Manage exercises dictionary",
        "Monitor user data sizes",
        "Audit server metrics",
        "Manage configuration"
    ],
    "User": [
        "Log daily workouts & goals",
        "Set nutritional targets",
        "Track calorie intake and weights",
        "Analyze progress charts"
    ]
},
  modules: [
  "Authentication",
  "Workouts Ledger",
  "Dietary Planner",
  "Progress Charts",
  "Exercise Database"
],
  pages: {
    "Public": [
        "Home",
        "Exercise Database",
        "Login",
        "Register"
    ],
    "User": [
        "Dashboard",
        "Workout Log",
        "Diet tracker",
        "Weight Progress"
    ],
    "Admin": [
        "Dashboard",
        "Manage Exercises",
        "Diagnostics Log"
    ]
},
  databaseCollections: [
  "Users",
  "Workouts",
  "Meals",
  "ProgressLogs",
  "Exercises"
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
  "Interactive progress charts",
  "Daily calorie target check",
  "Meal prep PDF Export",
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
export default fp11Data;

export const fp05Data = {
  projectId: 5,
  projectCode: "FP-05",
  projectTitle: "Fitness & Workout Planner API",
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
    "Multer",
    "PDF-Kit"
  ],
  overview: "Build a gym training tracker supporting workout logs, routine scheduling, caloric count trends, and personal record trackers.",
  problemStatement: [
    "Manual and error-prone tracking of workout routines, reps, sets, and weights.",
    "Difficulty in coordinating custom routines between trainers and trainees.",
    "Inefficient tracking of physical progress metrics alongside caloric intake trend visibility.",
    "Lack of automated reporting and visual insights on personal records (PRs)."
  ],
  objectives: [
    "Build a robust and secure MERN stack fitness and workout tracking application.",
    "Implement isolated user experience pipelines for different roles (Admin, Trainer, User).",
    "Ensure strict database schema constraints for workout metrics, exercise history, and nutritional logs.",
    "Deploy the complete working systems to production cloud hosts."
  ],
  roles: {
    "Admin": [
        "Manage global exercise library taxonomy",
        "Monitor system usage and database storage metrics",
        "Audit system access logs and security reports",
        "Manage system settings and integrations"
    ],
    "Trainer": [
        "Create custom workout routines & exercise programs",
        "Assign customized routines and calorie goals to clients",
        "Track client workout execution logs and fitness progress",
        "Provide feedback on client workouts and achievements"
    ],
    "User": [
        "Log daily workout sessions, exercises, sets, reps, and weights",
        "Schedule workout routines and log caloric intake",
        "Record body measurements and upload progress photos",
        "Export fitness routine guides and performance reports as PDF"
    ]
  },
  modules: [
    "Authentication & Profile Management",
    "Exercise Library & Routine Builder",
    "Workout Logging & History Engine",
    "Caloric & Nutrition Tracker",
    "Progress & Personal Record (PR) Tracker",
    "Trainer-Client Coordination Hub"
  ],
  pages: {
    "Public": [
        "Home",
        "Routine Explorer",
        "Fitness Blog",
        "Login",
        "Register"
    ],
    "User": [
        "Dashboard (Caloric trends & weekly schedules)",
        "Workout Logger (Track active sessions, sets, and reps)",
        "Routine Library (My custom and assigned plans)",
        "Nutrition Journal (Log food & calories)",
        "Progress & PR Stats"
    ],
    "Trainer": [
        "Dashboard (Client status overview)",
        "Routine Builder & Assigner",
        "Client Tracker & Progress Review",
        "Exercise Curator"
    ],
    "Admin": [
        "Dashboard (User & usage stats)",
        "Exercise Registry (CRUD global exercises)",
        "System Audit Logs"
    ]
  },
  databaseCollections: [
    "Users",
    "Exercises",
    "Routines",
    "WorkoutLogs",
    "NutritionLogs",
    "ProgressRecords"
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
      "Responsive Fitness UI",
      "Form Validation"
    ],
    "backend": [
      "Express",
      "REST APIs (Exercises, WorkoutLogs, Routines)",
      "MVC",
      "Middleware (Authentication, Role Control)",
      "Error Handling"
    ],
    "database": [
      "MongoDB",
      "Minimum 5 collections",
      "Relationships (User -> WorkoutLogs, Trainer -> Trainee)"
    ],
    "general": [
      "CRUD Operations (Routines, Workout Logs)",
      "Search & Filter (exercises by target muscle group, difficulty)",
      "Dashboard Panels (showing weekly active minutes and caloric intake)",
      "Profile & Metric Unit Preferences Management",
      "Deployment"
    ]
  },
  bonusFeatures: [
    "PDF Workout routine sheet generation (using PDF-Kit)",
    "Progress photo upload & comparison dashboard (using Multer)",
    "Workout performance and caloric intake trend charts",
    "Email notifications for scheduled workouts",
    "Dark mode theme toggle"
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

export default fp05Data;

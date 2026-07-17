export const fp23Data = {
  projectId: 23,
  projectCode: "FP-23",
  projectTitle: "Interactive Trivia & Gamified Learning Platform",
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
    "Chart.js",
    "Socket.io"
  ],
  overview: "Build a quiz app supporting trivia categories, timed responses, leaderboard scores, and user quiz creator pipelines.",
  problemStatement: [
    "Manual and error-prone tracking of trivia quiz questions, categories, and options.",
    "Difficulty in calculating real-time leaderboard scores and matching multiplayer play times.",
    "Inefficient game statistics and lack of progress tracking for self-paced learning.",
    "Lack of interactive visual reports on player engagement, scoring streaks, and quiz popularity."
  ],
  objectives: [
    "Build a robust and secure MERN stack gamified trivia and learning platform.",
    "Implement isolated dashboard portals and layouts for Players, Quiz Creators, and Admins.",
    "Ensure strict database schema constraints for questions, timed attempts, and score logs.",
    "Deploy the complete working systems to production cloud hosts."
  ],
  roles: {
    "Admin": [
        "Configure global trivia settings, question templates, and category taxonomies",
        "Monitor overall platform activity and database load levels",
        "Audit system access security logs and flag inappropriate questions",
        "Manage corporate account registries and integration APIs"
    ],
    "QuizCreator": [
        "Create custom trivia quizzes and compile question banks",
        "Set quiz difficulty, category tags, and response timers",
        "Analyze student quiz submissions and attempt statistics using charts",
        "Manage question settings and edit published trivia options"
    ],
    "Player": [
        "Search and filter trivia quizzes by difficulty and categories",
        "Take timed quizzes and submit answers in the play arena",
        "Track daily study goals, scoring history, and active streaks",
        "View public real-time leaderboards and competitive standings"
    ]
  },
  modules: [
    "Authentication & Gamer Profiles",
    "Quiz & Question Registry",
    "Timed Game Engine (Socket.io)",
    "Leaderboard & Score Aggregator",
    "Learning Progress Analytics (Charts)"
  ],
  pages: {
    "Public": [
        "Home",
        "Trivia Categories Explorer",
        "Global Leaderboards",
        "Login",
        "Register"
    ],
    "Player": [
        "Dashboard (My stats, active streak, recommended quizzes)",
        "Trivia Arena (Live timed gameplay interface)",
        "My Score History & Graphs",
        "Preferences & Settings"
    ],
    "QuizCreator": [
        "Dashboard (Total quiz plays, average scores)",
        "Quiz Builder & Editor",
        "Attempt Analytics Desk",
        "Category Settings"
    ],
    "Admin": [
        "Dashboard (Platform active users, popular categories)",
        "Question Quality Approvals",
        "System Settings & Audits"
    ]
  },
  databaseCollections: [
    "Users",
    "Quizzes",
    "Questions",
    "Attempts",
    "Leaderboards",
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
      "Responsive Interactive Play UI",
      "Form Validation"
    ],
    "backend": [
      "Express",
      "REST APIs (Quizzes, Attempts, Leaderboards)",
      "MVC",
      "Middleware (Authentication, Creator access rules)",
      "Error Handling"
    ],
    "database": [
      "MongoDB",
      "Minimum 5 collections",
      "Relationships (Quiz -> Questions, User -> Attempts)"
    ],
    "general": [
      "CRUD Operations (Quizzes, Questions)",
      "Search & Filter (quizzes by topic, author, difficulty)",
      "Dashboard Panels showing score trends and active learning calendar widgets",
      "Profile & Gamification settings Management",
      "Deployment"
    ]
  },
  bonusFeatures: [
    "Real-time competitive leaderboard sync via WebSockets (Socket.io)",
    "Dynamic score history trends and performance charts (using Chart.js)",
    "Auto-generated PDF performance certificates on scoring 100%",
    "Gamified sound and active timers options",
    "Dark mode workspace themes"
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

export default fp23Data;

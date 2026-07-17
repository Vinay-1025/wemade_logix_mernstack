export const fp04Data = {
  projectId: 4,
  projectCode: "FP-04",
  projectTitle: "Personal Finance & Expense Tracker Dashboard",
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
    "Socket.io",
    "Multer",
    "Recharts / Chart.js"
  ],
  overview: "Build an asset portfolio analyzer featuring budget thresholds, custom transaction categories, and SVG chart visualizers.",
  problemStatement: [
    "Manual and error-prone tracking of personal daily expenses and income streams.",
    "Difficulty in visualizing spending habits, budget breaches, and investment growth over time.",
    "Lack of centralized management for multi-currency transactions and asset portfolios.",
    "Absence of automated notifications or alerts when approaching budget limits."
  ],
  objectives: [
    "Build a robust and secure MERN stack personal finance dashboard.",
    "Implement secure role-based access for Users (manage portfolios) and Admins (system parameters & audit).",
    "Ensure strict database schema constraints for monetary precision and transaction history.",
    "Deploy the complete working systems to production cloud hosts."
  ],
  roles: {
    "Admin": [
        "Manage global transaction categories & standard conversion rates",
        "Monitor overall system usage & database performance metrics",
        "Audit system access logs & security reports",
        "Manage system integrations and API configurations"
    ],
    "Moderator": [
        "Audit user support tickets and feedback logs",
        "Flag suspicious fraudulent transaction activities or anomalous logs",
        "Moderate community savings forums or public financial tips boards",
        "Approve custom user categories for global registry integration"
    ],
    "User": [
        "Log income, expenses, and transfer transactions",
        "Set monthly budget thresholds per category with alert limits",
        "Manage asset portfolios (savings accounts, cash, investments)",
        "Generate and export visual financial reports and charts"
    ]
  },
  modules: [
    "Authentication & Profile Manager",
    "Transaction Ledger (Income/Expense Tracking)",
    "Budgeting Engine (Thresholds & Notifications)",
    "Portfolio Analyzer (Assets & Investments)",
    "Visualization Dashboard (SVG Charts & Reports)",
    "Audit & Activity Logger"
  ],
  pages: {
    "Public": [
        "Home",
        "Product Pricing",
        "Login",
        "Register"
    ],
    "User": [
        "Dashboard (Charts & Metrics Overview)",
        "Transactions Ledger (CRUD & Filters)",
        "Budgets & Category Manager",
        "Portfolio Tracker (Assets & Investments)"
    ],
    "Admin": [
        "System Dashboard (Usage Stats)",
        "Global Settings & Categories",
        "Audit Log Viewer",
        "Support Ticket Resolver"
    ]
  },
  databaseCollections: [
    "Users",
    "Transactions",
    "Budgets",
    "Portfolios",
    "Categories",
    "Logs"
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
      "Responsive Dashboard UI",
      "Form Validation & Error Alerts"
    ],
    "backend": [
      "Express",
      "REST APIs (Transactions, Budgets, Assets)",
      "MVC",
      "Middleware (Auth, Role Verification)",
      "Error Handling"
    ],
    "database": [
      "MongoDB",
      "Minimum 5 collections",
      "Relationships (User -> Transactions, User -> Budgets)"
    ],
    "general": [
      "CRUD Operations (Transactions, Budgets)",
      "Search & Filter (by category, date range, amount)",
      "Dashboard Panels with Key Metrics",
      "Profile & Currency Preferences Management",
      "Deployment"
    ]
  },
  bonusFeatures: [
    "Receipt upload and storage (using Multer & Cloudinary)",
    "Real-time notifications for budget threshold breaches (Socket.io)",
    "Export data to CSV/PDF reports",
    "Recurring transaction automation scheduler",
    "Dark mode dashboard toggle"
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

export default fp04Data;

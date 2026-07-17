export const fp19Data = {
  projectId: 19,
  projectCode: "FP-19",
  projectTitle: "Stock Portfolio & Investment Analytics Portal",
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
    "Multer",
    "Chart.js",
    "Socket.io"
  ],
  overview: "Build a market tracker managing watchlist portfolios, asset buy/sell transaction logs, and real-time pricing simulations.",
  problemStatement: [
    "Manual and error-prone tracking of mock asset buy/sell transaction histories.",
    "Difficulty in visualizing portfolio allocation percentages, net asset values, and return metrics.",
    "Inefficient distribution of professional investment advice and stock research analyses.",
    "Lack of real-time pricing updates and interactive financial performance charts."
  ],
  objectives: [
    "Build a robust and secure MERN stack stock portfolio tracker and investment analytics portal.",
    "Implement isolated dashboards and workflows for Investors, Financial Advisors, and system Admins.",
    "Ensure strict database schema constraints for transaction pricing, portfolio value changes, and stock watchlists.",
    "Deploy the complete working systems to production cloud hosts."
  ],
  roles: {
    "Admin": [
        "Configure global market indices, transaction constraints, and subscription settings",
        "Approve and verify financial Advisor credentials and profile registers",
        "Audit system transaction histories, security access, and performance logs",
        "Manage corporate account directories and system integration details"
    ],
    "Advisor": [
        "Publish stock research analyses and market opinion articles",
        "Upload document attachment guides and financial models (using Multer)",
        "Build and share mock model portfolios for subscriber guidance",
        "Track readership analytics and subscriber interaction stats"
    ],
    "Investor": [
        "Manage a customized watchlist of monitored stocks and virtual cash balance",
        "Log virtual buy/sell transactions and calculate average buying price metrics",
        "Bookmark advisory posts, view active portfolios, and subscribe to premium research",
        "Analyze portfolio performance trends and asset distribution via visual charts"
    ]
  },
  modules: [
    "Authentication & Financial Profiles",
    "Watchlist & Stock Simulation Engine",
    "Portfolio Transaction Ledger",
    "Advisory Article Registry",
    "Investment Performance Analytics (Charts)"
  ],
  pages: {
    "Public": [
        "Home",
        "Mock Market Feed (Simulation dashboard)",
        "Advisory Insights Catalog",
        "Login",
        "Register"
    ],
    "Investor": [
        "Dashboard (Net asset value chart, portfolio gains, and asset weights)",
        "Transactions Ledger (CRUD virtual buy/sell orders)",
        "Watchlist Tracker",
        "Bookmarked Research & Subscriptions"
    ],
    "Advisor": [
        "Dashboard (Subscriber growth charts, post readers counts)",
        "Analysis Post Publisher",
        "Model Portfolio Creator",
        "Investor Inquiry Board"
    ],
    "Admin": [
        "Dashboard (Total platform assets, virtual transaction logs)",
        "Advisor Verification Center",
        "System Audits & Settings"
    ]
  },
  databaseCollections: [
    "Users",
    "Transactions",
    "Watchlists",
    "Portfolios",
    "ResearchPosts",
    "Subscriptions"
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
      "Responsive Investment Dashboard UI",
      "Form Validation"
    ],
    "backend": [
      "Express",
      "REST APIs (Transactions, Watchlists, ResearchPosts)",
      "MVC",
      "Middleware (Authentication, Role Check controls)",
      "Error Handling"
    ],
    "database": [
      "MongoDB",
      "Minimum 5 collections",
      "Relationships (User -> Transactions, User -> Watchlists)"
    ],
    "general": [
      "CRUD Operations (Virtual transactions, Watchlists)",
      "Search & Filter (stocks by ticker symbol, sector, gains/losses)",
      "Dashboard Panels showing portfolio allocation charts and pricing alerts",
      "Profile & Investment preference settings",
      "Deployment"
    ]
  },
  bonusFeatures: [
    "Real-time portfolio evaluation using mock stock price feeds",
    "Portfolio growth and asset allocation charts (using Chart.js)",
    "Automated email digests summarizing watchlist price alerts",
    "Printable PDF reports summarizing portfolio transaction histories",
    "Dark mode for day traders"
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

export default fp19Data;

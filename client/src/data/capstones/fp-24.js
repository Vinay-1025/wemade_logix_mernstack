export const fp24Data = {
  projectId: 24,
  projectCode: "FP-24",
  projectTitle: "Food Delivery & Restaurant Directory App",
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
    "Stripe API",
    "PDF-Kit"
  ],
  overview: "Build an ordering app featuring restaurant menu categories, shopping cart states, order tracker status, and review forms.",
  problemStatement: [
    "Manual and error-prone tracking of food orders, restaurant menus, and deliveries.",
    "Difficulty in coordinating restaurant vendor roles and validating listing permissions.",
    "Inefficient order status tracking and lack of delivery pipeline visibility.",
    "Lack of real-time stats and visual dashboard insights on restaurant revenues and user ratings."
  ],
  objectives: [
    "Build a robust and secure MERN stack food delivery and restaurant directory application.",
    "Implement isolated workflows and dashboard structures for Customers, Restaurant Owners, and Admins.",
    "Ensure strict database schema constraints for menu items, order checkouts, and customer ratings.",
    "Deploy the complete working systems to production cloud hosts."
  ],
  roles: {
    "Admin": [
        "Configure global platform configurations and review flagged restaurants",
        "Approve and onboard new Restaurant Partner registries",
        "Monitor overall platform active users and transaction volume metrics",
        "Audit system access security logs and financial billing summaries"
    ],
    "RestaurantOwner": [
        "Configure restaurant profile settings (cuisine, location, operating hours)",
        "Manage menu categories and upload dish photos (using Multer)",
        "Accept customer food orders and update kitchen status pipeline (Received, Preparing, Ready, Delivered)",
        "Analyze daily sales charts and customer review summaries"
    ],
    "Customer": [
        "Browse and filter restaurants by cuisine style, price, and customer ratings",
        "Add food items to shopping cart and order online using Stripe checkout",
        "Track live order statuses and delivery progress in real-time",
        "Submit feedback scores and written reviews on restaurant menu logs"
    ]
  },
  modules: [
    "Authentication & Profile Registry",
    "Restaurant Catalog & Menu Builder",
    "Shopping Cart & Ordering Pipeline",
    "Real-Time Order Tracking Desk (Socket.io)",
    "Partner Sales Analytics (Charts)"
  ],
  pages: {
    "Public": [
        "Home",
        "Restaurant Directory Search",
        "Menu Details (Interactive cart selector)",
        "Login",
        "Register"
    ],
    "Customer": [
        "Dashboard (My active orders, favorites list)",
        "Order Tracker (Live preparation steps)",
        "Receipts & Invoices Ledger",
        "Account Settings"
    ],
    "RestaurantOwner": [
        "Dashboard (Order counts, gross revenue charts)",
        "Menu Configurator (CRUD dishes and prices)",
        "Active Kitchen Queue (Status updater)",
        "Customer Feedback Log"
    ],
    "Admin": [
        "Dashboard (Platform active hubs, subscription summaries)",
        "Restaurant Approvals Desk",
        "Financial Metrics & System Audits"
    ]
  },
  databaseCollections: [
    "Users",
    "Restaurants",
    "MenuItems",
    "Orders",
    "Reviews",
    "Transactions"
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
      "Responsive Storefront & Ordering UI",
      "Form Validation"
    ],
    "backend": [
      "Express",
      "REST APIs (Restaurants, MenuItems, Orders)",
      "MVC",
      "Middleware (Authentication, Role Check controls)",
      "Error Handling"
    ],
    "database": [
      "MongoDB",
      "Minimum 5 collections",
      "Relationships (Restaurant -> MenuItems, User -> Orders)"
    ],
    "general": [
      "CRUD Operations (MenuItems, Orders)",
      "Search & Filter (restaurants by keyword, category, rating)",
      "Dashboard Panels showing order progress lists and sales charts",
      "Profile & Address details Management",
      "Deployment"
    ]
  },
  bonusFeatures: [
    "Real-time kitchen order updates via WebSockets (Socket.io)",
    "Stripe payment integration for secure checkout payments",
    "Food order receipt and bill summary PDF exporter (using PDF-Kit)",
    "Food dish photo uploads (using Multer)",
    "Dark mode dashboard themes"
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

export default fp24Data;

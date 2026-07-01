export const fp01Data = {
  projectId: 1,
  projectCode: "FP-01",
  projectTitle: "E-Commerce Marketplace Platform",
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
  "Stripe API",
  "Multer"
],
  overview: "Build a multi-vendor online store with catalog filtering, shopping cart caching, and payment portal integrations.",
  problemStatement: [
    "Manual and error-prone tracking of E-Commerce Marketplace Platform events.",
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
        "Manage users and vendors",
        "Moderate product listings",
        "View revenue reports",
        "Configure payment settings"
    ],
    "Vendor": [
        "Manage store profile",
        "Add and edit product inventory",
        "Track orders & fulfillment",
        "View sales charts"
    ],
    "Customer": [
        "Browse & search product catalog",
        "Manage cart & checkout securely",
        "View order history",
        "Submit product reviews"
    ]
},
  modules: [
  "Authentication",
  "Store Management",
  "Product Catalog",
  "Cart & Checkout",
  "Order Tracking",
  "Reviews System"
],
  pages: {
    "Public": [
        "Home",
        "Product Catalog",
        "Product Detail",
        "Shopping Cart",
        "Login",
        "Register"
    ],
    "Customer": [
        "Dashboard",
        "My Profile",
        "Order History",
        "Checkout"
    ],
    "Vendor": [
        "Dashboard",
        "Inventory Management",
        "Order Fulfilment",
        "Sales Reports"
    ],
    "Admin": [
        "Dashboard",
        "Users Directory",
        "System Configuration"
    ]
},
  databaseCollections: [
  "Users",
  "Products",
  "Categories",
  "Orders",
  "Carts",
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
  "Stripe Checkout Gateway",
  "Interactive Sales Charts",
  "Invoice PDF export",
  "Email purchase confirmation",
  "Dark mode"
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
export default fp01Data;

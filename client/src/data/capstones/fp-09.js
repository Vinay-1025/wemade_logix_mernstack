export const fp09Data = {
  projectId: 9,
  projectCode: "FP-09",
  projectTitle: "Recipe Sharing & Culinary Community Platform",
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
    "Google Maps API",
    "Multer"
  ],
  overview: "Build a recipe network supporting nutritional information calculators, reviews, scaling serving sizes, and step-by-step instructions.",
  problemStatement: [
    "Manual and inconsistent tracking of meal recipes, ingredients, and nutritional data.",
    "Lack of interactive culinary tools to scale serving sizes dynamically based on portion requirements.",
    "Difficulty in locating physical grocery stores stocking specialized or local ingredients.",
    "Absence of secure monetization pipelines for professional chefs selling premium recipes or cooking classes."
  ],
  objectives: [
    "Build a robust and secure MERN stack recipe sharing and culinary community platform.",
    "Implement isolated roles and experiences for Admins, professional Chefs/Creators, and Home Cooks.",
    "Ensure strict database schema constraints for ingredients, portion scaling, reviews, and transaction structures.",
    "Deploy the complete working systems to production cloud hosts."
  ],
  roles: {
    "Admin": [
        "Approve and flag public recipe listings for quality control",
        "Manage user memberships, creator verifications, and premium reports",
        "View platform commission summaries from cooking class sales",
        "Audit system activities and security protocols"
    ],
    "Chef": [
        "Create detailed recipe listings with step-by-step instructions and nutritional values",
        "Upload cooking media files (images/videos) and tag nearby ingredient sourcing locations",
        "Manage online cooking class schedules and booking calendars",
        "View sales revenue reports for premium recipes and classes"
    ],
    "User": [
        "Search and filter recipes by dietary preferences, difficulty, or ingredients",
        "Locate local grocery stores and culinary events on interactive map panels",
        "Scale recipe serving sizes dynamically and book virtual cooking classes",
        "Purchase premium chef recipes or class tickets via Stripe checkout"
    ]
  },
  modules: [
    "Authentication & Creator Profile Hub",
    "Recipe Explorer & Servings Scaler",
    "Nutrition & Calorie Counter",
    "Culinary Map & Store Finder (Google Maps)",
    "Class Booking & Payments Pipeline (Stripe)",
    "Community Reviews & Q&A Board"
  ],
  pages: {
    "Public": [
        "Home",
        "Recipe Explorer Catalog",
        "Recipe Details (with interactive servings scaler)",
        "Login",
        "Register"
    ],
    "User": [
        "Dashboard (My cookbooks, calendar, and nutrition tracker)",
        "My Bookings (Virtual cooking classes)",
        "Saved & Bookmarked Recipes",
        "Support & Q&A Hub"
    ],
    "Chef": [
        "Dashboard (My stats, reviews, and active courses)",
        "My Recipe Builder & Editor",
        "Class Coordinator (Schedule active courses)",
        "Revenue & Payment Charts"
    ],
    "Admin": [
        "Dashboard (User growth, popular recipes)",
        "Recipe Approval Board",
        "System Audit Logs"
    ]
  },
  databaseCollections: [
    "Users",
    "Recipes",
    "Bookings",
    "Reviews",
    "ChefProfiles",
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
      "Responsive UI",
      "Form Validation"
    ],
    "backend": [
      "Express",
      "REST APIs (Recipes, Bookings, Reviews)",
      "MVC",
      "Middleware (Authentication, Role Check)",
      "Error Handling"
    ],
    "database": [
      "MongoDB",
      "Minimum 5 collections",
      "Relationships (User -> Bookings, Recipe -> Reviews)"
    ],
    "general": [
      "CRUD Operations (Recipes, Bookings)",
      "Search & Filter (recipes by diet type, difficulty, preparation time)",
      "Dashboard Panels showcasing weekly meal calendars and metrics",
      "Profile & Dietary Preferences Management",
      "Deployment"
    ]
  },
  bonusFeatures: [
    "Interactive Google Maps search for local ingredient stores and culinary classes",
    "Step-by-step recipe photo/video carousel upload (using Multer)",
    "Stripe payment integration for premium recipes and booking cooking classes",
    "PDF recipe brochure and shopping list exporter",
    "Dark mode for kitchen-friendly viewing"
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

export default fp09Data;

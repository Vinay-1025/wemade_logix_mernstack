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
  "Google Maps API"
],
  overview: "Build a recipe network supporting nutritional information calculators, reviews, scaling serving sizes, and step-by-step instructions.",
  problemStatement: [
    "Manual and error-prone tracking of Recipe Sharing & Culinary Community Platform events.",
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
        "Approve property listings",
        "Manage user memberships",
        "View booking metrics",
        "Audit system protocols"
    ],
    "Agent": [
        "Create property listings",
        "Upload room photos & maps",
        "Track reservation inquiries",
        "Manage booking calendars"
    ],
    "Buyer": [
        "Search properties by filters",
        "View locations on map panels",
        "Book property viewing slots",
        "Reserve properties via payments"
    ]
},
  modules: [
  "Authentication",
  "Properties Finder",
  "Media Gallery",
  "Booking Scheduler",
  "Inquiries Manager"
],
  pages: {
    "Public": [
        "Home",
        "Properties Catalog",
        "Property Details",
        "Login",
        "Register"
    ],
    "Buyer": [
        "Dashboard",
        "My Bookings",
        "Saved Listings",
        "Inquiries Hub"
    ],
    "Agent": [
        "Dashboard",
        "My Listings",
        "Reservations",
        "Visitor Queries"
    ],
    "Admin": [
        "Dashboard",
        "Property Approvals",
        "Audits"
    ]
},
  databaseCollections: [
  "Users",
  "Properties",
  "Bookings",
  "Inquiries",
  "AgentProfiles",
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
  "Interactive Google Map search",
  "Photo carousel upload",
  "Stripe reservation fee",
  "Brochure PDF export",
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
export default fp09Data;

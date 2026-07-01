export const fp10Data = {
  projectId: 10,
  projectCode: "FP-10",
  projectTitle: "Smart Home Automation IoT Dashboard",
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
  "QRCode-Generator"
],
  overview: "Build a simulator interface controlling connected light switches, locks, cameras, energy reports, and customizable rule routines.",
  problemStatement: [
    "Manual and error-prone tracking of Smart Home Automation IoT Dashboard events.",
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
        "Manage event organizations",
        "Oversee platform financial models",
        "Audit access logs",
        "Verify event planners"
    ],
    "Organizer": [
        "Build event listings",
        "Manage ticket price tiers",
        "Track ticket sales metrics",
        "Scan QR codes for check-in"
    ],
    "Attendee": [
        "Browse upcoming local events",
        "Book ticket slots via checkout",
        "Download ticket PDF with QR code",
        "Manage profile"
    ]
},
  modules: [
  "Authentication",
  "Events Directory",
  "Ticketing Engine",
  "QR Check-in System",
  "Sales Analytics"
],
  pages: {
    "Public": [
        "Home",
        "Events Catalog",
        "Event Details",
        "Login",
        "Register"
    ],
    "Attendee": [
        "Dashboard",
        "My Tickets",
        "Order Invoices",
        "Preferences"
    ],
    "Organizer": [
        "Dashboard",
        "Create Event",
        "Sales Reports",
        "Ticket Scanner"
    ],
    "Admin": [
        "Dashboard",
        "Organizer Registries",
        "Finance Metrics"
    ]
},
  databaseCollections: [
  "Users",
  "Events",
  "Tickets",
  "Organizations",
  "SalesLogs"
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
  "Stripe ticket checkout",
  "QR Code Ticket Verification",
  "Ticket PDF generator",
  "Interactive sales charts",
  "Email check-in confirmation"
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
export default fp10Data;
